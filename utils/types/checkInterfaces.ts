import { GoalInterface } from "../../store/slices/goalSlice"

export const isGoal = (obj: object): obj is GoalInterface => {
    return 'GoalInterface' in obj
}