import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Goals from '../screens/Goals'

const Stack = createNativeStackNavigator()

const GoalStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='Goals Stack' component={Goals}/>
    </Stack.Navigator>
  )
}

export default GoalStack