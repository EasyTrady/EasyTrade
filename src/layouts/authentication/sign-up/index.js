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
import { FormControl } from "@mui/material";
import { useTheme } from "@emotion/react";
import PhoneField from "components/common/PhoneField";

function SignUp({ ...others  }) {
  const shop_name = localStorage.getItem('shop_name')
  const theme = useTheme();
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  let [signUpRequest,signUPResponse]=useRequest({
    path:SIGNUP,method:"post"
  })
  let [ShopInfoRequest,ShopInfoResponse]=useRequest({
    path:SHOP,method:"post"
  })
  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
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
            console.log(values)
            signUpRequest({
              body:formData,
              onSuccess:async(res)=>{
                if(res?.type==='signupUser/fulfilled'){
                  toast.success('welcome to EasyTrade')
                  navigate('/register/creatingshop')
                  if (shop_name !== "undefined") {

                    navigate(`/${shop_name}/dashboard`)
  
                  } else {
                    console.log(res?.payload?.token)
                    await ShopInfoRequest({ onSuccess:(response)=>{
                      localStorage.setItem('shop_url', response?.payload?.shop_url)
                      localStorage.setItem('dashboard_url', response?.payload?.dashboard_url)
                      localStorage.setItem('shop_id', response?.payload?.id)
                      localStorage.setItem('shop_name', response?.payload?.shop_name)
                      navigate(`/${response?.payload?.shop_name}/dashboard`)
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
            console.log(err);
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
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
          <FormControl fullWidth error={Boolean(touched.full_name && errors.full_name)} sx={{ ...theme.typography.customInput }}>
            <SoftBox mb={2}>
              <SoftInput placeholder="Name"  value={values.full_name}
                margin="normal"
                name="full_name"
                onBlur={handleBlur}
                onChange={handleChange} />
            </SoftBox>
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" name="email"value={values.email}
                onBlur={handleBlur}
                onChange={handleChange} />
            </SoftBox>
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password"   name="password"value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}/>
            </SoftBox>
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <SoftBox mb={2}>
            <PhoneField
                      
                      placeholder={"phone"}
                 
                      selectProps={{
                          value: values.code ? values.code : "+20",
                          onChange:handleChange,
                      }}
                      value={values.phone}
                      onChange={handleChange}
                    
                      sx={{".MuiInputBase-root input":{minWidth:"95% !important"}}}
                  />
            </SoftBox>
            </FormControl>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1} >
              <SoftButton variant="gradient" color="dark" fullWidth onClick={(e)=>handleSubmit(e)}>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        </form>)}
        </Formik>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
