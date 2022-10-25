import axios from 'axios'
import React, {useEffect, useState, useCallback} from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native"
import { useAppDispatch } from '../store/hooks'
import { fetchGoals } from '../store/slices/goalSlice'
import { fetchTasks } from '../store/slices/taskSlice'
import globalStyle from '../globalStyles'
import Model from '../database/db'

import Spinner from './Spinner'

const quoteAPI: string = "https://zenquotes.io/api/quotes"
const { colors } = globalStyle 

interface Quote {
  author: string,
  quote: string
}


const Home: React.FC = (): JSX.Element => {
  const [quote, setQuote] = useState<Quote | undefined>()

  const getQuote = async () => {
    const { random, floor } = Math
    const requestQuote = await axios(quoteAPI)
    const quotes = requestQuote.data
    const randomQuoteIndex = floor(random() * quotes.length)
    const randomQuote = quotes[randomQuoteIndex]
    
    return randomQuote
  }

  const dispatch = useAppDispatch()

  const getData = async () => {
    const model = new Model()

    const tasks = await model.read("tasks")
    const goals = await model.read("goals")

    const tasksJSON = tasks._array[0].tasks
    const goalsJSON = goals._array[0].goals
   
    dispatch(fetchTasks(JSON.parse(tasksJSON)))
    dispatch(fetchGoals(JSON.parse(goalsJSON)))
    
    return true
  }

  const finishedAsyncQueryCallback = async () => {
    const result = await getData()
    const quote = await getQuote()

    if(result && quote?.a) setQuote({author: quote.a, quote: quote.q})
  }

  const finishedAsyncQuery = useCallback(finishedAsyncQueryCallback, [])

  useEffect(() => {
    finishedAsyncQuery()
  }, [finishedAsyncQuery])
  
  if(!quote?.author) return <Spinner />
  return (
    <SafeAreaView style={styles.container}>
        <View >
            <Text style={[styles.text]}>Quote of the day</Text>
            <Text style={[styles.text, styles.header]}>{quote?.quote}</Text>
            <Text style={[styles.text, styles.author]}>{quote?.author}</Text>
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