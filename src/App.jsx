import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import { useState, useEffect } from 'react';
import axios from 'axios';


// from 1980 to now: https://api.worldbank.org/v2/country/ge/indicator/NY.GDP.MKTP.CD?date=1980:2022

// from 1980 to now (All): https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=1980:2022

// from 1980 to now (JSON): https://api.worldbank.org/v2/country/ge/indicator/NY.GDP.MKTP.CD?date=1980:2022&format=json



// for chart: https://data.worldbank.org/indicator/NY.GDP.MKTP.CD


const api = "https://api.worldbank.org/v2/countries/all/indicators/NY.GDP.MKTP.CD?format=json&date=2020&page="


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
