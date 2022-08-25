import { difficultyEnum } from "../properties/difficulty"

export interface FormDifficulty {
    label: difficultyEnum,
    value: difficultyEnum
}

export const difficulties: Array<FormDifficulty> = [
    {label: difficultyEnum.easy, value: difficultyEnum.easy},
    {label: difficultyEnum.normal, value: difficultyEnum.normal},
    {label: difficultyEnum.hard, value: difficultyEnum.hard}
]