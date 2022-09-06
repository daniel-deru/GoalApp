import React, { useEffect, useState } from 'react'
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

    const displayTime = () => {
        const duration: DurationFormInterface = getDuration(time)
        console.log(duration.days)
    }

    useEffect(() => {
        setInterval(() => {
            console.log(time)
            setTime((prevTime: number) => prevTime--)
        }, 1000)
    }, [])
    return (
        <SafeAreaView style={[view.screenContainer, styles.container]}>
            <View>
                <Text style={[text.heading, styles.center]}>Name</Text>
                <Text style={styles.center}>Description</Text>
            </View>
            <View>
                <Text style={[styles.center, text.heading]}>{time}</Text>
            </View>
            <View>
                <TouchableOpacity style={buttons.fullWidth(colors.active)}>
                    <Text style={text.button}>{"Start"} Timer</Text>
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