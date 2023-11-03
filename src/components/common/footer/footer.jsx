import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import logo from '../../../assets/images/g14.png';
import {  Typography,styled } from '@mui/material';
import { interFont } from '../themes';
import face from '../../../assets/images/icons/Social Media Icon Square/Facebook.png';
import insta from '../../../assets/images/icons/Social Media Icon Square/Instagram.png';
import linkedin from '../../../assets/images/icons/Social Media Icon Square/linkedin.png';
import x from '../../../assets/images/icons/Social Media Icon Square/x.jpg';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',

  padding: '16px',
  textAlign: 'center',
  color: 'secondary',
}));

export function Footer() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  sx={{  borderTop: '1px solid #D4D2E3',position: 'absolute',Top:'0', left:'0',right:'0'}}>
        <Grid item xs={3} >
          <Item sx={{fontSize:'30px',fontWeight:700}}>اشترك ليصلك كل جديد</Item>
          <Item>  <Button sx={{bgcolor:"#5D449B",color:"#faf8f9",':hover': {
                    bgcolor: '#5D449B'
                  }}}>ارسال</Button>  </Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{fontSize:'30px',fontWeight:700}}>الرقم الضريبي</Item>
          <Item> 1123453456678</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{fontSize:'30px',fontWeight:700}}>السجل التجاري</Item>
          <Item>112345678</Item>
        </Grid>
        <Grid item xs={3}>
          <Item> <Box
            
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex', xs: 'flex' },
              fontFamily: 'Cairo',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none'
            }}
          >
            <img src={logo} alt="logo" />
            <Box sx={{
              marginLeft :'10px',
            }}>
                <ThemeProvider theme={interFont}>
                {/* <CssBaseline /> */}
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#7E3E98',
                    letterSpacing: 1,
                    fontFamily:'inter',

                  }} >EASYTRADE</Typography>
              </ThemeProvider>

              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#293D9B',
                  letterSpacing: 1,
                  fontFamily:'Arial'

                }}
              >ONLINE SHOP & MORE</Typography>
            </Box>
          </Box>
          <Box sx={{ display:'flex',paddingTop:'30px'}}>
          <Box component="img" sx={{ width: '10%',paddingLeft:'3px' }} src={face}></Box>
          <Box component="img" sx={{ width: '10%',paddingLeft:'3px' }} src={insta}></Box>
          <Box component="img" sx={{ width: '10%', paddingLeft:'3px'}} src={linkedin}></Box>
          <Box component="img" sx={{ width: '10%', borderRadius:'10px',paddingLeft:'3px'}} src={x}></Box>

          </Box>
          
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}