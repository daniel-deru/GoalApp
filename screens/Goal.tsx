import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, SafeAreaView, View, ScrollView, TouchableOpacity,} from "react-native"
import { Formik } from "formik"
import 'react-native-get-random-values'
import {v4 as uuidv4 } from "uuid"
import { NavigationScreenProp, NavigationParams, NavigationState } from "react-navigation"
import { RouteProp } from "@react-navigation/native"
import { GoalInterface, updateGoals } from '../store/slices/goalSlice'
import globalStyles from "../globalStyles"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { StatusEnums } from "../utils/properties/status"
import { difficultyEnum } from "../utils/properties/difficulty"
import DateModal from "../components/form_parts/DateModal"
import { GoalScreens } from "../stacks/stacks"

interface Props {
    navigation: NavigationScreenProp<NavigationParams, NavigationState> ,
    route: RouteProp<{params: {id: string}}, 'params'>
}

interface FormInterface {
    name: string,
    difficulty: difficultyEnum,
    reward: string,
    description: string
}

const { inputs, text, buttons } = globalStyles

const Goal: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const goals = useAppSelector((state) => state.goals)
    const goalId = route.params?.id
    const [goal, setGoal] = useState<GoalInterface | null>(goals[goalId])
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [dateVisibility, setDateVisibility] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const submitGoal = (values: FormInterface): void => {
        const {name, description, reward } = values
        const deadline: number = currentDate.getTime()

        const newGoal: GoalInterface = {
            id: goalId || uuidv4(),
            name,
            description,
            reward,
            deadline,
            status: goal?.status || StatusEnums.COMPLETE,
            difficulty: goal?.difficulty || difficultyEnum.easy,
            type: 'GoalInterface',
        }
        
        dispatch(updateGoals(newGoal))
        
        if(goal){ // Go to the view screen
            
            navigation.navigate(GoalScreens.View, {goal: newGoal})
        }

        else{ // Go back to the goal list
            navigation.navigate(GoalScreens.Goals)
        }  
    }

    const setData = (): FormInterface => {
        let  initialData: FormInterface = {
            name: "",
            difficulty: difficultyEnum.easy,
            reward: "",
            description: ""
        }

        if(goal){
            initialData.name = goal.name
            initialData.description = goal.description
            initialData.reward = goal.reward
            initialData.difficulty = goal.difficulty
        }

        return initialData
    }

    useEffect(() => {
        
        if(goalId){
            setGoal(goals[goalId])
            setCurrentDate(new Date(goals[goalId].deadline))
        } 
    }, [goalId])

  return (
    <SafeAreaView style={styles.mainContainer}>
        <DateModal 
            visibility={dateVisibility} 
            setVisibility={setDateVisibility}
            setDate={setCurrentDate}
            date={currentDate}
        />
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
                                style={inputs.textInput} 
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Deadline</Text>
                            <Text style={[styles.dateInput]}>{currentDate.toDateString()}</Text>
                            <TouchableOpacity style={buttons.fullWidth()} onPress={() => setDateVisibility(true)}>
                                <Text style={text.button}>Set Deadline</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Reward</Text>
                            <TextInput 
                                style={inputs.textInput} 
                                value={values.reward}
                                onChangeText={handleChange('reward')}
                                onBlur={handleBlur('reward')}
                            />
                        </View>
                        <View style={[styles.fieldContainer]}>
                            <Text style={styles.textHeader}>Description</Text>
                            <TextInput 
                                style={[inputs.textInput, {textAlignVertical: "top"}]} 
                                multiline={true}
                                numberOfLines={7}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                />
                        </View>
                        <View>
                            <TouchableOpacity style={buttons.fullWidth()} onPress={(e: any) => handleSubmit(e)}>
                                <Text style={text.button}>{goal ? "Update": "Save"}</Text>
                            </TouchableOpacity>
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
        backgroundColor: "white",
        height: "100%"
    },
    fieldContainer: {
        padding: 10,
        marginTop: 10
    },
    textHeader: {
        paddingBottom: 5,
        fontSize: 20,
    },
    fieldTextSmall: {
        fontSize: 12
    },
    dateInput: {
        padding: 10,
        fontSize: 16,
    }
})
export default Goal