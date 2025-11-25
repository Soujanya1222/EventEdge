import {configureStore} from "@reduxjs/toolkit"
import usersReducer from "../slices/userSlice"
const createStore=()=>{
    return configureStore({
        reducer:{
            users:usersReducer
        }
    })
}
export default createStore;