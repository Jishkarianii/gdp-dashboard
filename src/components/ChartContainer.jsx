import "./ChartContainer.scss"
import GDPDynamics from "./GDPDynamics"
import TopGDPChart from "./TopGDPChart"

function ChartContainer() {
    return (
        <section className="chart-container">
            <TopGDPChart />
            <GDPDynamics />
        </section>
    )
}

export default ChartContainer
