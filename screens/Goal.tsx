import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import { GoalInterface } from "../store/slices/goalSlice"
import { 
  NavigationScreenProp, 
  NavigationState, 
  NavigationParams
} from "react-navigation"

import {RouteProp} from "@react-navigation/native"

interface Props {
    goal: GoalInterface,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: GoalInterface}, 'params'>
}

const Goal: React.FC<Props> = ({ goal, navigation, route }): JSX.Element => {
  console.log(route.params)
  return (
    <View>
        <Text>Hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Goal