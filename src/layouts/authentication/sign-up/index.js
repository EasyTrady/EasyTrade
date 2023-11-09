/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SIGNUP } from "data/api";
import { SHOP } from "data/api";
import useRequest from "hooks/useRequest";
import { Box, FormControl } from "@mui/material";
import { useTheme } from "@emotion/react";
import PhoneField from "components/common/PhoneField";
import PageLayout from "examples/LayoutContainers/PageLayout";
import AuthWrapper1 from "../AuthWrapper1";
import {  useLocation } from 'react-router-dom';

// material-ui

import {  Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports

import AuthCardWrapper from '../AuthCardWrapper';
import AuthRegister from '../auth-forms/AuthRegister';
// import AuthFooter from 'ui-component/cards/AuthFooter';
import signup from '../../../assets/images/icons/Social Media Icon Square/login.png';


function SignUp({ ...others  }) {
  const sub_domain = localStorage.getItem('sub_domain')
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  let [signUpRequest,signUPResponse]=useRequest({
    path:SIGNUP,method:"post"
  })
  let [ShopInfoRequest,ShopInfoResponse]=useRequest({
    path:SHOP,method:"post"
  })
  return (
   
      <Card>
      
        <Formik
        initialValues={{
          full_name: '',
          email: '',
          password: '',
          shop_name: '',
          sub_domain: '',
          subscription:others.subscribtionId,
          logo:"",
          phone:"",
          code:"+20"
          // is_company:'',
          
        }}
        validationSchema={Yup.object().shape({
          full_name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          phone: Yup.string().max(20).required('Phone is required'),
          shop_name: Yup.string().max(255).required('Store name is required'),
          sub_domain: Yup.string().max(255).required('Store Domain is required'),
          logo: Yup.string().required("add logo please"),
          code: Yup.string().required('code is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            Object.keys(values).forEach((key) => formData.append(key, values[key]));
            // formData.append('logo',imageFile)
            // formData.append('phone',phone)
       
            signUpRequest({
              body:formData,
              onSuccess:async(res)=>{
                if(res?.type==='signupUser/fulfilled'){
                  toast.success('welcome to EasyTrade')
                  navigate('/register/creatingshop')
                  if (sub_domain !== "undefined") {

                    navigate(`/${sub_domain}/dashboard`)
  
                  } else {
                    
                    await ShopInfoRequest({ onSuccess:(response)=>{
                      localStorage.setItem('shop_url', response?.payload?.shop_url)
                      localStorage.setItem('dashboard_url', response?.payload?.dashboard_url)
                      localStorage.setItem('shop_id', response?.payload?.id)
                      localStorage.setItem('shop_name', response?.payload?.shop_name)
                      localStorage.setItem('sub_domain', response?.payload?.sub_domain)
                      navigate(`/${response?.payload?.sub_domain}/dashboard`)
                    } })
  
                  }
                 
    
                }else{
                  // console.log(...Object.keys(res.payload).map((ele)=>({[ele]:res.payload[ele]})))
                  setErrors(res.payload)
                  // const errorMessage = typeof res.payload === 'string' ? res.payload : 'An error occurred'; // Assuming res.payload is the error message
                  // toast.error(errorMessage,{
                  //   position: "bottom-left",
                  //   autoClose: 5000,
                  //   hideProgressBar: false,
                  //   closeOnClick: true,
                  //   pauseOnHover: true,
                  //   draggable: true,
                  //   progress: undefined,
                  //   theme: "light",
                  //   className: 'toast-message'
                  //   })
                }
              }
            })
         
          
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
           
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
           {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate  {...others}>
        <PageLayout>
    <AuthWrapper1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xl: 'row',
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          },
          gap: 2,
          justifyContent: 'space-between',
          overflow: 'auto',
          bgcolor: '#FFFFFF'
          // paddingTop: '70px'
        }}
      >
        <Box component="img" sx={{ width: { xl: '50%', lg: '50%', md: '50%', sm: '100%', sx: '100%' }, height: '100%' }} src={signup}></Box>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', bgcolor: '#FFFFFF' }}>
        <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', gap: 2, px: '12px' }}>

          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            تسجيل حساب
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            مرحبًا! الرجاء ادخال التفاصيل الخاصة بك
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister subscribtionId={location?.state?.subscribtionId} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none', color: '#5D449B' }}>
                          لديك حساب بالفعل؟ تسجيل الدخول
                      </Typography>

                    </Grid>
                  </Grid>
                </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            {/* <AuthFooter /> */}
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper1>
    </PageLayout>
        </form>)}
        </Formik>
      </Card>
   
  );
}

export default SignUp;
