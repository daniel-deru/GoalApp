import React, {useEffect, useState, SetStateAction, Dispatch} from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { Dropdown } from 'react-native-element-dropdown'
import globalStyles from '../../globalStyles'
import { generateYears, DateFieldInterface, months, getDays } from "../../utils/forms/dates"

// Get all the years from current year + 10 years
const years: DateFieldInterface[] = generateYears()

const {text, buttons, colors, inputs} = globalStyles

interface Props {
    visibility: boolean,
    setVisibility: Dispatch<SetStateAction<boolean>>,
    setDate: Dispatch<SetStateAction<Date>>,
    date: Date
}

const DateModal: React.FC<Props> = ({visibility, setVisibility, setDate, date}) => {
    const [days, setDays] = useState<DateFieldInterface[]>([])
    const [year, setYear] = useState<number>(date.getFullYear())
    const [month, setMonth] = useState<number>(date.getMonth()+1)
    const [day, setDay] = useState<number>(date.getDate())

    const submitDate = (): void => {
        const inputDate: Date = new Date(year, month-1, day)
        const currentDate: number = Date.now()
        // Create a five minute difference for consistency when comparing two unix timestamps
        const fiveMinDiff = 5 * 60 * 1000
        if(inputDate.getTime() + fiveMinDiff <= currentDate) return Alert.alert("Invalid Date Selected", "Cannot select date before today")
        setDate(inputDate)
        setVisibility(false)
    }
    useEffect(() => {
        setDays(getDays(year, month))
        console.log(year, month, day)
    }, [month, year, date])
    return (
        <Modal visible={visibility}>
            <View style={styles.fieldContainer}>
                <Text style={text.heading}>Year</Text>
                <Dropdown 
                    data={years}
                    labelField="label"
                    valueField='value'
                    placeholder='Select Year'
                    style={[inputs.textInput]}
                    placeholderStyle={styles.fieldTextSmall}
                    onChange={item => setYear(item.value)}
                    value={year}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={text.heading}>Month</Text>
                <Dropdown 
                    data={months}
                    labelField="label"
                    valueField='value'
                    placeholder='Select Month'
                    style={[inputs.textInput]}
                    placeholderStyle={styles.fieldTextSmall}
                    onChange={item => setMonth(item.value)}
                    value={month}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={text.heading}>Day</Text>
                <Dropdown 
                    data={days}
                    labelField="label"
                    valueField='value'
                    placeholder='Select Day'
                    style={[inputs.textInput]}
                    placeholderStyle={styles.fieldTextSmall}
                    onChange={item => setDay(item.value)}
                    value={day}
                />
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity style={buttons.fullWidth(colors.main)} onPress={submitDate}>
                    <Text style={globalStyles.text.button}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[buttons.fullWidth(colors.overdue)]} 
                    onPress={() => setVisibility(false)}
                >
                    <Text style={[text.button]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        )
}

const styles = StyleSheet.create({
    fieldContainer: {
        padding: 10,
        marginTop: 10
    },
    fieldTextSmall: {
        fontSize: 12
    },
})

export default DateModal