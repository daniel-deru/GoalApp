import axios from 'axios'
import React, {useEffect, useState, useCallback} from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native"
import { useAppDispatch } from '../store/hooks'
import { fetchGoals } from '../store/slices/goalSlice'
import { fetchTasks } from '../store/slices/taskSlice'
import globalStyle from '../globalStyles'
import Model from '../database/db'

const quoteAPI: string = "https://zenquotes.io/api/quotes"
const { colors } = globalStyle 

interface Quote {
  author: string,
  quote: string
}


const Home: React.FC = (): JSX.Element => {
  const [quote, setQuote] = useState<Quote>({
    author: "The Author",
    quote: "This is a super insightful quote that will change your life"
  })

  const getQuote = async () => {
    const { random, floor } = Math
    const requestQuote = await axios(quoteAPI)
    const quotes = requestQuote.data
    const randomQuoteIndex = floor(random() * quotes.length)
    const randomQuote = quotes[randomQuoteIndex]

    setQuote({author: randomQuote.a, quote: randomQuote.q})
  }

  const dispatch = useAppDispatch()

  const setDataCallback = async () => {
    const model = new Model()

    const tasks = await model.read("tasks")
    const goals = await model.read("goals")
    
    const tasksJSON = tasks._array[0].tasks
    const goalsJSON = goals._array[0].goals
   
    dispatch(fetchTasks(JSON.parse(JSON.parse(tasksJSON))))
    dispatch(fetchGoals(JSON.parse(JSON.parse(goalsJSON))))
    

  }

  const setData = useCallback(setDataCallback, [])

  useEffect(() => {
    getQuote()
    setData()
  }, [setData])
  return (
    <SafeAreaView style={styles.container}>
        <View >
            <Text style={[styles.text]}>Quote of the day</Text>
            <Text style={[styles.text, styles.header]}>{quote.quote}</Text>
            <Text style={[styles.text, styles.author]}>{quote.author}</Text>
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
      padding: 15
    },
    text: {
      color: colors.blue,
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