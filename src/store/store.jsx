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
import  OrdersSlice  from './pages/orderSlice';

import CartSlice  from './pages/cartSlice';
import ProductsSlice  from './pages/productSlice';
import OffersSlice  from './pages/offersSlice';
import  OffersTypesSlice  from './pages/offerTypesSlice';
import  BannersTypesSlice  from './pages/bannerTypesSlice';
import  BannersSlice  from './pages/bannersSlice';

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
    orders:OrdersSlice,
    // registration:registrationSlice
     profile:ProfileSlice ,
     cart:CartSlice,
     products:ProductsSlice,
     offers:OffersSlice,
     offerstypes:OffersTypesSlice,
     banners:BannersSlice,
     bannerstypes:BannersTypesSlice
  }
});
export default store