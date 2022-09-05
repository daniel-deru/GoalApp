import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import {useAppDispatch, useAppSelector} from "../store/hooks"
import {Task, deleteTask} from "../store/slices/taskSlice"
import globalStyles from "../globalStyles"
import { DurationFormInterface, getDuration} from "../utils/helpers/duration"
import { GoalInterface } from '../store/slices/goalSlice'

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: {task: Task}}, 'params'>
}

const TaskView: React.FC<Props> = ({ navigation, route }) => {
    const [task, setTask] = useState<Task>(route.params.task)
    const [goal, setGoal] = useState<GoalInterface | undefined | null>()
    const goals = useAppSelector((state) => state.goals)

    const dispatch = useAppDispatch()

    // Take a float and get the integer value
    const int = (float: number): number => Math.floor(float)

    // Add 's' if it should be plural
    const add_s = (value: number): string => value > 1 ? 's' : ''

    // Add value to array if it is more than 0
    const add_value = (value: number, desc: string, list: string[]) => {
        if(value >= 1) list.push(`${int(value)} ${desc}${add_s(value)}`)
    }

    // get the display string for the duration
    const displayDuration = (duration: number): string => {
        let durationArray: string[] = []
        const durationObj: DurationFormInterface = getDuration(duration)

        add_value(durationObj.days, 'day', durationArray)
        add_value(durationObj.hours, 'hour', durationArray)
        add_value(durationObj.minutes, 'minute', durationArray)

        return durationArray.join(", ")

    }

    const deleteCurrentTask = (): void => {
        dispatch(deleteTask(task))
        navigation.goBack()
    }

    const editCurrentTask = () => {
        navigation.navigate("Task", task)
    }

    const getGoal = () => {
        const currentGoal = goals.filter((goal: GoalInterface) => goal.id === task.goal_id)
        if(currentGoal.length < 1) return null
        return currentGoal[0]
    }

    useEffect(() => {
        setTask(route.params.task)
        setGoal(getGoal())
    }, [route.params])

    return (
        <ScrollView style={styles.container}>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Name</Text>
                <Text style={globalStyles.text.item}>{task.name}</Text>
            </View>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Date</Text>
                <Text style={globalStyles.text.item}>{new Date(task.date).toDateString()}</Text>
            </View>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Duration</Text>
                <Text style={globalStyles.text.item}>{displayDuration(task.duration)}</Text>
            </View>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Status</Text>
                <Text style={globalStyles.text.item}>{task.status}</Text>
            </View>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Difficulty</Text>
                <Text style={globalStyles.text.item}>{task.difficulty}</Text>
            </View>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Goal</Text>
                <Text style={globalStyles.text.item}>{goal ? goal.name : "No Goal Set"}</Text>
            </View>
            <View style={globalStyles.view.container}>
                <Text style={globalStyles.text.heading}>Description</Text>
                <Text style={globalStyles.text.item}>{task.description}</Text>
            </View>
            <View>
                <TouchableOpacity style={globalStyles.buttons.fullWidth(globalStyles.colors.active)}>
                    <Text style={globalStyles.text.button}>Start Task</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity 
                    style={globalStyles.buttons.fullWidth(globalStyles.colors.main)}
                    onPress={() => editCurrentTask()}
                >
                    <Text style={globalStyles.text.button}>Edit Task</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity 
                    style={globalStyles.buttons.fullWidth(globalStyles.colors.overdue)}
                    onPress={() => deleteCurrentTask()}
                >
                    <Text style={globalStyles.text.button}>Delete Task</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        margin: 10
    }
})

export default TaskView