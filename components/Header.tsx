import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { CompositeNavigationProp } from "@react-navigation/core"
import globalStyle from '../globalStyles'

type StackParamList = {
  Goals: undefined,
  AddGoal: undefined
}

type DrawerParamList = {
  HomeStack: undefined,
  GoalStack: undefined
}

type NavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>, 
  NativeStackNavigationProp<StackParamList>
  >
  
interface Props {
  title: string,
  navigation: NavigationProps,
  showBackButton: boolean,
}

const Header: React.FC<Props> = ({ 
  title, 
  navigation, 
  showBackButton 
}): JSX.Element => {

  const goBack = (): void => navigation.goBack()
  const openDrawer = (): void => navigation.openDrawer()

  return (
    <View style={styles.header}>
        <View>
          {
          showBackButton && 
          <Icon 
            name='chevron-left' 
            size={20} 
            onPress={goBack} 
            color="white"
            style={styles.text}
          />}
        </View>
        <Text style={styles.text}>{title}</Text>
        <Icon 
          name='bars' 
          size={30} 
          onPress={openDrawer} 
          color="white"
          style={styles.text}
        />

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // height: 120,
    alignItems: "center",
    backgroundColor: globalStyle.colors.main,
    color: "white",
    paddingTop: 60,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: "white",
    fontSize: 25,
    padding: 10
  }
})

export default Header