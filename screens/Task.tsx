import React, { useState, useEffect, useRef} from 'react'
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView } from "react-native"
import { Formik } from "formik"
import { Dropdown } from 'react-native-element-dropdown'
import { difficultyEnum } from "../utils/properties/difficulty"
import globalStyles from "../globalStyles"
import DateModal from "../components/form_parts/DateModal"
import { difficulties, FormDifficulty } from "../utils/forms/difficulty"
import { createDuration, Duration } from "../utils/forms/duration"
import {useAppDispatch, useAppSelector } from "../store/hooks"
import { updateTask, Task as TaskInterface } from "../store/slices/taskSlice"
import { GoalInterface } from "../store/slices/goalSlice"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"
import { TaskEnum } from "../utils/properties/status"
import {NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import NameField from "../components/form_parts/NameField"
import DescriptionField from "../components/form_parts/DescriptionField"
import globalStyle from '../globalStyles'
import {DurationEnum, DurationFormInterface, getDuration} from "../utils/helpers/duration"
import { TaskScreens } from "../stacks/stacks"

interface FormData {
    name: string,
    description: string
}

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: {task: TaskInterface | undefined, goal: string | undefined}}, 'params'>
}

const days: Duration[] = createDuration(6)
const hours: Duration[] = createDuration(23)
const minutes: Duration[] = createDuration(59)

const Task: React.FC<Props> = ({route, navigation}): JSX.Element => {

    const [task, setTask] = useState<TaskInterface | undefined>(route.params.task)
    const [visibility, setVisibility] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [difficulty, setDifficulty] = useState<difficultyEnum>(difficultyEnum.easy)
    const [goal, setGoal] = useState<GoalInterface | undefined | null>()
    const [duration, setDuration] = useState<DurationFormInterface>({
        days: days[0].value,
        hours: hours[1].value,
        minutes: minutes[0].value
    })

    const goals = useAppSelector((state) => state.goals)

    const dispatch = useAppDispatch()
    const initialDate = (): Date => task ? new Date(task.date) : new Date()
    const initialDifficulty = (): difficultyEnum => task ? task.difficulty : difficultyEnum.easy
    const initialDuration = (): DurationFormInterface => task ? getDuration(task.duration) : duration
    const initialGoal = () => {
        let goal = null

        const currentGoal = Object.values(goals).filter((goal: GoalInterface) => {
            return task ? task.goal_id === goal.id : goal.id === route.params.goal
        })
        
        if(currentGoal.length > 0) goal = currentGoal[0]

        return goal
    }
    
    const getSeconds = (duration: DurationFormInterface): number => {

        const secondsInDay = 60 * 60 * 24 * duration.days
        const secondsInHour = 60 * 60 * duration.hours
        const secondsInMinute = 60 * duration.minutes

        return secondsInDay + secondsInHour + secondsInMinute
    }

    const submit = (values: FormData) => {
        const seconds: number = getSeconds(duration)
        const { name, description } = values
        const submitTask: TaskInterface = {
            id: task?.id || uuidv4(),
            name,
            difficulty,                
            description,
            duration: seconds,
            time_left: task?.time_left || seconds,
            goal_id: goal?.id || "",
            date: date.getTime(),
            status: TaskEnum.INCOMPLETE,
        }

        dispatch(updateTask(submitTask))
        if(!task){
            navigation.goBack()
        }
        else {
            navigation.navigate(TaskScreens.View, {task: submitTask})
        }

    }

    const changeDuration = (type: DurationEnum, value: number) => {
        const { days, hours, minutes} = DurationEnum
        let key = ""

        if(type === days) key = days
        if(type === hours) key = hours
        if(type === minutes) key = minutes

        setDuration(prevDuration => ({...prevDuration, [key]: value}))
    }

    const createInitialValues = () => {
       return { 
            name: task?.name || "", 
            description: task?.description || ""
        }
    }

    useEffect(() => {
        setDate(initialDate())
        setDuration(initialDuration())
        setDifficulty(initialDifficulty())
        setGoal(initialGoal())
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <DateModal 
                    visibility={visibility}
                    setVisibility={setVisibility}
                    date={date}
                    setDate={setDate}
                />
                <Formik
                    initialValues={createInitialValues()}
                    onSubmit={submit}
                >
                    {({handleChange, handleSubmit, values}) => (
                        <View>
                            <NameField value={values.name} handleChange={handleChange}/>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeader}>Date</Text>
                                <View>
                                    <Text>{date.toDateString()}</Text>
                                    <TouchableOpacity style={globalStyles.buttons.fullWidth()} onPress={() => setVisibility(true)}>
                                        <Text style={globalStyles.text.button}>Set Date</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeader}>Duration</Text>
                                <View style={styles.durationContainer}>
                                    <View style={styles.durationItem}>
                                        <Text>Days</Text>
                                        <Dropdown 
                                            data={days}
                                            onChange={(item: Duration) => changeDuration(DurationEnum.days, item.value)}
                                            labelField="label"
                                            valueField='value'
                                            style={globalStyle.inputs.textInput}
                                            placeholder="Days"
                                            value={duration.days}
                                        />
                                    </View>
                                    <View style={styles.durationItem}>
                                        <Text>Hours</Text>
                                        <Dropdown 
                                            data={hours}
                                            onChange={(item: Duration) => changeDuration(DurationEnum.hours, item.value)}
                                            labelField="label"
                                            valueField='value'
                                            style={globalStyle.inputs.textInput}
                                            placeholder="Hours"
                                            value={duration.hours}
                                        />
                                    </View>
                                    <View style={styles.durationItem}>
                                        <Text>Minutes</Text>
                                        <Dropdown 
                                            data={minutes}
                                            onChange={(item: Duration) => changeDuration(DurationEnum.minutes, item.value)}
                                            labelField="label"
                                            valueField='value'
                                            style={globalStyle.inputs.textInput}
                                            placeholder="Minutes"
                                            value={duration.minutes}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeader}>Difficulty</Text>
                                <Dropdown 
                                    data={difficulties}
                                    onChange={(item: FormDifficulty) => setDifficulty(item.value)}
                                    labelField="label"
                                    valueField='value'
                                    style={globalStyle.inputs.textInput}
                                    placeholder="Select Difficulty"
                                    value={difficulty}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeader}>Goal</Text>
                                <Dropdown 
                                    data={Object.values(goals)}
                                    onChange={(item: GoalInterface) => setGoal(item)}
                                    labelField="name"
                                    valueField='id'
                                    style={globalStyle.inputs.textInput}
                                    placeholder="Select Goal"
                                    value={goal ? goal.id : null}
                                />
                            </View>
                            <DescriptionField value={values.description} handleChange={handleChange}/>
                            <View>
                                <TouchableOpacity style={[globalStyles.buttons.fullWidth(), {marginBottom: 20}]} onPress={(e: any) => handleSubmit(e)}>
                                    <Text style={globalStyles.text.button}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: "100%",
        marginBottom: 30
    },
    fieldContainer: {
        marginTop: 10
    },
    fieldHeader: {
        fontSize: 20,
        marginBottom: 5
    },
    durationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    durationItem: {
        width: "30%",
        margin: 5
    },
    textInput: {
        backgroundColor:  globalStyle.colors.mainFaded,
        fontSize: 16,
        padding: 10,
        borderRadius: 7
    }

})

export default Task