import { createSlice } from "@reduxjs/toolkit";

export const BannersTypesSlice = createSlice({
  name: "bannerstypes",
  initialState: {
    value:[]
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    reset: (state) => {
      state.value = [];
    },
    deleteItem: (state, action) => {
      state.value.results = state.value.results.filter(
        (item) => item.id !== action.payload.id
      );
      state.value.count = state.value.count - 1;
    },
    addItem: (state, action) => {
      state.value= [action.payload, ...state.value];
    },
   
  },
});

export default BannersTypesSlice.reducer;