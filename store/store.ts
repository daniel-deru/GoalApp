import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import goalSlice from "./slices/goalSlice"

const reducer = combineReducers({
    goals: goalSlice
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