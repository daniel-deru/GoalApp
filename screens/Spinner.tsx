import React from 'react'
import {Text, SafeAreaView, View} from "react-native"

const Spinner: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View></View>
      <Text>Loading</Text>
    </SafeAreaView>
  )
}

export default Spinner