/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import React from "react";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import  Rankinghome from "layouts/rankinghome";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import RankingIcon from "examples/Icons/Rankinghome";
import mobile from './assets/images/mobile.svg'
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Customer from "layouts/customer";
import Employee from "layouts/employee";
import Products from "layouts/products/viewProducts";
import Category from "layouts/products/category";
import ViewSubscription from "layouts/mobile/viewmobileSub";
import Auth from "layouts/authentication/Auth";
import Job from "layouts/job";
import { element } from "prop-types";
import Attribute from "layouts/products/attribute";
import AttributeValue from "layouts/products/valuseAttribute";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddProduct from "layouts/products/addProduct";
import TextMobileStepper from "layouts/products/stepper";
import AddProductPanel from "layouts/products/addProductPanel";
import HomeSections from "layouts/home/homepage";
import Register from "layouts/authentication/authentication3/Register3";
import Login from "layouts/authentication/authentication3/Login3";
import Basket from "layouts/basket";
import GroupIcon from '@mui/icons-material/Group';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddNewEmployee from "layouts/employee/addNewEmployee";
import AddNewJob from "layouts/job/addNewJob";
import Addnewcategory from "layouts/products/addnewcategory";
import Order from "layouts/order"
import DetailOrder from "layouts/order/detailOrder"
import ContactUs from "layouts/ContactUs/ContactUs";
import Price from "layouts/Price/Price";
import Offers from "layouts/offers/offers";
import offers from './assets/images/offers.svg'
import AddNewOffers from "layouts/offers/addNewOffers";
import ArchiveOffers from "layouts/offers/archiveOffers";

import ViewBanners from "layouts/banners/viewBanners";
import AddNewBanner from "layouts/banners/addNewBanner";
import banner from "./assets/images/banner.svg"
import Report from "layouts/Report";
import ReportIcon from "examples/Icons/ReportIcon";
import ViewAddtionalPage from "layouts/AdditionalPage/ViewAddtionalPage";
import AddAddtionalPage from "layouts/AdditionalPage/AddAddtionalPage";
import Brands from "layouts/Brand/Brands";
import Coupon from "layouts/coupon";
import Vender from "layouts/vendor";

import CouponIcon from "examples/Icons/CouponIcon";
import AddCoupon from "layouts/coupon/addCoupon";
import ArchiveCoupon from "layouts/coupon/archiveCoupon";
import AdditionIcon from "examples/Icons/AdditionPage";
import MobileSubscription from "layouts/mobile/mobileSub";
import AddVendor from "layouts/vendor/addVendor";
const sub_domain = localStorage.getItem('sub_domain')

const routes = [
  {
    type:'title',
    name:'Home',
    key:'home',
    route:`/${sub_domain}/t1/`,
    component:<HomeSections/>,
    noCollapse:false,
  },
  {
    type:'title',
    name:'Home',
    key:'home',
    route:`*`,
    component:<HomeSections/>,
    noCollapse:false,
  },
  {
    type:'title',
    name:'ContactUS',
    key:'contactus',
    route:'/contactus',
    component:<ContactUs/>,
    noCollapse:false,
  },
  {
    type:'title',
    name:'Price',
    key:'price',
    route:'/price',
    component:<Price/>,
    noCollapse:false,
  },
  {
    type: "title",
    name: "Dashboard",
    key: "dashboard",
    route: `/:${sub_domain}/dashboard`,
    icon: <Shop size="12px" />,
    component: <Auth><Dashboard /></Auth>,
    noCollapse: false,
    permission:[]
  }, 
  { type: "title", title: "Pages", key: "pages" },
  {
    type: "collapse",
    name: "Statistics",
    key: "Statistics",
    route: `/${sub_domain}/dashboard/statistics`,
    icon: <AlignHorizontalLeftIcon size="12px" />,
    component: <Auth><Dashboard /></Auth>,
    noCollapse: false,
    permission:["view_statistics"]
  }, 
  {
    type: "collapse",
    name: "Report",
    key: "Report",
    route: `/${sub_domain}/dashboard/Report`,
    icon: <ReportIcon size="12px" />,
    component: <Auth><Report /></Auth>,
    noCollapse: false,
    permission:["view_reports"]
    
  }, 
  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: `${sub_domain}/dashboard/products`,
    icon: <InventoryIcon size="12px" />,
    component: <Auth><Products /></Auth>,
    noCollapse: true,
    permission:["view_productattribute","view_product"],
    children: [
      {
        key: "products",
        id: "attribute",
        path: `/${sub_domain}/dashboard/attribute`,
        title: "Attribute",
        element: <Auth><Attribute /></Auth>,
        type: "item",
        permission:["view_productattribute"]
      },
      {
        key: "products",
        id: "products",
        path: `/${sub_domain}/dashboard/products`,
        title: "products",
        element: <Auth><Products /></Auth>,
        type: "item",
        permission:["view_product"]
      },
      {
        key: "products",
        id: "category",
        title: "category",
        path: `/${sub_domain}/dashboard/products/category`,
        element: <Auth><Category /></Auth>,
        type: 'item',
        permission:["view_category"]
      },
    ]
  },
  {
    type: "collapse",
    name: "Order",
    key: "order",
    route: `/${sub_domain}/dashboard/orders`,
    icon: <Shop size="12px" />,
    component:  <Auth><Basket /></Auth>,
    noCollapse: true,
    permission:["view_order","view_historicalorder"],
    children: [
      {
        key: "order",
        id: "order",
        path: `/${sub_domain}/dashboard/order`,
        title: "order",
        element:  <Auth><Order /></Auth>,
        type: "item",
        permission:["view_order"]

      },
      {
        key: "order",
        id: "order",
        path: `/${sub_domain}/dashboard/abandonedbasket`,
        title: "abandoned basket",
        element: <Auth><Basket /></Auth>,
        type: "item",
        permission:["view_abandonedcart"]
      },
    ]
  },
  {
    type: "collapse",
    name: "Brands",
    key: "brands",
    route: `/${sub_domain}/dashboard/brands`,
    icon: <Shop size="12px" />,
    component:  <Auth><Brands /></Auth>,
    noCollapse: false,
    permission:["view_brand"],
   },
  { type: "title", title: "Discounts & Ads", key: "Discounts-&-Ads" },
  {
    type: "collapse",
    name: "Offers",
    key: "Offers",
    route: `/${sub_domain}/dashboard/offers`,
    icon: <img src={offers} size="12px" />,
    noCollapse: false,
    component: <Auth><Offers /></Auth>,
    permission:["view_productoffer"],
    // children: [{
    //   id: "Offers",
    //   path: `/${sub_domain}/dashboard/offers`,
    //   title: "offers",
    //   element: <Auth><Offers /></Auth>,
    //   type: "item",
    //   permission:["view_productoffer"],
    // }
    // ]
  }, {
    type: "collapse",
    name: "Archive Offers",
    key: "ArchiveOffers",
    route: `/${sub_domain}/dashboard/archiveOffer`,
    icon: <img src={offers} size="12px" />,
    noCollapse: false,
    component: <Auth><ArchiveOffers /></Auth>,
    permission:["view_productoffer"],
    // children: [{
    //   id: "Offers",
    //   path: `/${sub_domain}/dashboard/offers`,
    //   title: "offers",
    //   element: <Auth><Offers /></Auth>,
    //   type: "item",
    //   permission:["view_productoffer"],
    // }
    // ]
  },
  {
    type: "collapse",
    name: "Banners",
    key: "Banners",
    route: `/${sub_domain}/dashboard/banners`,
    icon: <img src={banner} size="12px" />,
    noCollapse: false,
    component: <Auth><ViewBanners /></Auth>,
    permission:["view_banner"],

    // children: [{
    //   id: "Banners",
    //   path: `/${sub_domain}/dashboard/banners`,
    //   title: "Banners",
    //   element: <Auth><ViewBanners /></Auth>,
    //   type: "item",
    //   permission:["view_banner"]

    // }
    // ]
  },
  {
    type: "collapse",
    name: "Coupons",
    key: "Coupons",
    route: `/${sub_domain}/dashboard/coupons`,
    icon: <CouponIcon />,
    noCollapse: false,
    component: <Auth><Coupon /></Auth>,
    permission:["view_coupon"]

  },  {
    type: "collapse",
    name: "Archive Coupons",
    key: "Archive_Coupons",
    route: `/${sub_domain}/dashboard/archiveCoupons`,
    icon: <CouponIcon />,
    noCollapse: false,
    component: <Auth><ArchiveCoupon /></Auth>,
    permission:["view_deletedcoupons"]

  },{
    type: "title",
    name: "Coupons",
    key: "Coupons",
    route: `/${sub_domain}/dashboard/addcoupons`,
    icon: <CouponIcon />,
    noCollapse: false,
    component: <Auth><AddCoupon /></Auth>
  },
  { type: "title", title: "Members", key: "Members" },
  {
    type: "collapse",
    name: "customer",
    key: "Customer",
    route: `/${sub_domain}/dashboard/customer`,
    icon: <GroupIcon size="12px" />,
    noCollapse: false,
    component: <Auth><Customer /></Auth>,
    permission:["view_customer"],
    // children: [{
    //   id: "Customer",
    //   path: `/${sub_domain}/dashboard/customer`,
    //   title: "Customer",
    //   element: <Auth><Customer /></Auth>,
    //   type: "item",
    //   permission:["view_customer"]
    // },
    // ]
  },
  {
    type: "collapse",
    name: "Employees",
    key: "Employees",
    route: `/${sub_domain}/dashboard/employee`,
    icon: <ManageAccountsIcon size="12px" />,
    noCollapse: true,
    component: <Auth><Employee /></Auth>,
    permission:["view_employee","view_employeejob"],
    children: [{
      id: "Employees",
      path: `/${sub_domain}/dashboard/employee`,
      title: "employee",
      element: <Auth><Employee /></Auth>,
      type: "item",
    permission:["view_employee"],

    }, {
      id: "Employees",
      path: `/${sub_domain}/dashboard/jobs`,
      title: "Jobs",
      element: <Auth><Job /></Auth>,
      type: "item",
      permission:["view_employeejob"]
    }
    ]
  }, {
    type: "collapse",
    name: "Vender",
    key: "Vender",
    route: `/${sub_domain}/dashboard/venders`,
    icon: <ManageAccountsIcon size="12px" />,
    noCollapse: false,
    component: <Auth><Vender /></Auth>,
    permission:["view_vendor"],
    
  },
  {
    type: "title",
    name: "Employees",
    key: "employees",
    route: `/${sub_domain}/dashboard/employee`,
    icon: <Office size="12px" />,
    component: <Auth><Employee /></Auth>,
    noCollapse: false
  }, {
    type: "title",
    name: "add vendor",
    key: "addVendor",
    route: `/${sub_domain}/dashboard/venders/addNewVendor`,
    icon: <Office size="12px" />,
    component: <Auth><AddVendor /></Auth>,
    noCollapse: false
  },{
    type: "title",
    name: "values",
    key: "valuse",
    route: `/${sub_domain}/dashboard/employee/addNewEmployee`,
    icon: <Shop size="12px" />,
    component: <Auth><AddNewEmployee /></Auth>,
    noCollapse: false
  },
  {
    type: "title",
    name: "Orders",
    key: "Orders",
    route: `/${sub_domain}/dashboard/order`,
    icon: <Office size="12px" />,
    component: <Auth><Order /></Auth>,
    noCollapse: false,
  },{
    type: "title",
    name: "Orders",
    key: "Orders",
    route: `/${sub_domain}/dashboard/order/:id`,
    icon: <Office size="12px" />,
    component: <Auth><DetailOrder /></Auth>,
    noCollapse: false,
  },
  // {
  //   type: "collapse",
  //   name: "Offers",
  //   key: "Offers",
  //   route: `/${sub_domain}/dashboard/offers`,
  //   icon: <img src={offers} size="12px" />,
  //   noCollapse: true,
  //   component: <Auth><Offers /></Auth>,
  //   children: [{
  //     key: "Offers",
  //     id: "Offers",
  //     path: `/${sub_domain}/dashboard/offers`,
  //     title: "offers",
  //     element: <Auth><Offers /></Auth>,
  //     type: "item"

  //   }
  //   ]
  // },
  {
    type: "title",
    name: "abandonedbasket",
    key: "abandonedbasket",
    route: `/${sub_domain}/dashboard/abandonedbasket`,
    icon: <Office size="12px" />,
    component: <Auth><Basket /></Auth>,
    noCollapse: false,
  },
  {
    type: "title",
    name: "Category",
    key: "category",
    route: `/${sub_domain}/dashboard/products/category`,
    icon: <Shop size="12px" />,
    component: <Auth><Category /></Auth>,
    noCollapse: false,
  },
  {
    type: "title",
    name: "AddnewCategory",
    key: "addnewCategory",
    route: `/${sub_domain}/dashboard/products/category/addnewCategory`,
    icon: <Shop size="12px" />,
    component: <Auth><Addnewcategory /></Auth>,
    noCollapse: false,
  },
  {
    type: "title",
    name: "Dashboard",
    key: "Dashboard",
    route: `/${sub_domain}/dashboard`,
    icon: <Office size="12px" />,
    component: <Auth><Dashboard /></Auth>,
    noCollapse: false,
  },
  {
    type: "title",
    name: "Jobs",
    key: "jobs",
    route: `/${sub_domain}/dashboard/jobs`,
    icon: <Shop size="12px" />,
    component: <Auth><Job /></Auth>,
    noCollapse: false
  },
 
  {
    type: "title",
    name: "Attribute",
    key: "Attribute",
    route: `/${sub_domain}/dashboard/attribute`,
    icon: <Shop size="12px" />,
    component: <Auth><Attribute /></Auth>,
    noCollapse: false,

  },
  {
    type: "title",
    name: "values",
    key: "valuse",
    route: `/${sub_domain}/dashboard/attribute/:id`,
    icon: <Shop size="12px" />,
    component: <Auth><AttributeValue /></Auth>,
    noCollapse: false,

  },
 
  {
    type: "title",
    name: "values",
    key: "valuse",
    route: `/${sub_domain}/dashboard/jobs/addNewJob`,
    icon: <Shop size="12px" />,
    component: <Auth><AddNewJob /></Auth>,
    noCollapse: false
  },
  
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  {
    type: "title",
    name: "Add new product",
    key: "Add new product",
    route: `/${sub_domain}/dashboard/products/addnewproduct`,
    icon: <Office size="12px" />,
    component:<Auth><AddProductPanel /></Auth> ,
     noCollapse: false,
  },
  {
    type: "title",
    name: "Add new offer",
    key: "Add new offer",
    route: `/${sub_domain}/dashboard/offers/addnewoffer`,
    icon: <Office size="12px" />,
    component:<Auth><AddNewOffers /></Auth> ,
     noCollapse: false,
  },
  {
    type: "title",
    name: "Add new banner",
    key: "Add new banner",
    route: `/${sub_domain}/dashboard/banners/addnewbanner`,
    icon: <Office size="12px" />,
    component:<AddNewBanner /> ,
     noCollapse: false
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: false,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: false,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: false,
  // },
  { type: "title", title: "Customize", key: "account-pages" },
  {
    type: "collapse",
    name: "Ranking home",
    key: "rankinghome",
    route: `/${sub_domain}/dashboard/rankinghome`,
    icon: <RankingIcon size="12px" />,
    component:<Auth> <Rankinghome /></Auth>,
    noCollapse: false,
    permission:["view_homecomponent"]
  },
  {
    type: "collapse",
    name: "Additional Page",
    key: "addtionalpage",
    route: `/${sub_domain}/dashboard/additionalpage`,
    icon: <AdditionIcon size="12px" />,
    component:<Auth> <ViewAddtionalPage /></Auth>,
    noCollapse: false,
    permission:[]

  },
  {
    type: "title",
    name: "Mobile subscription",
    key: "Mobile subscription",
    route: `/${sub_domain}/dashboard/mobilesubscription/viewsubscription`,
    icon: <img src={mobile} alt='mobile' size="12px" />,
    component:<Auth> <ViewSubscription /></Auth>,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Mobile subscription",
    key: "Mobile subscription",
    route: `/${sub_domain}/dashboard/mobilesubscription`,
    icon: <img src={mobile} alt='mobile' size="12px" />,
    component:<Auth> <MobileSubscription /></Auth>,
    noCollapse: false,
    permission:[]
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: `/${sub_domain}/dashboard/profile`,
    icon: <CustomerSupport size="12px" />,
    component:<Auth> <Profile /></Auth>,
    noCollapse: false,
    permission:[]

  },
  {
    type: "title",
    name: "Add New Page",
    key: "Add New Page",
    route: `/${sub_domain}/dashboard/additionalpage/addadditionalpage`,
    component:<Auth> <AddAddtionalPage /></Auth>,
    noCollapse: false,
  },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: <SignIn />,
  //   noCollapse: false,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp /> ,
  //   noCollapse: false,
  // },
  {
    type: "title",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: false,
  },
  {
    type: "title",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,

    component:<SignIn />,

    noCollapse: false,
  },
];

export default routes;
