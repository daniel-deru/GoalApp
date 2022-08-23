import {combineReducers, configureStore} from "@reduxjs/toolkit"
import goalSlice from "./slices/goalSlice"
import taskSlice from "./slices/taskSlice"

const reducer = combineReducers({
    goals: goalSlice,
    tasks: taskSlice
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export default store