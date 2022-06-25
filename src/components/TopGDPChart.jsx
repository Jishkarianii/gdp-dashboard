import "./TopGDPChart.scss"
import { useState, useEffect, useContext } from 'react'
import ThemeContext from "../context/ThemeContext";
import EChart from "./EChart";
import axios from 'axios'
import Spinner from "./Spinner";

const allCountriesData = "https://api.worldbank.org/v2/countries/all/indicators/NY.GDP.MKTP.CD?format=json&date=2020&page=";

const optionData = {
    title: {
      text: 'Top GDP Countries',
      subtext: 'Current',
      left: 'center',
      textStyle: {
          color: "rgb(70, 70, 70)"
      },
      subtextStyle: {
          color: "rgb(172, 172, 175)"
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
          color: "rgb(70, 70, 70)"
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        textStyle: {
          color: "rgb(70, 70, 70)"
        },
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
            color: "rgb(70, 70, 70)"
        }
      }
    ]
  };

function TopGDPChart() {
    const [option, setOption] = useState(optionData)
    const [isLoaded, setIsLoaded] = useState(false)
    const theme = useContext(ThemeContext)
    
    useEffect(() => {
      setChartData()
    }, [])

    useEffect(() => {
      resizeHandler()
    }) 

    useEffect(() => {
        const editedOption = { ...option };

        if (theme.isDarkMode) {
          editedOption.title.textStyle.color = "rgb(236, 236, 236)";
          editedOption.legend.textStyle.color = "rgb(236, 236, 236)";
          editedOption.series[0].textStyle.color = "rgb(236, 236, 236)";
          editedOption.series[0].label.color = "rgb(236, 236, 236)";
        } else {
          editedOption.title.textStyle.color = "rgb(70, 70, 70)";
          editedOption.legend.textStyle.color = "rgb(70, 70, 70)";
          editedOption.series[0].textStyle.color = "rgb(70, 70, 70)";
          editedOption.series[0].label.color = "rgb(70, 70, 70)"; 
        }

        setOption(editedOption)
    }, [theme.isDarkMode])

    useEffect(() => {
      window.addEventListener("resize", resizeHandler)
      return () => {
        window.removeEventListener("resize", resizeHandler)
      }
    })

    const resizeHandler = () => {
      if (window.innerWidth < 430) {
        option.legend.show = false;
        setOption(option)
      } else {
        option.legend.show = true;
        setOption(option)
      }
    }
  
    const getAllPagesData = async () => { 
      const allPagesData = [];
      
      // Selected first and last pages 
      const res = await axios.get(allCountriesData)
      const startPage = res.data[0].page;
      const endPage = res.data[0].pages;
      
      // To collect all pages data
      for (let i = startPage; i <= endPage; i++) {
        const res = await axios.get(`${allCountriesData}${i}`)
        allPagesData.push(...res.data[1])
      }
  
      return allPagesData;
    }

    const calcTopGDPCountries = async () => {
      const allCountries = await getAllPagesData()
      
      // Sort countries for find Top 10 biggest GDP
      const sortedCountries = allCountries.sort((a, b) => b.value - a.value)

      const topTenCountries = [];
      let otherCountriesSum = 0;

      // get ten higher GDP countries
      for (let i = 0; i < 10; i++) {
        const shortValue = (sortedCountries[i].value / 1000000000).toFixed(0);
        const country = { 
          name: sortedCountries[i].country.value,
          value: shortValue
        }
        topTenCountries.push(country)
      }

      // Sum other countries GDP
      for (let i = 10; i < sortedCountries.length; i++) {
        otherCountriesSum += sortedCountries[i].value;
      }

      // Push other countries sum
      const shortValue = (otherCountriesSum / 1000000000).toFixed(0);
      topTenCountries.push({
        name: "Other",
        value: shortValue
      })
  
      return topTenCountries;
    }

    const setChartData = async () => {
      const topTenCountries = await calcTopGDPCountries()
      const editedOption = { ...option }
      editedOption.series[0].data = topTenCountries;
      setOption(option)
      setIsLoaded(true)    
    }

    return (
        <div className="top-GDP-chart">
            {isLoaded ? (
              <EChart option={option} />
            ) : (
              <Spinner />
            )}
        </div>
    )
}

export default TopGDPChart
