import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";
export const createCouponAction = createAsyncThunk("coupon/create",async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/coupon/create", formData,{headers:{Authorization:localStorage.getItem("token")}});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchCouponsAction=createAsyncThunk("coupon/list",async(undefined,{rejectWithValue})=>{
    try{
        const res=await axios.get("/coupons",{headers:{Authorization:localStorage.getItem("token")}})
        return res.data;
    }catch(err){
        return rejectWithValue(err.response?.data)
    }
})

export const applyCoupon=createAsyncThunk("coupon/apply",async({code,eventId},{rejectWithValue})=>{
    try{
        const res=await axios.post("/coupon/apply",{code,eventId},{headers:{Authorization:localStorage.getItem("token")}})
        return res.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const updateCouponAction = createAsyncThunk(
  "coupon/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/coupon/${id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const deleteCouponAction = createAsyncThunk(
  "coupon/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `/coupon/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    data: [],
    appliedCoupon: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCoupon(state) {
      state.appliedCoupon = null;
      state.error = null;
    }
},
  extraReducers: (builder) => {
    builder
    .addCase(createCouponAction.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(createCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
    })
    .addCase(createCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(fetchCouponsAction.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchCouponsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(fetchCouponsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedCoupon = action.payload;
    })
    .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateCouponAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCouponAction.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
    .addCase(updateCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteCouponAction.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (c) => c._id !== action.payload._id
        );
      });
  



    }
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
