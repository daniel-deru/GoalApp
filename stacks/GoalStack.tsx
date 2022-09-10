import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {TaskScreens, GoalScreens} from "./stacks"

import Goals from '../screens/Goals'
import Goal from '../screens/Goal'
import GoalScreen from '../screens/GoalView'
import Tasks from '../screens/Tasks'
import Task from '../screens/Task'
import TaskView from '../screens/TaskView'
import Timer from '../screens/Timer'

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
          name={GoalScreens.Goals}
          component={Goals}
        />
        <Stack.Screen 
          name={GoalScreens.Goal}
          component={Goal} 
          options={{
            header: ({navigation}) => headerTitle("Add Goal", navigation, true)
          }}
        />

        <Stack.Screen 
          name={GoalScreens.View}
          component={GoalScreen}
          options={{
            header: ({navigation}) => headerTitle("Goal",navigation, true)
          }}
        />

        <Stack.Screen 
          name={TaskScreens.TaskList}
          component={Tasks}
          options={{
            header: ({navigation}) => headerTitle("Tasks", navigation, true)
          }}
        
        />

        <Stack.Screen
          name={TaskScreens.Task}
          component={Task}
          options={{
            header: ({navigation}) => headerTitle("Task", navigation, true)
          }}
        />

        <Stack.Screen
          name={TaskScreens.View}
          component={TaskView}
          options={{
            header: ({navigation}) => headerTitle("View Task", navigation, true)
          }}
        />

        <Stack.Screen 
          name={TaskScreens.Timer}
          component={Timer}
          options={{
            header: ({navigation}) => headerTitle("Task Timer", navigation, true)
          }}
        />
    </Stack.Navigator>
  )
}

export default GoalStack