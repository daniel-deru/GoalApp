export interface Duration {
    label: string
    value: number
}

export const createDuration = (total: number): Duration[] => {
    let durationArray: Duration[] = []

    for(let i = 0; i <= total; i++){
        const item: string = i.toString()
        durationArray.push({label: item, value: i})
    }

    return durationArray
}