import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
 import AuthLogin from '../auth-forms/AuthLogin';
// import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';
// import login from '../../../assets/images/icons/Social Media Icon Square/login.png';
import PageLayout from "examples/LayoutContainers/PageLayout"

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <PageLayout>
    <AuthWrapper1 >
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
          bgcolor:'#FFFFFF',
          // paddingTop: '70px'
        }}
      >
        {/* <Box component="img" sx={{  width: { xl: '100%', lg: '100%', md: '100%', sm: '10%', sx: '10%' }, height:{ xl:'100vh', lg: '100vh', md:'100vh', sm: '30vh', sx: '30vh'}}} src={login}></Box> */}
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh',bgcolor:'#FFFFFF',boxShadow:'none' }}>
        <Grid item xs={12} >
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)'}}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper >
                <Grid container spacing={2} alignItems="center" justifyContent="center" >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      {/* <Logo /> */}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="flex-end" gap={'12px'} >
                          <Typography color={theme.palette.secondary.main}  gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
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
  );
};

export default Login;
