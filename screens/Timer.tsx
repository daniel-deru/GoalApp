import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native"
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

const Timer: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [task, setTask] = useState<Task>(route.params)
    const [time, setTime] = useState<number>(task.time_left)
    const [timerActive, setTimerActive] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const tick = useRef<NodeJS.Timer>()
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
            // console.log(time)
        }
    }, 1000)

    const updateCurrentTask = () => {
        dispatch(updateTask({...task, time_left: time}))
    }

    const completeTask = (): void => {
        setTimerActive(false)
        const newTask: Task = {
            ...task,
            status: TaskEnum.COMPLETE, 
            time_left: time
        }
        setTask(newTask)
        // dispatch(updateTask(newTask))

        navigation.navigate(TaskScreens.View, {task: newTask})
    }

    const restartTask = (): void => {
        setTimerActive(false)
        setTask({...task, status: TaskEnum.INCOMPLETE})
        setTime(task.duration)
    }

    useEffect(() => {
    //    timerCallback()
       return () => {
            // clearInterval(tick.current)
            console.log("This is the task timer", task.time_left)
            updateCurrentTask()
       }
    }, [timerActive])
    return (
        <SafeAreaView style={[view.screenContainer, styles.container]}>
            <View>
                <Text style={[text.heading, styles.center]}>{task.name}</Text>
                <Text style={styles.center}>{task.description}</Text>
            </View>
            <View>
                <Text style={[styles.center, {fontSize: 42, fontWeight: "900"}]}>{displayTime()}</Text>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={buttons.fullWidth(buttonColor)}
                    onPress={() => setTimerActive(!timerActive)}
                >
                    <Text style={text.button}>{timerActive ? "Pause" : "Start"} Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={buttons.fullWidth(colors.main)}
                    onPress={completeTask}
                >
                    <Text style={text.button}>Complete Task</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={buttons.fullWidth(colors.main)}
                    onPress={restartTask}
                >
                    <Text style={text.button}>Restart Task</Text>
                </TouchableOpacity>
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
    }
})

export default Timer