/* eslint-disable react/prop-types */
import { Box, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, RadioGroup, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import OfferBoxCategory from 'components/common/OfferBoxCategory'
import RadioButton from 'components/common/RadioButton'
import SelectField from 'components/common/SelectField'
import InputField from 'components/common/TextField'
import BannerShape from 'components/common/bannerShape'
import Bannerbox from 'components/common/bannerbox'
import { OFFERTYPES } from 'data/api'
import { BANNERS } from 'data/api'
import moment from 'moment'
import { STATIC } from 'data/api'
import { PAGES } from 'data/api'
import { BannersTYPES } from 'data/api'
import Breadcrumbs from 'examples/Breadcrumbs'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import useControls from 'hooks/useControls'
import useRequest from 'hooks/useRequest'
import React, { useEffect } from 'react'
import DatePickerField from "components/common/DatePicker";
import DateIcon from 'examples/Icons/DateIcon';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { TextTitle } from 'styles/style'
import filter from 'utils/ClearNull'
import compare from 'utils/compare'
const AddNewBanner = ({ absolute, light, isMini }) => {
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let Token = localStorage.getItem("token");
  let { t } = useTranslation("common");
  const bannerstypes = useSelector((state) => state.bannerstypes.value);
  const offerstypes = useSelector((state) => state.offerstypes.value);
  const pages = useSelector((state) => state.pages.value);
  let dispatch = useDispatch()
  const formData = new FormData();
  const navigate = useNavigate();
  const location = useLocation();
  // const location = useLocation();
  const { state } = location;
  const [{ controls, invalid, required }, { setControl, resetControls, validate,setInvalid }] = useControls([
    { control: "id", value: '', isRequired: false },

    { control: "banner_type", value: '', isRequired: false },
   
    { control: "alloffers", value: false, isRequired: false },
    { control: "type", value: "", isRequired: false },

    { control: "is_rectangular", value: true, isRequired: false },

    
    { control: "object_id", value: '', isRequired: false },
    { control: "banner", value: '', isRequired: false },
    { control: "is_percentage_discount", value: '', isRequired: false },
    { control: "url", value: '', isRequired: false,validations:{
      test:/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/,
      message:"not right url"
    } },
    {
      control: "expire_date",
      value: "",
      isRequired: false,
    },
    { control: "image", value: "", isRequired: false },
    { control: "published_on", value: '', isRequired: false },
    // { control: "pages", value: '', isRequired: false },

  ])
  const [BannersTypesGetRequest, BannersTypesGetResponce] = useRequest({
    path: BannersTYPES,
    method: "get",
    Token: `Token ${Token}`,
  });
  const getBannersTypes = () => {
    BannersTypesGetRequest({
      onSuccess: (res) => {

        dispatch({ type: "bannerstypes/set", payload: res?.data });
      },
    });
  }
  const [PagesGetRequest, PagesGetResponce] = useRequest({
    path: PAGES,
    method: "get",
    Token: `Token ${Token}`,
  });
  const getPages = () => {
    PagesGetRequest({
      onSuccess: (res) => {

        dispatch({ type: "pages/set", payload: res?.data });
      },
    });
  }

  const [OffersTypesGetRequest, OffersTypesGetResponce] = useRequest({
    path: OFFERTYPES,
    method: "get",
    Token: `Token ${Token}`,
  });

  const getOfferTypes = () => {

    OffersTypesGetRequest({
      params:{type:controls?.type},
      onSuccess: (res) => {

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
  const [patchBannerRequest, patchBannerResponce] = useRequest({
    path: BANNERS,
    method: "patch",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });

  function handleSubmit() {
    validate().then((output) => {

      if (!output.isOk) return;
      if(Boolean(state?.dataRow)){
        let  result= compare(
          [
          [controls.banner_type,state?.dataRow?.banner_type,"banner_type"],
          [controls.is_rectangular,state?.dataRow?.is_rectangular,"is_rectangular"],
          [controls.image,state?.dataRow?.image,"image"],
          [controls.published_on,state?.dataRow?.published_on,"published_on"],
          [controls.object_id,String(state?.dataRow?.object_id),"object_id"],
          [String(controls.url),String(state?.dataRow?.link),"link"],
          [controls.is_percentage_discount,state?.dataRow?.is_percentage_discount,"is_percentage_discount"],
          [controls.expire_date,state?.dataRow?.expire_date,"expire_date"]
      //    [controls.job,state?.dataRow?.job,"job"]
      ],false
      )
      console.log(controls.is_rectangular,state?.dataRow?.is_rectangular, result.array)
      Object.entries(result.array).map(([key,value])=>formData.append(key,value))
      patchBannerRequest({
        id:controls?.id,
        body: formData,onSuccess:(res)=>{
          dispatch({ type: "banners/patchItem", payload: { id: controls?.id,item:res.data } })
      navigate(`/${sub_domain}/dashboard/banners`)

        }
      })
      }else{
        let obj = {
          banner_type: controls.banner_type,
          // object_id: controls.object_id,
          is_public: controls?.is_public || 'true',
          is_rectangular: controls.is_rectangular,
          image: controls.image,
          expire_date:controls?.expire_date
        };
  
        if (controls.banner_type === 1) {
          obj.object_id = [...controls.object_id]
        }
        if (controls.banner_type === 2) {
          obj.object_id = controls.object_id
          obj.category_products = controls.object_id
        }
        // if (controls.banner_type === 3) {
        //   obj.offer_type_products = controls.object_id
        // }
        if (controls.banner_type === 4) {
          obj.link = controls.url
        }
        if (controls.banner_type === 5) {

          obj.object_id = controls.object_id
        }
  
        AddBannerRequest({
          body: filter({
            obj: obj,
            output: "formData",
          }),
          onSuccess: (res) => {
            dispatch({ type: "banners/addItem", payload: res.data  })
            resetControls("");
            navigate(`/${sub_domain}/dashboard/banners`)
          }
        }).then((res) => {
          let response = res?.response?.data;
          console.log(response)
          const responseBody = filter({
            obj :{
              banner_type: response.banner_type,
              object_id: response.object_id,
              is_public: response?.is_public,
              is_rectangular: response.is_rectangular,
              image: response.image,
              expire_date:response?.expire_date
            },
            output: "object",
          });
  
          setInvalid(responseBody);
        });
      }
  
    });
  }
  useEffect(() => {
    // jobRequest({
    //     onSuccess: (res) => {
    //         dispatch({ type: "job/set", payload: res.data })
    //     }
    // })

    if (Boolean(state?.dataRow)) {
      Object.entries(state?.dataRow)?.forEach(([key, value]) => key=="link"?setControl("url", value):setControl(key,value))
      // if(!Boolean(controls.banner_type)){
      //   setControl("banner_type", state?.dataRow?.banner_type)
      // }
    }
    // setControl()

  }, [state])
  
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={"Add New Banner"} route={route} light={light} />
        </SoftBox>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item md={12}xl={8}lg={12} sm={12}>
              <BannerShape
                value={controls.image}
                onChange={(e) => setControl('image', e)}
                is_rectangular={state?.dataRow?state?.dataRow.is_rectangular:controls?.is_rectangular}
                setControl={(value)=>setControl("is_rectangular",value)}
              />
            </Grid>
            <Grid item md={12}xl={4}lg={12}sm={12}>
              <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5, py: '24px', height: 'fit-content' }} >
                <Container sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <FormControl >
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "17px",
                        letterSpacing: "0em",
                        mb: '6px'
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
                          "&.MuiFormControlLabel-root": {
                            marginLeft: '0px !important'
                          },
                          ".MuiFormControlLabel-label": {
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "15px",
                            letterSpacing: "0em",
                            marginLeft: '0px !important'
                          },
                        }}
                      />
                      <FormControlLabel
                        value="app"
                        control={<RadioButton />}
                        label="Mobile app"
                        sx={{
                          "&.MuiFormControlLabel-root": {
                            marginLeft: '0px !important'
                          },
                          ".MuiFormControlLabel-label": {
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "15px",
                            letterSpacing: "0em",
                            marginLeft: '0px !important'
                          },
                        }}
                      />
             
                      <FormControlLabel
                        value="both"
                        control={<RadioButton />}
                        label="Website & Mobile app"
                        sx={{
                          "&.MuiFormControlLabel-root": {
                            marginLeft: '0px !important'
                          },
                          ".MuiFormControlLabel-label": {
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "15px",
                            letterSpacing: "0em",
                            marginLeft: '0px !important'
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
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
              component={"lable"}
              required={required.includes("expire_date")}
              textHelper={controls.expire_date}
              error={Boolean(invalid.expire_date)}
              helperText={invalid.expire_date}
            >
              expire date*
            </Typography>
             <DatePickerField
              value={controls.expire_date}
              onChange={(newvalue) => {setControl("expire_date", moment(newvalue).format("YYYY-MM-DD"));console.log(moment(newvalue).format("YYYY-MM-DD"))}}
              icon={DateIcon}
            /> 
          </Box>
                  <SelectField
                    variant="outlined"
                    placeholder="Specific product"
                    label="Choose Link direction*"
                    onOpen={getBannersTypes}
                    renderValue={(selected) => {
                      if (bannerstypes.length == 0) {
                        getBannersTypes()
                      }
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
                  
                  {controls.banner_type == 1 &&
                    <Bannerbox
                      value={Array.isArray(controls.object_id)?controls.object_id:[controls.object_id]}
                      onChange={(e) => {setControl("object_id", e.target.value.map((ele)=>ele?.id?ele?.id:ele));}}
                    />}
                    {console.log(controls.object_id)}
                  {controls.banner_type == 3 &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <SelectField
                        variant="outlined"
                        placeholder="Buy X get Y free"
                        label="Choose offer type*"
                        isPending={OffersTypesGetResponce.isPending}
                        onOpen={getOfferTypes}
                        renderValue={(selected) => {
                          if(offerstypes.length==0){
                            getOfferTypes()
                          }
                         
                          return offerstypes?.find((offer) => offer.id === selected)?.name
                        }}
                        value={controls.object_id}
                        onChange={(e) => setControl("object_id", e.target.value)}
                        required={required.includes("object_id")}
                        textHelper={controls.object_id}
                        error={Boolean(invalid.object_id)}
                        helperText={invalid.object_id}
                        
                        sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
                      >
                        {offerstypes?.map((offer, index) => (
                          <MenuItem key={`${offer.id} ${index}`} value={offer.id}>
                            {offer?.name}

                          </MenuItem>
                        ))}
                      </SelectField>
                      <FormControlLabel
                        sx={{ color: '#626C70 !important' }}
                        label={'Select all the offers under this type'}
                        control={
                          <Checkbox

                            value={controls.alloffers}
                            onChange={(e) => setControl('alloffers', e.target.checked)}
                            color="secondary" />
                        } />
                      {/* get offers of specific offer */}
                      {controls.object_id !== "" ?
                        <SelectField
                          variant="outlined"
                          placeholder="Buy X get Y free"
                          label="Choose offer"
                          isPending={OffersTypesGetResponce.isPending}
                          onOpen={getOfferTypes}
                          renderValue={(selected) => {
                            return offerstypes?.find((offer) => offer.id === selected)?.name
                          }}
                          value={controls.type}
                          onChange={(e) => setControl("type", e.target.value)}
                          required={required.includes("type")}
                          textHelper={controls.type}
                          error={Boolean(invalid.type)}
                          helperText={invalid.type}
                          disabled={Boolean(controls.alloffers)==false}
                          sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
                        >
                          {offerstypes?.map((offer, index) => (
                            <MenuItem key={`${offer.id} ${index}`} value={offer.id}>
                              {offer?.name}

                            </MenuItem>
                          ))}
                        </SelectField>
                        : <></>}
                    </Box>
                  }
                  {controls.banner_type == 4 &&
                    <InputField
                      type="url"
                      variant="outlined"
                      label={"URL*"}
                      placeholder={"www.easytrade.com"}
                      value={controls.url}
                      onChange={(e) => setControl("url", e.target.value)}
                      required={required.includes("url")}
                      error={Boolean(invalid.link)}
                      helperText={invalid.link}
                      sx={{ width: "100%" }}
                    />
                  }
                  {controls.banner_type == 5 &&
                    <SelectField
                      variant="outlined"
                      placeholder="pages info"
                      label="Choose page"
                      isPinding={PagesGetResponce.isPinding}
                      onOpen={getPages}
                      renderValue={(selected) => {
                        return pages?.results.find((page) => page.id === selected)?.title
                      }}
                      value={controls.object_id}
                      onChange={(e) => setControl("object_id", e.target.value)}
                      required={required.includes("object_id")}
                      textHelper={controls.object_id}
                      error={Boolean(invalid.object_id)}
                      helperText={invalid.object_id}
                      sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
                    >
                      {pages?.results?.map((page, index) => (
                        <MenuItem key={`${page.id} ${index}`} value={page.id}>
                          {page?.title}

                        </MenuItem>
                      ))}
                    </SelectField>}
                </Container>
                {controls.banner_type == 2 &&
                  <OfferBoxCategory
                    value={controls.object_id}
                    onChange={(e) => setControl("object_id", e.target.value)}
                  />
                }
              </SoftBox>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", mt: "24px", gap: '12px' }}>

          <SoftButton
            type="submit"
            variant="gradient"
            sx={{
              backgroundColor: "transparent !important",
              // color: "white !important",
              border: ' 0.5px solid #D0D5DD',
              "&:hover": {
                backgroundColor: "transparent !important"
              },
              width: "20%",
            }}
            onClick={() => navigate(`/${sub_domain}/dashboard/banners`)}
          >
            Cancel
          </SoftButton>
          <SoftButton
            type="submit"
            variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
              width: "20%",
            }}
            onClick={handleSubmit}
          >
            {AddBannerResponce.isPending ? (
              <>
                <CircularProgress size={20} color="inherit" />
                جاري التحميل...
              </>
            ) : (
              "Publish"
            )}
          </SoftButton>
        </Box>
      </Container>
      {AddBannerResponce.failAlert}
      {AddBannerResponce.successAlert}
    </DashboardLayout>
  )
}

export default AddNewBanner