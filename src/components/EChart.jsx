import "./EChart.scss"
import * as echarts from 'echarts'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

function EChart({ option, resize, width = "100%", height = "100%" }) {
    const chart = useRef(null)
    const [chartEl, setChartEl] = useState(chart)
    const isDarkMode = useSelector(state => state.darkMode.isDarkMode)

    useEffect(() => {
        if (resize) {
            chartEl.resize()
        }

        if (!chartEl.current) {      
            chartEl.setOption(option)
        } else {
            setChartEl(echarts.init(chart.current))
        }
    }, [option, chartEl, resize])

    return (
        <div 
            className="chart"
            ref={chart} 
            style={{
                width: width,
                height: height
            }}
        />
    )
}

export default EChart