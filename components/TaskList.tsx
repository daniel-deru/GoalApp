import React, { useState, useEffect } from 'react'
import {Text, View, TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle } from "react-native"
import statusses, {StatusItem, StatusInterface, taskStatusses} from "../utils/properties/status"
import globalStyles from '../globalStyles'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { Task } from "../store/slices/taskSlice"
import { RouteProp } from "@react-navigation/native"
import { TaskScreens } from "../stacks/stacks"

interface Props {
    tasks: Task[],
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    goal: string | null
}

const TaskList: React.FC<Props> = ({tasks, navigation, goal}): JSX.Element => {

  const [currentTasks, setCurrentTasks] = useState<Array<Task>>(tasks)

  const difficultyStyle = (task: Task): StyleProp<ViewStyle> => {
    const status: StatusItem = taskStatusses[task.status as keyof StatusInterface<StatusItem>]
    return {
        ...styles.difficulty, 
        backgroundColor: status.color
    }
  }

  const showScreen = (task: Task): void => {
      navigation.navigate(TaskScreens.View, {task})
  }

  const filterTasks = (): void => {
    if(!goal) return setCurrentTasks(tasks)
    const filteredTasks = tasks.filter((task: Task) => task.goal_id === goal)
    setCurrentTasks(filteredTasks)
  }
  
  useEffect(() => {
    filterTasks()
  }, [goal, tasks])

  return (
        <View>
            {currentTasks.map((task, index) => (
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