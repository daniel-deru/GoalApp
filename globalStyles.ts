import statusses from "./utils/properties/status"

const globalStyle: any = {
    colors: {
        main: "#0774C3",
        mainFaded: "#0774C310",
        complete: statusses.complete.color,
        active: statusses.active.color,
        overdue: statusses.overdue.color
    }
}

export default globalStyle