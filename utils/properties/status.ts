export enum StatusEnums {
    COMPLETE = "complete",
    ACTIVE = "active",
    OVERDUE = "overdue"
}

const { COMPLETE, ACTIVE, OVERDUE } = StatusEnums

export interface StatusItem {
    name: string,
    color: string
}
export interface StatusInterface<T> {
    complete: T,
    active: T,
    overdue: T
}

export enum TaskEnum {
    COMPLETE = 'complete',
    INCOMPLETE = 'incomplete',
    OVERDUE = 'overdue',
    ACTIVE = 'active'
}


const statusses: StatusInterface<StatusItem> = {
    complete: {
        name: COMPLETE,
        color: "#0061D2"
    },
    active: {
        name: ACTIVE,
        color: "#04CE00"
    },
    overdue: {
        name: OVERDUE,
        color: "#D20000"
    }
}

export default statusses