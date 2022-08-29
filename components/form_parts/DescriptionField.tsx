import React, { ChangeEvent} from 'react'
import { View, Text, TextInput, StyleSheet} from "react-native"
import globalStyles from "../../globalStyles"

interface Props {
    value: string,
    handleChange: any
}

const NameField: React.FC<Props> = ({handleChange, value}) => {
  return (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeader}>Description</Text>
        <TextInput 
            style={[styles.input, {textAlignVertical: "top"}]}
            multiline={true}
            numberOfLines={7}
            onChangeText={handleChange("description")}
            value={value}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: globalStyles.colors.mainFaded,
        fontSize: 16,
        padding: 10,
        borderRadius: 5
    },
    fieldContainer: {
        marginTop: 10
    },
    fieldHeader: {
        fontSize: 20,
        marginBottom: 5
    },
})

export default NameField