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
        fullWidth: (color?: string) => object
    },
    text: {
        button: object,
        heading: object,
        item: object
    },
    inputs: {
        textInput: object
    },
    view: {
        container: object,
        screenContainer: object
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
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 5,
                marginTop: 10,

            }
        }
    },
    text: {
        button: {
            color: "white",
            textAlign: "center",
            fontSize: 16
        },
        heading: {
            fontWeight: "500",
            fontSize: 24
        },
        item: {
            fontSize: 20
        }
    },
    inputs: {
        textInput: {
            backgroundColor: "#0774C310",
            fontSize: 16,
            padding: 10,
            borderRadius: 7
        }
    },
    view: {
        container: {
            marginTop: 10
        },
        screenContainer: {
            paddingHorizontal: 10,
            paddingVertical: 20,
            height: "100%"
        }
    }
}

export default globalStyle