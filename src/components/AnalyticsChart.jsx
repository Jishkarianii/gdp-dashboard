import "./AnalyticsChart.scss"
import { useState, useEffect, useContext } from 'react'
import ThemeContext from "../context/ThemeContext"
import EChart from "./EChart"
import axios from 'axios'
import Spinner from "./Spinner"

const optionData = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      textStyle: {
        color: "rgb(70, 70, 70)"
      },
      data: []
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: []
  };

function AnalyticsChart() {
  const [option, setOption] = useState(optionData)
  const [isLoaded, setIsLoaded] = useState(false)
  const theme = useContext(ThemeContext)
  
  useEffect(() => {
    setChartData()
  }, [])

  useEffect(() => {
    const editedOption = { ...option };

        if (theme.isDarkMode) {
          editedOption.legend.textStyle.color = "rgb(236, 236, 236)";
        } else {
          editedOption.legend.textStyle.color = "rgb(70, 70, 70)";
        }

        setOption(editedOption)
  }, [theme.isDarkMode])

  const getAnalyticsData = async () => {
    const collectedData = [];
    const countries = ["GEO", "UKR", "TUR", "ARM", "AZE", "KAZ"];

    // Collect data for above countries
    for (let i = 0; i < countries.length; i++) {
      const res = await axios.get(`https://api.worldbank.org/v2/country/${countries[i]}/indicator/NY.GDP.MKTP.CD?&format=json&date=1980:2020`)
      const data = res.data[1]

      const value = [];
      const years = [];
      const name = data[0].country.value;

      data.forEach(item => {
          const shortValue = (item.value / 1000000000).toFixed(1)
          value.push(shortValue)

        if (i === 0) {
          years.push(item.date)
        }
      })

      value.reverse();
      years.reverse();

      collectedData.push({ name, value, years })
    }

    return collectedData;
  }

  const setChartData = async () => {
    const data = await getAnalyticsData()
    
    const names = data.map(item => item.name)
    const seriesData = data.map(item => {
      return {
        name: item.name,
        type: 'line',
        stack: 'Total',
        data: item.value
      }
    })

    const editedOption = { ...option };

    editedOption.legend.data = names;
    editedOption.series = seriesData;
    editedOption.xAxis.data = data[0].years;

    setOption(editedOption)
    setIsLoaded(true)
  }

  return (
    <section className="analytics-chart">
        {isLoaded ? (
          <EChart option={option} />
        ) : (
          <Spinner />
        )}
    </section>
  )
}

export default AnalyticsChart
