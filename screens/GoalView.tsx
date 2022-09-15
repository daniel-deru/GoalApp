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

const { text, view, buttons, colors} = globalStyles

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

          <TouchableOpacity 
            style={[buttons.fullWidth()]}
            onPress={showTasks}
          >
            <Text style={text.button}>Show Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[buttons.fullWidth()]} onPress={editGoal}>
            <Text style={text.button}>Edit Goal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[buttons.fullWidth(colors.red)]}>
            <Text style={text.button}>Cancel Goal</Text>
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