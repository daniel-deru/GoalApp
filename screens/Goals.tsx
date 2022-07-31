import React from 'react'
import { SafeAreaView, Text, TouchableHighlight, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../globalStyles'

const Goals: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text} >Start Adding Goals</Text>
        <TouchableHighlight style={styles.button}>
            <Icon style={{textAlign: "center"}} name="plus" size={30} color="white"/>
        </TouchableHighlight>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  text: {
    color: globalStyles.colors.main,
    fontSize: 30,
    textAlign: "center",
    paddingTop: 20
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: globalStyles.colors.main,
    padding: 10,
    borderRadius: 100,
    width: 50,
    height: 50
  }
})

export default Goals