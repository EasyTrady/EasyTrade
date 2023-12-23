import { createSlice } from "@reduxjs/toolkit";

export const attributeSlice = createSlice({
  name: "attribute",
  initialState: {
    value:[],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = [];
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
    },
    addValues:(state,action)=>{
      
      state.value.find((ele)=>ele.id==action.payload.idattribute)["values"]=action?.payload?.values?.map((elem)=>elem)
    },
    deleteValueofAttribute:(state,action)=>{
      state.value.find((ele)=>ele.id==action.payload.idattribute)["values"]=state.value.find((ele)=>ele.id==action.payload.idattribute)["values"]?.filter((elem)=>elem.id!=action.payload.idValue)
    },addValue:(state,action)=>{
      state.value.find((ele)=>ele.id==action.payload.idvalue)["values"]?state.value.find((ele)=>ele.id==action.payload.idvalue)["values"].push(action.payload.value):state.value.find((ele)=>ele.id==action.payload.idvalue)["values"]=[action.payload.value]
    },editValue:(state,action)=>{
     
      state.value=state.value.map((ele)=>ele.id==action.payload.id?{...ele,values:ele.values.map((elem)=>elem.id==action.payload.idvalue?action.payload.item:elem)}:ele)
    }
  },
});

export default attributeSlice.reducer;