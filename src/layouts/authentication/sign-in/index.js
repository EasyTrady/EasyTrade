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
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import * as Yup from 'yup';

import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import login from '../../../assets/images/icons/Social Media Icon Square/login.png';

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { Formik } from "formik";
import { Box, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, Stack, Typography, useMediaQuery } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useRequest from "hooks/useRequest";
import { SIGNIN ,PROFILE} from "data/api";
import { useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import { useTheme } from "@emotion/react";
import AuthLogin from '../../authentication/auth-forms/AuthLogin';
function SignIn() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  
  const [rememberMe, setRememberMe] = useState(true);
  const sub_domain = localStorage.getItem('sub_domain')
  let Token=localStorage.getItem('token')
  let navigate=useNavigate()
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [showPassword, setShowPassword] = useState(false);
  let [signInRequest,signInResponse]=useRequest({
    path:SIGNIN,method:"post"
  })
  let [ShopInfoRequest,ShopInfoResponse]=useRequest({
    path:PROFILE,method:"get",Token:`Token ${Token}`
  })
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
   <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
         
            signInRequest({
              body:values,
              onSuccess:async(res)=>{
                
             
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('tokenTimestamp', new Date().getTime());
                console.log(sub_domain)
                if (Boolean(sub_domain)) {
                 
                  navigate(`/${sub_domain}/dashboard`)

                } else {
                  
                  await ShopInfoRequest({ onSuccess:(response)=>{
                    
                    localStorage.setItem('shop_url', response?.data?.shop_url)
                    localStorage.setItem('dashboard_url', response?.data?.dashboard_url)
                    localStorage.setItem('shop_id', response?.data?.id)
                    localStorage.setItem('shop_name', response?.data?.shop_name)
                    localStorage.setItem('image', response?.data?.logo)
                    localStorage.setItem('email', response?.data?.user?.email)
                    localStorage.setItem('phone', response?.data?.user?.phone)
                    localStorage.setItem('sub_domain', response?.data?.sub_domain)
                    navigate(`/${response?.data?.sub_domain}/dashboard`)
                  } })

                }
              }
            })
            // dispatch(UserSignin(values)).then(async (res) => {
            //   console.log(res)
            //   if (res.type === 'userSignin/fulfilled') {
            //     toast.success('welcome to EasyTrade')

            //     if (shop_name !== "undefined") {

            //       navigate(`/${shop_name}/dashboard`)

            //     } else {
            //       console.log(res?.payload?.token)
            //       await dispatch(GetShopInfo({ token: res?.payload?.token })).then((res) => {
            //         console.log(res)
            //         localStorage.setItem('shop_url', res?.payload?.shop_url)
            //         localStorage.setItem('dashboard_url', res?.payload?.dashboard_url)
            //         localStorage.setItem('shop_id', res?.payload?.id)
            //         localStorage.setItem('shop_name', res?.payload?.shop_name)
            //         navigate(`/${res?.payload?.shop_name}/dashboard`)
            //       })

            //     }

            //   } else {
            //     // console.log(Object.keys(res.payload).map((ele)=>res.payload[ele][0])[0],"error")
            //     // setErrors({ password: res.payload.non_field_errors[0] });

              
            //   }
            // });
          //   if (scriptedRef.current) {
          //     setStatus({ success: true });
          //     setSubmitting(false);
          //   }
          // } catch (err) {
          //   console.error(err);
          //   if (scriptedRef.current) {
          //     setStatus({ success: false });
          //     setErrors({ submit: err.message });
          //     setSubmitting(false);
          //   }
          // }
          }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
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
        <Box component="img" sx={{ width: { xl: '60%', lg: '60%', md: '50%', sm: '100%', sx: '100%' }, height: '100vh' }} src={login}></Box>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', bgcolor: '#FFFFFF' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      {/* <Logo /> */}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            تسجيل الدخول
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            مرحبًا بعودتك! برجاء ادخال التفاصيل الخاصة بك
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      {/* <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>

        </Grid>
      </Grid>
      </Box>
    </AuthWrapper1>
    </PageLayout>
          </form>
        )}
      </Formik>
      {/* <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox> */}
      {signInResponse.failAlert}
      {ShopInfoResponse.failAlert}
      </>
  );
}

export default SignIn;
