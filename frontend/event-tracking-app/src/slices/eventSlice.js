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

export const createEvents=createAsyncThunk("events/createEvents",async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.post('/events/create',formData,{headers:{Authorization:localStorage.getItem("token"),"Content-Type": "multipart/form-data"}})
        console.log(response.data)
        return response.data;

    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})

export const approveEvent=createAsyncThunk("events/approveEvent",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/event/approve/${id}`,{},{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data;                       
    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})



const eventSlice=createSlice({
    name:"events",
    initialState:{
        data:[],
        isLoading:false,
        errors:null,
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
        .addCase(createEvents.pending,(state)=>{
            state.isLoading=true
            state.data=[]
            state.errors=null
        })
        .addCase(createEvents.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data.push(action.payload)
            state.errors=null
        })
        .addCase(createEvents.rejected,(state,action)=>{
            state.isLoading=false
            state.data=[]
            state.errors=action.payload
        })
    }
})
export default eventSlice.reducer;

