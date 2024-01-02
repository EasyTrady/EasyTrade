import { Box, Container, Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import AddProductTitle from "./AddProductTitle";
import InputField from "./TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOffer from "../../assets/images/DeleteOffer.svg";
import image from "../../assets/images/Avatar.png";
import SelectValue from "./SelectValue";
import SelectValuePrecentage from "./SelectValuePrecentage";
import useRequest from "hooks/useRequest";
import { PRODUCTS } from "data/api";
import SelectField from "./SelectField";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY } from "data/api";

// eslint-disable-next-line react/prop-types
const OfferBoxCategory = ({ title,discount,value,onChange,type,typeChange,handleValueChange }) => {
  
  const category=useSelector((state)=>state.category.value)
  const [viewProduct,setViewProduct]=useState()
  let Token = localStorage.getItem("token");
  const dispatch=useDispatch()
  const [RequestGetCategories, ResponseGetCategories] = useRequest({
    path: CATEGORY,
    method: "get",
    Token: `Token ${Token}`,
  });
 const getCategories=()=>{
    RequestGetCategories({
    onSuccess: (res) => {
      
      dispatch({ type: "category/set", payload: res?.data  });
    },
  });
 }
function handleDeleteProduct(selected){
  
//   viewProduct.filter((product)=>product.id !==selected)
}

  return (
    <Box sx={{ borderRadius: "8px", background: "#fff",width:'100%',pb:'12px' }}>
      {Boolean(title)&&
      <AddProductTitle title={title} />
}
      <Container sx={{display:'flex',gap:'20px',flexDirection:'column',mt:'20px'}}>
        {Boolean(discount)&&
        <SelectValuePrecentage
        variant={'outlined'}
        label={'Discount'}
        type={type}
        onChange={typeChange}
        handleValueChange={handleValueChange}
        />
        }
        <SelectField
          variant="outlined"
          placeholder={"Type here…"}
          label="Choose category under the offer"
          onOpen={getCategories}
          value={value}
          onChange={onChange}
          renderValue={(selected)=>{
            if(category?.results?.length==0){
              getCategories()
            }
            
            return category?.results?.find((category)=>category.id===selected)?.name
          }}
          sx={{ width: "100%" }}
        >
          {
            category?.results?.map((category)=>(
              <MenuItem key={category?.id} value={category?.id}>{category?.name}</MenuItem>
            ))
          }
        </SelectField>
        <Box>
          <Grid item>
            {
            
            category?.results?.filter((category)=>category?.id===value)?.results?.map((category)=>(
            <Grid key={category?.id} container >
              
              <Grid md={1.5} pl={1}>
                <img src={category?.image} alt="product" style={{ width: "44px", height: "44px",borderRadius:'8px' }} />
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
                  {category?.name}
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
      </Container>
    </Box>
  );
};

export default OfferBoxCategory;
