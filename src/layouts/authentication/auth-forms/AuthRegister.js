/* eslint-disable prettier/prettier */
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
// material-ui
import { useTheme } from '@mui/material/styles';
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
  useMediaQuery,Avatar
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import useRequest from "hooks/useRequest";

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiPhoneNumber from 'material-ui-phone-number';
import {  GetShopInfo, SignupUser } from 'store/pages/signupslice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SoftInput from 'components/SoftInput';
import { SIGNUP,SHOP } from "data/api";
import SoftButton from "components/SoftButton";
// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others  }) => {
  const sub_domain = localStorage.getItem('sub_domain')
  const formData = new FormData();
 
  const theme = useTheme();
  const scriptedRef = useScriptRef();
 
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  
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
    functionChange({ target: { name:"logo" , value: event?.target?.files[0]} })
    // setImageFile(file);
    reader.onload = () => {

      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);

  };
  let [signUpRequest,signUPResponse]=useRequest({
        
        path:SIGNUP,method:"post",contentType: "multipart/form-data",
  })
  let [ShopInfoRequest,ShopInfoResponse]=useRequest({
    path:SHOP,method:"post"
  })
  const googleHandler = async () => {
    console.error('Register');
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
    console.log(others?.subscribtionId)
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
          full_name: '',
          email: '',
          password: '',
          shop_name: '',
          sub_domain: '',
          subscription:others.subscribtionId,
          // logo:"",
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
          logo:Yup.mixed().required("add logo please"),
          // code: Yup.string().required('code is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values,"on submit")
            //  try {
             Object.entries(values).forEach(([key, value])=>formData.append(key,value));
             
            //  formData.append('logo',values.logo)
            //  formData.append('phone',phone)
            // console.log(va)
             signUpRequest({
               body:formData,
               onSuccess:async(res)=>{
                 console.log(res,"rsjkdklsj")
                  // if(res?.type==='signupUser/fulfilled'){
                  //   toast.success('welcome to EasyTrade')
                    // navigate('/register/creatingshop')
                        localStorage.setItem('shop_url', res?.data?.shop_url)
                        localStorage.setItem('dashboard_url', res?.data?.dashboard_url)
                        localStorage.setItem('shop_id', res?.data?.id)
                        localStorage.setItem('shop_name', res?.data?.shop_name)
                        localStorage.setItem('sub_domain', res?.data?.sub_domain)
                        navigate(`/authentication/sign-in`)
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
               }
             })
         
          
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
          <form noValidate  {...others}>
            {console.log(errors)}
            <FormControl fullWidth error={Boolean(touched?.full_name && errors?.full_name)} sx={{ ...theme.typography.customInput }}>
              {/* <InputLabel htmlFor="outlined-adornment-fullname-register" >الاسم بالكامل</InputLabel> */}
              <SoftInput
                id="outlined-adornment-fullname-register"
                placeholder="الاسم بالكامل"
                type="text"
                value={values.full_name}
                margin="normal"
                name="full_name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}

                // sx={{".M":{marginY:"10px"}}}
              />
              {/* {console.log(errors.full_name)} */}
              {touched?.full_name && errors?.full_name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.full_name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched?.email && errors?.email)} sx={{ ...theme.typography.customInput }}>

              {/* <InputLabel sx={{
                backgroundColor: '#f8f9fa'
              }} htmlFor="outlined-adornment-email-register">البريد الالكتروني</InputLabel> */}
              <SoftInput
              placeholder="البريد الالكتروني"
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ ".MuiInputBase-root": { marginY:"10px" }}}
              />
              {touched?.email && errors?.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched?.password && errors?.password)} sx={{ ...theme.typography.customInput }}>
              {/* <InputLabel htmlFor="outlined-adornment-password-register">كلمة المرور</InputLabel> */}
              <SoftInput
                placeholder="كلمة المرور"
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                sx={{ ".MuiInputBase-root": { marginY:"10px" }}}
                // label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
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
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
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
            <FormControl fullWidth error={Boolean(touched?.phone && errors?.phone)} sx={{ ...theme.typography.customInput }} >
              <MuiPhoneNumber
               defaultCountry={'eg'}
               id="outlined-adornment-phone-register"
               type="text"
               value={values.phone}
               name="phone"
               onBlur={handleBlur}
               onChange={(e) => { handleChange({ target: { name: 'phone', value: e } }); }}
               inputProps={{
                 'aria-label': 'phone'
               }}
                variant='outlined'
                placeholder='Phone number'
                />
                {touched?.phone && errors?.phone && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.phone}
                </FormHelperText>
                )}
              </FormControl>
            <FormControl fullWidth error={Boolean(touched?.shop_name && errors?.shop_name)} sx={{ ...theme.typography.customInput }}>
              {/* <InputLabel htmlFor="outlined-adornment-storename-register">اسم المتجر</InputLabel> */}
              <SoftInput
              placeholder="اسم المتجر"
                id="outlined-adornment-storename-register"
                type="text"
                value={values.shop_name}
                name="shop_name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                sx={{ ".MuiInputBase-root": { marginY:"10px" }}}
              />
              {touched?.shop_name && errors?.shop_name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.shop_name}
                </FormHelperText>
              )}
            </FormControl>
          <FormControl fullWidth error={Boolean(touched?.sub_domain && errors?.sub_domain)} sx={{ ...theme.typography.customInput }}>
              {/* <InputLabel htmlFor="outlined-adornment-email-register">Online Store Domain</InputLabel> */}
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
                  'aria-label': 'subdomain',
                }}
              />
              {touched?.storedomain && errors?.storedomain && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.storedomain}
                </FormHelperText>
              )}
            </FormControl> 
            {/* <FormControl fullWidth error={Boolean(touched.is_company && errors.is_company)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Account Type</InputLabel>
              <Select
                id="outlined-adornment-subdomain-register"
                type="text"
                value={values.is_company}
                name="is_company"
                onBlur={handleBlur}
                onChange={handleChange}
                aria-describedby="filled-company-helper-text"
                inputProps={{
                  'aria-label': 'company',
                }}
                displayEmpty
              >
                <MenuItem value={""}>Select account type</MenuItem>
                <MenuItem value={'true'}>Company</MenuItem>
                <MenuItem value={'false'}>Individual</MenuItem>
              </Select>
              {touched.is_company && errors.is_company && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.is_company}
                </FormHelperText>
              )}
            </FormControl> */}
              <FormControl error={Boolean(touched?.logo && errors?.logo)}>
              <Box sx={{ width: '90px' }} >
                <label htmlFor="profile_image" style={{ position: 'relative' }}>
                  <IconButton
                    onClick={() => {
                      document.getElementById('profile_image').click();
                    }}
                    sx={{ position: 'absolute', zIndex: 1, right: 0, bottom: 0, boxShadow: 3, alignItems: 'center', bgcolor: '#fff' }}
                  >
                    <CameraAltIcon sx={{ zIndex: 1 }} />
                  </IconButton>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="profile_image"
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%'
                      }}
                    />
                  ) : (
                    <Avatar
                      src={avatarUrl}
                      alt="image"
                      sx={{ width: '80px', height: '80px' }}
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
                  style={{ display: 'none' }}
                />
              </Box>

              {touched?.logo && errors?.logo && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.logo}
                </FormHelperText>
              )}
            </FormControl>
            {/* <Box sx={{width:"90px"}}>
                      <label htmlFor="profile_image" style={{ position: 'relative'}}>
                        <IconButton
                          onClick={() => {
                            document.getElementById('profile_image').click();
                          }}
                          sx={{ position: 'absolute', zIndex: 1, right: 0, bottom: 0, boxShadow: 3, alignItems: 'center', bgcolor: '#fff' }}
                        >
                          <CameraAltIcon sx={{ zIndex: 1 }} />
                        </IconButton>
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt="profile_image"
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%'
                            }}
                          />
                        ) : (
                          <Box
                            src={avatarUrl}
                            alt="image"
                            sx={{ width: '80px', height: '80px' ,bgcolor:'#5D449B',borderRadius:'8px',margin:'8px'}}
                            // sx={{ height: "50%", width: "60%" }}
                          />
                        )}
                      </label>
                      <input
                        id="profile_image"
                        name="profile_image"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                      />
                    </Box>
            {/* <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid> */}
            {errors?.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>

                <SoftButton  fullWidth onClick={(e)=>handleSubmit(e)}
                 size="large" type="submit" variant="contained" sx={{ borderRadius: '12px',backgroundColor:'#5D449B',color:'white' }}onSubmit={(e)=>handleSubmit(e)}>

                  انشاء حساب
                </SoftButton>
              </AnimateButton>
            </Box>
            <Grid item xs={12}>
              <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
                    color: 'grey.700',
                    backgroundColor: theme.palette.grey[50],
                    borderColor: theme.palette.grey[100],
                    marginTop: '20px',
                    borderRadius: '8px'

                  }}
                >
                  <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                    <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                  </Box>
                  الدخول بحساب جوجل
                </Button>
              </AnimateButton>
            </Grid>
          </form>
        )}
      </Formik>
     

      <ToastContainer />
      {signUPResponse.failAlert}
      {ShopInfoResponse.failAlert}
    </>
  );
};

export default FirebaseRegister;
