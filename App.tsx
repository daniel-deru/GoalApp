import React, { useEffect } from "react"
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import Model from "./database/db"

import HomeStack from './stacks/HomeStack'
import GoalStack from './stacks/GoalStack'
import TaskStack from "./stacks/TaskStack"

import store from "./store/store"
import { Provider } from "react-redux"

const Drawer = createDrawerNavigator()

const model = new Model()
model.createTables()
model.createInitialData("goals")
model.createInitialData("tasks")

export default function App() {

  return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
