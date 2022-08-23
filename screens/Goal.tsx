import React, { useEffect, useState} from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { GoalInterface } from "../store/slices/goalSlice"
import  Icon  from 'react-native-vector-icons/AntDesign'
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
      console.log("Up, up away")
      navigation.navigate("Tasks", {goal_id: goalItem.id})
      return true
    }

    useEffect(() => {
      setGoalItem(route.params)
    }, [route.params])

    return (
      <ScrollView style={styles.container}>
          <View>
              <TouchableOpacity onPress={() => navigation.navigate("Add Goal", goalItem)}>
                <Icon
                  name='edit'
                  size={35}
                  style={styles.icon}
                />
              </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Goal Name</Text>
            <Text>{goalItem.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Status</Text>
            <Text>{goalItem.status}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Deadline</Text>
            <Text>
              {new Date(goalItem.deadline).toDateString()}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Difficulty</Text>
            <Text>{goalItem.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Reward</Text>
            <Text>{goalItem.reward}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Description</Text>
            <Text>{goalItem.description}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.touchable, styles.showTasksButton, styles.item]}
            onPress={showTasks}
          >
            <Text style={styles.buttonText}>Show Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchable, styles.cancelTaskButton,  styles.item]}>
            <Text style={styles.buttonText}>Cancel Goal</Text>
          </TouchableOpacity>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  icon: {
    color: globalStyles.colors.main,
    textAlign: 'right'
  },
  heading: {
    fontSize: 20,
    fontWeight: "500"
  },
  item: {
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  touchable: {
    padding: 15,
    borderRadius: 5
  },
  showTasksButton: {
    backgroundColor: globalStyles.colors.main,
  },
  cancelTaskButton: {
    backgroundColor: globalStyles.colors.overdue
  }
})

export default Goal