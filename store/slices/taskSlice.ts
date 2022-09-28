import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { StatusEnums } from "../../utils/properties/status"
import { difficultyEnum } from "../../utils/properties/difficulty"

export interface Task {
    id: string,
    name: string,
    goal_id: string | undefined,
    date: number,
    status: StatusEnums,
    description: string,
    difficulty: difficultyEnum
}

export type Tasks = {[id: string]: Task}

const initialState: Tasks = {}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        updateTask: (state: Tasks, action: PayloadAction<Task>): Tasks => {
            const task: Task = action.payload
            return { ...state, [task.id]: task }
        },
        deleteTask: (state: Tasks, action: PayloadAction<Task>): Tasks => {
            let tasks: Tasks = state
            let task: Task = action.payload
            delete tasks[task.id]
            return tasks
        }
    }
})

export const { updateTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer