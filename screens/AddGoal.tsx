import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, SafeAreaView, View, ScrollView, TouchableOpacity,} from "react-native"
import { Formik } from "formik"
import 'react-native-get-random-values'
import {v4 as uuidv4 } from "uuid"
import { NavigationScreenProp, NavigationParams, NavigationState } from "react-navigation"
import { RouteProp } from "@react-navigation/native"
import { GoalInterface, setNewGoal, updateGoal } from '../store/slices/goalSlice'
import globalStyles from "../globalStyles"
import {useAppDispatch} from "../store/hooks"
import { StatusEnums } from "../utils/properties/status"
import { difficultyEnum } from "../utils/properties/difficulty"
import DateModal from "../components/form_parts/DateModal"
import { GoalScreens } from "../stacks/stacks"

interface Props {
    navigation: NavigationScreenProp<NavigationParams, NavigationState> ,
    route: RouteProp<{params: GoalInterface}, 'params'>
}

interface FormInterface {
    name: string,
    difficulty: difficultyEnum,
    reward: string,
    description: string
}


const AddGoal: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [goal, setGoal] = useState<GoalInterface | null>(route.params)
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [dateVisibility, setDateVisibility] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const submitGoal = (values: FormInterface): void => {
        const {name, description, reward, difficulty} = values
        const deadline: number = currentDate.getTime()

        const newGoal: GoalInterface = {
            id: uuidv4(),
            name,
            description,
            reward,
            deadline,
            status: StatusEnums.ACTIVE,
            difficulty: difficultyEnum.easy,
            type: 'GoalInterface',
        }
        // if there is a goal update the goal
        if(goal){
            dispatch(updateGoal(newGoal)) 
            navigation.navigate(GoalScreens.View, newGoal)
        }
        // If no goal create a new goal
        else{
            dispatch(setNewGoal(newGoal))
            navigation.goBack()
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
        setGoal(route.params)
        if(route.params) setCurrentDate(new Date(route.params.deadline))
    }, [route.params])

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
                                style={globalStyles.inputs.textInput} 
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Deadline</Text>
                            <Text style={[styles.dateInput]}>{currentDate.toDateString()}</Text>
                            <TouchableOpacity style={globalStyles.buttons.fullWidth()} onPress={() => setDateVisibility(true)}>
                                <Text style={globalStyles.text.button}>Set Deadline</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Reward</Text>
                            <TextInput 
                                style={globalStyles.inputs.textInput} 
                                value={values.reward}
                                onChangeText={handleChange('reward')}
                                onBlur={handleBlur('reward')}
                            />
                        </View>
                        <View style={[styles.fieldContainer]}>
                            <Text style={styles.textHeader}>Description</Text>
                            <TextInput 
                                style={[globalStyles.inputs.textInput, {textAlignVertical: "top"}]} 
                                multiline={true}
                                numberOfLines={7}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                />
                        </View>
                        <View>
                            <TouchableOpacity style={globalStyles.buttons.fullWidth()} onPress={(e: any) => handleSubmit(e)}>
                                <Text style={globalStyles.text.button}>{goal ? "Update": "Save"}</Text>
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
export default AddGoal