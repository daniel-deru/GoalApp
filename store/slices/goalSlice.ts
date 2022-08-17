import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { StatusEnums } from "../../utils/properties/status"
import { difficultyEnum } from "../../utils/properties/difficulty"



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
const initialState: Array<GoalInterface> = []

const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        setNewGoal: (state: GoalInterface[], action: PayloadAction<GoalInterface>) => {
            return state = [...state, action.payload]
        }
    }
})

export const { setNewGoal } = goalSlice.actions
export default goalSlice.reducer