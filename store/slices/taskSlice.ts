import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { StatusEnums } from "../../utils/properties/status"
import { difficultyEnum } from "../../utils/properties/difficulty"
import Model from "../../database/db"
import {GoalInterface} from "./goalSlice"

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

const model = new Model()

const initialState: Tasks = {}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        updateTask: (state: Tasks, action: PayloadAction<Task>): Tasks => {
            const task: Task = action.payload
            const updatedTasks = { ...state, [task.id]: task }

            model.update("tasks", JSON.stringify(updatedTasks))

            return updatedTasks
        },
        deleteTask: (state: Tasks, action: PayloadAction<Task>): Tasks => {
            let tasks: Tasks = state
            let task: Task = action.payload

            delete tasks[task.id]

            model.update("tasks", JSON.stringify(tasks))

            return tasks
        },
        deleteTasks: (state: Tasks, action: PayloadAction<GoalInterface>): Tasks => {
            let tasks: Tasks = state
            const goalId = action.payload.id

            for(let task in tasks){
                let taskItem: Task = tasks[task]

                if(taskItem.goal_id === goalId){
                    delete tasks[taskItem.id]
                }
            }

            model.update("tasks", JSON.stringify(tasks))

            return tasks
        },
        fetchTasks: (state: Tasks, action: PayloadAction<Tasks>): Tasks => {
            return action.payload
        }
    }
})

export const { updateTask, deleteTask, fetchTasks, deleteTasks} = taskSlice.actions
export default taskSlice.reducer