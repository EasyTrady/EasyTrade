import { createSlice } from "@reduxjs/toolkit";

export const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    value: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
    },
    deleteItem: (state, action) => {
      state.value.results = state.value.results.filter(
        (item) => item.id !== action.payload.id
      );
      state.value.count = state.value.count - 1;
    },
    addItem: (state, action) => {
      state.value.results = [action.payload, ...state.value.results];
    },
    putItem: (state, action) => {
      const index = state.value.results.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.results.splice(index, 1, action.payload.item);
    },
    patchItem: (state, action) => {
      const index = state.value.results.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.results.splice(index, 1, {
        ...state.value.results[index],
        ...action.payload.item,
      });
    },addNewProperty: (state, action) => {
      state.value.results.find((ele)=>ele.id==action.payload.id)["variant_attributes"]=action?.payload?.item?.map((elem)=>elem)
    },updateVariantProperty: (state, action) => {
      state.value.results.find((ele)=>ele.id==action.payload.id)["variant_attributes"].map((ele)=>ele.id==action.payload.idvariant?action?.payload?.item:ele)
    },
    addVariantProperty: (state, action) => {
    state.value.results.find((ele)=>ele.id==action.payload.id)["variant_attributes"].push(action?.payload?.item)
      
    },deleteVariantProperty: (state, action) => {
      state.value.results =  state.value.results?.map((ele)=>ele?.id==action.payload.id?{...ele,variant_attributes:ele.variant_attributes.filter((elem)=>elem.id!=action.payload.idVariant)}:ele)
    },
  }
});

export default ProductsSlice.reducer;