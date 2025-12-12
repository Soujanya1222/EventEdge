import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../config/axios";

export const fetchOrganisers=createAsyncThunk("users/fetchOrgnisers",async(undefined,{rejiectWithValue})=>{
    try{
        const response=await axios.get("/admin/organisers",{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data;

    }catch(err){
        console.log(err.response.data.error);
        return rejiectWithValue(err.response.data.error)
    }
})

export const fetchUsers=createAsyncThunk("users/fetchUsers",async(undefined,{rejectWithValue})=>{
    try{
        const response=await axios.get("/admin/users",{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data;       
    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})




const userSlice=createSlice({
    name:"users",
    initialState:{
        data:[],
        isLoading:false,
        errors:null,
        pendingEvents:[],
        approveEvents:[]
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchOrganisers.pending,(state)=>{
            state.isLoading=true;
            state.data=[];
            state.errors=null;
        })
        .addCase(fetchOrganisers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
            state.errors=null;  
        })
        .addCase(fetchOrganisers.rejected,(state,action)=>{
            state.isLoading=false;
            state.data=[];
            state.errors=action.payload;
        })
        .addCase(fetchUsers.pending,(state)=>{      
            state.isLoading=true;
            state.data=[];
            state.errors=null;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
            state.errors=null;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.isLoading=false;
            state.data=[];
            state.errors=action.payload;
        })
        
    }
})


export default userSlice.reducer;