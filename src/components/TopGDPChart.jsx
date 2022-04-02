import "./TopGDPChart.scss"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import EChart from "./EChart";

const optionLight = {
    title: {
      text: 'Top GDP Countries',
      left: 'center',
      textStyle: {
          color: "rgb(70, 70, 70)"
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
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
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

const optionDark = {
    title: {
      text: 'Top GDP Countries',
      left: 'center',
      textStyle: {
          color: "rgb(236, 236, 236)"
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: "rgb(236, 236, 236)"
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        textStyle: {
        color: "rgb(236, 236, 236)"
      },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
            color: "rgb(236, 236, 236)"
        }
      }
    ]
  };

function TopGDPChart() {
    const [option, setOption] = useState(optionLight)
    const isDarkMode = useSelector(state => state.darkMode.isDarkMode)

    useEffect(() => {
        if (isDarkMode) {
            setOption(optionDark)
        } else {
            setOption(optionLight)
        }
    }, [isDarkMode])

    return (
        <section className="top-GDP-chart">
            <EChart 
                option={option}
                height={"500px"}
            />
        </section>
    )
}

export default TopGDPChart
