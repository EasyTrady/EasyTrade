import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import FakePege from 'views/pages/fakePage/fakePege';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin3 />
    },
    {
      path: 'register',
      element: <AuthRegister3 />,
    },
    {
      path: 'register/creatingshop',
      element: <FakePege />
    }
  ]
};

export default AuthenticationRoutes;
