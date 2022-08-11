export interface DateFieldInterface {
    label: string,
    value: number
}

export function generateYears(): Array<DateFieldInterface> {
    const date: Date = new Date()
    const currentYear: number = date.getFullYear()
    const finalYear: number = currentYear + 10

    const yearList: DateFieldInterface[] = []

    for(let i = currentYear; i < finalYear + 1; i++){
        yearList.push({label: i.toString(), value: i})
    }

    return yearList
}

export const months = [
    {label: "January", value: 1},
    {label: "Febuary", value: 2},
    {label: "March", value: 3},
    {label: "April", value: 4},
    {label: "May", value: 5},
    {label: "June", value: 6},
    {label: "July", value: 7},
    {label: "August", value: 8},
    {label: "September", value: 9},
    {label: "October", value: 10},
    {label: "November", value: 11},
    {label: "December", value: 12},
]

export function getDays(year: number, month: number): Array<DateFieldInterface> {
    const numDays: number = new Date(year, month, 0).getDate()
    const days: DateFieldInterface[] = []

    for(let i = 1; i <= numDays; i++){
        days.push({label: i.toString(), value: i})
    }

    return days
}