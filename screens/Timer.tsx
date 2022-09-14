import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import globalStyle from '../globalStyles'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { RouteProp } from "@react-navigation/native"
import { Task } from "../store/slices/taskSlice"
import { useAppDispatch } from "../store/hooks"
import { updateTask } from "../store/slices/taskSlice"
import { TaskEnum, TaskStatusInterface, taskStatusses } from "../utils/properties/status"
import { TaskScreens } from "../stacks/stacks"
import { useInterval } from "../utils/hooks/useInterval"

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: Task}, 'params'>
}

const { view, buttons, text, colors } = globalStyle
const { floor, round } = Math

const width = Dimensions.get("screen").width
const Timer: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [task, setTask] = useState<Task>(route.params)
    const [time, setTime] = useState<number>(task.time_left)
    const [timerActive, setTimerActive] = useState<boolean>(false)


    const dispatch = useAppDispatch()
    const buttonColor = timerActive ? colors.overdue : colors.active

    const displayTime = (): string => {
        
        const daysTime: number = time / (60 * 60 * 24)
        const hoursTime: number = (daysTime % 1) * 24
        const minutesTime: number = (hoursTime % 1) * 60
        const secondsTime: number = round((minutesTime % 1) * 60)

        const days: string = pad(daysTime)
        const hours: string = pad(hoursTime)
        const minutes: string = pad(minutesTime)
        const seconds: string = pad(secondsTime)

        return `${days}:${hours}:${minutes}:${seconds}`
    }

    // Make the display data pretty by rounding and adding 0 if it is a single digit
    const pad = (time: number): string => time < 10 ? `0${floor(time)}` : `${floor(time)}`

    useInterval(() => {
        if(timerActive){
            setTime((prevTime: number) => --prevTime)

        }
    }, 1000)

    const updateCurrentTask = (task: Task) => {
        dispatch(updateTask(task))
    }

    const completeTask = (): void => {
        setTimerActive(false)
        const newTask: Task = {
            ...task,
            status: TaskEnum.COMPLETE, 
            time_left: time
        }
        setTask(newTask)
        updateCurrentTask(newTask)

        navigation.navigate(TaskScreens.View, {task: newTask})
    }

    const restartTask = (): void => {
        const newTask: Task = {...task, status: TaskEnum.INCOMPLETE}

        setTimerActive(false)
        setTask(newTask)
        updateCurrentTask(newTask)
        setTime(task.duration)
    }

    return (
        <SafeAreaView style={[view.screenContainer, styles.container]}>
            <View>
                <Text style={[text.heading, styles.center]}>{task.name}</Text>
                <Text style={styles.center}>{task.description}</Text>
            </View>
            <View>
                <Text style={[styles.center, {fontSize: 42, fontWeight: "900"}]}>{displayTime()}</Text>
            </View>
            <View style={styles.btnContainer}>
                <View style={styles.btnContainerCol}>
                    <TouchableOpacity 
                        style={[buttons.fullWidth(buttonColor), styles.btn]}
                        onPress={completeTask}
                    >
                        <Text style={[text.button, styles.text]}>Complete Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[buttons.fullWidth(buttonColor), styles.btn]}
                        onPress={restartTask}
                    >
                        <Text style={[text.button, styles.text]}>Restart Task</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainerCol}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[buttons.fullWidth(buttonColor), styles.btn]}
                        onPress={() => setTimerActive(!timerActive)}
                    >
                        <Text style={[text.button, styles.text]}>{timerActive ? "Pause" : "Start"} Timer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[buttons.fullWidth(buttonColor), styles.btn]}
                        // onPress={() => setTimerActive(!timerActive)}
                    >
                        <Text style={[text.button, styles.text]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignContent: "space-between"
    },
    center: {
        textAlign: "center"
    },
    btnContainerCol: {

    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"

    },
    btn: {
        width: "100%"
    },
    text: {
        width: (width - 100) / 2
    }
})

export default Timer