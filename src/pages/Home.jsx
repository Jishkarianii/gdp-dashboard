import ChartContainer from '../components/ChartContainer';
import CurrentGDP from '../components/CurrentGDP';
import CurrentGDPTable from '../components/CurrentGDPTable';
import PageTitle from '../components/PageTitle';

function Home() {
    return (
        <main className="container">
            <PageTitle title="GDP Dashboard" />
            <CurrentGDP />
            <ChartContainer />
            <CurrentGDPTable />
        </main>
    )
}

export default Home
