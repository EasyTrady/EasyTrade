import React from 'react'
import { useEffect } from 'react'
import { Navigate ,useNavigate} from 'react-router'
import PropTypes from "prop-types";
function Auth({children}) {
    const currentTime = new Date().getTime();
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
   let navigate=useNavigate()
    useEffect(()=>{
         // 24 hours in milliseconds
         console.log(currentTime)
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
            navigate("/authentication/sign-in")
          }
    },[
        currentTime
    ])
    console.log(Boolean(localStorage.getItem("token")))
   if(Boolean(localStorage.getItem("token"))==true) {
    console.log("hjhfyfyfyy")
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