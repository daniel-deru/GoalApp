import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../globalStyles'
import { useAppSelector } from "../store/hooks"
import { GoalScreens } from "../stacks/stacks"

import GoalList from "../components/GoalList"
import { GoalInterface } from '../store/slices/goalSlice'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams> 
}

const Goals: React.FC<Props> = ({ navigation }) => {
  const goals = useAppSelector(state => state.goals)

  const [goalList, setGoalList] = useState<GoalInterface[]>(Object.values(goals))
  console.log("This is the goal list in Goals", Object.values(goals))

  useEffect(() => {
    // This is for when the user finished adding a goal and returns to the goal
    setGoalList(Object.values(goals))
  }, [goals])
  return (
    <SafeAreaView style={styles.container}>
        {goalList.length <= 0 && <Text style={styles.text} >Start Adding Goals</Text>}
        {goalList.length > 0 && <GoalList navigation={navigation}/>}
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(GoalScreens.Goal)}>
            <Icon style={{textAlign: "center"}} name="plus" size={30} color="white"/>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  text: {
    color: globalStyles.colors.main,
    fontSize: 30,
    textAlign: "center",
    paddingTop: 20
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: globalStyles.colors.main,
    padding: 10,
    borderRadius: 100,
    width: 50,
    height: 50
  }
})

export default Goals