import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../config/axios";

export const listUsers=createAsyncThunk("users/listUsers",async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.get('/admin/users',{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
    }catch(err){
        console.log(err.message)
        return rejectWithValue(err.response.data)
    }
})


const userSlice=createSlice({
    name:"users",
    initialState:{
        data:null,
        isloading:false,
        errors:null,
    },
    
})


export default userSlice.reducer;