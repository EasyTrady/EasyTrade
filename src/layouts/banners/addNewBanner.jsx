/* eslint-disable react/prop-types */
import { Box, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, RadioGroup, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import OfferBoxCategory from 'components/common/OfferBoxCategory'
import RadioButton from 'components/common/RadioButton'
import SelectField from 'components/common/SelectField'
import InputField from 'components/common/TextField'
import Bannerbox from 'components/common/bannerbox'
import { OFFERTYPES } from 'data/api'
import { BANNERS } from 'data/api'
import { BannersTYPES } from 'data/api'
import Breadcrumbs from 'examples/Breadcrumbs'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import useControls from 'hooks/useControls'
import useRequest from 'hooks/useRequest'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { TextTitle } from 'styles/style'

const AddNewBanner = ({ absolute, light, isMini }) => {
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem("sub_domain");
    let Token = localStorage.getItem("token");
    let { t } = useTranslation("common");
    const bannerstypes = useSelector((state) => state.bannerstypes.value);
     let dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const [BannersTypesGetRequest, BannersTypesGetResponce] = useRequest({
        path: BannersTYPES,
        method: "get",
        Token: `Token ${Token}`,
      });
      const getBannersTypes=()=>{
        BannersTypesGetRequest({
          onSuccess: (res) => {
            console.log(res.data);
            dispatch({ type: "bannerstypes/set", payload: res?.data });
          },
        });
      }
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
      const [AddBannerRequest, AddBannerResponce] = useRequest({
        path: BANNERS,
        method: "POST",
        Token: `Token ${Token}`,
        contentType: "multipart/form-data",
      });
    
    const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
        { control: "banner_type", value: '', isRequired: false },
        { control: "offer_type", value: '', isRequired: false },
        { control: "alloffers", value: '', isRequired: false },
        { control: "product", value: [], isRequired: false },
        { control: "category", value: '', isRequired: false },
        { control: "total_amount", value: '', isRequired: false },
        { control: "banner", value: '', isRequired: false },
        { control: "is_percentage_discount", value: '', isRequired: false },
        { control: "discount", value: '', isRequired: false },
        { control: "copon", value: '', isRequired: false },
        { control: "published_on", value: '', isRequired: false },
       
      ])
      function handleSubmit() {
        validate().then((output) => {
          console.log(output);
          if (!output.isOk) return;  
          let obj = {
            banner_type: controls.banner_type,
            object_id: controls.object_id,
            is_public: controls?.is_public||'true',
            is_rectangular: controls.is_rectangular||"true",
            
          };
      
        //   if(controls.offer_type === 1||2){
        //     obj.productX= controls.productX
        //     obj.productY= controls.productY
        //   }
        //   if (controls.offer_type === 2||3||4||6||5) {
        //     obj.discount = controls.discount;
        //     obj.is_percentage_discount = controls.is_percentage_discount;
        //     if (controls.offer_type === 3){
        //       obj.total_amount = controls.total_amount;
        //     }
        //     if (controls.offer_type === 4){
        //       obj.productX = controls.productX;
        //       obj.quantity = controls.quantity;
        //     }
        //     if (controls.offer_type === 5){
        //       obj.products = [...controls.products]
             
        //     }
        //     if (controls.offer_type === 6){
        //       obj.category = controls.category;
              
        //     }
        //   }
          
         
          AddBannerRequest({
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
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <Container sx={{ p: 2 }}>
      <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
        <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
      </SoftBox>
      <Grid item>
        <Grid container spacing={3}>
            <Grid item md={6}>
            <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5,py:'24px' }}>
                <Container>
                <TextTitle >Banner Shape</TextTitle>
                </Container>
            </SoftBox>
            </Grid>
            <Grid item md={6}>
                <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 ,py:'24px'}} >
                    <Container sx={{display:'flex',flexDirection:'column',gap:'16px'}}>
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
              <SelectField
                variant="outlined"
                placeholder="Specific product"
                label="Choose Link direction*"
                onOpen={getBannersTypes}
                renderValue={(selected) => {
                  return bannerstypes?.find((banner) => banner.id === selected)?.name
                }}
                value={controls.banner_type}
                onChange={(e) => setControl("banner_type", e.target.value)}
                required={required.includes("banner_type")}
                textHelper={controls.banner_type}
                error={Boolean(invalid.banner_type)}
                helperText={invalid.banner_type}
                sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
              >
                {bannerstypes?.map((banner, index) => (
                <MenuItem key={`${banner.id} ${index}`} value={banner.id}>
                  {banner?.name}
                  
                </MenuItem>
              ))}
              </SelectField>
              {controls.banner_type==1&&
              <Bannerbox
              value={controls.product}
              onChange={(e)=>setControl("product",e.target.value)}
              />}
               {controls.banner_type==3&&
              <Box sx={{display:'flex',flexDirection:'column',gap:'16px'}}>
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
                disabled={controls.alloffers}
                sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
              >
                {offerstypes?.map((offer, index) => (
                <MenuItem key={`${offer.id} ${index}`} value={offer.id}>
                  {offer?.name}
                  
                </MenuItem>
              ))}
              </SelectField>
              <FormControlLabel
              sx={{color:'#626C70 !important'}}
                label={'Select all the offers under this type'}  
                control={
              <Checkbox
              value={controls.alloffers}
              onChange={(e)=>setControl('alloffers',e.target.checked)} 
              
              color="secondary" />
  }/>
              </Box>
}
{controls.banner_type==4&&
    <InputField
    variant="outlined"
    label={"URL*"}
    placeholder={"www.easytrade.com"}
      value={controls.url}
      onChange={(e) => setControl("url", e.target.value)}
      required={required.includes("url")}
      error={Boolean(invalid.url)}
      helperText={invalid.url}
    sx={{ width: "100%" }}
  />
}
                 </Container>
                 {controls.banner_type==2&&
              <OfferBoxCategory
               value={controls.category}
               onChange={(e)=>setControl("category",e.target.value)}
              />
                 }
                </SoftBox>
            </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt:"24px" }}>
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
           Publish
          </SoftButton>
        </Box>
      </Container>
      {AddBannerResponce.failAlert}
      {AddBannerResponce.successAlert}
      </DashboardLayout>
  )
}

export default AddNewBanner