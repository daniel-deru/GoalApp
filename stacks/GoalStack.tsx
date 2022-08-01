import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Goals from '../screens/Goals'
import AddGoal from '../screens/AddGoal'

const Stack = createNativeStackNavigator()

const GoalStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='Goals Stack' component={Goals}/>
        <Stack.Screen name='Add Goal' component={AddGoal}/>
    </Stack.Navigator>
  )
}

export default GoalStack