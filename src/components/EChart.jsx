import "./EChart.scss"
import * as echarts from 'echarts'
import { useState, useEffect, useRef, useCallback } from 'react'

function EChart({ option }) {
    const chart = useRef(null)
    const [chartEl, setChartEl] = useState(chart)
    const [resize, setResize] = useState(false)
    const [timer, setTimer] = useState(0)

    const triggerResize = useCallback(() => {
        if (timer) {
            window.cancelAnimationFrame(timer);
        }
        // Debounce the window resize event
        setTimer(window.requestAnimationFrame(function () {
            setResize(true)
            setTimeout(() => {
                setResize(false)
            }, 0)
        }));
        
    },[setResize, timer])

    useEffect(() => {
        window.addEventListener('resize', triggerResize)
        
        return () => {
            window.removeEventListener('resize', triggerResize)
        }
        // eslint-disable-next-line
    }, [])

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
        />
    )
}

export default EChart