import "./CurrentGDP.scss"

function CurrentGDP() {
    return (
        <section className="current-GDP">
            <div className="current-GDP__item">
                <h3 className="current-GDP__item--title">World GDP</h3>
                <p className="current-GDP__item--sub">Current</p>
                <p className="current-GDP__item--value">1,666,657</p>
            </div>
            <div className="current-GDP__item">
                <h3 className="current-GDP__item--title">Georgia GDP</h3>
                <p className="current-GDP__item--sub">Current</p>
                <p className="current-GDP__item--value">$10,446,657.35</p>
            </div>
        </section>
    )
}

export default CurrentGDP
