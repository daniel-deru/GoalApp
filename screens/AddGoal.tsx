import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableHighlight, 
    TextInput, 
    SafeAreaView, 
    View, 
    ScrollView,
} from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import { Formik } from "formik"
import { 
    NavigationScreenProp, 
    NavigationParams, 
    NavigationState  
} from "react-navigation"
import { generateYears, DateFieldInterface, months, getDays } from "../utils/forms/dates"

import globalStyles from "../globalStyles"

import {useAppDispatch} from "../store/hooks"
import { setNewGoal } from "../store/slices/goalSlice"
import { StatusEnums } from "../utils/properties/status"

interface Props {
    navigation: NavigationScreenProp<NavigationParams, NavigationState> 
}

const years: DateFieldInterface[] = generateYears()

//   https://reactnativeexample.com/a-react-native-dropdown-component-easy-to-customize-for-both-ios-and-android/

const AddGoal: React.FC<Props> = ({ navigation }): JSX.Element => {
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth()+1)
    const [day, setDay] = useState<number>(new Date().getDate())
    const [days, setDays] = useState<DateFieldInterface[]>(getDays(year, month))

    const dispatch = useAppDispatch()

    const addGoal = (values: any) => {
        const {year, month, day, name, description, reward} = values
        const deadline: number = new Date(year, month, day).getDate()

        const goal = {
            name,
            description,
            reward,
            deadline,
            status: StatusEnums.ACTIVE
        }
        dispatch(setNewGoal(goal))
        navigation.goBack()
    }

    useEffect(() => {
        setDays(getDays(year, month))
    }, [year, month])

  return (
    <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <Formik
                initialValues={{
                    name: "",
                    day: day,
                    month: month,
                    year: year,
                    difficulty: "",
                    reward: "",
                    description: ""
                }}
                onSubmit={addGoal}
            >
                {({ handleBlur, handleSubmit, handleChange, values}) => (
                    <View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Goal Name</Text>
                            <TextInput 
                                style={styles.input} 
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Deadline</Text>
                            <View style={styles.dateContainer}>
                            <View style={styles.dateItemContainer}>
                                <Text>Year</Text>
                                <Dropdown
                                    style={[styles.input]}
                                    placeholderStyle={styles.fieldTextSmall}
                                    data={years}
                                    labelField="label"
                                    valueField='value'
                                    placeholder='Select Year'
                                    onChange={(item) => setYear(item.value)}
                                    value={values.year}
                                />
                                </View>
                                <View style={styles.dateItemContainer}>
                                    <Text>Month</Text>
                                    <Dropdown
                                        style={styles.input}
                                        placeholderStyle={styles.fieldTextSmall}
                                        data={months}
                                        labelField="label"
                                        valueField='value'
                                        placeholder='Select Month'
                                        onChange={(item) => setMonth(item.value)}
                                        value={values.month}
                                    />
                                </View>
                                <View style={styles.dateItemContainer}>
                                    <Text>Day</Text>
                                    <Dropdown
                                        value={values.day}
                                        style={styles.input}
                                        placeholderStyle={styles.fieldTextSmall}
                                        data={days}
                                        labelField="label"
                                        valueField='value'
                                        placeholder='Select Day'
                                        onChange={(item) => setDay(item.value)}
                                    />
                                </View>

                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Reward</Text>
                            <TextInput 
                                style={styles.input} 
                                value={values.reward}
                                onChangeText={handleChange('reward')}
                                onBlur={handleBlur('reward')}
                            />
                        </View>
                        <View style={[styles.fieldContainer]}>
                            <Text style={styles.textHeader}>Description</Text>
                            <TextInput 
                                style={[styles.input, {textAlignVertical: "top"}]} 
                                multiline={true}
                                numberOfLines={7}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                />
                        </View>
                        <View>
                            <TouchableHighlight style={styles.submit} onPress={(e: any) => handleSubmit(e)}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}

            </Formik>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        backgroundColor: "white"
    },
    input: {
        backgroundColor: globalStyles.colors.mainFaded,
        padding: 10,
        fontSize: 16,
        borderRadius: 7
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateItemContainer: {
        width: "30%"
    },
    fieldContainer: {
        padding: 10,
        marginTop: 10
    },
    textHeader: {
        paddingBottom: 5,
        fontSize: 20
    },
    submit: {
        textAlign: "center",
        backgroundColor: globalStyles.colors.main,
        color: "white",
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: 'white', 
        textAlign: "center",
        fontSize: 30
    },
    fieldTextSmall: {
        fontSize: 12
    }
})
export default AddGoal