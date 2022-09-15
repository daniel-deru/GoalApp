import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import {useAppDispatch, useAppSelector} from "../store/hooks"
import {Task, deleteTask, updateTask} from "../store/slices/taskSlice"
import globalStyles from "../globalStyles"
import { GoalInterface } from '../store/slices/goalSlice'
import { TaskScreens } from "../stacks/stacks"
import statusses from "../utils/properties/status"

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: {task: Task}}, 'params'>
}

const { text, buttons, colors, view } = globalStyles

const TaskView: React.FC<Props> = ({ navigation, route }) => {
    const [task, setTask] = useState<Task>(route.params.task)
    const [goal, setGoal] = useState<GoalInterface | undefined | null>()
    const goals = useAppSelector((state) => state.goals)

    const dispatch = useAppDispatch()

    const deleteCurrentTask = (): void => {
        dispatch(deleteTask(task))
        navigation.goBack()
    }

    const editCurrentTask = (): boolean => navigation.navigate(TaskScreens.Task, {task})

    const getGoal = (): GoalInterface | null => {
        const currentGoal = Object.values(goals).filter((goal: GoalInterface) => goal.id === task.goal_id)
        if(currentGoal.length < 1) return null
        return currentGoal[0]
    }

   const completeTask = () => {
        dispatch(updateTask({...task, status: statusses.complete.name}))
        navigation.goBack()
   }

    useEffect(() => {
        setTask(route.params.task)
        setGoal(getGoal())

    }, [route.params.task])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <View style={view.container}>
                    <Text style={text.heading}>Name</Text>
                    <Text style={text.item}>{task.name}</Text>
                </View>
                <View style={view.container}>
                    <Text style={text.heading}>Date</Text>
                    <Text style={text.item}>{new Date(task.date).toDateString()}</Text>
                </View>
                <View style={view.container}>
                    <Text style={text.heading}>Status</Text>
                    <Text style={text.item}>{task.status}</Text>
                </View>
                <View style={view.container}>
                    <Text style={text.heading}>Difficulty</Text>
                    <Text style={text.item}>{task.difficulty}</Text>
                </View>
                <View style={view.container}>
                    <Text style={text.heading}>Goal</Text>
                    <Text style={text.item}>{goal ? goal.name : "No Goal Set"}</Text>
                </View>
                <View style={view.container}>
                    <Text style={text.heading}>Description</Text>
                    <Text style={text.item}>{task.description}</Text>
                </View>
                <View>
                    <TouchableOpacity 
                        style={buttons.fullWidth(colors.green)}
                        onPress={() => completeTask()}
                    >
                        <Text style={text.button}>Complete Task</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        style={buttons.fullWidth(colors.blue)}
                        onPress={() => editCurrentTask()}
                    >
                        <Text style={text.button}>Edit Task</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        style={[buttons.fullWidth(colors.red), {marginBottom: 15}]}
                        onPress={() => deleteCurrentTask()}
                    >
                        <Text style={text.button}>Delete Task</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: "99%",
    }
})

export default TaskView