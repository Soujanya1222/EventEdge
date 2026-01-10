import {configureStore} from "@reduxjs/toolkit"
import usersReducer from "../slices/userSlice"
import eventReducer from "../slices/eventSlice"
import ticketReducer from "../slices/ticketSlice"
import paymentReducer from "../slices/paymentSlice"
const createStore=()=>{
    return configureStore({
        reducer:{
            users:usersReducer,
            events:eventReducer,
            tickets:ticketReducer,
            payment:paymentReducer
        }
    })
}
export default createStore;