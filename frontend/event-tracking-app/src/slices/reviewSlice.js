import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const createReview = createAsyncThunk("reviews/createReview",async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/review/create", reviewData, {headers: { Authorization: localStorage.getItem("token") }});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to create review");
    }
  }
);

export const fetchEventReviews = createAsyncThunk("reviews/fetchEventReviews",async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reviews/event/${eventId}`, {headers: { Authorization: localStorage.getItem("token") }});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch reviews");
    }
  }
);

export const fetchOrganiserReviews = createAsyncThunk("reviews/fetchOrganiserReviews",async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/reviews/organiser", {headers: { Authorization: localStorage.getItem("token") }});
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch organiser reviews"
      );
    }
  }
);


const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    isLoading: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
    .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
    })
    .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload);
    })
    .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
    })
    .addCase(fetchEventReviews.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
    })
    .addCase(fetchEventReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
    })
    .addCase(fetchEventReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
    })
    .addCase(fetchOrganiserReviews.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(fetchOrganiserReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
    })
    .addCase(fetchOrganiserReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
    });

  },
});

export default reviewSlice.reducer;
