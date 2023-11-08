import { createSlice } from "@reduxjs/toolkit";

export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    value:[],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value =[];
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter(
        (item) => item.id !== action.payload.id
      );
      state.value.count = state.value.count - 1;
    },
    addItem: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    putItem: (state, action) => {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.splice(index, 1, action.payload.item);
    },
    patchItem: (state, action) => {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.splice(index, 1, {
        ...state.value[index],
        ...action.payload.item,
      });
    },addSubCategory:(state,action)=>{
        console.log(state.value)
       state.value.find((ele)=>ele.id===action.payload.idCategory)["subCategory"]=action.payload.subCategory
    }
  },
});

export default CategorySlice.reducer;