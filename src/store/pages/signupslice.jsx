import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const SignupUser = createAsyncThunk('signupUser', async (formData, ThunkApi) => {
  
  try {
    const response = await axios.post(`https://easytradyapi.shop/accounts/shop/create/`, formData);

    return response.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data);
  }
});

export const GetShopInfo = createAsyncThunk('GetShopInfo', async ({sub_domain_name,token}, ThunkApi) => {
  try {
  
    if(Boolean(sub_domain_name)===true){
      const response = await axios.get(`https://easytradyapi.shop/accounts/shop/info/${sub_domain_name}`);
      return response.data;

    }else{
      const response = await axios.get(`https://easytradyapi.shop/accounts/shop/info/`,{headers:{Authorization:`Token ${token}`}});
      return response.data;
    }
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data);
  }
});
export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    loading: false,
    shopLoading: false,
    error: null,
    shopError: null,
    user: {},
    shop: {},
    errorMessage: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignupUser.pending, (state) => {
        state.signUploading = true;
        state.user = {};
        state.signupError = [];
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.signUploading = false;
        state.user = action.payload;
        
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errorMsg = action.payload;
      });
    //get shop information
    builder
      .addCase(GetShopInfo.pending, (state) => {
        state.shopLoading = true;
        state.shop = {};
        state.shopError = null;
      })
      .addCase(GetShopInfo.fulfilled, (state, action) => {
        state.shopLoading = false;
        state.shop = action.payload;
      })
      .addCase(GetShopInfo.rejected, (state, action) => {
        state.shopLoading = false;
        state.shopError = action.error.message;
      });
  }
});

export const { registrationRequest, registrationSuccess, registrationFailure } = registrationSlice.actions;

export default registrationSlice.reducer;
