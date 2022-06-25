import "./GDPDynamics.scss"
import EChart from "./EChart"
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import axios from "axios";

const geoGDPDynamics = "https://api.worldbank.org/v2/country/geo/indicator/NY.GDP.MKTP.CD?&format=json&date=1980:2020"

const optionData = {
    title: {
      left: "center",
      text: "Georgia's GDP Dynamics",
      textStyle: {
        color: "rgb(70, 70, 70)"
      }
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line'
      }
    ]
  };

function GDPDynamics() {
  const [option, setOption] = useState(optionData)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    setChartData()
  }, [])

  useEffect(() => {
    const editedOption = { ...option };

    if (theme.isDarkMode) {
      editedOption.title.textStyle.color = "rgb(236, 236, 236)";
    } else {
      editedOption.title.textStyle.color = "rgb(70, 70, 70)"; 
    }

    setOption(editedOption)
}, [theme.isDarkMode])

  const editGDPValue = async () => {
    const years = [];
    const values = [];
    
    const res = await axios.get(geoGDPDynamics)
    const data = res.data[1];
  
    // Collect values of GDP by years
    data.forEach(item => {
      if (item.value === null) return

      const shortValue = (item.value / 1000000000);
      values.push(shortValue)
      years.push(item.date)
    });
    
    // Sort in the right direction
    years.reverse()
    values.reverse()

    return { years, values };
  }
  
  const setChartData = async () => {
    const { years, values } = await editGDPValue();

    const editedOption = { ...option };

    editedOption.xAxis.data = years;
    editedOption.series[0].data = values;

    setOption(editedOption)
  }

  return (
      <div className="GDP-dynamics">
          <EChart option={option} />
      </div>
  )
}

export default GDPDynamics
