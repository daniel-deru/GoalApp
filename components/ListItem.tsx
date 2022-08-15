import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { GoalInterface } from '../store/slices/goalSlice'
import globalStyles from "../globalStyles"
import statusses, { StatusItem, StatusInterface } from "../utils/properties/status"

import { 
    NavigationScreenProp, 
    NavigationState, 
    NavigationParams 
  } from "react-navigation"

interface Props {
    goal: GoalInterface,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const ListItem: React.FC<Props> = ({ goal, navigation }): JSX.Element => {

    const difficultyStyle = () => {
        const status: StatusItem = statusses[goal.status as keyof StatusInterface<StatusItem>]
        return {
            ...styles.difficulty, 
            backgroundColor: status.color
        }
    }

    const showScreen = () => {
        navigation.navigate("Goal Stack")
    }
    return (
        <TouchableWithoutFeedback onPress={showScreen}>
                  <View style={[styles.container]}>
                      <View style={difficultyStyle()}></View>
                      <Text>{goal.name}</Text>
                      <Text>{new Date(goal.deadline).toLocaleDateString()}</Text>
                  </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: globalStyles.colors.main,
        borderRadius: 10,
        padding: 15,
        paddingVertical: 20,
        margin: 10,
        alignItems: "center",
        alignSelf: "center"
        
    },
    difficulty: {
        borderRadius: 100,
        width: 20,
        height: 20
    }
})

export default ListItem