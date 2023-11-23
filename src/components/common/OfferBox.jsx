import { Box, Container, Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import React from "react";
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

// eslint-disable-next-line react/prop-types
const OfferBox = ({ title,discount,value,onChange,type,typeChange,handleValueChange }) => {
  const products=useSelector((state)=>state.products.value)
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
          label="Choose product under the offer"
          onOpen={getProducts}
          value={value}
          onChange={onChange}
          renderValue={(selected)=>{
            return products.results.find((product)=>product.id===selected).name
          }}
          sx={{ width: "100%" }}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <SearchOutlinedIcon sx={{height:'16px',width:'16px'}}/>
          //     </InputAdornment>
          //   ),
          // }}
        >
          {
            products?.results?.map((product)=>(
              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
            ))
          }
        </SelectField>
        <Box>
          <Grid item>
            {products?.results?.map((product)=>(
            <Grid key={product.id} container>
              
              <Grid md={1.5}>
                <img src={product.main_image} alt="product" style={{ width: "44px", height: "44px" }} />
              </Grid>
              <Grid md={9.5}>
                <Typography
                  sx={{
                    color: " #191B1C",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {product.name}
                </Typography>
              </Grid>
              <Grid md={1}>
                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
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
