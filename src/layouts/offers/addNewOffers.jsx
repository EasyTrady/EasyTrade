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

const AddNewOffers = ({ absolute, light, isMini }) => {
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let Token = localStorage.getItem("token");

  let { t } = useTranslation("common");
   let dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const offers=useSelector((state)=>state.offers.value)
  const [OffersGetRequest,OffersGetResponce] = useRequest({
    path: OFFERS,
    method: "get",
    Token: `Token ${Token}`,
  });

  const getOffers = () => {
    OffersGetRequest({
      onSuccess: (res) => {
        console.log(res.data);
        dispatch({ type: "offers/set", payload: res?.data });
      },
    });
  };
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "offers", value: '', isRequired: false },
  ])

console.log(controls.offers);
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
                label={"Product name"}
                placeholder={"Arabic Product"}
                //   value={controls.name}
                //   onChange={(e) => setControl("name", e.target.value)}
                //   required={required.includes("name")}
                //   error={Boolean(invalid.name)}
                //   helperText={invalid.name}
                sx={{ width: "100%" }}
              />
              <InputField
                variant="outlined"
                placeholder={"English Product"}
                //   value={controls.name}
                //   onChange={(e) => setControl("name", e.target.value)}
                //   required={required.includes("name")}
                //   error={Boolean(invalid.name)}
                //   helperText={invalid.name}
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
                //   value={controls.discount_start_date}
                //   onChange={(e) => setControl("discount_start_date", e)}
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
                //   value={controls.discount_start_date}
                //   onChange={(e) => setControl("discount_start_date", e)}
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
                isPending={OffersGetResponce.isPending}
                onOpen={getOffers}
                renderValue={(selected) => {
                  return offers?.results?.find((offer) => offer.id === selected)?.offer_title;
                }}
                value={controls.offers}
                onChange={(e) => setControl("offers", e.target.value)}
                required={required.includes("offers")}
                textHelper={controls.offers}
                error={Boolean(invalid.offers)}
                helperText={invalid.offers}
                sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
              >
                {offers?.results?.map((offer, index) => (
                <MenuItem key={`${offer.id} ${index}`} value={offer.id}>
                  {offer?.offer_title}
                  
                </MenuItem>
              ))}
              </SelectField>
              {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
            </SoftBox>
          </Container>
        </SoftBox>
        {controls.offers===1&&
        <>
        <Box sx={{display:'flex',flexDirection:{md:'row',xs:'column'},gap:'20px',mt:'20px',width:'100%'}}>
        <OfferBox title='Product X'/>
        <OfferBox title='Product Y'/>
        </Box>
        <Box sx={{mt:'20px'}}>
         <ImageOffer title='Offer image*'/> 
        </Box>
        </>
        }
         <Box sx={{display:'flex',flexDirection:{md:'row',xs:'column'},gap:'20px',mt:'20px',width:'100%'}}>
        <OfferBox title='Product X'/>
        <OfferBox title='Product Y' discount/>
        </Box>
        <Box sx={{mt:'20px'}}>
         <ImageOffer title='Offer image*'/> 
        </Box>
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
            // onClick={handleSubmit}
          >
            Add
          </SoftButton>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AddNewOffers;
