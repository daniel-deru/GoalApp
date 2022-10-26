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
    const [showDays, setShowDays] = useState<any>([])

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

        const currentMonth = new Date(year, month, 0)
        const prevMonth = new Date(year, month-1, 0)
        const firstDay = new Date(year, month-1, 1).getDay() // go to prev month and add 1 day 

        let daysArr = new Array(currentMonth.getDate())
                            .fill(0)
                            .map((day, index) => ({day: index+1, type: "current"}))
  
        if(firstDay > 0){
            const daysInPrevMonth = prevMonth.getDate()

            for(let i = daysInPrevMonth; i > daysInPrevMonth-firstDay; i--){
                daysArr.unshift({day: i, type: "notCurrent"})
            }
        }

        if(daysArr.length < 42){
            const totalAdded = 42 - daysArr.length

            for(let i = 1; i <= totalAdded; i++){
                daysArr.push({day: i, type: "notCurrent"})
            }
        }

        let matrix = []

        for(let i = 0; i < 42; i+=7){
            const week = daysArr.slice(i, i+7)
            matrix.push(week)
        }
        
        setShowDays(matrix)
        
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
            <View style={{paddingVertical: 10, marginHorizontal: 10}}>

                <View style={styles.containerHorizontal}>
                    {dayNames.map(day => (
                        <Text style={styles.dayItem}>{day}</Text>
                    ))}
                </View>

                <View>
                    {showDays.length > 0 && showDays.map((week: object[]) => (
                        <View style={styles.containerHorizontal}>
                            { week.map((day: any) => (
                                <Text style={styles.dayItem}>{day.day}</Text>
                            )) }
                        </View>
                    ))}
                </View>

            </View>
            
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
        justifyContent: "space-evenly"
    },
    dropDownContainer: {
        padding: 10,
        marginTop: 10,
        width: "50%"
    },
    dayItem: {
        width: "12%",
        textAlign: "center"
    }
})

export default DateModal