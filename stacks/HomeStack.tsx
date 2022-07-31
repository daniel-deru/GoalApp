import React from 'react'
import { Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from '../screens/Home'

const Stack = createNativeStackNavigator()

const HomeStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen
            name='Home Stack'
            component={Home}
        />
    </Stack.Navigator>
  )
}

export default HomeStack