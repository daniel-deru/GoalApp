import React, {useEffect, useState, SetStateAction, Dispatch} from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { Dropdown } from 'react-native-element-dropdown'
import globalStyles from '../../globalStyles'
import { generateYears, DateFieldInterface, months, getDays } from "../../utils/forms/dates"

// Get all the years from current year + 10 years
const years: DateFieldInterface[] = generateYears()

const {text, buttons, colors, inputs} = globalStyles

enum dayType {
    current = "current",
    notCurrent = "notCurrent"
}

interface Props {
    visibility: boolean,
    setVisibility: Dispatch<SetStateAction<boolean>>,
    setDate: Dispatch<SetStateAction<Date>>,
    date: Date
}

interface dayItem {
    day: number,
    type: dayType
}

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const DateModal: React.FC<Props> = ({visibility, setVisibility, setDate, date}) => {
    const [days, setDays] = useState<DateFieldInterface[]>([])
    const [year, setYear] = useState<number>(date.getFullYear())
    const [month, setMonth] = useState<number>(date.getMonth()+1)
    const [currentDay, setCurrentDay] = useState<number>(date.getDate())
    const [showDays, setShowDays] = useState<Array<dayItem[]>>([])

    const submitDate = (): void => {
        const inputDate: Date = new Date(year, month-1, currentDay)
        inputDate.setHours(23, 59, 59, 999)
        const currentDate: number = Date.now() // Set the timestamp to use the last millisecond of the day

        if(inputDate.getTime() <= currentDate) return Alert.alert("Invalid Date Selected", "Cannot select date before today")
        setDate(inputDate)
        setVisibility(false)
    }

    const constructCalendarArray = () => {

        const currentMonth = new Date(year, month, 0)
        const prevMonth = new Date(year, month-1, 0)
        const firstDay = new Date(year, month-1, 1).getDay() // go to prev month and add 1 day 

        let daysArr: Array<dayItem> = new Array(currentMonth.getDate())
                            .fill(0)
                            .map((day, index) => ({day: index+1, type: dayType.current}))
  
        if(firstDay > 0){
            const daysInPrevMonth = prevMonth.getDate()

            for(let i = daysInPrevMonth; i > daysInPrevMonth-firstDay; i--){
                daysArr.unshift({day: i, type: dayType.notCurrent})
            }
        }

        if(daysArr.length < 42){
            const totalAdded = 42 - daysArr.length

            for(let i = 1; i <= totalAdded; i++){
                daysArr.push({day: i, type: dayType.notCurrent})
            }
        }

        let matrix = []

        for(let i = 0; i < 42; i+=7){
            const week: Array<dayItem> = daysArr.slice(i, i+7)
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

                <View style={styles.dayHeader}>
                    {dayNames.map(day => (
                        <Text key={day} style={styles.headerItem}>{day}</Text>
                    ))}
                </View>

                <View>
                    {showDays.length > 0 && showDays.map((week: dayItem[]) => (
                        <View key={Math.random() * 1000000} style={styles.containerHorizontal}>
                            { week.map(({day, type}: dayItem) => {
                                
                                const isCurrentMonth: boolean = type === dayType.current
                                const isCurrentDay: boolean = day === currentDay
                                const isActiveMonth = isCurrentDay && isCurrentMonth

                                return (
                                <Text
                                    key={day}
                                    style={[
                                        styles.dayItem, 
                                        styles[type],
                                        isActiveMonth && styles.active
                                    ]}
                                    onPress={() => isCurrentMonth && setCurrentDay(day)}
                                    >
                                        {day}
                                    </Text>)
                            })}
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
        textAlign: "center",
        paddingVertical: 10
    },
    dayHeader: {
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    headerItem: {
        width: "12%",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "900",
    },
    current: {
        fontWeight: "600"
    },
    notCurrent: {
        color: "#999"
    },
    active: {
        backgroundColor: colors.blue,
        color: "white",
        borderRadius: 10
    }
})

export default DateModal