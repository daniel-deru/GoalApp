import statusses from "./utils/properties/status"

interface GlobalStyle {
    colors: {
        blue: string,
        blueFaded: string,
        green: string,
        red: string
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
        blue: "#0774C3",
        blueFaded: "#0774C310",
        green: "#04CE00",
        red: "#D20000"
    },
    buttons: {
        fullWidth: (color: string = globalStyle.colors.blue) => {
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
            borderRadius: 7,
            width: "100%"
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