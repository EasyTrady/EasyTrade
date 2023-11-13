import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useRequest from "hooks/useRequest";
import { SIGNIN ,PROFILE} from "data/api";

import Google from 'assets/images/icons/social-google.svg';
import { ToastContainer, toast } from 'react-toastify';
import { UserSignin } from 'store/pages/signinSlice';
import { useNavigate } from 'react-router';
import { GetShopInfo } from 'store/pages/signupslice';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  let Token=localStorage.getItem('token')

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const shop_name = localStorage.getItem('shop_name')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleHandler = async () => {
    console.error('Login');
  };
  const sub_domain = localStorage.getItem('sub_domain')

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  let [signInRequest,signInResponse]=useRequest({
    path:SIGNIN,method:"post"
  })
  let [ShopInfoRequest,ShopInfoResponse]=useRequest({
    path:PROFILE,method:"get",Token:`Token ${Token}`
  })
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        {/* <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid> */}
      </Grid>
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
         console.log(values)
            signInRequest({
              body:values,
              onSuccess:async(res)=>{
                localStorage.setItem('token', res.data.token);
                // console.log(res.data.expiry,new Date(),new Date(res.data.expiry).getHours())
                localStorage.setItem('tokenTimestamp', new Date(res.data.expiry).getTime());
                // if (Boolean(sub_domain)) {
                  console.log(Boolean(sub_domain))


                  // navigate(`/${sub_domain}/dashboard`)

                // } else {s
                  
                  await ShopInfoRequest({ 
                    token:`Token ${res.data.token}`,onSuccess:(response)=>{
                    
                    localStorage.setItem('shop_url', response?.data?.shop_url)
                    localStorage.setItem('dashboard_url', response?.data?.dashboard_url)
                    localStorage.setItem('shop_id', response?.data?.id)
                    localStorage.setItem('shop_name', response?.data?.shop_name)
                    localStorage.setItem('image', response?.data?.logo)
                    localStorage.setItem('email', response?.data?.user?.email)
                    localStorage.setItem('phone', response?.data?.user?.phone)
                    localStorage.setItem('sub_domain', response?.data?.sub_domain)
                    console.log(response?.data)
                    navigate(`/${response?.data?.sub_domain}/dashboard`)
                  } })

                // }
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
          <form noValidate onSubmit={handleSubmit} {...others}>
            {console.log(values)}
           <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput, marginY: '15px' }}
            >
              <TextField
              variant='outlined'
                sx={{
                  direction: 'rtl'
                }}
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="البريد الالكتروني"
              ></TextField>
              {/* <InputLabel htmlFor="outlined-adornment-email-login">البريد الالكتروني</InputLabel>
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
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput, marginY: '15px' }}
            >
              {/* <InputLabel htmlFor="outlined-adornment-password-login" sx={{textAlign:'right',display:'block'}}>كلمة المرور</InputLabel>
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
              <Box
                sx={{
                  position: 'relative'
                }}
              >
                <TextField
                variant='outlined'
                  sx={{
                    direction: 'rtl',
                    width:'100%'
                  }}
                  name="password"
                  value={values.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="كلمة المرور"
                  onBlur={handleBlur}
                onChange={handleChange}
                ></TextField>
                <InputAdornment sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  padding: '0',
                  transform: 'translate(5px, -50%)'
                }} position="end">
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
              </Box>

              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="تذكرني"
              />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                هل نسيت كلمة المرور ؟
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  sx={{ borderRadius: '12PX', padding: '10px, 18px, 10px, 18px' ,backgroundColor:'#5D449B',color:'white'}}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                
                >
                  تسجيل الدخول
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
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
            disableElevation
            fullWidth
            onClick={googleHandler}
            size="large"
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
              padding: '10px 16px 10px 16px',
              marginTop: '20px',
              borderRadius: '8px'
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
            تسجيل الدخول بحساب جوجل
          </Button>
        </AnimateButton>
      </Grid>
      <ToastContainer />
      {signInResponse.failAlert}
      {ShopInfoResponse.failAlert}
    </>
  );
};

export default FirebaseLogin;
