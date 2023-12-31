/* eslint-disable react/prop-types */
import { Box, Grid, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MultiSelect from './MultiSelect'
import { useDispatch, useSelector } from 'react-redux'
import useRequest from 'hooks/useRequest'
import { PRODUCTS } from 'data/api'
import DeleteOffer from "../../assets/images/DeleteOffer.svg";
const Bannerbox = ({value,onChange}) => {
    const products=useSelector((state)=>state.products.value)
  const [viewProduct,setViewProduct]=useState()
  let Token = localStorage.getItem("token");
  const dispatch=useDispatch()
  const [RequestGetProducts, ResponseGetProducts] = useRequest({
    path: PRODUCTS,
    method: "get",
    Token: `Token ${Token}`,
  });
 const getProducts=()=>{
  RequestGetProducts({
    onSuccess: (res) => {
      // console.log(res.data)
      dispatch({ type: "products/set", payload: { ...res.data } });
    },
  });
}
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'16px'}}>
         <MultiSelect
         variant="outlined"
         placeholder={"Type here…"}
         label="Choose Product*"
         onOpen={getProducts}
         value={value}
         onChange={onChange}
         renderValue={(selected)=>{
          let resultproduct=products.results?.filter((product) => selected.includes(product.id))
                return resultproduct.map((ele)=>ele.name).join(" , ")
         }}
         sx={{ width: "100%" }}
       >
         {
           products?.results?.map((product)=>(
             <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
           ))
         }
       </MultiSelect>
       <Grid item>
            {
            
            products?.results?.filter((product)=>product.id===value?value:Array.isArray(value)&&value.includes(product.id)).map((product)=>(
            <Grid key={product.id} container >
              
              <Grid md={1.5} pl={1}>
                <img src={product.main_image} alt="product" style={{ width: "44px", height: "44px",borderRadius:'8px' }} />
              </Grid>
              <Grid md={9.5}>
                <Typography
                  sx={{
                    color: " #191B1C",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    pt:1
                  }}
                >
                  {product.name}
                </Typography>
              </Grid>
              <Grid md={1}>
                <Box sx={{display:'flex',justifyContent:'flex-end',pt:1}} onClick={''}>
                <img src={DeleteOffer} alt="delete" />
                </Box>
              </Grid>
            </Grid>
            ))}
          </Grid>
    </Box>
  )
}

export default Bannerbox