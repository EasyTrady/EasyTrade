/* eslint-disable prettier/prettier */
import { useRoutes } from 'react-router-dom';
import {useEffect}from "react"
// routes
import MainRoutes, { DefaultRout, WebsiteRout } from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PageRoute from './PageRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  useEffect(()=>{

  },[useRoutes])
  return useRoutes([DefaultRout,WebsiteRout, MainRoutes, AuthenticationRoutes,PageRoute]);
}
