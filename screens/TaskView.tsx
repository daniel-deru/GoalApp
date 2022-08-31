import React, { useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import {Task} from "../store/slices/taskSlice"
import globalStyles from "../globalStyles"

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: Task}, 'params'>
}

const TaskView: React.FC<Props> = ({ navigation, route }) => {
    const [task, setTask] = useState<Task>(route.params)

    const displayDuration = (duration: number): string => {
        let durationArray: string[] = []

        let days: number = duration / (60 * 60 * 24)
        let hours: number = ((days) % 1 * 24)
        let minutes: number = (hours % 1) * 60

        days = Math.floor(days)
        hours = Math.floor(hours)
        minutes = Math.floor(minutes)

        if(days >= 1){
            durationArray.push(`${days} day${days === 1 ? '' : "s"}`)
        } 
        if(hours >= 1){
            durationArray.push(`${hours} hour${hours === 1 ? '' : "s"}`)
        } 
        if(minutes >= 1){
            durationArray.push(`${minutes} minute${minutes === 1 ? '' : "s"}`)
        } 

        return durationArray.join(", ")

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.itemContainer}>
                <Text style={styles.heading}>Name</Text>
                <Text style={styles.itemText}>{task.name}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.heading}>Date</Text>
                <Text style={styles.itemText}>{new Date(task.date).toDateString()}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.heading}>Duration</Text>
                <Text style={styles.itemText}>{displayDuration(task.duration)}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.heading}>Status</Text>
                <Text style={styles.itemText}>{task.status}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.heading}>Difficulty</Text>
                <Text style={styles.itemText}>{task.difficulty}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.heading}>Description</Text>
                <Text style={styles.itemText}>{task.description}</Text>
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={globalStyles.buttons.fullWidth(globalStyles.colors.active)}>
                    <Text style={globalStyles.text.button}>Start Task</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={globalStyles.buttons.fullWidth(globalStyles.colors.main)}>
                    <Text style={globalStyles.text.button}>Edit Task</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={globalStyles.buttons.fullWidth(globalStyles.colors.overdue)}>
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
    },
    heading: {
        fontWeight: "500",
        fontSize: 24
    },
    itemContainer: {
        marginTop: 10
    },
    itemText: {
        fontSize: 20
    }
})

export default TaskView