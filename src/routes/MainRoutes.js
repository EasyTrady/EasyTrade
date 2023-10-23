import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import HomeSections from 'views/pages/home/homepage';
// import CustomerDetails from 'views/pages/customer/CustomerDetails';
// import Customer from 'views/pages/customer/Customer';
import Auth from 'custom/common/Auth';
// import Employee from 'views/pages/employee/Employee';
// import EmployeeDetails from 'views/pages/employee/EmployeeDetails';
// import Login from 'views/pages/authentication/authentication3/Login3';
// import ViewProducts from 'views/pages/products/viewProducts';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const HomeSections = Loadable(lazy(() => import('views/pages/home/homepage')));
const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));

// utilities routing
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
// const ViewProducts = Loadable(lazy(() => import('views/pages/products/viewProducts')));
const shop_name=localStorage.getItem('shop_name')
// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
export const DefaultRout = {
  path: `/`,
  element: <HomeSections />
};
export const WebsiteRout = {
  path: `/${shop_name}`,
  element: <HomeSections />
};
const MainRoutes = {
  path: ``,
  element: <MainLayout />,
  children: [
    {
      path: `/${shop_name}/dashboard`,
      children: [
        {
          path: '',
          element: <Auth>{<DashboardDefault />}</Auth>
        },

        // {
        //   path: `products`,
        //   children: [
        //     {
        //       path: '',
        //       element: <Auth><ViewProducts /></Auth>
        //     }
        //   ]
        // },{
        //   path:`customer`,
        //   children:[{path:`:id`,element:<Auth><CustomerDetails/></Auth>},{path:"",element:<Auth><Customer/></Auth>}]
        // }, {
        //   path:`employee`,
        //   children:[{path:`:id`,element:<Auth><EmployeeDetails/></Auth>},{path:"",element:<Auth><Employee/></Auth>}]
        // },
       
      ]
    },
   
   
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: <UtilsColor />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-shadow',
    //       element: <UtilsShadow />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // },
  ]
};

export default MainRoutes;
