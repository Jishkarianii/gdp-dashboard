import PageTitle from '../components/PageTitle';
import TopGDPChart from '../components/TopGDPChart';

function Home() {
    return (
        <main className="container">
            <PageTitle title="GDP Dashboard" />
            <TopGDPChart />
        </main>
    )
}

export default Home
