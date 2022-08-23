import React from 'react'
import {
  Text, 
  View, 
  TouchableWithoutFeedback, 
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native"
import { GoalInterface } from '../store/slices/goalSlice'
import statusses, {StatusItem, StatusInterface} from "../utils/properties/status"
import globalStyles from '../globalStyles'

import { 
    NavigationScreenProp, 
    NavigationState, 
    NavigationParams 
  } from "react-navigation"

interface Props {
    goals: GoalInterface[],
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const List: React.FC<Props> = ({goals, navigation}): JSX.Element => {

  const difficultyStyle = (goal: GoalInterface): StyleProp<ViewStyle> => {
    const status: StatusItem = statusses[goal.status as keyof StatusInterface<StatusItem>]
    return {
        ...styles.difficulty, 
        backgroundColor: status.color
    }
  }

const showScreen = (goal: GoalInterface): void => {
    navigation.navigate("Goal", goal)
}

  return (
        <View>
            {goals.map((goal, index) => (
                <TouchableWithoutFeedback onPress={() => showScreen(goal)} key={index}>
                  <View style={[styles.container]}>
                      <View style={difficultyStyle(goal)}></View>
                      <Text>{goal.name}</Text>
                      <Text>{new Date(goal.deadline).toLocaleDateString()}</Text>
                  </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
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



export default List