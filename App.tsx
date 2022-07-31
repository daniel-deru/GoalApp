import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import HomeStack from './stacks/HomeStack';
import GoalStack from './stacks/GoalStack';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
          name='Home' 
          component={HomeStack}
          
        />

        <Drawer.Screen 
          name='Goals'
          component={GoalStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
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
