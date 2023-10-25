import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router'

function Auth({children}) {
    const currentTime = new Date().getTime();
    useEffect(()=>{
        const tokenTimestamp = localStorage.getItem('tokenTimestamp');
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (currentTime - tokenTimestamp > twentyFourHours) {
            // Token has expired, delete it from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenTimestamp');
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