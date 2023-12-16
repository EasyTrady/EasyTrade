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
import useRequest from "hooks/useRequest";
import { ORDERANALYSIS } from "data/api";
import React, { useEffect, useState } from 'react'
let Token = localStorage.getItem("token");

export function GradientLine(){
  let [gradientLineChartData,setGradient]=useState({
    labels: [],
    datasets: [],
  })
  const [orderAnalysisRequest, getorderAnalysisResponce] = useRequest({
    path: ORDERANALYSIS,
    method: "get",
    Token: `Token ${Token}`,
  });
  useEffect(()=>{
    orderAnalysisRequest({
      onSuccess:(res)=>{
        setGradient({labels:res.data.map((ele)=>ele?.month),datasets:[{
          
          color: "#347AE2",
          data:res.data.map((ele)=>ele?.total_amount) ,
        }]})
        
      }
    })
  },[])
  return gradientLineChartData
}




export default GradientLine;
