import {configureStore} from "@reduxjs/toolkit"
import usersReducer from "../slices/userSlice"
import eventReducer from "../slices/eventSlice"
import ticketReducer from "../slices/ticketSlice"
import paymentReducer from "../slices/paymentSlice"
import reviewReducer from "../slices/reviewSlice"
import couponReducer from "../slices/couponSlice"
const createStore=()=>{
    return configureStore({
        reducer:{
            users:usersReducer,
            events:eventReducer,
            tickets:ticketReducer,
            payment:paymentReducer,
            reviews:reviewReducer,
            coupon:couponReducer
        }
    })
}
export default createStore;