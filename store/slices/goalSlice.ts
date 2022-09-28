import {createSlice, PayloadAction} from "@reduxjs/toolkit"
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

const initialState: Goals = {}

const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        updateGoals: (state: Goals, action: PayloadAction<GoalInterface>): Goals => {
            const newGoal: GoalInterface = action.payload
            return {...state, [newGoal.id]: newGoal}
        }
    }
})

// export const { setNewGoal, updateGoal } = goalSlice.actions
export const { updateGoals } = goalSlice.actions
export default goalSlice.reducer