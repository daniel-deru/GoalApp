import React, { useState, useEffect } from 'react'
import { 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  ScrollView
} from "react-native"
import { GoalInterface, updateGoals } from '../store/slices/goalSlice'
import statusses, {StatusItem, StatusInterface, StatusEnums} from "../utils/properties/status"
import globalStyles from '../globalStyles'
import { GoalScreens } from "../stacks/stacks"
import { NavigationScreenProp, NavigationState, NavigationParams} from "react-navigation"
import { useAppDispatch } from '../store/hooks'

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    goals: Array<GoalInterface>
}

const { colors } = globalStyles

const GoalList: React.FC<Props> = ({ navigation, goals }): JSX.Element => {

  const dispatch = useAppDispatch()

  const difficultyStyle = (goal: GoalInterface): StyleProp<ViewStyle> => {

    const currentDate = new Date().getTime()
    const goalDate = new Date(goal.deadline).getTime()

    if(currentDate > goalDate && goal.status !== StatusEnums.COMPLETE) {
      goal = {...goal, status: StatusEnums.OVERDUE }
      // dispatch(updateGoals(goal))
    }
    const status: StatusItem = statusses[goal.status as keyof StatusInterface<StatusItem>]

    return {
        ...styles.difficulty, 
        backgroundColor: "#512fff"
    }
  }

  const showScreen = (goal: GoalInterface): void => {
      navigation.navigate<{goal: GoalInterface}>(GoalScreens.View, {goal})
  }

  return (
        <ScrollView>
            {goals.map((goal, index) => (
                <TouchableWithoutFeedback onPress={() => showScreen(goal)} key={index}>
                  <View style={[styles.container]}>
                      <View style={difficultyStyle(goal)}></View>
                      <Text>{goal.name}</Text>
                      <Text>{new Date(goal.deadline).toLocaleDateString()}</Text>
                  </View>
                </TouchableWithoutFeedback>
            ))}
        </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: colors.blue,
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



export default GoalList