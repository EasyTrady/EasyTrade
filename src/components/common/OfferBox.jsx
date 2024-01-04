/* eslint-disable react/prop-types */
import { Box, Container, Grid, InputAdornment, MenuItem, Typography ,InputLabel} from "@mui/material";
import React, { useState } from "react";
import AddProductTitle from "./AddProductTitle";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from "react-i18next";
import InputField from "./TextField";
import SoftInput from "components/SoftInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOffer from "../../assets/images/DeleteOffer.svg";
import image from "../../assets/images/Avatar.png";
import SelectValue from "./SelectValue";
import SelectValuePrecentage from "./SelectValuePrecentage";
import useRequest from "hooks/useRequest";
import { PRODUCTS } from "data/api";
import SelectField from "./SelectField";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "./MultiSelect";

// eslint-disable-next-line react/prop-types
const OfferBox = ({ title,discount,value,onChange,type,typeChange,handleValueChange,select,muliple }) => {
  let { t } = useTranslation("common");
  
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
function handleDeleteProduct(selected){
  
  viewProduct.filter((product)=>product.id !==selected)
}
// console.log(products.results?.filter((product) => value.includes(product.id)))
  return (
    <Box sx={{ borderRadius: "8px", background: "#fff",width:'100%',pb:'12px' }}>
      {Boolean(title)&&
      <AddProductTitle title={title} />
}
      <Container sx={{display:'flex',gap:'20px',flexDirection:'column',mt:'20px'}}>
        {/* {Boolean(discount)&&<>
         <InputLabel htmlFor="outlined-adornment-email-register" sx={{  fontSize: "14px" }}>{t("discount")}</InputLabel>
          {console.log(discount,type)}
         <SoftInput
                               id="outlined-adornment-password"
                               type={'text'}
                                icon ={{ component: <KeyboardArrowDownIcon />, direction: "right" }}

                               value={discount}
                               sx={{ ".MuiInputBase-root": { overflow: "hidden !important", padding: "0px !important",border:"unset" } }}
                               onChange={handleValueChange}
                               InputProps={{
                                   endAdornment:
                                       (
                                           <SoftInput
                                               select
                                               value={type?"%":"$"}
                                                sx={{ ".MuiInputBase-root": { border: "unset" } ,width:"10% !important"}}
                                               onChange={onChange}
                                             
                                               SelectProps={{
                                                   defaultValue: "",
                                                   displayEmpty: true,
                                                   renderValue: (selected) => {
                                                       if (!Boolean(selected)) {
                                                           return (
                                                               "%"
                                                           );
                                                       } else {

                                                           return selected;
                                                       }
                                                   },
                                                   MenuProps: {
                                                       PaperProps: {
                                                           sx: {
                                                               maxHeight: "200px",
                                                               overflowY: "auto",
                                                               backgroundColor: "white !important"
                                                           },
                                                       },
                                                   },
                                               }}

                                           >
                                               {["%", "$"]?.map((ele, index) => <MenuItem value={ele} key={index}>{ele}</MenuItem>)}
                                           </SoftInput>)
                               }} />
                               </>
        
        } */}
        {Boolean(select)&&
        <SelectField
          variant="outlined"
          placeholder={"Type here…"}
          label="Choose product under the offer"
          onOpen={getProducts}
          value={value}
          onChange={onChange}
          renderValue={(selected)=>{
            return products.results.find((product)=>product.id===selected).name
          }}
          sx={{ width: "100%" }}
        >
          {
            products?.results?.map((product)=>(
              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
            ))
          }
        </SelectField>
        }
        {Boolean(muliple)&&
         <MultiSelect
         variant="outlined"
         placeholder={"Type here…"}
         label="Choose product under the offer"
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
        }

        <Box>
          <Grid item>
            {
            
            products?.results?.filter((product)=>product.id===value?value:Array.isArray(value)&&value.includes(product.id)).map((product)=>(
            <Grid key={product.id} container>
              
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
                <Box sx={{display:'flex',justifyContent:'flex-end',pt:1}} onClick={()=>value==product.id||value.includes(product.id)?onChange({target:{value:""}}):null}>
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

export default OfferBox;
