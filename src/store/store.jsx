import subscriptionSlice from './pages/subscribition';
// import customizationSlice from './customizationReducer'
import { configureStore } from '@reduxjs/toolkit';
// import { registrationSlice } from './pages/signupslice';
import customerSlice from './pages/customerSlice';
import  registrationSlice  from './pages/signupslice';
import  EmployeeSlice  from './pages/employeeSlice';
import  CategorySlice  from './pages/categoriesSlice';
<<<<<<< HEAD
import  JobSlice  from './pages/jobSlice';
=======
import ProfileSlice  from './pages/profileSlice';
>>>>>>> 032f8b6ef89253e06270a648ffa63b7e09ac8bb5
const store = configureStore({
  reducer: {
    // customization: customizationSlice,
    subscribtion: subscriptionSlice,
    registration:registrationSlice,
    customer:customerSlice,
    employee:EmployeeSlice,
    category:CategorySlice,
<<<<<<< HEAD
    job:JobSlice
    // registration:registrationSlice
=======
     profile:ProfileSlice 
>>>>>>> 032f8b6ef89253e06270a648ffa63b7e09ac8bb5
  }
});
export default store