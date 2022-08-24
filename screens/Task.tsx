import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native"
import { Formik } from "formik"
import { Dropdown } from 'react-native-element-dropdown'
import { difficultyEnum } from "../utils/properties/difficulty"
import globalStyles from "../globalStyles"
interface FormData {
    name: string,
    description: string,
    difficulty: difficultyEnum,
    duration: number
}
const Task = () => {
    const submit = () => {

    }

    const createInitialValues = () => {
        const data: FormData = {
            name: "",
            description: "",
            difficulty: difficultyEnum.easy,
            duration: 0
        }

        return data
    }

    return (
        <ScrollView style={styles.container}>
            <Formik
                initialValues={createInitialValues()}
                onSubmit={submit}
            >
                {() => (
                    <View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Name</Text>
                            <TextInput style={styles.input}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Date</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Set Date</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.fieldHeader}>Duration</Text>
                            <View>
                                <Text>Days</Text>
                                <Dropdown 
                                    data={[]}
                                    onChange={() => console.log("Hi")}
                                    labelField="label"
                                    valueField='value'
                                />
                            </View>
                            <View>
                                <Text>Hours</Text>
                                <Dropdown 
                                    data={[]}
                                    onChange={() => console.log("Hi")}
                                    labelField="label"
                                    valueField='value'
                                />
                            </View>
                            <View>
                                <Text>Minutes</Text>
                                <Dropdown 
                                    data={[]}
                                    onChange={() => console.log("Hi")}
                                    labelField="label"
                                    valueField='value'
                                />
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Difficulty</Text>
                            <Dropdown 
                                data={[]}
                                onChange={() => console.log("Hi")}
                                labelField=""
                                valueField=''
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Description</Text>
                            <TextInput style={styles.input}/>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        fontSize: 20,
        height: "100%",
    },
    fieldContainer: {
        marginTop: 10
    },
    input: {
        backgroundColor: globalStyles.colors.mainFaded,
        fontSize: 16,
        padding: 10,
        borderRadius: 5
    },
    fieldHeader: {
        fontSize: 20,
        marginBottom: 5
    },
    button: {
        backgroundColor: globalStyles.colors.main,
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16
    }

})

export default Task