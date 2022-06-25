import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
      <div className="App">
        <ThemeContext.Provider 
          value={{ isDarkMode, setIsDarkMode }}
        >
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Router>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;
