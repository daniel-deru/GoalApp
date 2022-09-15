import React, { ChangeEvent} from 'react'
import { View, Text, TextInput, StyleSheet} from "react-native"
import globalStyles from "../../globalStyles"

interface Props {
    value: string,
    handleChange: any
}

const { inputs } = globalStyles

const NameField: React.FC<Props> = ({handleChange, value}) => {
  return (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeader}>Name</Text>
        <TextInput 
            onChangeText={handleChange('name')}
            value={value}
            style={inputs.textInput}
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
})

export default NameField