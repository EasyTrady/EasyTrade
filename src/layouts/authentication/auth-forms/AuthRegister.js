/* eslint-disable prettier/prettier */
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// material-ui
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
  Avatar,
  TextField,
  Select,
  CircularProgress,
} from "@mui/material";


import MenuItem from '@mui/material/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "hooks/useScriptRef";
import Google from "assets/images/icons/social-google.svg";
import AnimateButton from "ui-component/extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";
import useRequest from "hooks/useRequest";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiPhoneNumber from "material-ui-phone-number";
import { GetShopInfo, SignupUser } from "store/pages/signupslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SoftInput from "components/SoftInput";
import { SIGNUP, SHOP } from "data/api";
import SoftButton from "components/SoftButton";
import './auth.css';
import { SHOPCATEGORIES } from "data/api";
import { useLocation } from 'react-router-dom';


// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const sub_domain = localStorage.getItem("sub_domain");
  const formData = new FormData();

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const user = useSelector((state) => state.registration.user);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [avatarUrl, setAvatarUrl] = React.useState(null);

  const [shopCategories, setShopCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    console.log('Query parameter "id":', id);
  }, [id]);

  const handleAvatarChange = (event, functionChange) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    functionChange({ target: { name: "logo", value: event?.target?.files[0] } });
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
    formData.append("logo", event.target.files[0]);
  };
  let [signUpRequest, signUPResponse] = useRequest({
    path: SIGNUP,
    method: "post",
    contentType: "multipart/form-data",
  });
  let [ShopInfoRequest, ShopInfoResponse] = useRequest({
    path: SHOP,
    method: "get",
  });

  let [ShopCategoryRequest, ShopCategoryResponse] = useRequest({
    path: SHOPCATEGORIES,
    method: "get",
  });

  const googleHandler = async () => {
    console.error("Register");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };


  useEffect(() => {
    ShopCategoryRequest({
      onSuccess: async (res) => {
        setShopCategories(res?.data || []);
        setLoadingCategories(false);
      },
      onError: (error) => {
        console.error("Error fetching shop categories:", error);
        setLoadingCategories(false);
      },
    });
  }, []);

  const handleFormSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setSubmitting(true); // Set submitting to true to show loading indicator

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      if (values.logo) {
        formData.append("logo", values.logo);
      }
      formData.append("shop_type", values.shop_category);

      await signUpRequest({
        body: formData,
        onSuccess: async (res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("tokenTimestamp", new Date(res.data.expiry).getTime());
          setSubmitting(false);

          await ShopInfoRequest({
            token: `Token ${res.data.token}`,
            onSuccess: (response) => {
              // Handle the response and set localStorage items accordingly
              navigate(`/${response?.data?.sub_domain}/dashboard`);
            },
          });
        },
        onError: (error) => {
          console.error("Error during signup:", error);
          setSubmitting(false);
          const errorMessage = typeof error.payload === 'string' ? error.payload : 'An error occurred';
          toast.error(errorMessage, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: 'toast-message'
          });
        }
      });
    } catch (err) {
      console.error(err);

      // Set submitting to false in case of an error
      setSubmitting(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          full_name: "",
          email: "",
          password: "",
          shop_name: "",
          sub_domain: "",
          subscription: id || '',
          phone: "",
          code: "+20",
          shop_category: "",
          // logo:"",
        }}
        validationSchema={Yup.object().shape({
          full_name: Yup.string().max(255).required("Name is required"),
          email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          phone: Yup.string().max(20).required("Phone is required"),
          shop_name: Yup.string().max(255).required("Store name is required"),
          sub_domain: Yup.string().max(255).required("Store Domain is required"),
          logo: Yup.mixed().required("add logo please"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Box 
          sx={{
            justifyContent:'center',
            alignItems:'center',
            textAlign:'end'
            }}>
          <form noValidate {...others}>
     

            {/* upload stor logo */}
            <Box sx={{display: "flex",justifyContent:'end'}}>
              
              <FormControl error={Boolean(touched?.logo && errors?.logo)}>
                  <Box sx={{display: "flex", flexDirection: 'row-reverse', p: '16px 0'}}>
                    <label htmlFor="profile_image" style={{ position: "relative" }}>
                      
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="profile_image"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <Avatar
                          src={avatarUrl}
                          alt="image"
                          sx={{ width: "80px", height: "80px", marginBottom: "10px" }}
                          // sx={{ height: "50%", width: "60%" }}
                        />
                      )}
                    </label>
                    <input
                      id="profile_image"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onBlur={handleBlur}
                      onChange={(e) => handleAvatarChange(e, handleChange)}
                      style={{ display: "none" }}
                    />
                    <Box sx={{ padding: '15px 15px 0'}}>
                      <Typography 
                        sx={{
                          fontSize:'18px', 
                          margin: '0',
                          fontFamily:'Semibold', lineHeight: '28px', fontWeight:600
                        }} variant="h6" 
                        gutterBottom
                      >شعار المتجر</Typography>
                      <Typography
                        onClick={() => {
                          document.getElementById("profile_image").click();
                        }} 
                        sx={{
                          lineHeight: '24px', 
                          color: '#5D449B', 
                          textDecoration:'underline',
                          fontFamily:'Cairo',
                          cursor:'pointer',
                          fontWeight:600,
                          fontSize:'16px'
                        }} 
                        variant="overline" 
                        gutterBottom
                      >رفع الصورة</Typography>
                    </Box>
                  </Box>
                {touched?.logo && errors?.logo && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.logo}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            {/* end upload store logo */}
            
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              {/* full name */}
              <FormControl
                error={Boolean(touched?.full_name && errors?.full_name)}
                sx={{ ...theme.typography.customInput, width: '100%' }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'5px', pt:'16px', color:'#344054'}}>الإسم بالكامل</Typography>
                <TextField
                  variant="outlined"
                  name="full_name"
                  value={values.full_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    placeholder:"الإسم بالكامل",
                    style: {direction: 'rtl',
                    width:'100%',
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Cairo',
                    color: '#667085'}
                  }}
                ></TextField>
                {touched?.full_name && errors?.full_name && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.full_name}
                  </FormHelperText>
                )}
              </FormControl>
              {/* phon number */}
              <FormControl
                error={Boolean(touched?.phone && errors?.phone)}
                sx={{ ...theme.typography.customInput, width: '100%' }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'5px', pt:'16px', color:'#344054'}}>الهاتف المحمول</Typography>
                <MuiPhoneNumber
                  defaultCountry={"eg"}
                  id="outlined-adornment-phone-register"
                  type="text"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange({ target: { name: "phone", value: e } });
                  }}
                  variant="outlined"
                  InputProps={{
                    placeholder:"الهاتف المحمول",
                    style: {
                    direction:'rtl',
                    width:'100%',
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Cairo',
                    color: '#667085'
                  }
                  }}
                  sx={{bgcolor: '#fff'}}
                />
                {touched?.phone && errors?.phone && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.phone}
                  </FormHelperText>
                )}
              </FormControl>
              {/* email */}
              <FormControl
                error={Boolean(touched?.email && errors?.email)}
                sx={{ ...theme.typography.customInput, width: '100%'  }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'5px', pt:'16px', color:'#344054'}}>البريد الإلكتروني</Typography>
                <TextField
                  variant="outlined"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    placeholder:"البريد الالكتروني",
                    style: {direction: 'rtl',
                    width:'100%',
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Cairo',
                    color: '#667085'}
                  }}
                ></TextField>
                {touched?.email && errors?.email && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              {/* shop category */}
              <FormControl fullWidth error={Boolean(touched?.shop_category && errors?.shop_category)}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, fontFamily: "Cairo", pb:'5px', pt: '16px', color: '#344054' }}>
                  نوع المتجر
                </Typography>
                <Select
                  id="shop-category"
                  name="shop_category"  // Add this line
                  value={values.shop_category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  displayEmpty
                  inputProps={{ 'aria-label': 'shop_category' }}
                  IconComponent={() => <KeyboardArrowDownIcon sx={{ position: 'absolute' }} />}
                  sx={{ textAlign: 'right', cursor: 'pointer' }}
                >
                  {loadingCategories ? (
                    <MenuItem value="" disabled>
                      Loading Categories...
                    </MenuItem>
                  ) : (
                    shopCategories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.category_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {touched?.shop_category && errors?.shop_category && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.shop_category}
                  </FormHelperText>
                )}
              </FormControl>
              {/* shop name */}
              <FormControl
                error={Boolean(touched?.shop_name && errors?.shop_name)}
                sx={{ ...theme.typography.customInput , width: '100%'}}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'5px', pt:'16px'}}>اسم المتجر</Typography>
                <SoftInput
                  InputProps={{
                    placeholder:"اسم المتجر",
                    style: {direction: 'rtl',
                    width:'100%',
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Cairo'}
                  }}
                  id="outlined-adornment-storename-register"
                  type="text"
                  value={values.shop_name}
                  name="shop_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched?.shop_name && errors?.shop_name && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.shop_name}
                  </FormHelperText>
                )}
              </FormControl>
              {/* shop name email */}
              <FormControl
                error={Boolean(touched?.sub_domain && errors?.sub_domain)}
                sx={{ ...theme.typography.customInput , width: '100%'}}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'5px', pt:'16px'}}>اسم الرابط الالكتروني للمتجر</Typography>
                <SoftInput
                  InputProps={{
                    placeholder:"مثال متجر  |Easytrade.com",
                    style: {direction: 'rtl',
                    width:'100%',
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Cairo'}
                  }}
                  id="outlined-adornment-storename-register"
                  type="text"
                  value={values.sub_domain}
                  name="sub_domain"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched?.sub_domain && errors?.sub_domain && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.sub_domain}
                  </FormHelperText>
                )}
              </FormControl>
              {/* password */}
              <FormControl
                error={Boolean(touched?.password && errors?.password)}
                sx={{ ...theme.typography.customInput, marginY: '15px' }}
              >
                <Box
                  sx={{
                    width:'100%',
                  }}
                >
                  <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'5px'}}>كلمة المرور</Typography>
                  <TextField
                    variant='outlined'
                    InputProps={{
                      placeholder:"كلمة المرور",
                      style: {
                        fontWeight: 400,
                        fontSize: '16px',
                        fontFamily: 'Cairo'
                      }
                    }}
                    sx={{
                      direction: 'rtl',
                      minWidth:'100%',
                    }}
                    name="password"
                    value={values?.password}
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></TextField>
                  <InputAdornment sx={{
                    position: 'absolute',
                    top: '75%',
                    left: '0',
                    padding: '0',
                    transform: 'translate(5px, -50%)'
                  }} position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{color:'#344054'}}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                </Box>
                {touched?.password && errors?.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            {errors?.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <SoftButton
                  onClick={(e) => handleSubmit(e)}
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "12PX",
                    marginRight: 'auto',
                    width:'100%',
                    padding: "10px, 18px, 10px, 18px",
                    backgroundColor: "#5D449B",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#5D449B",
                    },
                    fontFamily:'Cairo',
                    fontSize:'16px',
                    fontWeight:600,
                    lineHeight: '24px'
                  }}
                  onSubmit={(e) => handleSubmit(e)}
                  disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
                >
                  {isSubmitting ? "جاري التحميل..." : "انشاء حساب"}
                  
                </SoftButton>
              </AnimateButton>
            </Box>
            <Grid item xs={12} sx={{ maxWidth: '75%' }}>
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={googleHandler}
                  size="large"
                  sx={{
                    color: "grey.700",
                    marginRight: 'auto',
                    width:'100%',
                    backgroundColor: theme.palette.grey[50],
                    borderColor: theme.palette.grey[100],
                    marginTop: "20px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[50],
                      borderColor: "#D0D5DD",
                    },
                    fontFamily:'Cairo',
                    fontSize:'16px',
                    fontWeight:600,
                    lineHeight: '24px',
                    color:'#344054'
                  }}
                >
                  <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                    <img
                      src={Google}
                      alt="google"
                      width={16}
                      height={16}
                      style={{ marginRight: matchDownSM ? 8 : 16 }}
                    />
                  </Box>
                  الدخول بحساب جوجل
                </Button>
              </AnimateButton>
            </Grid>
          </form>
        </Box>
        )}
      </Formik>

      <ToastContainer />
      {signUPResponse.failAlert}
      {ShopInfoResponse.failAlert}
    </>
  );
};

export default FirebaseRegister;
