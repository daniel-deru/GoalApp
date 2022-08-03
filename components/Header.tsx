import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationScreenProp, NavigationParams, NavigationState  } from "react-navigation"

interface Props {
  title: string,
  navigation: any
  // navigation: NavigationScreenProp<NavigationParams, NavigationState>
  // navigation: NavigationScreenProp<NavigationState>
  showBackButton: boolean,
}

const Header: React.FC<Props> = ({ title, navigation, showBackButton }): JSX.Element => {

  const goBack = (): boolean => navigation.goBack()
  const openDrawer = () => navigation.openDrawer()
  return (
    <View style={styles.header}>
        <View>
          {showBackButton && <Icon name='chevron-left' size={20} onPress={goBack}/>}
        </View>
        <Text>{title}</Text>
        <Icon name='bars' size={30} onPress={openDrawer}/>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 60,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default Header