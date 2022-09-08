import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native"
import globalStyle from '../globalStyles'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { RouteProp } from "@react-navigation/native"
import { Task } from "../store/slices/taskSlice"
import { useAppDispatch } from "../store/hooks"
import { updateTask } from "../store/slices/taskSlice"

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: Task}, 'params'>
}

const { view, buttons, text, colors } = globalStyle
const { floor } = Math

const Timer: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [task, setTask] = useState<Task>(route.params)
    const [time, setTime] = useState<number>(task.duration)
    const [timerActive, setTimerActive] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const tick = useRef<NodeJS.Timer>()
    const buttonColor = timerActive ? colors.overdue : colors.active

    const displayTime = (): string => {
        
        const daysTime: number = time / (60 * 60 * 24)
        const hoursTime: number = (daysTime % 1) * 24
        const minutesTime: number = (hoursTime % 1) * 60
        const secondsTime: number = (minutesTime % 1) * 60
        
        const days: string = pad(daysTime)
        const hours: string = pad(hoursTime)
        const minutes: string = pad(minutesTime)
        const seconds: string = pad(secondsTime)

        return `${days}:${hours}:${minutes}:${seconds}`
    }

    // Make the display data pretty by rounding and adding 0 if it is a single digit
    const pad = (time: number): string => time < 10 ? `0${floor(time)}` : `${floor(time)}`

    const timerCallback = (): void => {
        if(timerActive){
            tick.current = setInterval(() => setTime((prevTime: number) => --prevTime), 1000)
        }
        else {
            clearInterval(tick.current)
        }
    }

    const updateTask = () => {
        
    }

    useEffect(() => {
       timerCallback()

       return () => {
            clearInterval(tick.current)
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
                <TouchableOpacity style={buttons.fullWidth(colors.main)}>
                    <Text style={text.button}>Complete Task</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttons.fullWidth(colors.main)}>
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