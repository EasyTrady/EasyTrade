import subscriptionSlice from './pages/subscribition';
// import customizationSlice from './customizationReducer'
import { configureStore } from '@reduxjs/toolkit';
// import { registrationSlice } from './pages/signupslice';
import customerSlice from './pages/customerSlice';
import  registrationSlice  from './pages/signupslice';
import  EmployeeSlice  from './pages/employeeSlice';
import  CategorySlice  from './pages/categoriesSlice';
const store = configureStore({
  reducer: {
    // customization: customizationSlice,
    subscribtion: subscriptionSlice,
    registration:registrationSlice,
    customer:customerSlice,
    employee:EmployeeSlice,
    category:CategorySlice
    // registration:registrationSlice
  }
});
export default store