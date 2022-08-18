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
import 'react-native-get-random-values'
import {v4 as uuidv4 } from "uuid"
import { NavigationScreenProp, NavigationParams, NavigationState } from "react-navigation"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { generateYears, DateFieldInterface, months, getDays } from "../utils/forms/dates"
import { GoalInterface, setNewGoal, updateGoal } from '../store/slices/goalSlice'
import globalStyles from "../globalStyles"
import {useAppDispatch} from "../store/hooks"
import { StatusEnums } from "../utils/properties/status"
import { difficultyEnum } from "../utils/properties/difficulty"
import type {StackParamList} from "../components/Header"

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

interface DateInterface {
    day: number,
    month: number,
    year: number
}

// Get all the years from current year + 10 years
const years: DateFieldInterface[] = generateYears()

const AddGoal: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [goal, setGoal] = useState<GoalInterface | null>(route.params)
    const [days, setDays] = useState<DateFieldInterface[]>([])
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [date, setDate] = useState<DateInterface>({
        day: currentDate.getDay(),
        month: currentDate.getMonth()+1,
        year: currentDate.getFullYear()
    })

    const dispatch = useAppDispatch()
    const navigator = useNavigation<StackNavigationProp<StackParamList>>()

    const submitGoal = (values: any) => {
        const {name, description, reward, difficulty} = values
        const deadline: number = new Date(date.year, date.month-1, date.day).getTime()
        const goal: GoalInterface = {
            id: uuidv4(),
            name,
            description,
            reward,
            deadline,
            status: StatusEnums.ACTIVE,
            difficulty,
            type: 'GoalInterface',
        }

        if(goal.id){
            dispatch(updateGoal(goal)) 
            // navigation.goBack("Goals Stack")
            navigator.pop(2)
            // navigation.pop()
        } 
        else{
            dispatch(setNewGoal(goal))
            navigation.goBack()
        }  
    }

    const setData = (): FormInterface => {
        let  initialData: FormInterface = {
            name: "",
            day: currentDate.getDate(),
            month: currentDate.getMonth()+1,
            year: currentDate.getFullYear(),
            difficulty: difficultyEnum.easy,
            reward: "",
            description: ""
        }

        if(goal){
            initialData.name = goal.name
            initialData.description = goal.description
            initialData.reward = goal.reward
            initialData.difficulty = goal.difficulty
            initialData.day = new Date(goal.deadline).getDate()
            initialData.month = new Date(goal.deadline).getMonth()+1
            initialData.year = new Date(goal.deadline).getFullYear()
        }

        return initialData
    }

    const setDaysCallback = useCallback(() => {
        setDays(getDays(date.year, date.month))
    }, [date])

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
                                    onChange={item => setDate(prevDate => ({...prevDate, year: item.value}))}
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
                                        onChange={item => setDate(prevDate => ({...prevDate, month: item.value}))}
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
                                        onChange={item => setDate(prevDate => ({...prevDate, day: item.value}))}
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