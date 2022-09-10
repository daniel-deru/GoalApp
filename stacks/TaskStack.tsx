import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import  { TaskScreens} from "./stacks"

import Tasks from '../screens/Tasks'
import Task from '../screens/Task'
import TaskView from '../screens/TaskView'
import Header from '../components/Header'
import Timer from '../screens/Timer'

const {Task: TaskScreen, View, Timer: TaskTimer, TaskList } = TaskScreens

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
            name={TaskList}
            component={Tasks}
        />
        <Stack.Screen 
            name={TaskScreen}
            component={Task}
            options={{
                header: ({navigation}) => headerTitle("Task", navigation, true)
            }}
        />
        <Stack.Screen 
          name={View}
          component={TaskView}
          options={{
            header: ({navigation}) => headerTitle("View Task", navigation, true)
          }}
        />

        <Stack.Screen 
          name={TaskTimer}
          component={Timer}
          options={{
            header: ({navigation}) => headerTitle("Task Timer", navigation, true)
          }}
        />
    </Stack.Navigator>
  )
}

export default TaskStack