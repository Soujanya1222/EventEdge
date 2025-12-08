import {configureStore} from "@reduxjs/toolkit"
import usersReducer from "../slices/userSlice"
import eventReducer from "../slices/eventSlice"
const createStore=()=>{
    return configureStore({
        reducer:{
            users:usersReducer,
            events:eventReducer
        }
    })
}
export default createStore;