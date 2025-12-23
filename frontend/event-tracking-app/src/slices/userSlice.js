import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../config/axios";


export const fetchOrganisers=createAsyncThunk("users/fetchOrgnisers",async(undefined,{rejiectWithValue})=>{
    try{
        const response=await axios.get("/admin/organisers",{headers:{Authorization:localStorage.getItem("token")}})
        //console.log(response.data)
        return response.data;

    }catch(err){
        console.log(err.response.data.error);
        return rejiectWithValue(err.response.data.error)
    }
})

export const fetchUsers=createAsyncThunk("users/fetchUsers",async(undefined,{rejectWithValue})=>{
    try{
        const response=await axios.get("/admin/users",{headers:{Authorization:localStorage.getItem("token")}})
        //console.log(response.data)
        return response.data;       
    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})



export const updateAccount=createAsyncThunk("users/updateAccount",async({name,email},{rejectWithValue})=>{
    try{
        const response=await axios.put(`/user/account`,{name,email},{headers:{Authorization:localStorage.getItem("token")}})
        return response.data;
    }
    catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }

})

export const changePassword=createAsyncThunk("users/changePassword",async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.put("/user/change-password",formData,{headers:{Authorization:localStorage.getItem("token")}})
        return response.data
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})




export const fetchBookedUsers=createAsyncThunk(
  "events/fetchBookedUsers",
  async (undefined, { rejectWithValue }) => { 
    try {
      const response = await axios.get(`/organiser/booking`, {headers: { Authorization: localStorage.getItem("token") } }); 
      return response.data;
    }
    catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error fetching booked users");
    }
    }
);


const userSlice=createSlice({
    name:"users",
    initialState:{
        users: [],
        organisers: [],
        isLoading:false,
        errors:null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchOrganisers.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(fetchOrganisers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.organisers=action.payload;
            state.errors=null;  
        })
        .addCase(fetchOrganisers.rejected,(state,action)=>{
            state.isLoading=false;
            state.organisers=[];
            state.errors=action.payload;
        })
        .addCase(fetchUsers.pending,(state)=>{      
            state.isLoading=true;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.users=action.payload;
            state.errors=null;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.isLoading=false;
            state.users=[];
            state.errors=action.payload;
        })
        .addCase(updateAccount.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;   
            state.errors = null;
        })
        .addCase(updateAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        })
        .addCase(fetchBookedUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchBookedUsers.fulfilled, (state, action) => {
            state.isLoading = false;
           state.users = action.payload;
            state.errors = null;
        })
        .addCase(fetchBookedUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        })
        .addCase(changePassword.pending,(state)=>{
            state.isLoading=false
            state.errors=null
        })
        .addCase(changePassword.fulfilled,(state)=>{
            state.errors=null
            state.isLoading=false
        })
        .addCase(changePassword.rejected,(state,action)=>{
            state.isLoading=false
            state.errors=action.payload
        })

    }
})


export default userSlice.reducer;