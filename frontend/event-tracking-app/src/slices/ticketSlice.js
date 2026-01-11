import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../config/axios"

export const bookTicket = createAsyncThunk("tickets/book",async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/ticket/book", data,{headers:{Authorization:localStorage.getItem("token")}})
      return res.data.ticket
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchMyTickets = createAsyncThunk("tickets/my",async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/tickets/my",{headers:{Authorization:localStorage.getItem("token")}})
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)


export const cancelTicket = createAsyncThunk("tickets/cancel",async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/ticket/cancel/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
      return id
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)


export const verifyQR = createAsyncThunk("tickets/verifyQR",async (qrData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/tickets/verify-qr", { qrData },{headers:{Authorization:localStorage.getItem("token")}})
      return res.data.ticket
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const bookedUsers = createAsyncThunk("tickets/bookedUsers",async (undefined, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/organiser/booking`, {headers: { Authorization: localStorage.getItem("token") }})
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)


export const totalTickets=createAsyncThunk("tickets/totalTickets",async(undefined,{rejectWithValue})=>{
    try{
        const res=await axios.get("/organiser/tickets/count",{headers:{Authorization:localStorage.getItem("token")}})
        return res.data.total;
    }catch (err) {
      return rejectWithValue(err.response.data)
    }
})

export const ticketsPerEvent = createAsyncThunk(
  "tickets/ticketsPerEvent",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/organiser/tickets-per-event", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);



const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    myTickets: [],
    bookedUsersList: [], 
    totalTickets: 0, 
    ticketsPerEventList: [],

    loading: false,
    error: null
  },
  extraReducers: builder => {
    builder
    .addCase(fetchMyTickets.pending, s => {
        s.loading = true
    })
    .addCase(fetchMyTickets.fulfilled, (s, a) => {
        s.loading = false
        s.myTickets = a.payload
    })
    .addCase(bookTicket.fulfilled, (s, a) => {
        s.myTickets.push(a.payload)
    })
    .addCase(cancelTicket.fulfilled, (s, a) => {
        s.myTickets = s.myTickets.filter(t => t._id !== a.payload)
    })
    .addCase(verifyQR.pending,(s)=>{
        s.loading=true
    })
    .addCase(verifyQR.fulfilled, (s, a) => {
        s.loading = false
        const index = s.myTickets.findIndex(t => t._id === a.payload._id)
        if (index !== -1) {
            s.myTickets[index] = a.payload
        }
    })
    .addCase(verifyQR.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload?.error || "QR verification failed"
    })
    .addCase(bookedUsers.pending, s => {
        s.loading = true;
        s.error = null;
    })
    .addCase(bookedUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.bookedUsersList = a.payload;
    })
    .addCase(bookedUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.error || "Failed to fetch booked users";
    })
    .addCase(totalTickets.pending,(s)=>{
        s.loading=true
    })
    .addCase(totalTickets.fulfilled, (s, a) => {
        s.loading = false;
        s.totalTickets = a.payload; 
    })
    .addCase(totalTickets.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.err || "Failed to load tickets";
    })
    .addCase(ticketsPerEvent.fulfilled, (state, action) => {
      state.ticketsPerEventList = action.payload;
    });

    

  }
})

export default ticketSlice.reducer
