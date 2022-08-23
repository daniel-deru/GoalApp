import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { TaskEnum } from "../../utils/properties/status"

interface Task {
    id: string,
    name: string,
    goal_id: string,
    duration: number,
    date: number,
    status: TaskEnum,
    description: string
}

const initialState: Array<Task> = []

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

    }
})

export default taskSlice.reducer