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
                localStorage.setItem('tokenTimestamp', new Date(res.data.expiry).getTime());
                  console.log(Boolean(sub_domain))

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
              }
            })
          }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
           <Box sx={{justifyContent:'center',alignItems:'flex-end',textAlign:'right',width:'100%',}}>

          <form noValidate onSubmit={handleSubmit} {...others} >
            <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
           <FormControl
              
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput 
            }}
            >
              <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px', pt:'16px'}}>البريد الإلكتروني</Typography>
              <TextField
              variant='outlined'
              InputProps={{
                placeholder:"البريد الالكتروني",
                style: {direction: 'rtl',
                width:'100%',
                fontWeight: 400,
                fontSize: '16px',
                fontFamily: 'Cairo'}
              }}
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              ></TextField>
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput, marginY: '15px' }}
            >
              <Box
                sx={{
                  width:'100%'

                }}
              >
                <Typography sx={{fontSize:'14px', fontWeight:500, fontFamily: "Cairo", pb:'16px'}}>كلمة المرور</Typography>
                <TextField
                variant='outlined'
                InputProps={{
                  placeholder:"كلمة المرور",
                  style: {
                  fontWeight: 400,
                  fontSize: '16px',
                  fontFamily: 'Cairo'}
                }}
                  sx={{
                    direction: 'rtl',
                    minWidth:'100%',
                    
                  }}
                  name="password"
                  value={values.password}
                  type={showPassword ? 'text' : 'password'}
                  
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

              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            </Box>
            <Stack direction="row-reverse" alignItems="center" justifyContent="space-between" spacing={1} >
              <Typography sx={{ 
                fontFamily: 'Cairo',
                fontSize: '14px',
                fontWeight: 400, 
                direction:'rtl',
                display:'flex',
                justifyContent:'end'}}>
                <FormControlLabel
                sx={{padding:"0 0 0 20px",
                marginRight:'0 !important' }}
                control={
                  <Checkbox variant="outlined" onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                  />
                }
              /> تذكرني؟
              </Typography>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{  cursor: 'pointer',color:'#6941C6',fontFamily:'Cairo',fontSize:{xs:'12px', md:'14px'},fontWeight:600 }}
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
                  sx={{ borderRadius: '12PX', padding: '10px, 18px, 10px, 18px' ,
                  backgroundColor:'#5D449B',color:'#FFFFFF', width:'100%',
                  '&:hover': {
                    backgroundColor: '#5D449B',
                  }, fontFamily:'Cairo', fontSize:'16px', fontWeight: 600
                }}
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
                      </Box>


        )}
      </Formik>
      <Divider  />
      <Box width={'100%'}>
        <AnimateButton >
          <Button  
            onClick={googleHandler}
           
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: '#D0D5DD',
              padding: '10px 16px 10px 16px',
              width:'100%',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: theme.palette.grey[50] ,
                borderColor: '#D0D5DD',
              }, fontFamily:'Cairo', fontSize:'16px', fontWeight: 600
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
        
        </Box>
        
        
      <ToastContainer />
      {signInResponse.failAlert}
      {ShopInfoResponse.failAlert}
    </>
  );
};

export default FirebaseLogin;
