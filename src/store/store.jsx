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
import  PagesSlice   from './pages/pagesSlice';
import  ContentTypeSlice   from './contentTypesSlice';
import  SpecialCategorySlice   from './pages/specialCategorySlice';
import  HomeComponentSlice   from './pages/homeComponentSlice';
import  BrandSlice   from './pages/brandSlice';
import  NotificationSlice  from './pages/notificationSlice';
import  CouponSlice  from './pages/couponSlice';
import  PermissionSlice  from './pages/permissionSlice';
import  PermissionYourSlice  from './pages/yourPermissionSlice';
import  PopularBrandSlice  from './pages/popularbrandSlice';


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
     bannerstypes:BannersTypesSlice,
     pages:PagesSlice,
     content:ContentTypeSlice,
     specialCategory:SpecialCategorySlice,
     homeComponent:HomeComponentSlice,
     brand:BrandSlice,
     // totals:totalSlice,
     notification:NotificationSlice,
     coupon:CouponSlice,
     permission:PermissionSlice,
     permissionYour:PermissionYourSlice,
     popularbrand:PopularBrandSlice
  }
});
export default store









// {subscribtion.map(({ id, type, price, name, features }) => (
//   <TableRow key={id} sx={{ direction: 'rtl' }}>
    
//     {features.map((feature)=>(<TableCell sx={{ textAlign: 'right', bgcolor: '#f8f9fa' }}>
//       {feature}
//     </TableCell>))}
//     <Grid item xs={2} sx={{ padding: '16px', bgcolor: '#f8f9fa' }}>
//       <Item sx={{ fontSize: '16px', fontWeight: 600, color: '#272C2E', boxShadow: 'none', bgcolor: '#f8f9fa', fontFamily: 'Cairo' }}>{name}</Item>
//       <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none', bgcolor: '#f8f9fa', fontFamily: 'Cairo' }}>${price}</Item>
//       <Item sx={{ fontSize: '14px', fontWeight: 400, boxShadow: 'none', fontFamily: 'Inter', bgcolor: '#f8f9fa', fontFamily: 'Cairo' }}>{type}/</Item>
//       <ButtonBase sx={{ bgcolor: '#5D449B', borderRadius: '12px', width: '195px', boxShadow: 'none', color: '#faf8f9', padding: '10px', fontFamily: 'Cairo' }}>ابدأ تجربتك</ButtonBase>
//     </Grid>
//   </TableRow>
// ))}
