import React from 'react'
import { View, ScrollView, Text, TouchableOpacity} from 'react-native'

const TaskView = () => {
  return (
    <ScrollView>
        <View>
            <Text>Name</Text>
            <Text>Data</Text>
        </View>
        <View>
            <Text>Date</Text>
            <Text>Data</Text>
        </View>
        <View>
            <Text>Duration</Text>
            <Text>Data</Text>
        </View>
        <View>
            <Text>Status</Text>
            <Text>Data</Text>
        </View>
        <View>
            <Text>Difficulty</Text>
            <Text>Data</Text>
        </View>
        <View>
            <Text>Description</Text>
            <Text>Data</Text>
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