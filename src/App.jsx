import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';


// from 1980 to now: https://api.worldbank.org/v2/country/ge/indicator/NY.GDP.MKTP.CD?date=1980:2022

// from 1980 to now (All): https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=1980:2022

// from 1980 to now (JSON): https://api.worldbank.org/v2/country/ge/indicator/NY.GDP.MKTP.CD?date=1980:2022&format=json


const GDPApiGeo = "https://api.worldbank.org/v2/country/ge/indicator/NY.GDP.MKTP.CD?format=json"


function App() {

  return (
      <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

