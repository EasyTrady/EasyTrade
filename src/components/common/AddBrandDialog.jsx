/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import RadioButton from "./RadioButton";
import SoftButton from "components/SoftButton";
import useControls from "hooks/useControls";
import InputField from "./TextField";
import SelectField from "./SelectField";
import useRequest from "hooks/useRequest";
import { CATEGORY } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import imgframe from "../../assets/images/Frame 41363.png";
import MultiSelect from "./MultiSelect";
import { POPULARBRANDS } from "data/api";
import Delete from '../../assets/images/deletebrand.svg'
import { BRANDS } from "data/api";
import filter from "utils/ClearNull";
const AddBrandDialog = ({ open, handleClose }) => {
  const category = useSelector((state) => state.category.value);
  const popularbrand = useSelector((state) => state.brand.value);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  let Token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "brand_type", value: "", isRequired: false },
    { control: "name", value: "", isRequired: false },
    { control: "logo", value:{} , isRequired: false },
    { control: "category", value: "", isRequired: false },
    { control: "popular_brands", value: [], isRequired: false },
  ]);
  const [RequestGetCategories, ResponseGetCategories] = useRequest({
    path: CATEGORY,
    method: "get",
    Token: `Token ${Token}`,
  });
  const getCategories = () => {
    RequestGetCategories({
      onSuccess: (res) => {
        dispatch({ type: "category/set", payload: res?.data });
      },
    });
  };
  const [RequestGetPopularBrands, ResponseGetPopularBrands] = useRequest({
    path: POPULARBRANDS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const getPopularBrands = () => {
    RequestGetPopularBrands({
      onSuccess: (res) => {
        dispatch({ type: "popularbrand/set", payload: res?.data });
      },
    });
  };
  const [RequestPostBrand, ResponsePostBrand] = useRequest({
    path: BRANDS,
    method: "POST",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  const [RequestPostPopularBrand, ResponsePostPopularBrand] = useRequest({
    path: BRANDS,
    method: "POST",
    Token: `Token ${Token}`,
  });
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    //   setImageFile(file);
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setControl('logo',event.target.files[0]);
  };
  function handleSubmit() {
    validate().then((output) => {
      
      if (!output.isOk) return;  
      let obj = {};
  
      if(controls.brand_type === 'Local brand'){
        RequestPostBrand({
          body: filter({
            obj: {
              name:controls.name,
              logo:controls.logo
            },
            output: "formData",
          }),
          onSuccess: (res) => {
        dispatch({ type: "brand/addItem", payload: res?.data });

            handleClose()
            resetControls("");
            
          }
        }).then((res) => {
          let response = res?.response?.data;
          
          // const responseBody = filter({
          //   obj: {
          //     name: response?.name?.join(""),
          //     quantity: response?.quantity?.join(" "),
          //    
          //   },
          //   output: "object",
          // });
    
          // setInvalid(responseBody);
        });
      }
      if(controls.brand_type === 'Popular brand'){
        RequestPostPopularBrand({
          body: filter({
            obj: {
              popular_brands:[...controls.popular_brands]
            },
            output: "object",
          }),
          onSuccess: (res) => {
        dispatch({ type: "brand/addItem", payload: res?.data });

            handleClose()
            resetControls("");
            
          }
        }).then((res) => {
          let response = res?.response?.data;
          
          // const responseBody = filter({
          //   obj: {
          //     name: response?.name?.join(""),
          //     quantity: response?.quantity?.join(" "),
          //    
          //   },
          //   output: "object",
          // });
    
          // setInvalid(responseBody);
        });
      }
     
     
    });
  }
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={"532px"}
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Inter" }}>
        {"Add new Brands"}
      </DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "17px",
              letterSpacing: "0em",
              mb: "6px",
            }}
          >
            Choose type*
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ fontFamily: "Inter", display: "flex", gap: "16px", flexDirection: "row" }}
            value={controls.brand_type}
            onChange={(e) => setControl("brand_type", e?.target?.value)}
            required={required.includes("brand_type")}
            error={Boolean(invalid?.brand_type)}
            helperText={invalid?.brand_type}
          >
            <FormControlLabel
              value="Local brand"
              control={<RadioButton />}
              label="Local brand"
              sx={{
                "&.MuiFormControlLabel-root": {
                  marginLeft: "0px !important",
                },
                ".MuiFormControlLabel-label": {
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  marginLeft: "0px !important",
                },
              }}
            />
            <FormControlLabel
              value="Popular brand"
              control={<RadioButton />}
              label="Popular brand"
              sx={{
                "&.MuiFormControlLabel-root": {
                  marginLeft: "0px !important",
                },
                ".MuiFormControlLabel-label": {
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  marginLeft: "0px !important",
                },
              }}
            />
          </RadioGroup>
        </FormControl>
        {controls.brand_type==="Local brand"||""?<>
        <Box sx={{ mt: "20px", display: "flex", alignItems: "center", gap: "20px", mb: "8px" }}>
          <img src={avatarUrl ? avatarUrl:imgframe} alt="frame" style={{height:'100px',width:'100px',borderRadius:'8px'}}/>
          <input
                id="profile_image"
                name="profile_image"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
          <Button
            sx={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "0em",
              color: "#5D449B",
              ":hover":{
                color: "#5D449B",
              }
            }}
            onClick={() => {
                document.getElementById("profile_image").click();
              }}
          >
            Brand Logo
          </Button>
        </Box>
        <Box>
          <InputField
            variant="outlined"
            label={"Brand name"}
            placeholder={"Beesline"}
            value={controls.name}
            onChange={(e) => setControl("name", e.target.value)}
            required={required.includes("name")}
            error={Boolean(invalid.name)}
            helperText={invalid.name}
            sx={{ width: "100%" }}
          />
          <SelectField
            variant="outlined"
            placeholder={"Beauty"}
            label="Brand category"
            isPending={ResponseGetCategories.isPending}
            onOpen={getCategories}
            value={controls.category}
            onChange={(e) => setControl("category", e.target.value)}
            renderValue={(selected) => {
              return category?.results?.find((category) => category.id === selected)?.name;
            }}
            sx={{ width: "100%" }}
          >
            {category?.results?.map((category) => (
              <MenuItem key={category?.id} value={category?.id}>
                {category?.name}
              </MenuItem>
            ))}
          </SelectField>
        </Box>
        </>:controls.brand_type==="Popular brand"&&
        <>
         <MultiSelect
         
            variant="outlined"
            placeholder={"Search name ,category.."}
            label=""
            isPending={ResponseGetPopularBrands.isPending}
            onOpen={getPopularBrands}
            value={controls.popular_brands}
            onChange={(e) => setControl("popular_brands", e.target.value)}
            renderValue={(selected)=>{
                let selectedbrand=popularbrand.results?.filter((brand) => selected.includes(brand.id))
                      return selectedbrand.map((ele)=>ele.name).join(" , ")
               }}
            sx={{ width: "100%" }}
          >
            {popularbrand?.results?.map((brand) => (
              <MenuItem key={brand?.id} value={brand?.id}>
                {brand?.name}
              </MenuItem>
            ))}
          </MultiSelect>
         <Box sx={{mt:2}}>
          <Grid item>
            {
            
            popularbrand?.results?.filter((brand)=>controls.popular_brands.includes(brand?.id)).map((brand)=>(
            <Grid key={brand?.id} container >
              
              <Grid md={3} pl={1}>
                <img src={brand?.logo} alt="product" style={{ width: "102px", height: "64px",borderRadius:'4px' }} />
              </Grid>
              <Grid md={8}>
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
                  {brand?.name}
                </Typography>
                <Typography sx={{fontFamily: 'Inter',
fontSize: '12px',
fontWeight: 500,
lineHeight: '21px',
letterSpacing: '0em',
color:'#7F7F7F'
}}>
                    {brand?.website}
                </Typography>
              </Grid>
              <Grid md={1}>
                <Box sx={{display:'flex',justifyContent:'flex-end',pt:1}} onClick={''}>
                <img src={Delete} alt="delete" />
                </Box>
              </Grid>
            </Grid>
            ))}
          </Grid>
        </Box>
        </>
        }
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: "24px" }}>
          <SoftButton
            type="submit"
            variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
              width: "260px",
            }}
            onClick={handleSubmit}
          >
            Add
          </SoftButton>
        </Box>
      </DialogActions>
      {ResponsePostBrand.failAlert}
      {ResponsePostBrand.successAllert}
    </Dialog>
  );
};

export default AddBrandDialog;
