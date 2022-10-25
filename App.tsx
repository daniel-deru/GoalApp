import React, { useEffect, useCallback, useState } from "react"
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useAppDispatch } from "./store/hooks"
import { fetchGoals } from "./store/slices/goalSlice"
import { fetchTasks } from "./store/slices/taskSlice"

import Model from "./database/db"

import HomeStack from './stacks/HomeStack'
import GoalStack from './stacks/GoalStack'
import TaskStack from "./stacks/TaskStack"

import store from "./store/store"
import { Provider } from "react-redux"

const Drawer = createDrawerNavigator()

const model = new Model()
// https://expo.dev/accounts/danieljacobusderu/projects/GoalKeep/builds/1243a219-36bf-4e8f-99ec-a3bd635f56e0

export default function App() {
  const [hasInitialData, setHasInitialData] = useState<boolean>(false)

  const initialStateCallback = async () => {
    const tables_created = await model.createTables()
    const goals_created = await model.createInitialData("goals")
    const tasks_created = await model.createInitialData("tasks")
    console.log(tables_created, goals_created, tasks_created)

    if(tables_created && goals_created.success && tasks_created.success){
      setHasInitialData(true)
    }
  }

  const initialState = useCallback(initialStateCallback, [])

  useEffect(() => {
    initialState()
  }, [initialState])

  if(!hasInitialData)  return <></>
  else return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerPosition: "right"
          }}
        >
          <Drawer.Screen name='Home' component={HomeStack} />
          <Drawer.Screen name='Goals' component={GoalStack} />
          <Drawer.Screen name="Tasks" component={TaskStack}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}