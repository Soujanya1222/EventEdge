import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../config/axios";

export const registerUser=createAsyncThunk("users/registerUser",async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.post('/users/register',formData)
        console.log(response.data)
        return response.data;
    }catch(err){
        console.log(err.message)
        return rejectWithValue(err.response.data)
    }
})

export const loginUser=createAsyncThunk("users/loginUser",async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.post('user/login',formData)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

const userSlice=createSlice({
    name:"users",
    initialState:{
        data:[],
        isloading:false,
        errors:null,
    },
   
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.data=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.data=[],
            state.errors=action.payload;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.data=action.payload
        })
    }
    
})

export default userSlice.reducer;