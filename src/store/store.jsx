import subscriptionSlice from './pages/subscribition';
// import customizationSlice from './customizationReducer'
import { configureStore } from '@reduxjs/toolkit';
// import { registrationSlice } from './pages/signupslice';
import customerSlice from './pages/customerSlice';
import  registrationSlice  from './pages/signupslice';
import  EmployeeSlice  from './pages/employeeSlice';
import  CategorySlice  from './pages/categoriesSlice';
import  JobSlice  from './pages/jobSlice';
import ProfileSlice  from './pages/profileSlice';
import  attributeSlice  from './pages/attributeSlice';
// import  CategorySlice  from './pages/categoriesSlice';

import CartSlice  from './pages/cartSlice';
import ProductsSlice  from './pages/productSlice';

const store = configureStore({
  reducer: {
    // customization: customizationSlice,
    subscribtion: subscriptionSlice,
    registration:registrationSlice,
    customer:customerSlice,
    employee:EmployeeSlice,
    category:CategorySlice,
    job:JobSlice,
    attribute:attributeSlice,
    // registration:registrationSlice
     profile:ProfileSlice ,
     cart:CartSlice,
     products:ProductsSlice,
    //  category:CategorySlice
  }
});
export default store