import * as echarts from 'echarts'
import { useState, useEffect, useRef } from 'react'

function EChart({ option, resize, width = "100%", height = "100%", darkMode = false}) {
    let chart = useRef(null)
    let [chartEl, setChartEl] = useState(chart)

    useEffect(() => {
        if (resize) {
            chartEl.resize()
        }
        if (!chartEl.current) {
            chartEl.setOption(option)
        } else {
            setChartEl(echarts.init(chart.current, darkMode && "dark"))
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