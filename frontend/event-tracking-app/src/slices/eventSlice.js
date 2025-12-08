import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../config/axios";
export const fetchEvents=createAsyncThunk("events/fetchEvents",async(undefined,{rejectWithValue})=>{
    try{
        const response=await axios.get('/admin/events',{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err.reponse.data.error);
        rejectWithValue(err.message)
    }

})
const eventSlice=createSlice({
    name:"events",
    initialState:{
        data:[],
        isLoading:false,
        errors:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchEvents.pending,(state)=>{
            state.isLoading=true,
            state.data=[],
            state.errors=null
        })
        .addCase(fetchEvents.fulfilled,(state,action)=>{
            state.data=action.payload
            state.isLoading=false
            state.errors=null
        })
         .addCase(fetchEvents.rejected,(state,action)=>{
            state.data=[]
            state.isLoading=false
            state.errors=action.payload
        })
    }
})
export default eventSlice.reducer;

