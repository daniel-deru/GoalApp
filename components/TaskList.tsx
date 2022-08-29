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
import statusses, {StatusItem, StatusInterface, taskStatusses} from "../utils/properties/status"
import globalStyles from '../globalStyles'

import { 
    NavigationScreenProp, 
    NavigationState, 
    NavigationParams 
  } from "react-navigation"
import { Task } from "../store/slices/taskSlice"

interface Props {
    tasks: Task[],
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const TaskList: React.FC<Props> = ({tasks, navigation}): JSX.Element => {

  const difficultyStyle = (task: Task): StyleProp<ViewStyle> => {
    const status: StatusItem = taskStatusses[task.status as keyof StatusInterface<StatusItem>]
    return {
        ...styles.difficulty, 
        backgroundColor: status.color
    }
  }

const showScreen = (task: Task): void => {
    // navigation.navigate("Goal", goal)
}

  return (
        <View>
            {tasks.map((task, index) => (
                <TouchableWithoutFeedback onPress={() => showScreen(task)} key={index}>
                  <View style={[styles.container]}>
                      <View style={difficultyStyle(task)}></View>
                      <Text>{task.name}</Text>
                      <Text>{new Date(task.date).toLocaleDateString()}</Text>
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

export default TaskList