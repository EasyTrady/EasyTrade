import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router'
import PropTypes from "prop-types";
function Auth({children}) {
    const currentTime = new Date().getTime();
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
   
    useEffect(()=>{
         // 24 hours in milliseconds


        if (currentTime  > tokenTimestamp) {
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
            localStorage.removeItem('sub_domain')
          }
    },[
        currentTime
    ])
    // console.log(currentTime - tokenTimestamp > twentyFourHours,Boolean(localStorage.getItem("token")))
    console.log(Boolean(localStorage.getItem("token"))===true,children)
   if(Boolean(localStorage.getItem("token"))===true) {
    console.log(children)
    return (
        children
        )
   }else{
    return <Navigate to={"/authentication/sign-in"}/>
   }
  
}

export default Auth
Auth.propTypes={
children:PropTypes.node
}