import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, TextInput, SafeAreaView, View } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import { Formik } from "formik"
import { NavigationScreenProp, NavigationParams, NavigationState  } from "react-navigation"


interface Props {
    navigation: NavigationScreenProp<NavigationParams, NavigationState> 
  }

const AddGoal: React.FC<Props> = ({ navigation }): JSX.Element => {


    useEffect(() => {
        // navigation.setOptions({title: "Add Goal"})
    }, [])
  return (
    <SafeAreaView>
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
                    <View>
                        <Text>Goal Name</Text>
                        <TextInput/>
                    </View>
                    <View>
                        <Text>Deadline</Text>
                        <View>
                            <View>
                                <Text>Day</Text>
                                <SelectDropdown 
                                    data={[1,2,3]}
                                    onSelect={item => console.log(item)}
                                    buttonTextAfterSelection={selectedItem => selectedItem}
                                    rowTextForSelection={item => item}
                                />
                            </View>
                            <View>
                                <Text>Month</Text>
                                <SelectDropdown 
                                    data={[1,2,3]}
                                    onSelect={item => console.log(item)}
                                    buttonTextAfterSelection={selectedItem => selectedItem}
                                    rowTextForSelection={item => item}
                                />
                            </View>
                            <View>
                                <Text>Year</Text>
                                <SelectDropdown 
                                    data={[1,2,3]}
                                    onSelect={item => console.log(item)}
                                    buttonTextAfterSelection={selectedItem => selectedItem}
                                    rowTextForSelection={item => item}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>Difficulty</Text>
                        <SelectDropdown 
                            data={[1,2,3]}
                            onSelect={item => console.log(item)}
                            buttonTextAfterSelection={selectedItem => selectedItem}
                            rowTextForSelection={item => item}
                        />
                    </View>
                    <View>
                        <Text>Reward</Text>
                        <TextInput/>
                    </View>
                    <View>
                        <Text>Description</Text>
                        <TextInput/>
                    </View>
                    <View>
                        <TouchableHighlight>
                            <Text>Submit</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )}

        </Formik>
    </SafeAreaView>
  )
}

export default AddGoal