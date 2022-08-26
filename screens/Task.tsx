import React, { useState, useEffect} from 'react'
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native"
import { Formik } from "formik"
import { Dropdown } from 'react-native-element-dropdown'
import { difficultyEnum } from "../utils/properties/difficulty"
import globalStyles from "../globalStyles"
import DateModal from "../components/DateModal"
import { difficulties, FormDifficulty } from "../utils/forms/difficulty"
import { createDuration, Duration } from "../utils/forms/duration"

interface FormData {
    name: string,
    description: string,
    difficulty: difficultyEnum,
    duration: number
}

const days: Duration[] = createDuration(6)
const hours: Duration[] = createDuration(23)
const minutes: Duration[] = createDuration(59)
const Task = () => {
    const [visibility, setVisibility] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())

    const submit = (values: FormData) => {
        console.log(values)
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
            <DateModal 
                visibility={visibility}
                setVisibility={setVisibility}
                date={date}
                setDate={setDate}
            />
            <Formik
                initialValues={createInitialValues()}
                onSubmit={submit}
            >
                {({handleChange, handleSubmit, values}) => (
                    <View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Name</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={handleChange("name")}
                                value={values.name}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Date</Text>
                            <View>
                                <Text>{date.toDateString()}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => setVisibility(true)}>
                                    <Text style={styles.buttonText}>Set Date</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Duration</Text>
                            <View style={styles.durationContainer}>
                                <View style={styles.durationItem}>
                                    <Text>Days</Text>
                                    <Dropdown 
                                        data={days}
                                        onChange={(item: Duration) => handleChange(item.value)}
                                        labelField="label"
                                        valueField='value'
                                        style={styles.input}
                                        placeholder="Days"
                                        value={days[0].value}
                                    />
                                </View>
                                <View style={styles.durationItem}>
                                    <Text>Hours</Text>
                                    <Dropdown 
                                        data={hours}
                                        onChange={(item: Duration) => handleChange(item.value)}
                                        labelField="label"
                                        valueField='value'
                                        style={styles.input}
                                        placeholder="Hours"
                                        value={hours[1].value}
                                    />
                                </View>
                                <View style={styles.durationItem}>
                                    <Text>Minutes</Text>
                                    <Dropdown 
                                        data={minutes}
                                        onChange={(item: Duration) => handleChange(item.value)}
                                        labelField="label"
                                        valueField='value'
                                        style={styles.input}
                                        placeholder="Minutes"
                                        value={minutes[0].value}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Difficulty</Text>
                            <Dropdown 
                                data={difficulties}
                                onChange={(item: FormDifficulty) => handleChange(item.value)}
                                labelField="label"
                                valueField='value'
                                style={styles.input}
                                placeholder="Select Difficulty"
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldHeader}>Description</Text>
                            <TextInput 
                                style={styles.input}
                                multiline={true}
                                numberOfLines={7}
                                onChangeText={handleChange("description")}
                            />
                        </View>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={(e: any) => handleSubmit(e)}>
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
    },
    durationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    durationItem: {
        width: "30%",
        margin: 5
    }

})

export default Task