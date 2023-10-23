// import { lazy } from 'react';

// // project imports
// import Loadable from 'ui-component/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';
// import FakePege from 'views/pages/fakePage/fakePege';
import CustomerDetails from 'views/pages/customer/CustomerDetails';
import Customer from 'views/pages/customer/Customer';
import Auth from 'custom/common/Auth';
import Employee from 'views/pages/employee/Employee';
import EmployeeDetails from 'views/pages/employee/EmployeeDetails';
import MainLayout from 'layout/MainLayout';
import ViewProducts from 'views/pages/products/viewProducts';
import Category from 'views/pages/category/category';

// login option 3 routing


// ==============================|| AUTHENTICATION ROUTING ||============================== //
const shop_name=localStorage.getItem('shop_name')
const PageRoute = {
  path: '',
  element: <MainLayout />,
  children: [
    {
        path: `/${shop_name}/dashboard`,
        children: [
            {
                path: `product`,
                children: [
                  {
                    path: '',
                    element: <Auth><ViewProducts /></Auth>
                  }, {
                    path: 'category',
                    element: <Auth><Category /></Auth>
                  }
                ]
              },{
                path:`customer`,
                children:[{path:`:id`,element:<Auth><CustomerDetails/></Auth>},{path:"",element:<Auth><Customer/></Auth>}]
              }, {
                path:`employee`,
                children:[{path:`:id`,element:<Auth><EmployeeDetails/></Auth>},{path:"",element:<Auth><Employee/></Auth>}]
              },
        ]
    },
    
  ]
};

export default PageRoute;