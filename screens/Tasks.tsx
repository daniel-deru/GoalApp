import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import Icon from 'react-native-vector-icons/FontAwesome'
import {type RootState} from "../store/store"
import { Task } from "../store/slices/taskSlice"
import globalStyles from "../globalStyles"
import TaskList from "../components/TaskList"
import { TaskScreens } from "../stacks/stacks"

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  route: RouteProp<{params: {goal_id: string | null}}, 'params'>
}

const Tasks: React.FC<Props> = ({navigation, route}): JSX.Element => {

  const [goalId, setGoalId] = useState<string | null>(route.params?.goal_id)
  const [tasks, setTasks] = useState<Task[]>([])

  const allTasks: Task[] = useAppSelector((state: RootState): Array<Task> => state.tasks)
  const getCurrentGoalTasks = (): void => {
    const currentTasks: Task[] = allTasks.filter((task: Task) => {
      return goalId ? goalId === task.goal_id : true
    })
    setTasks(currentTasks)
  }

  useEffect(() => {
    getCurrentGoalTasks()
  }, [goalId, allTasks])
  return (
    <SafeAreaView style={styles.container}>
        {tasks.length < 1 && <Text style={styles.fillerText}>Start Adding Tasks</Text>}
        {tasks.length >= 1 && <TaskList tasks={tasks} navigation={navigation} goal={goalId}/>}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate(TaskScreens.Task, {goal: goalId})}
        > 
          <Icon 
            style={{textAlign: "center"}} 
            name="plus" 
            size={30} 
            color="white"
          />
        </TouchableOpacity>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  fillerText: {
    color: globalStyles.colors.main,
    fontSize: 30,
    textAlign: "center",
    marginTop: 20
  },
  addButton: {
    backgroundColor: globalStyles.colors.main,
    width: 50,
    height: 50,
    borderRadius: 200,
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20
  }
})

export default Tasks