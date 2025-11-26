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
        localStorage.setItem("token", response.data.token);
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

export const fetchAccount=createAsyncThunk("users/fetchUsers",async(undefined,{rejectWithValue})=>{
    try{
        const response=await axios.get('/user/account',{headers:{Authorization:localStorage.getItem('token')}});
        //console.log(response.data)
         return response.data

    }catch(err){
        console.log(err.message);
         return rejectWithValue(err.response.data)
    }
})

const userSlice=createSlice({
    name:"users",
    initialState:{
        data:null,
        isloading:false,
        errors:null,
        isAuthenticated:false
    },
    reducers:{
        logout(state){
            localStorage.removeItem('token')
            state.isAuthenticated=false,
            state.data=null
            state.errors=null
            state.isloading=false
        }
    }
   ,
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isloading=true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.isAuthenticated=true
            state.isloading=false
            state.errors=null
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.data=null,
            state.errors=action.payload;
             state.isAuthenticated=false
            state.isloading=false
        })
        .addCase(loginUser.pending,(state,action)=>{
            state.isloading=true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.data=action.payload
            state.isAuthenticated=true
            state.errors=null
            state.isloading=false
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.errors = action.payload;
            state.isloading = false;
        })
        .addCase(fetchAccount.pending, (state) => {
            state.isloading = true;
            state.errors = null;
        })
        .addCase(fetchAccount.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.isAuthenticated=true;
            state.isloading=false
            state.errors=null
        })
        .addCase(fetchAccount.rejected,(state,action)=>{
            state.data = null;
            state.isAuthenticated = false;
            state.errors = action.payload;
            state.isloading=false
        })
    }
    
})
export const {logout}=userSlice.actions;

export default userSlice.reducer;