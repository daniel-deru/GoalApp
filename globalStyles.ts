import statusses from "./utils/properties/status"

interface GlobalStyle {
    colors: {
        main: string,
        mainFaded: string,
        complete: string,
        active: string,
        overdue: string
    },
    buttons: {
        fullWidth: () => object
    },
    text: {
        button: object
    },
    inputs: {
        textInput: object
    }
}

const globalStyle: GlobalStyle = {
    colors: {
        main: "#0774C3",
        mainFaded: "#0774C310",
        complete: statusses.complete.color,
        active: statusses.active.color,
        overdue: statusses.overdue.color
    },
    buttons: {
        fullWidth: (color: string = globalStyle.colors.main) => {
            return {
                backgroundColor: color,
                padding: 10,
                borderRadius: 5,
                marginTop: 10
            }
        }
    },
    text: {
        button: {
            color: "white",
            textAlign: "center",
            fontSize: 16
        }
    },
    inputs: {
        textInput: {
            backgroundColor: (color: string = globalStyle.colors.mainFaded) => color,
            fontSize: 16,
            padding: 10,
            borderRadius: 7
        }
    }
}

export default globalStyle