import {configureStore} from "@reduxjs/toolkit"
import usersReducer from "../slices/userSlice"
import eventReducer from "../slices/eventSlice"
import ticketReducer from "../slices/ticketSlice"
import paymentReducer from "../slices/paymentSlice"
import reviewReducer from "../slices/reviewSlice"
const createStore=()=>{
    return configureStore({
        reducer:{
            users:usersReducer,
            events:eventReducer,
            tickets:ticketReducer,
            payment:paymentReducer,
            reviews:reviewReducer
        }
    })
}
export default createStore;