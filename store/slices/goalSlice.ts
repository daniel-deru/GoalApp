import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StatusEnums } from "../../utils/properties/status"
import { difficultyEnum } from "../../utils/properties/difficulty"
import Model from "../../database/db"

export interface GoalInterface {
    id: string,
    name: string,
    deadline: number,
    reward: string,
    description: string,
    status: StatusEnums,
    difficulty: difficultyEnum,
    type: 'GoalInterface'
}

interface Goals { 
    [id: string]: GoalInterface
}

const model = new Model()

const initialState: Goals = {}

const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        updateGoals: (state: Goals, action: PayloadAction<GoalInterface>): Goals => {
            const newGoal: GoalInterface = action.payload
            const updatedState = {...state, [newGoal.id]: newGoal}

            model.update("goals", JSON.stringify(updatedState))

            return updatedState
        },
        fetchGoals: (state: Goals, action: PayloadAction<Goals>): Goals => {
            return {...state, ...action.payload}
        }
    }
})

// export const { setNewGoal, updateGoal } = goalSlice.actions
export const { updateGoals, fetchGoals } = goalSlice.actions
export default goalSlice.reducer