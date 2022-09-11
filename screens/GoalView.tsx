import React, { useEffect, useState} from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { GoalInterface } from "../store/slices/goalSlice"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import globalStyles from '../globalStyles'
import { GoalScreens, TaskScreens } from "../stacks/stacks"
import { useAppSelector } from "../store/hooks"

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: {goal: GoalInterface}}, 'params'>
}

const GoalView: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const goals = useAppSelector((state) => state.goals)
    
    const [goalId, setGoalId] = useState<string>(route.params.goal.id)
    const [goalItem, setGoalItem] = useState<GoalInterface>(goals[goalId])

    const showTasks = (): boolean => {
      navigation.navigate(TaskScreens.TaskList, {goal_id: goalId})
      return true
    }

    const editGoal = (): boolean => navigation.navigate(GoalScreens.Goal, {id: goalId})

    useEffect(() => {
      setGoalItem(goals[goalId])
    }, [route.params.goal])

    return (
      <ScrollView style={styles.container}>

          <View style={globalStyles.view.container}>
            <Text style={globalStyles.text.heading}>Goal Name</Text>
            <Text style={globalStyles.text.item}>{goalItem.name}</Text>
          </View>

          <View style={globalStyles.view.container}>
            <Text style={globalStyles.text.heading}>Status</Text>
            <Text style={globalStyles.text.item}>{goalItem.status}</Text>
          </View>

          <View style={globalStyles.view.container}>
            <Text style={globalStyles.text.heading}>Deadline</Text>
            <Text  style={globalStyles.text.item}>
              {new Date(goalItem.deadline).toDateString()}
            </Text>
          </View>

          <View style={globalStyles.view.container}>
            <Text style={globalStyles.text.heading}>Difficulty</Text>
            <Text style={globalStyles.text.item}>{goalItem.difficulty}</Text>
          </View>

          <View style={globalStyles.view.container}>
            <Text style={globalStyles.text.heading}>Reward</Text>
            <Text style={globalStyles.text.item}>{goalItem.reward}</Text>
          </View>

          <View style={globalStyles.view.container}>
            <Text style={globalStyles.text.heading}>Description</Text>
            <Text style={globalStyles.text.item}>{goalItem.description}</Text>
          </View>

          <TouchableOpacity 
            style={[globalStyles.buttons.fullWidth()]}
            onPress={showTasks}
          >
            <Text style={globalStyles.text.button}>Show Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[globalStyles.buttons.fullWidth()]} onPress={editGoal}>
            <Text style={globalStyles.text.button}>Edit Goal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[globalStyles.buttons.fullWidth(globalStyles.colors.overdue)]}>
            <Text style={globalStyles.text.button}>Cancel Goal</Text>
          </TouchableOpacity>

      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})

export default GoalView