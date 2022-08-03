import React from 'react'
import { Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from '../screens/Home'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const HomeStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        header: ({navigation}) => <Header title='Home' navigation={navigation} showBackButton={false}/>
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