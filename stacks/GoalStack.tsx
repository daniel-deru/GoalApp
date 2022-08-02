import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Goals from '../screens/Goals'
import AddGoal from '../screens/AddGoal'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const GoalStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator 
        // screenOptions={{
        //   headerTitle: () => <Header />
        // }}
    >
        <Stack.Screen name='Goals Stack' component={Goals}/>
        <Stack.Screen name='Add Goal' component={AddGoal}/>
    </Stack.Navigator>
  )
}

export default GoalStack