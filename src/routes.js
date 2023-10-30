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
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Customer from "layouts/customer";
import Employee from "layouts/employee";
import Products from "layouts/products/viewProducts";

import Auth from "layouts/authentication/Auth";
import Job from "layouts/job";
import { element } from "prop-types";
import Attribute from "layouts/products/attribute";
import AttributeValue from "layouts/products/valuseAttribute";

import AddProduct from "layouts/products/addProduct";
import TextMobileStepper from "layouts/products/stepper";

const shop_name = localStorage.getItem('shop_name')
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: `/${shop_name}/dashboard`,
    icon: <Shop size="12px" />,
    component: <Auth><Dashboard /></Auth>,
    noCollapse: false,
    children: [
      {
        path: `/${shop_name}`,
        title: "shop",
        element: <Auth><Dashboard /></Auth>,
        type:"item"
      }]
  },
  // {
  //   type: "title",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   route: `/${shop_name}`,
  //   icon: <Shop size="12px" />,
  //   component: <Auth><Dashboard /></Auth>,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "user",
    key: "User",
    route: `/${shop_name}/dashboard/customer`,
    icon: <Office size="12px" />,
    noCollapse: true,
    component: <Auth><Customer /></Auth>,
    children:[{
     
        id:"customer",
        path:`/${shop_name}/dashboard/customer`,
        title: "Customer",
        element:  <Auth><Customer /></Auth>,
        type:"item"
      
    },{
     
      id:"Employees",
      path:`/${shop_name}/dashboard/employee`,
      title: "employee",
      element:  <Auth><Employee /></Auth>,
      type:"item"
    
  },{
     
    id:"Jobs",
    path:`/${shop_name}/dashboard/jobs`,
    title: "Jobs",
    element:  <Auth><Job /></Auth>,
    type:"item"
  
}
]},
  {
    type: "title",
    name: "Employees",
    key: "employees",
    route: `/${shop_name}/dashboard/employee`,
    icon: <Office size="12px" />,
    component: <Auth><Employee /></Auth>,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: `/${shop_name}/dashboard/products`,
    icon: <Shop size="12px" />,
    component: <Auth><Products /></Auth>,
    noCollapse: true,
    children: [
      {
        id:"attribute",
        path: `/${shop_name}/dashboard/attribute`,
        title: "Attribute",
        element: <Auth><Attribute /></Auth>,
        type:"item"
      },
      {
        id:"products",
        path: `/${shop_name}/dashboard/products`,
        title: "products",
        element: <Auth><Products /></Auth>,
        type:"item"
      },
      ]
  },
  {
    type: "title",
    name: "Jobs",
    key: "jobs",
    route: `/${shop_name}/dashboard/jobs`,
    icon: <Shop size="12px" />,
    component: <Auth><Job /></Auth>,
    noCollapse: false,
  },
  {
    type: "title",
    name: "Attribute",
    key: "Attribute",
    route: `/${shop_name}/dashboard/attribute`,
    icon: <Shop size="12px" />,
    component: <Auth><Attribute /></Auth>,
    noCollapse: false,

  },
  {
    type: "title",
    name: "values",
    key: "valuse",
    route: `/${shop_name}/dashboard/attribute/:id`,
    icon: <Shop size="12px" />,
    component: <Auth><AttributeValue/></Auth>,
    noCollapse: false,

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
   { type: "collapse",
    name: "Add new product",
    key: "Add new product",
    route: `/${shop_name}/dashboard/products/addnewproduct`,
    icon: <Office size="12px" />,
    component: <TextMobileStepper />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: false,
  },
];

export default routes;
