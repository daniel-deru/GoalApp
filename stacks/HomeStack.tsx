import React from 'react'
import { Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from '../screens/Home'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const HomeStack: React.FC = (): JSX.Element => {

  const headerTitle = (title: string, navigation: any, backButton: boolean = false): JSX.Element =>{
    return <Header 
              title={title} 
              showBackButton={backButton} 
              navigation={navigation}
            />
  }
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({navigation}) => headerTitle("Home", navigation, false)
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