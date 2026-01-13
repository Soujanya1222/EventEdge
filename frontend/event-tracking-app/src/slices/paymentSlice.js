import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../config/axios"

export const createOrder = createAsyncThunk("payment/createOrder",async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/create-order", data)
      return res.data.order
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const verifyPayment = createAsyncThunk("payment/verify",async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/verify-payment", data)
      return res.data.payment
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const paymentSlice = createSlice({
  name: "payment",
  initialState: { order: null, payment: null, loading: false },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, s => { s.loading = true })
      .addCase(createOrder.fulfilled, (s, a) => {
        s.loading = false
        s.order = a.payload
      })
      .addCase(verifyPayment.fulfilled, (s, a) => {
        s.payment = a.payload
      })
  }
})

export default paymentSlice.reducer
