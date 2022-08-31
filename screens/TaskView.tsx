import React, { useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity} from 'react-native'
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import {RouteProp} from "@react-navigation/native"
import {Task} from "../store/slices/taskSlice"

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: Task}, 'params'>
}

const TaskView: React.FC<Props> = ({ navigation, route }) => {
    const [task, setTask] = useState<Task>(route.params)

    return (
        <ScrollView>
            <View>
                <Text>Name</Text>
                <Text>{task.name}</Text>
            </View>
            <View>
                <Text>Date</Text>
                <Text>{task.date}</Text>
            </View>
            <View>
                <Text>Duration</Text>
                <Text>{task.duration}</Text>
            </View>
            <View>
                <Text>Status</Text>
                <Text>{task.status}</Text>
            </View>
            <View>
                <Text>Difficulty</Text>
                <Text>{task.difficulty}</Text>
            </View>
            <View>
                <Text>Description</Text>
                <Text>{task.description}</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Start Task</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Edit Task</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Delete Task</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default TaskView