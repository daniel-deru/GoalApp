export enum DurationEnum {
    days = "days",
    hours = "hours",
    minutes = "minutes"
}

export interface DurationFormInterface {
    [DurationEnum.days]: number,
    [DurationEnum.hours]: number,
    [DurationEnum.minutes]: number
}

export const getDuration = (duration: number): DurationFormInterface => {
    let days: number = duration / (60 * 60 * 24)
    let hours: number = ((days) % 1 * 24)
    let minutes: number = (hours % 1) * 60

    return {
        [DurationEnum.days]: Math.floor(days),
        [DurationEnum.hours]: Math.floor(hours),
        [DurationEnum.minutes]: Math.floor(minutes)
    }
}