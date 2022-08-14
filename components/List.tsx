import React from 'react'
import {Text, FlatList, View} from "react-native"
import { GoalInterface } from '../store/slices/goalSlice'
import ListItem from "./ListItem"

import { 
    NavigationScreenProp, 
    NavigationState, 
    NavigationParams 
  } from "react-navigation"

interface Props {
    goals: GoalInterface[],
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const List: React.FC<Props> = ({goals, navigation}): JSX.Element => {

  return (
        <View>
            {goals.map(goal => (
                <ListItem goal={goal} navigation={navigation}/>
            ))}
        </View>
  )
}



export default List