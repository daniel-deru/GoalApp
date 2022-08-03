import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import HomeStack from './stacks/HomeStack';
import GoalStack from './stacks/GoalStack';
import Header from './components/Header';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          // header: ({navigation}) => <Header title='Home' navigation={navigation} showBackButton={false}/>

        }}
        // screenOptions={({ navigation }) => ({
        //   headerTitle: (
        //     <Header />
        //   ),
        // })}
      >
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
