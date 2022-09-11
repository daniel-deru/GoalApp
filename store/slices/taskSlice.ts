import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { TaskEnum } from "../../utils/properties/status"
import { difficultyEnum } from "../../utils/properties/difficulty"

export interface Task {
    id: string,
    name: string,
    goal_id: string | undefined,
    duration: number,
    time_left: number,
    date: number,
    status: TaskEnum,
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
            return { [task.id]: task, ...state }
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