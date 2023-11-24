/* eslint-disable react/prop-types */
import { Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, RadioGroup, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import RadioButton from 'components/common/RadioButton'
import SelectField from 'components/common/SelectField'
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
      const [AddOfferRequest, AddOfferResponce] = useRequest({
        path: BANNERS,
        method: "POST",
        Token: `Token ${Token}`,
        contentType: "multipart/form-data",
      });
    
    const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
        { control: "banner_type", value: '', isRequired: false },
        { control: "offer_title", value: '', isRequired: false },
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
       
      ])
    
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
              </Container>
                </SoftBox>
            </Grid>
        </Grid>
      </Grid>
      </Container>
      </DashboardLayout>
  )
}

export default AddNewBanner