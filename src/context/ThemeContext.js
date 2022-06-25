import { createContext } from "react";

const ThemeContext = createContext({
    isDarkMode: true,
    setIsDarkMode: () => {}
})

export default ThemeContext
