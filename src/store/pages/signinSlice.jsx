import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UserSignin = createAsyncThunk('userSignin', async (data, ThunkApi) => {
  try {
    const response = await axios.post('https://easytradyapi.shop/accounts/auth/login/', {
      ...data
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
   
    return response.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data);
  }
});
const initialState = {
  user: {},
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = {};
      })
      .addCase(UserSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success(`Welcom Back`);
       
      })
      .addCase(UserSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
       
      });

  }
});

export default authSlice.reducer;
