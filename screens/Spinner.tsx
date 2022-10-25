import React, { useEffect } from 'react'
import {Text, SafeAreaView, Image, StyleSheet, Easing, Animated} from "react-native"
import globalStyle from '../globalStyles'

const {colors} = globalStyle
let count = 0

const Spinner: React.FC = (): JSX.Element => {
  const rotateValue = new Animated.Value(0)

  const rotateHandler = () => {
    rotateValue.setValue(0)
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.bounce
    }).start(() => {
      // console.log("spinner working: " + count)
      count++
      rotateHandler()
    })
  }

  const rotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  })

  useEffect(() => {
    rotateHandler()

    return () => {
     return Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.bounce}).stop()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image 
        source={require("../assets/spinner.png")}
        style={{transform: [{"rotate": rotateData}]}}
        />
      <Text style={styles.text}>Loading</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column"
  },
  text: {
    color: colors.blue,
    fontSize: 40,
    paddingTop: 40
  }
})

export default Spinner