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

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const DateModal: React.FC<Props> = ({visibility, setVisibility, setDate, date}) => {
    const [days, setDays] = useState<DateFieldInterface[]>([])
    const [year, setYear] = useState<number>(date.getFullYear())
    const [month, setMonth] = useState<number>(date.getMonth()+1)
    const [day, setDay] = useState<number>(date.getDate())

    const submitDate = (): void => {
        const inputDate: Date = new Date(year, month-1, day)
        const currentDate: number = Date.now()
        // Create a two minute difference for consistency when comparing two unix timestamps
        const diff = 2 * 60 * 1000
        if(inputDate.getTime() + diff <= currentDate) return Alert.alert("Invalid Date Selected", "Cannot select date before today")
        setDate(inputDate)
        setVisibility(false)
    }

    const constructCalendarArray = () => {

        const daysInMonth = new Date(year, month-1, 0).getDate()
        const daysInPrevMonth = new Date(year, month-2, 0).getDate()
        const daysInNextMonth = new Date(year, month, 0).getDate()
        // Get the day of the week
        const firstDay = new Date(year, month-1, 1).getDay() 
        const lastDay = new Date(year, month-1, daysInMonth).getDay()
        let daysArr = new Array(daysInMonth).fill(0).map((day, index) => index+1)
        console.log(daysInMonth)
        console.log(new Date(year, month-1, daysInMonth).toDateString())
        console.log(new Date(year, month-1, daysInMonth).getDay())
        // console.log(firstDay)
        if(firstDay > 0){
            for(let i = daysInPrevMonth; i > daysInPrevMonth-firstDay; i--){
               
                daysArr.unshift(0)
            }
        }
        
        
        if(lastDay < 6){
            for(let i = 1; i < lastDay; i++){
                daysArr.push(0)
            }
        }
        // console.log(daysArr)
        
        
    }


    useEffect(() => {
        setDays(getDays(year, month))
        constructCalendarArray()
    }, [month, year, date])
    return (
        <Modal visible={visibility}>
            <View>
                <Text style={[text.heading, {textAlign: "center", paddingVertical: 10}]}>Select The Date</Text>
            </View>
            <View style={styles.containerHorizontal}>
                <View style={styles.dropDownContainer}>
                    {/* <Text style={text.heading}>Year</Text> */}
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
                <View style={styles.dropDownContainer}>
                    {/* <Text style={text.heading}>Month</Text> */}
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
            </View>
            <View style={[
                styles.containerHorizontal,
                {
                    justifyContent: "space-evenly",
                    paddingVertical: 10
                }
                ]}>
                {dayNames.map(day => (
                    <Text>{day}</Text>
                ))}
            </View>
            {/* <View style={styles.fieldContainer}>
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
            </View> */}
            <View style={styles.fieldContainer}>
                <TouchableOpacity style={buttons.fullWidth(colors.blue)} onPress={submitDate}>
                    <Text style={globalStyles.text.button}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[buttons.fullWidth(colors.red)]} 
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
    containerHorizontal: {
        flexDirection: "row",
    },
    dropDownContainer: {
        padding: 10,
        marginTop: 10,
        width: "50%"
    }
})

export default DateModal