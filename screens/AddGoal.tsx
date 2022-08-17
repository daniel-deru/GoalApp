import React, { useCallback, useEffect, useState } from 'react'

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
import { NavigationScreenProp, NavigationParams, NavigationState } from "react-navigation"
import { RouteProp } from "@react-navigation/native"
import { generateYears, DateFieldInterface, months, getDays } from "../utils/forms/dates"
import { GoalInterface } from '../store/slices/goalSlice'
import globalStyles from "../globalStyles"
import {useAppDispatch} from "../store/hooks"
import { setNewGoal } from "../store/slices/goalSlice"
import { StatusEnums } from "../utils/properties/status"
import { difficultyEnum } from "../utils/properties/difficulty"

interface Props {
    navigation: NavigationScreenProp<NavigationParams, NavigationState> ,
    route: RouteProp<{params: GoalInterface}, 'params'>
}

interface FormInterface {
    name: string,
    day: number,
    month: number,
    year: number,
    difficulty: difficultyEnum,
    reward: string,
    description: string
}

// Get all the years from current year + 10 years
const years: DateFieldInterface[] = generateYears()

const AddGoal: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [goal, setGoal] = useState<GoalInterface | null>(route.params)
    const [days, setDays] = useState<DateFieldInterface[]>([])

    const dispatch = useAppDispatch()

    const submitGoal = (values: any) => {
        const {year, month, day, name, description, reward, difficulty} = values
        const deadline: number = new Date(year, month, day).getTime()

        const goal: GoalInterface = {
            name,
            description,
            reward,
            deadline,
            status: StatusEnums.ACTIVE,
            difficulty,
            type: 'GoalInterface'
        }
        dispatch(setNewGoal(goal))
        navigation.goBack()
    }

    const setData = (): FormInterface => {
        const date: Date = new Date()
        let  initialData: FormInterface = {
            name: "",
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            difficulty: difficultyEnum.easy,
            reward: "",
            description: ""
        }

        if(goal){
            initialData.name = goal.name
            initialData.description = goal.description
            initialData.reward = goal.reward
            initialData.difficulty = goal.difficulty
            initialData.day = new Date(goal.deadline).getDay()
            initialData.month = new Date(goal.deadline).getMonth()
            initialData.year = new Date(goal.deadline).getFullYear()
        }

        return initialData
    }

    const setDaysCallback = useCallback(() => {
        const date: Date = new Date()
        setDays(getDays(date.getFullYear(), date.getMonth()))
    }, [])

    useEffect(() => {
        setDaysCallback()
    }, [setDaysCallback])

  return (
    <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <Formik
                initialValues={setData()}
                onSubmit={submitGoal}
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
                                    onChange={(item) => item.value}
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
                                        onChange={(item) => item.value}
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
                                        onChange={(item) => item.value}
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
                                <Text style={styles.buttonText}>{goal ? "Update": "Save"}</Text>
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