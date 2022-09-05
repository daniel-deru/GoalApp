import React, { useEffect, useState} from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { GoalInterface } from "../store/slices/goalSlice"
import { 
  NavigationScreenProp, 
  NavigationState, 
  NavigationParams
} from "react-navigation"

import {RouteProp} from "@react-navigation/native"
import globalStyles from '../globalStyles'

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: GoalInterface}, 'params'>
}

const Goal: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const [goalItem, setGoalItem] = useState<GoalInterface>(route.params)

    const showTasks = (): boolean => {
      navigation.navigate("Tasks", {goal_id: goalItem.id})
      return true
    }

    const editGoal = (): boolean => navigation.navigate("Add Goal", goalItem)

    useEffect(() => {
      setGoalItem(route.params)
    }, [route.params])

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

export default Goal