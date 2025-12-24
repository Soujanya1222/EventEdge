import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../config/axios";



export const fetchEvents=createAsyncThunk("events/fetchEvents",async(undefined,{rejectWithValue})=>{
    try{
        const response=await axios.get('/organiser/events',{headers:{Authorization:localStorage.getItem('token')}})
        return response.data
    }catch(err){
        console.log(err.response.data.error);
        rejectWithValue(err.message)
    }

})

export const fetchAdminEvents=createAsyncThunk("events/fetchAdminEvents",async(undefined,{rejectWithValue})=>{
    try{
        const response=await axios.get('/admin/events',{headers:{Authorization:localStorage.getItem('token')}})
        return response.data
    }catch(err){
        console.log(err.response.data.error);
        rejectWithValue(err.message)
    }

})


export const createEvents=createAsyncThunk("events/createEvents",async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.post('/events/create',formData,{headers:{Authorization:localStorage.getItem("token"),"Content-Type": "multipart/form-data"}})
        return response.data;

    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})

export const approveEvent=createAsyncThunk("events/approveEvent",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/event/approve/${id}`,{},{headers:{Authorization:localStorage.getItem("token")}})
        return response.data;                       
    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})

export const rejectEvent=createAsyncThunk("events/rejectEvent",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/event/reject/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        return response.data;                       

    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})

export const deleteEvent=createAsyncThunk("events/deleteEvent",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`/event/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        return response.data;

    }catch(err){
        console.log(err.response.data.error);
        return rejectWithValue(err.response.data.error)
    }
})



export const fetchUserEvents = createAsyncThunk(
  "events/fetchUserEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/events", {headers: { Authorization: localStorage.getItem("token") } }); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error fetching events");
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/event/${id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        }
      );

      return response.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update event"
      );
    }
  }
);


const eventSlice=createSlice({
    name:"events",
    initialState:{
        data:[],
        isLoading:false,
        errors:null,
        singleEvent: null,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchEvents.pending,(state)=>{
            state.isLoading=true
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
        .addCase(fetchAdminEvents.pending,(state)=>{
            state.isLoading=true
        })       
        .addCase(fetchAdminEvents.fulfilled,(state,action)=>{
            state.data=action.payload
            state.isLoading=false
            state.errors=null
        })
         .addCase(fetchAdminEvents.rejected,(state,action)=>{
            state.data=[]
            state.isLoading=false
            state.errors=action.payload
        })

        .addCase(approveEvent.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(approveEvent.fulfilled,(state,action)=>{
            state.isLoading=false
            const index=state.data.findIndex(event=>event._id===action.payload._id)
            if(index!==-1){
                state.data[index]=action.payload
            }
            state.errors=null
        })
        .addCase(approveEvent.rejected,(state,action)=>{
            state.isLoading=false
            state.errors=action.payload
        })  

        .addCase(rejectEvent.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(rejectEvent.fulfilled,(state,action)=>{
             const index = state.data.findIndex(ele => ele._id === action.payload._id)
            if (index !== -1) {
                state.data[index] = action.payload
            }
        })
        .addCase(rejectEvent.rejected,(state,action)=>{
            state.isLoading=false
            state.errors=action.payload
        })

        .addCase(fetchUserEvents.pending, (state) => {      
            state.isLoading = true;
        })
        .addCase(fetchUserEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.errors = null;
        })
        .addCase(fetchUserEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.errors = action.payload;
        })

        .addCase(deleteEvent.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteEvent.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=state.data.filter(event=>event._id!==action.payload._id)
            state.errors=null
        })
        .addCase(deleteEvent.rejected,(state,action)=>{
            state.isLoading=false
            state.errors=action.payload
        })
         .addCase(updateEvent.pending, (state) => {
            state.isLoading = true;
            state.errors = null;
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.map(event =>
            event._id === action.payload._id ? action.payload : event
            );
            state.singleEvent = action.payload;
        })
        .addCase(updateEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        });

    }
})
export default eventSlice.reducer;

