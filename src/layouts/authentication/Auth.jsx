import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router'
import PropTypes from "prop-types";
function Auth({children}) {
    const currentTime = new Date().getTime();
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
        const twentyFourHours = 24 * 60 * 60 * 1000;
    useEffect(()=>{
         // 24 hours in milliseconds
        if (currentTime - tokenTimestamp > twentyFourHours) {
            // Token has expired, delete it from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenTimestamp');
            localStorage.removeItem('shop_url')
            localStorage.removeItem('dashboard_url')
            localStorage.removeItem('shop_id')
            localStorage.removeItem('shop_name')
            localStorage.removeItem('image')
            localStorage.removeItem('email')
            localStorage.removeItem('phone')
          }
    },[
        currentTime
    ])
    // console.log()
   if(Boolean(localStorage.getItem("token"))===true) {
    return (
        <> {children}</>
        )
   }else{
    return (
        <> <Navigate to={"/login"}/></>
        )
   }
  
}

export default Auth
Auth.propTypes={
children:PropTypes.node
}