import React from 'react'
import { View, Text, TextInput, StyleSheet} from "react-native"
import globalStyles from "../../globalStyles"

const { inputs } = globalStyles

interface Props {
    value: string,
    handleChange: any
}

const NameField: React.FC<Props> = ({handleChange, value}) => {
  return (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeader}>Description</Text>
        <TextInput 
            style={[inputs.textInput, {textAlignVertical: "top"}]}
            multiline={true}
            numberOfLines={7}
            onChangeText={handleChange("description")}
            value={value}
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