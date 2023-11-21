/* eslint-disable react/prop-types */
import {
  Box,
  Breadcrumbs,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import AddProductTitle from "components/common/AddProductTitle";
import DatePickerField from "components/common/DatePicker";
import ImageOffer from "components/common/ImageOffer";
import OfferBox from "components/common/OfferBox";
import RadioButton from "components/common/RadioButton";
import SelectField from "components/common/SelectField";
import InputField from "components/common/TextField";
import { OFFERS } from "data/api";
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
 
  const [AddOfferRequest, AddOfferResponce] = useRequest({
    path: OFFERS,
    method: "POST",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });

  const offer_type=[
    {id:1,title:'Buy X get Y Free'},
    {id:2,title:'Buy X get Discount on Y'},
    {id:3,title:'Percentage discount on total amount'},
    {id:4,title:'Discount on quantity'},
    {id:5,title:'Combined Products Dscount'},
]
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "offer_type", value: '', isRequired: false },
    { control: "offer_title", value: '', isRequired: false },
    { control: "offer_start_date", value: '', isRequired: false },
    { control: "offer_end_date", value: '', isRequired: false },
    { control: "productX", value: '', isRequired: false },
    { control: "productY", value: '', isRequired: false },
    { control: "banner", value: '', isRequired: false },
  ])

  function handleSubmit() {
    
    validate().then((output) => {
      console.log(output);
      if (!output.isOk) return;
      console.log(controls?.image);

      AddOfferRequest({
        body: filter({
          obj: {
            offer_type: controls.offer_type,
            offer_title: controls.offer_title,
            offer_start_date: controls.offer_start_date?.toISOString(),
            offer_end_date: controls.offer_end_date?.toISOString(),
            productX: controls.productX||"31",
            productY: controls.productY||"23",
            banner: controls.banner,
          },
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
        resetControls("");
      });
    });
  }

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
                  // value={controls.source}
                  // onChange={(e) => setControl("source", e?.target?.value)}
                  // required={required.includes("source")}
                  // error={Boolean(invalid?.source)}
                  // helperText={invalid?.source}
                >
                  <FormControlLabel
                    value="Website"
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
                    value="Mobile app"
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
                    value="Website & Mobile app"
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
                    // value={controls.in_taxes}
                    // onChange={(e) => setControl("in_taxes", e.target.checked)}
                    color="secondary"
                  />
                }
              />
              {/* choose offer */}
              <SelectField
                variant="outlined"
                placeholder="Buy X get Y free"
                label="Choose offer type*"
        
                renderValue={(selected) => {
                  return offer_type?.find((offer) => offer.id === selected)?.title
                }}
                value={controls.offer_type}
                onChange={(e) => setControl("offer_type", e.target.value)}
                required={required.includes("offer_type")}
                textHelper={controls.offer_type}
                error={Boolean(invalid.offer_type)}
                helperText={invalid.offer_type}
                sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
              >
                {offer_type?.map((offer, index) => (
                <MenuItem key={`${offer.id} ${index}`} value={offer.id}>
                  {offer?.title}
                  
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
        title='Product X'
        value={controls.productX}
        onChange={(e)=>setControl('productX',e.target.value)}
        />
        <OfferBox 
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
         title='Product X'
         value={controls.productX}
         onChange={(e)=>setControl('productX',e.target.value)}
         />
        <OfferBox title='Product Y' discount/>
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
      {AddOfferResponce.successlAlert}
    </DashboardLayout>
  );
};

export default AddNewOffers;
