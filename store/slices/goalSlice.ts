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
        setNewGoal: (state: GoalInterface[], action: PayloadAction<GoalInterface>): Array<GoalInterface> => {
            return state = [...state, action.payload]
        },
        updateGoal: (state: GoalInterface[], action: PayloadAction<GoalInterface>): Array<GoalInterface> => {
            const updatedGoal: GoalInterface = action.payload
            const otherGoals = state.filter(goal => goal.id === updatedGoal.id)
            return [...otherGoals, updatedGoal]
        }
    }
})

export const { setNewGoal, updateGoal } = goalSlice.actions
export default goalSlice.reducer