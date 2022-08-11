import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, TextInput, SafeAreaView, View, ScrollView } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import { Dropdown } from "react-native-element-dropdown"
import { Formik } from "formik"
import { NavigationScreenProp, NavigationParams, NavigationState  } from "react-navigation"

import globalStyles from "../globalStyles"

interface Props {
    navigation: NavigationScreenProp<NavigationParams, NavigationState> 
  }

const AddGoal: React.FC<Props> = ({ navigation }): JSX.Element => {

  return (
    <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <Formik
                initialValues={{
                    name: "",
                    day: "",
                    month: "",
                    year: "",
                    difficulty: "",
                    reward: "",
                    description: ""
                }}
                onSubmit={values => console.log(values)}
            >
                {({ handleBlur, handleSubmit, handleChange, values}) => (
                    <View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Goal Name</Text>
                            <TextInput style={styles.input}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Deadline</Text>
                            <View style={styles.dateContainer}>
                                <View style={styles.dateItemContainer}>
                                    <Text>Day</Text>
                                    <Dropdown
                                        style={styles.input}
                                        placeholderStyle={styles.fieldTextSmall}
                                        data={[]}
                                        labelField="label"
                                        valueField='value'
                                        placeholder='Select Day'
                                        onChange={() => {}}
                                    />
                                </View>
                                <View style={styles.dateItemContainer}>
                                    <Text>Month</Text>
                                    <Dropdown
                                        style={styles.input}
                                        placeholderStyle={styles.fieldTextSmall}
                                        data={[]}
                                        labelField="label"
                                        valueField='value'
                                        placeholder='Select Month'
                                        onChange={() => {}}
                                    />
                                </View>
                                <View style={styles.dateItemContainer}>
                                    <Text>Year</Text>
                                    <Dropdown
                                        style={[styles.input]}
                                        placeholderStyle={styles.fieldTextSmall}
                                        data={[]}
                                        labelField="label"
                                        valueField='value'
                                        placeholder='Select Year'
                                        onChange={() => {}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Difficulty</Text>
                            <Dropdown
                                style={styles.input}
                                data={[]}
                                labelField="label"
                                valueField='value'
                                placeholder='Select Difficulty'
                                onChange={() => {}}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textHeader}>Reward</Text>
                            <TextInput style={styles.input}/>
                        </View>
                        <View style={[styles.fieldContainer]}>
                            <Text style={styles.textHeader}>Description</Text>
                            <TextInput 
                                style={[styles.input, {textAlignVertical: "top"}]} 
                                multiline={true}
                                numberOfLines={7}
                                />
                        </View>
                        <View>
                            <TouchableHighlight style={styles.submit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}

            </Formik>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        backgroundColor: "white"
    },
    input: {
        backgroundColor: globalStyles.colors.mainFaded,
        padding: 10,
        fontSize: 16,
        borderRadius: 7
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateItemContainer: {
        width: "30%"
    },
    fieldContainer: {
        padding: 10,
        marginTop: 10
    },
    textHeader: {
        paddingBottom: 5,
        fontSize: 20
    },
    submit: {
        textAlign: "center",
        backgroundColor: globalStyles.colors.main,
        color: "white",
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: 'white', 
        textAlign: "center",
        fontSize: 30
    },
    fieldTextSmall: {
        fontSize: 12
    }
})
export default AddGoal