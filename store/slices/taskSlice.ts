import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { TaskEnum } from "../../utils/properties/status"
import { difficultyEnum } from "../../utils/properties/difficulty"

export interface Task {
    id: string,
    name: string,
    goal_id: string,
    duration: number,
    date: number,
    status: TaskEnum,
    description: string,
    difficulty: difficultyEnum
}

const initialState: Array<Task> = []

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setNewTask: (state: Task[], action: PayloadAction<Task>): Array<Task> => {
            return [...state, action.payload]
        },
        updateTask: (state: Task[], action: PayloadAction<Task>): Array<Task> => {
            const otherTasks: Task[] = state.filter(task => task.id === action.payload.id)
            return [...otherTasks, action.payload]
        },
        deleteTask: (state: Task[], action: PayloadAction<Task>): Array<Task> => {
            return state.filter((task: Task) => task.id !== action.payload.id)
        }
    }
})

export const { setNewTask, updateTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer