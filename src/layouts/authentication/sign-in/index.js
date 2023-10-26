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

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { Formik } from "formik";
import { FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useRequest from "hooks/useRequest";
import { SIGNIN ,SHOP} from "data/api";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const shop_name = localStorage.getItem('shop_name')
  let navigate=useNavigate()
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [showPassword, setShowPassword] = useState(false);
  let [signInRequest,signInResponse]=useRequest({
    path:SIGNIN,method:"post"
  })
  let [ShopInfoRequest,ShopInfoResponse]=useRequest({
    path:SHOP,method:"post"
  })
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
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
                console.log(res.data)
             
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('tokenTimestamp', new Date().getTime());
                if (shop_name !== "undefined"&&shop_name !== null) {
                  console.log(shop_name)
                  navigate(`/${shop_name}/dashboard`)

                } else {
                  console.log(res?.payload?.token)
                  await ShopInfoRequest({ onSuccess:(response)=>{
                    console.log(response.payload,"route");
                    localStorage.setItem('shop_url', response?.payload?.shop_url)
                    localStorage.setItem('dashboard_url', response?.payload?.dashboard_url)
                    localStorage.setItem('shop_id', response?.payload?.id)
                    localStorage.setItem('shop_name', response?.payload?.shop_name)
                    localStorage.setItem('image', response?.payload?.image)
                    localStorage.setItem('email', response?.payload?.email)
                    localStorage.setItem('phone', response?.payload?.phone)
                    navigate(`/${response?.payload?.sub_domain}/dashboard`)
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
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} >
              {/* <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              /> */}
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="email" placeholder="Email" value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange} />
              </SoftBox>
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} >
              {/* <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              /> */}
                <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type={showPassword ? 'text' : 'password'} placeholder="Password" value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange} 
                 endAdornment={
                  <InputAdornment  sx={{position: "absolute",
                    right: "13px",}}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility/> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }/>
        </SoftBox>
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box> */}
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
          <SoftButton fullWidth size="large" type="submit"  variant="contained" color="secondary">
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
    </CoverLayout>
  );
}

export default SignIn;
