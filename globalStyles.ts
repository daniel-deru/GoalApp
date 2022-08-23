import statusses from "./utils/properties/status"

interface GlobalStyle {
    colors: {
        main: string,
        mainFaded: string,
        complete: string,
        active: string,
        overdue: string
    }
}

const globalStyle: GlobalStyle = {
    colors: {
        main: "#0774C3",
        mainFaded: "#0774C310",
        complete: statusses.complete.color,
        active: statusses.active.color,
        overdue: statusses.overdue.color
    }
}

export default globalStyle