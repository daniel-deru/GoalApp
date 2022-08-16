import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { StatusEnums } from "../../utils/properties/status"

export interface GoalInterface {
    name: string,
    deadline: number,
    reward: string,
    description: string,
    status: StatusEnums
}

const initialState: GoalInterface[] = []

const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        setNewGoal: (state: GoalInterface[], action: PayloadAction<GoalInterface>) => state = [...state, action.payload]
    }
})

export const { setNewGoal } = goalSlice.actions
export default goalSlice.reducer