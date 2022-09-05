import React, { useEffect, useState } from 'react'
import { 
  SafeAreaView,
  View,
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native"

import { 
  NavigationScreenProp, 
  NavigationState, 
  NavigationParams 
} from "react-navigation"

import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../globalStyles'
import { useAppSelector } from "../store/hooks"

import List from "../components/List"

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams> 
}

const Goals: React.FC<Props> = ({ navigation }) => {

  const goals = useAppSelector(state => state.goals)

  return (
    <SafeAreaView style={styles.container}>
        {goals.length <= 0 && <Text style={styles.text} >Start Adding Goals</Text>}
        {goals.length > 0 && <List goals={goals} navigation={navigation}/>}
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Add Goal")}>
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