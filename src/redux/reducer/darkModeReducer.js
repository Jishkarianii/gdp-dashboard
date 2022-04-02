const initialState = {
    isDarkMode: false
}

const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LIGHT":
            return {
                isDarkMode: false
            }

        case "SET_DARK":
            return {
                isDarkMode: true
            }

        default:
            return state;
    }
}

export default darkModeReducer