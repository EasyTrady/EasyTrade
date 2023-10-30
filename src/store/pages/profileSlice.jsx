import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    value: {
      profile:{}
    },
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("shop_name",state.value.shop_name)
      localStorage.setItem("logo",state.value.logo)
      localStorage.setItem("shop_url",state.value.shop_url)
      localStorage.setItem("dashboard_url",state.value.dashboard_url)
      localStorage.setItem("full_name",state.value.user.full_name)
      localStorage.setItem("phone",state.value.user.phone)
      localStorage.setItem("email",state.value.user.email)
      localStorage.setItem("sub_domain",state.value.sub_domain)
    },
   
  },
});

export default ProfileSlice.reducer;