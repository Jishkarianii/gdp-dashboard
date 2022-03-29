import "./Navbar.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("theme") === null) {
            setLight()
        } else if (localStorage.getItem("theme") === "dark") {
            setDark()
        } else if (localStorage.getItem("theme") === "light") {
            setLight()
        }
    }, [])

    const changeTheme = () => {
        if (isDarkMode) {
            setLight()
        } else {
            setDark()
        }
    }
    
    const setDark = () => {
        localStorage.setItem("theme", "dark")
        document.documentElement.setAttribute("data-theme", "dark")
        setIsDarkMode(true)
    }
    
    const setLight = () => {
        localStorage.setItem("theme", "light")
        document.documentElement.setAttribute("data-theme", "light")
        setIsDarkMode(false)
    }

    return (
        <header className="navbar">
            <nav className="navbar__inner container">
                <div className="navbar__inner__wrapper">
                    <ul className="navbar__inner__wrapper__logo">
                        <img src="./logo192.png" alt="logo" />    
                    </ul> 
                    <Link className="navbar__inner__wrapper__item" to="/"><HomeIcon /> Home</Link>
                    <Link className="navbar__inner__wrapper__item" to="/analytics"><InsightsIcon /> Analytics</Link>
                </div>
                <ThemeSwitcher checked={isDarkMode} onClick={changeTheme} />
            </nav>
        </header>
    )
}

export default Navbar