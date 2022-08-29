import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Tasks from '../screens/Tasks'
import Task from '../screens/Task'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const TaskStack: React.FC = (): JSX.Element => {

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
        header: ({navigation}) => headerTitle("Tasks", navigation, false)
      }}
    >
        <Stack.Screen
            name='Tasks'
            component={Tasks}
        />
        <Stack.Screen 
            name="Task"
            component={Task}
            options={{
                header: ({navigation}) => headerTitle("Task", navigation, true)
            }}
        />
    </Stack.Navigator>
  )
}

export default TaskStack