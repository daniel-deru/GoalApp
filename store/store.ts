import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userListSlice from "./slices/userListSlice"

const reducer = combineReducers({
    userList: userListSlice
})

const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export default store