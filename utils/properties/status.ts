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

// export const getStatus = (currentStatus: string) => {
//     for (let status in statusses){
//         if (status === currentStatus) return statusses[status]
//     }
// }

export default statusses