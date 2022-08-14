import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import { GoalInterface } from "../store/slices/goalSlice"

interface Props {
    goal: GoalInterface
}

const Goal: React.FC<Props> = ({ goal }): JSX.Element => {
  return (
    <View>
        <Text>Hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Goal