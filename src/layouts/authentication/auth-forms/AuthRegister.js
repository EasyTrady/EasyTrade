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
} from "@mui/material";

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
  // const [phone,setPhone]=useState('')
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  // const [imageFile, setImageFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const handleAvatarChange = (event, functionChange) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // formData?.append("logo", event.target.files[0]);
    functionChange({ target: { name: "logo", value: event?.target?.files[0] } });
    // setImageFile(file);
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  let [signUpRequest, signUPResponse] = useRequest({
    path: SIGNUP,
    method: "post",
    contentType: "multipart/form-data",
  });
  let [ShopInfoRequest, ShopInfoResponse] = useRequest({
    path: SHOP,
    method: "post",
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
    // changePassword('123456');
    console.log(others?.subscribtionId);
  }, []);
  // console.log(user);
  return (
    <>
      {/* <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid> */}
      <Formik
        initialValues={{
          full_name: "",
          email: "",
          password: "",
          shop_name: "",
          sub_domain: "",
          subscription: others.subscribtionId,
          // logo:"",
          phone: "",
          code: "+20",
          // is_company:'',
        }}
        validationSchema={Yup.object().shape({
          full_name: Yup.string().max(255).required("Name is required"),
          email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          phone: Yup.string().max(20).required("Phone is required"),
          shop_name: Yup.string().max(255).required("Store name is required"),
          sub_domain: Yup.string().max(255).required("Store Domain is required"),
          logo: Yup.mixed().required("add logo please"),
          // code: Yup.string().required('code is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values, "on submit");
          //  try {
          Object.entries(values).forEach(([key, value]) => formData.append(key, value));

          //  formData.append('logo',values.logo)
          //  formData.append('phone',phone)
          // console.log(va)
          signUpRequest({
            body: formData,
            onSuccess: async (res) => {
              console.log(res, "rsjkdklsj");
              // if(res?.type==='signupUser/fulfilled'){
              //   toast.success('welcome to EasyTrade')
              // navigate('/register/creatingshop')
              localStorage.setItem("shop_url", res?.data?.shop_url);
              localStorage.setItem("dashboard_url", res?.data?.dashboard_url);
              localStorage.setItem("shop_id", res?.data?.id);
              localStorage.setItem("shop_name", res?.data?.shop_name);
              localStorage.setItem("sub_domain", res?.data?.sub_domain);
              navigate(`/authentication/sign-in`);
              // }else{
              //    console.log(res.data)
              //   setErrors(res.payload)
              //  const errorMessage = typeof res.payload === 'string' ? res.payload : 'An error occurred';
              //  toast.error(errorMessage,{
              //    position: "bottom-left",
              //    autoClose: 5000,
              //    hideProgressBar: false,
              //    closeOnClick: true,
              //    pauseOnHover: true,
              //    draggable: true,
              //    progress: undefined,
              //    theme: "light",
              //    className: 'toast-message'
              //    })
              // }
            },
          });

          //  if (scriptedRef.current) {
          //    setStatus({ success: true });
          //     setSubmitting(false);
          //  }
          //  } catch (err) {
          //    console.log(err,"eettoe")
          //    if (scriptedRef.current) {
          //      setStatus({ success: false });
          //      setErrors({ submit: err.message });
          //       setSubmitting(false);
          //    }
          //  }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Box 
          sx={{
            justifyContent:'center',
            alignItems:'center',
            textAlign:'end'
            }}>
          <form noValidate {...others}>
            {console.log(errors)}

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
              
              <FormControl
                error={Boolean(touched?.full_name && errors?.full_name)}
                sx={{ ...theme.typography.customInput, width: '100%' }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px', pt:'16px', color:'#344054'}}>الإسم بالكامل</Typography>
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
              <FormControl
                error={Boolean(touched?.email && errors?.email)}
                sx={{ ...theme.typography.customInput, width: '100%'  }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px', pt:'16px', color:'#344054'}}>البريد الإلكتروني</Typography>
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
              <FormControl
                error={Boolean(touched?.password && errors?.password)}
                sx={{ ...theme.typography.customInput, width: '100%' }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px', pt:'16px', color:'#344054'}}>كلمة المرور</Typography>
                <TextField
                  variant="outlined"
                  name="password"
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    placeholder:"كلمة المرور",
                    style: {direction: 'rtl',
                    width:'100%',
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Cairo',
                    color: '#667085'}
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></TextField>
                {touched?.password && errors?.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              {strength !== 0 && (
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          style={{ backgroundColor: level?.color }}
                          sx={{ width: 85, height: 8, borderRadius: "7px" }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}
              <FormControl
                error={Boolean(touched?.phone && errors?.phone)}
                sx={{ ...theme.typography.customInput, width: '100%' }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px', pt:'16px', color:'#344054'}}>الهاتف المحمول</Typography>
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
              <FormControl
                error={Boolean(touched?.shop_name && errors?.shop_name)}
                sx={{ ...theme.typography.customInput , width: '100%'}}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px', pt:'16px'}}>اسم المتجر</Typography>
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
            </Box>

            
            {/* <FormControl
              fullWidth
              error={Boolean(touched?.sub_domain && errors?.sub_domain)}
              sx={{ ...theme.typography.customInput }}
            >
              <OutlinedInput
                placeholder="store domain"
                id="outlined-adornment-email-register"
                type="text"
                value={values.sub_domain}
                name="sub_domain"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">.easytrade.net</InputAdornment>}
                aria-describedby="filled-subdomain-helper-text"
                inputProps={{
                  "aria-label": "subdomain",
                }}
              />
              {touched?.storedomain && errors?.storedomain && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.storedomain}
                </FormHelperText>
              )}
            </FormControl> */}


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
                >
                  انشاء حساب
                </SoftButton>
              </AnimateButton>
            </Box>
            <Grid item xs={12} sx={{ maxWidth: '75%' }}>
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                {/* <Button
                  variant="outlined"
                  sx={{
                    cursor: 'unset',
                    m: 2,
                    py: 0.5,
                    px: 7,
                    borderColor: `${theme.palette.grey[100]} !important`,
                    color: `${theme.palette.grey[900]}!important`,
                    fontWeight: 500,
                    borderRadius: `${customization.borderRadius}px`
                  }}
                  disableRipple
                  disabled
                >
                  OR
                </Button> */}
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
