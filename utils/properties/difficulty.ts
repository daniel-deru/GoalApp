export enum difficultyEnum {
    easy = 'easy',
    normal = 'normal',
    hard = 'hard'
}

export interface Difficulty<T> {
    easy: T,
    normal: T,
    hard: T
}