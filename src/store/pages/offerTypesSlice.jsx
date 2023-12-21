import { createSlice } from "@reduxjs/toolkit";

export const OffersTypesSlice = createSlice({
  name: "offerstypes",
  initialState: {
    value:[]
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
     
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

export default OffersTypesSlice.reducer;