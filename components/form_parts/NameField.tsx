import React, { useRef, useState } from 'react'
import { View, Text, TextInput, StyleSheet} from "react-native"
import globalStyles from "../../globalStyles"

interface Props {
    value: string,
    handleChange: any
}

const { inputs } = globalStyles

const maxLength = 25

const NameField: React.FC<Props> = ({handleChange, value}) => {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldHeader}>
                Name
                <View style={{width: 10}}></View>
                <Text style={styles.charLength}>
                    {value.length}/{maxLength}
                </Text>


            </Text>
            <TextInput 
                onChangeText={handleChange('name')}
                value={value}
                style={[ inputs.textInput ]}
                maxLength={maxLength}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fieldContainer: {
        marginTop: 10
    },
    fieldHeader: {
        fontSize: 20,
        marginBottom: 5
    },
    charLength: {
        fontSize: 15,
    }
})

export default NameField