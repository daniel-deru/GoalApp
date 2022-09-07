import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native"
import globalStyle from '../globalStyles'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { RouteProp } from "@react-navigation/native"
import { Task } from "../store/slices/taskSlice"
import { getDuration, DurationFormInterface } from "../utils/helpers/duration"
const { view, buttons, text, colors } = globalStyle

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: Task}, 'params'>
  }

const Timer: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [task, setTask] = useState<Task>(route.params)
    const [time, setTime] = useState<number>(task.duration)
    const [timerActive, setTimerActive] = useState<boolean>(false)

    const tick = useRef<NodeJS.Timer>()
    let buttonColor = timerActive ? colors.overdue : colors.active

    const displayTime = (): string => {
        const { floor } = Math
        const days = time / (60 * 60 * 24)
        const hours = (days % 1) * 24
        const minutes = (hours % 1) * 60
        const seconds = (minutes % 1) * 60

        // Use get duration
        

        return `00:00:${pad(minutes)}:${pad(seconds)}`
    }
    const pad = (time: number): string => time < 10 ? `0${time}` : `${time}`

    const timerCallback = (): void => {
        if(timerActive){
            tick.current = setInterval(() => setTime((prevTime: number) => --prevTime), 1000)
        }
        else {
            clearInterval(tick.current)
        }
    }

    useEffect(() => {
       timerCallback()

       return () => clearInterval(tick.current)
    }, [timerActive])
    return (
        <SafeAreaView style={[view.screenContainer, styles.container]}>
            <View>
                <Text style={[text.heading, styles.center]}>Name</Text>
                <Text style={styles.center}>Description</Text>
            </View>
            <View>
                <Text style={[styles.center, text.heading]}>{displayTime()}</Text>
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