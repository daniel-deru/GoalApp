import React, { useEffect, useState} from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from "react-native"
import { GoalInterface, updateGoals } from "../store/slices/goalSlice"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp, useIsFocused} from "@react-navigation/native"
import globalStyles from '../globalStyles'
import { GoalScreens, TaskScreens } from "../stacks/stacks"
import { useAppSelector, useAppDispatch } from "../store/hooks"
import {deleteGoal} from "../store/slices/goalSlice"
import { deleteTasks } from "../store/slices/taskSlice"
import { RootState } from "../store/store"
import { Task } from "../store/slices/taskSlice"
import { StatusEnums } from '../utils/properties/status'


interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: {goal: GoalInterface}}, 'params'>
}

const { text, view, buttons, colors} = globalStyles

const GoalView: React.FC<Props> = ({ navigation, route }): JSX.Element => {

    const isFocused = useIsFocused()

    const [completedTasks, setCompletedTasks] = useState<number>(0)

    const goals = useAppSelector((state: RootState) => state.goals)
    const dispatch = useAppDispatch()

    const [goalId, setGoalId] = useState<string>(route.params.goal.id)
    const [goalItem, setGoalItem] = useState<GoalInterface>(goals[goalId])

    const tasks: Task[] = useAppSelector((state: RootState) => {

      return Object.values(state.tasks).filter((task: Task) => {
        return task.goal_id === goalId
      })
    
    })

    const getCompletedTasks = () => {
      if(tasks.length < 1) return

      let num = 0

      tasks.forEach(task => task.status === StatusEnums.COMPLETE ? num++ : null)

      setCompletedTasks(num)
      
      // Set the goal as complete
      if(num === tasks.length){
        setGoalItem(prevGoal => ({...prevGoal, status: StatusEnums.COMPLETE}))
        dispatch(updateGoals({...goalItem, status: StatusEnums.COMPLETE}))
      } else {
        setGoalItem((prevGoal: GoalInterface) => ({...prevGoal, status: StatusEnums.INCOMPLETE}))
        dispatch(updateGoals({...goalItem, status: StatusEnums.INCOMPLETE}))
      }

    }

    const showTasks = (): boolean => {
      navigation.navigate(TaskScreens.TaskList, {goal_id: goalId})
      return true
    }

    const editGoal = (): boolean => navigation.navigate(GoalScreens.Goal, {id: goalId})

    const deleteGoalHandler = () => {
        dispatch(deleteGoal(goalItem))
        dispatch(deleteTasks(goalItem))
        navigation.goBack()
    }
    
    useEffect(() => {
      setGoalItem(goals[goalId])
      getCompletedTasks()
    }, [isFocused])

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.horizontalContainer}>
          <TouchableOpacity 
              style={[buttons.fullWidth(), {flex: 1}]}
              onPress={showTasks}
            >
              <Text style={text.button}>Show Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[buttons.fullWidth(), {flex: 1}]} onPress={editGoal}>
              <Text style={text.button}>Edit Goal</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={view.container}>
              <Text style={text.heading}>Goal Name</Text>
              <Text style={text.item}>{goalItem.name}</Text>
            </View>

            <View style={view.container}>
              <Text style={text.heading}>Status</Text>
              <Text style={text.item}>{goalItem.status}</Text>
            </View>

            <View style={view.container}>
              <Text style={text.heading}>Deadline</Text>
              <Text  style={text.item}>
                {new Date(goalItem.deadline).toDateString()}
              </Text>
            </View>

            <View style={view.container}>
              <Text style={text.heading}>Difficulty</Text>
              <Text style={text.item}>{goalItem.difficulty}</Text>
            </View>

            <View style={view.container}>
              <Text style={text.heading}>Reward</Text>
              <Text style={text.item}>{goalItem.reward}</Text>
            </View>

            <View style={view.container}>
              <Text style={text.heading}>Description</Text>
              <Text style={text.item}>{goalItem.description}</Text>
            </View>

            { tasks.length > 0 &&
              <View style={view.container}>
                <Text style={text.heading}>Tasks</Text>
                <Text style={text.item}>{completedTasks}/{tasks.length} Completed</Text>
              </View> }
              
            <TouchableOpacity 
              style={[buttons.fullWidth(colors.red)]}
              onPress={() => deleteGoalHandler()}
            >
              <Text style={text.button}>Delete Goal</Text>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: "99%"
  },
  horizontalContainer: {
    flexDirection: "row"
  }
})

export default GoalView