import globalStyle from "../../globalStyles"

const { colors } = globalStyle
export enum StatusEnums {
    COMPLETE = "complete",
    INCOMPLETE = "incomplete",
    OVERDUE = "overdue"
}

const { COMPLETE, INCOMPLETE, OVERDUE } = StatusEnums

export interface StatusItem {
    name: string,
    color: string
}
export interface StatusInterface<T> {
    complete: T,
    incomplete: T
    overdue: T
}

const statusses: StatusInterface<StatusItem> = {
    complete: {
        name: COMPLETE,
        color: colors.green
    },
    incomplete: {
        name: INCOMPLETE,
        color: colors.blue
    },
    overdue: {
        name: OVERDUE,
        color: colors.red
    }
}

export interface TaskStatusInterface extends StatusInterface<StatusItem> {
    incomplete: StatusItem
}

export default statusses