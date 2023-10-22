const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
// const axios  = require('axios');
import axios from 'axios';

export const Subscribtion = createAsyncThunk('Subscribtion', async (type, ThunkApi) => {
  
  try {
    const response = await axios.get(`https://easytradyapi.shop/subscriptions/?type=${type}`);
    return response.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data);
  }
});

const subscriptionSlice = createSlice({
  name: 'subscribtion',
  initialState: {
    loading: false,
    error: null,
    subscribtion: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Subscribtion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.subscribtion = [];
      })
      .addCase(Subscribtion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscribtion = action.payload;
      })
      .addCase(Subscribtion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export default subscriptionSlice.reducer;
