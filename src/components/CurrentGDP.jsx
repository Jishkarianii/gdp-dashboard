import "./CurrentGDP.scss"
import { useState, useEffect } from "react";
import CountUp from 'react-countup';
import axios from "axios";

const worldGDP = "https://api.worldbank.org/v2/countries/wld/indicators/NY.GDP.MKTP.CD?format=json"
const georgiaGDP = "https://api.worldbank.org/v2/countries/geo/indicators/NY.GDP.MKTP.CD?format=json"

// number with commas as thousands separators
function numberWithCommas(number) {
    return JSON.stringify(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CurrentGDP() {
    const [world, setWorld] = useState("")
    const [georgia, setGeorgia] = useState("")
    const [endCount, setEndCount] = useState(false)

    useEffect(() => {
        getWorldGDP()
        getGeorgiaGDP()

        setTimeout(() => {
            setEndCount(true)
        }, 1000);
    }, [])

    const getWorldGDP = () => {
        axios.get(worldGDP)
        .then(res => {
            if (res.data[1][0].value == null) {
                setWorld(res.data[1][1].value);
            } else {
                setWorld(res.data[1][0].value);
            }
        })
    }

    const getGeorgiaGDP = () => {
        axios.get(georgiaGDP)
        .then(res => {
            if (res.data[1][0].value == null) {
                setGeorgia(res.data[1][1].value);
            } else {
                setGeorgia(res.data[1][0].value);
            }
        })
    }

    return (
        <section className="current-GDP">
            <div className="current-GDP__item">
                <h3 className="current-GDP__item--title">World's GDP</h3>
                <p className="current-GDP__item--sub">Current</p>
                <p className="current-GDP__item--value">
                    ${endCount ? (
                        numberWithCommas(world)
                    ) : (
                        <CountUp end={world} duration={1} />
                    )}
                </p>
            </div>
            <div className="current-GDP__item">
                <h3 className="current-GDP__item--title">Georgia's GDP</h3>
                <p className="current-GDP__item--sub">Current</p>
                <p className="current-GDP__item--value">
                    ${endCount ? (
                        numberWithCommas(georgia)
                    ) : (
                        <CountUp end={georgia} duration={1} />
                    )}
                </p>
            </div>
        </section>
    )
}

export default CurrentGDP
