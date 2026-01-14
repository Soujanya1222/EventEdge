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
  initialState: { 
    order: null, 
    payment: null, 
    loading: false 
  },
   reducers: {
    clearPaymentState: state => {
      state.order = null;
      state.payment = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyPayment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer
