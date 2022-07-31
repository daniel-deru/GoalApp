import React from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native"

import globalStyle from '../globalStyles'

const Home: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
        <View >
            <Text style={[styles.text, styles.header]}>Quote of the day</Text>
            <Text style={styles.text}>This is a super insightful quote that will change your life</Text>
            <Text style={[styles.text, styles.author]}>The Author</Text>
        </View>
        <View>
            <Image source={require("../assets/home.png")}/>
        </View>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
    container: {
      justifyContent: "space-evenly",
      height: "100%",
      alignItems: "center",
      color: globalStyle.colors.main
    },
    text: {
      color: globalStyle.colors.main,
      textAlign: "center"
    },
    header: {
      fontSize: 25,
      fontWeight: "bold",
      margin: 20
    },
    author: {
      fontStyle: "italic",
      fontWeight: "500",
      margin: 10
    }
})

export default Home