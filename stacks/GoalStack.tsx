import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Goals from '../screens/Goals'
import AddGoal from '../screens/AddGoal'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const GoalStack: React.FC = (): JSX.Element => {

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
        header: ({navigation}) => headerTitle("Goals", navigation),
      }}
    >
        <Stack.Screen 
          name='Goals Stack' 
          component={Goals}
        />
        <Stack.Screen 
          name='Add Goal' 
          component={AddGoal} 
          options={{
            header: ({navigation}) => headerTitle("Add Goal", navigation, true)
          }}
        />
    </Stack.Navigator>
  )
}

export default GoalStack