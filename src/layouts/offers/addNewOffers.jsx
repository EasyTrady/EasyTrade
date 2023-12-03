/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import DateIcon from 'examples/Icons/DateIcon';

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import AddProductTitle from "components/common/AddProductTitle";
import DatePickerField from "components/common/DatePicker";
import ImageOffer from "components/common/ImageOffer";
import OfferBox from "components/common/OfferBox";
import OfferBoxCategory from "components/common/OfferBoxCategory";
import RadioButton from "components/common/RadioButton";
import SelectField from "components/common/SelectField";
import SelectValuePrecentage from "components/common/SelectValuePrecentage";
import InputField from "components/common/TextField";
import { OFFERTYPES } from "data/api";
import { OFFERS } from "data/api";
import Breadcrumbs from "examples/Breadcrumbs";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import useControls from "hooks/useControls";
import useRequest from "hooks/useRequest";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import filter from "utils/ClearNull";

const AddNewOffers = ({ absolute, light, isMini }) => {
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let Token = localStorage.getItem("token");

  let { t } = useTranslation("common");
   let dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const offerstypes = useSelector((state) => state.offerstypes.value);
  const [OffersTypesGetRequest, OffersTypesGetResponce] = useRequest({
    path: OFFERTYPES,
    method: "get",
    Token: `Token ${Token}`,
  });
  const getOfferTypes=()=>{
    OffersTypesGetRequest({
      onSuccess: (res) => {
        console.log(res.data);
        dispatch({ type: "offerstypes/set", payload: res?.data });
      },
    });
  }
  const [AddOfferRequest, AddOfferResponce] = useRequest({
    path: OFFERS,
    method: "POST",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });

  
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "offer_type", value: '', isRequired: false },
    { control: "offer_title", value: '', isRequired: false },
    { control: "offer_start_date", value: '', isRequired: false },
    { control: "offer_end_date", value: '', isRequired: false },
    { control: "productX", value: '', isRequired: false },
    { control: "productY", value: '', isRequired: false },
    { control: "products", value: [], isRequired: false },
    { control: "category", value: '', isRequired: false },
    { control: "total_amount", value: '', isRequired: false },
    { control: "banner", value: '', isRequired: false },
    { control: "is_percentage_discount", value: '', isRequired: false },
    { control: "discount", value: '', isRequired: false },
    { control: "copon", value: '', isRequired: false },
    { control: "published_on", value: '', isRequired: false },
    { control: "quantity", value: '', isRequired: false },
  ])

  function handleSubmit() {
    validate().then((output) => {
      console.log(output);
      if (!output.isOk) return;  
      let obj = {
        type: controls.offer_type,
        offer_title: controls.offer_title,
        offer_start_date: controls.offer_start_date?.toISOString(),
        offer_end_date: controls.offer_end_date?.toISOString(),
        banner: controls.banner,
        published_on: controls.published_on,
      };
  
      if(controls.offer_type === 1||2){
        obj.productX= controls.productX
        obj.productY= controls.productY
      }
      if (controls.offer_type === 2||3||4||6||5) {
        obj.discount = controls.discount;
        obj.is_percentage_discount = controls.is_percentage_discount;
        if (controls.offer_type === 3){
          obj.total_amount = controls.total_amount;
        }
        if (controls.offer_type === 4){
          obj.productX = controls.productX;
          obj.quantity = controls.quantity;
        }
        if (controls.offer_type === 5){
          obj.products = [...controls.products]
         
        }
        if (controls.offer_type === 6){
          obj.category = controls.category;
          
        }
      }
      
     
      AddOfferRequest({
        body: filter({
          obj: obj,
          output: "formData",
        }),
        onSuccess: (res) => {
          resetControls("");
        }
      }).then((res) => {
        let response = res?.response?.data;
        console.log(res);
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
    });
  }
console.log(offerstypes);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
          <AddProductTitle title={"Offer details"} />
          <Container>
            <SoftBox
              py={"20px"}
              display="flex"
              flexDirection="column"
              gap={"20px"}
              sx={{ width: "100%", height: "100%" }}
            >
              <InputField
                variant="outlined"
                label={"Offer title*"}
                placeholder={"Arabic name..."}
                  value={controls.offer_title}
                  onChange={(e) => setControl("offer_title", e.target.value)}
                  required={required.includes("offer_title")}
                  error={Boolean(invalid.offer_title)}
                  helperText={invalid.offer_title}
                sx={{ width: "100%" }}
              />
              <InputField
                variant="outlined"
                placeholder={"English name"}
                  value={controls.offer_title}
                  onChange={(e) => setControl("offer_title", e.target.value)}
                  required={required.includes("offer_title")}
                  error={Boolean(invalid.offer_title)}
                  helperText={invalid.offer_title}
                sx={{ width: "100%" }}
              />
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17px",
                    letterSpacing: "0em",
                    mb:'6px'
                  }}
                >
                  Publish on*
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ fontFamily: "Inter", display: "flex", gap: "16px", flexDirection: "row", }}
                  value={controls.published_on}
                  onChange={(e) => setControl("published_on", e?.target?.value)}
                  required={required.includes("published_on")}
                  error={Boolean(invalid?.published_on)}
                  helperText={invalid?.published_on}
                >
                  <FormControlLabel
                    value="website"
                    control={<RadioButton />}
                    label="Website"
                    sx={{
                      "&.MuiFormControlLabel-root":{
                        marginLeft:'0px !important'
                      },
                      ".MuiFormControlLabel-label": {
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                        marginLeft:'0px !important'
                      },
                    }}
                  />
                  <FormControlLabel
                    value="app"
                    control={<RadioButton />}
                    label="Mobile app"
                    sx={{
                      "&.MuiFormControlLabel-root":{
                        marginLeft:'0px !important'
                      },
                      ".MuiFormControlLabel-label": {
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                        marginLeft:'0px !important'
                      },
                    }}
                  />
                  <FormControlLabel
                    value="both"
                    control={<RadioButton />}
                    label="Website & Mobile app"
                    sx={{
                      "&.MuiFormControlLabel-root":{
                        marginLeft:'0px !important'
                      },
                      ".MuiFormControlLabel-label": {
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                        marginLeft:'0px !important'
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
              {/* choose date rang for offter */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    mb:'6px'
                  }}
                >
                  Start date*
                </Typography>
                <DatePickerField
                  value={controls.offer_start_date}
                  onChange={(e) => setControl("offer_start_date", e)}
                  icon={DateIcon}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0em",
                    textAlign: "left",
                     mb:'6px'
                  }}
                >
                  End date*
                </Typography>
                <DatePickerField
                  value={controls.offer_end_date}
                  onChange={(e) => setControl("offer_end_date", e)}
                  icon={DateIcon}
                />
              </Box>
              <FormControlLabel
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "20px",
                  color: " #626C70",
                }}
                label={"Offer Expired"}
                control={
                  <Switch
                    // value={controls.published_on}
                    // onChange={(e) => setControl("published_on", e.target.checked)}
                    color="secondary"
                  />
                }
              />
              {/* choose offer */}
              <SelectField
                variant="outlined"
                placeholder="Buy X get Y free"
                label="Choose offer type*"
                onOpen={getOfferTypes}
                renderValue={(selected) => {
                  return offerstypes?.find((offer) => offer.id === selected)?.name
                }}
                value={controls.offer_type}
                onChange={(e) => setControl("offer_type", e.target.value)}
                required={required.includes("offer_type")}
                textHelper={controls.offer_type}
                error={Boolean(invalid.offer_type)}
                helperText={invalid.offer_type}
                sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
              >
                {offerstypes?.map((offer, index) => (
                <MenuItem key={`${offer.id} ${index}`} value={offer.id}>
                  {offer?.name}
                  
                </MenuItem>
              ))}
              </SelectField>
              {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
            </SoftBox>
          </Container>
        </SoftBox>
        {controls.offer_type===1&&
        <>
        <Box sx={{display:'flex',flexDirection:{md:'row',xs:'column'},gap:'20px',mt:'20px',width:'100%'}}>
        <OfferBox
        select 
        title='Product X'
        value={controls.productX}
        onChange={(e)=>setControl('productX',e.target.value)}
        />
        <OfferBox 
        select
        title='Product Y'
        value={controls.productY}
        onChange={(e)=>setControl('productY',e.target.value)}
        />
        </Box>
        <Box sx={{mt:'20px'}}>
         <ImageOffer 
         title='Offer image*'
         value={controls.banner}
         onChange={(e)=>setControl('banner',e)}
         /> 
        </Box>
        </>
        }
         {controls.offer_type===2&&
         <>
         <Box sx={{display:'flex',flexDirection:{md:'row',xs:'column'},gap:'20px',mt:'20px',width:'100%'}}>
        <OfferBox
        select
         title='Product X'
         value={controls.productX}
         onChange={(e)=>setControl('productX',e.target.value)}
         />
        <OfferBox 
        select
        title='Product Y'
        value={controls.productY}
         onChange={(e)=>setControl('productY',e.target.value)}
         type={controls.is_percentage_discount}
         typeChange={(e)=>setControl('is_percentage_discount',e.target.value)}
         handleValueChange={(e)=>setControl('discount',e.target.value)} 
        discount
        />
        </Box>
        <Box sx={{mt:'20px'}}>
         <ImageOffer 
         title='Offer image*'
         value={controls.banner}
         onChange={(e)=>setControl('banner',e)}
         /> 
        </Box>
        </>
}
{controls.offer_type===3&&
<>
<SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
          <AddProductTitle title={offerstypes?.find((offer) => offer.id === controls.offer_type)?.name} />
          <Container sx={{display:'flex',flexDirection:"column",gap:'20px',py:'20px'}}>
          <SelectValuePrecentage
        variant={'outlined'}
        label={'Discount'}
        type={controls.type}
        onChange={(e)=>setControl("is_percentage_discount",e.target.value)}
        handleValueChange={(e)=>setControl('discount',e.target.value)}
        />
         <InputField
                variant="outlined"
                label={"Minimum Price*"}
                placeholder={"99 EGP"}
                  value={controls.total_amount}
                  onChange={(e) => setControl("total_amount", e.target.value)}
                  required={required.includes("total_amount")}
                  error={Boolean(invalid.total_amount)}
                  helperText={invalid.total_amount}
                sx={{ width: "100%" }}
              />
              <FormControlLabel
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "20px",
                  color: " #626C70",
                }}
                label={"Create Coupon"}
                control={
                  <Switch
                    value={controls.in_taxes}
                    onChange={(e) => setControl("copon", e.target.checked)}
                    color="secondary"
                  />
                }
              />
            </Container>
            </SoftBox>

<Box sx={{mt:'20px'}}>
         <ImageOffer 
         title='Offer image*'
         value={controls.banner}
         onChange={(e)=>setControl('banner',e)}
         /> 
        </Box>
</>
}
{controls.offer_type===4&&
  <>
<SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
          <AddProductTitle title={offerstypes?.find((offer) => offer.id === controls.offer_type)?.name} />
         
          <OfferBox 
        select
        value={controls.productX}
         onChange={(e)=>setControl('productX',e.target.value)}
         type={controls.is_percentage_discount}
         typeChange={(e)=>setControl('is_percentage_discount',e.target.value)}
         handleValueChange={(e)=>setControl('discount',e.target.value)} 
        discount
        />
        <Container sx={{pb:"24px"}}>
         <InputField
                variant="outlined"
                label={"Minimum Quantity*"}
                placeholder={"2 Pieces"}
                  value={controls.quantity}
                  onChange={(e) => setControl("quantity", e.target.value)}
                  required={required.includes("quantity")}
                  error={Boolean(invalid.quantity)}
                  helperText={invalid.quantity}
                sx={{ width: "100%" ,}}
              />
              </Container>
           
            </SoftBox>

<Box sx={{mt:'20px'}}>
         <ImageOffer 
         title='Offer image*'
         value={controls.banner}
         onChange={(e)=>setControl('banner',e)}
         /> 
        </Box>
</>
}
{controls.offer_type===5&&
  <>
<SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
          <AddProductTitle title={offerstypes?.find((offer) => offer.id === controls.offer_type)?.name} />
         
          <OfferBox 
        muliple
        value={controls.products}
         onChange={(e)=>setControl('products',e.target.value)}
         type={controls.is_percentage_discount}
         typeChange={(e)=>setControl('is_percentage_discount',e.target.value)}
         handleValueChange={(e)=>setControl('discount',e.target.value)} 
        discount
        />
        {/* <Container sx={{pb:"24px"}}>
         <InputField
                variant="outlined"
                label={"Minimum Quantity*"}
                placeholder={"2 Pieces"}
                  value={controls.quantity}
                  onChange={(e) => setControl("quantity", e.target.value)}
                  required={required.includes("quantity")}
                  error={Boolean(invalid.quantity)}
                  helperText={invalid.quantity}
                sx={{ width: "100%" ,}}
              />
              </Container>
            */}
            </SoftBox>

<Box sx={{mt:'20px'}}>
         <ImageOffer 
         title='Offer image*'
         value={controls.banner}
         onChange={(e)=>setControl('banner',e)}
         /> 
        </Box>
</>
}

{controls.offer_type===6&&
  <>
<SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
          <AddProductTitle title={offerstypes?.find((offer) => offer.id === controls.offer_type)?.name} />
         
          <OfferBoxCategory 
        
        value={controls.category}
         onChange={(e)=>setControl('category',e.target.value)}
         type={controls.is_percentage_discount}
         typeChange={(e)=>setControl('is_percentage_discount',e.target.value)}
         handleValueChange={(e)=>setControl('discount',e.target.value)} 
        discount
        />
           
          </SoftBox>

<Box sx={{mt:'20px'}}>
         <ImageOffer 
         title='Offer image*'
         value={controls.banner}
         onChange={(e)=>setControl('banner',e)}
         /> 
        </Box>
</>
}

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
      </Container>
      {AddOfferResponce.failAlert}
      {AddOfferResponce.successAlert}
    </DashboardLayout>
  );
};

export default AddNewOffers;
