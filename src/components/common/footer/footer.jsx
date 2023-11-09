import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, styled ,  InputLabel} from '@mui/material';
import logo from '../../../assets/images/icons/Social Media Icon Square/logo.svg';
import face from '../../../assets/images/icons/Social Media Icon Square/Facebook.png';
import insta from '../../../assets/images/icons/Social Media Icon Square/Instagram.png';
import linkedin from '../../../assets/images/icons/Social Media Icon Square/linkedin.png';
import x from '../../../assets/images/icons/Social Media Icon Square/x.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',

  padding: '16px',
  textAlign: 'center',
  color: 'secondary'
}));

export function Footer () {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid overflow='hidden' container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ borderTop: '1px solid #D4D2E3', borderBottom: '1px solid #D4D2E3', position: 'absolute', Top: '0', left: '0', right: '0' }}>
        <Grid item xs={3} >
          <Item sx={{ fontSize: '30px', fontWeight: 700, boxShadow: 'none' }}>اشترك ليصلك كل جديد</Item>
            <Box sx={{display:"flex"}}> 
           <Button sx={{ bgcolor: '#5D449B', color: '#faf8f9', ':hover': { bgcolor: '#5D449B' } }}>ارسال</Button>
           <InputLabel sx={{
                backgroundColor: '#f8f9fa'
              }} htmlFor="outlined-adornment-email-register">البريد الالكتروني</InputLabel>
           </Box>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ fontSize: '30px', fontWeight: 700, boxShadow: 'none' ,bgcolor: '#f8f9fa'}}>الرقم الضريبي</Item>
          <Item sx={{ boxShadow: 'none' ,bgcolor: '#f8f9fa'}}> 1123453456678</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ fontSize: '30px', fontWeight: 700, boxShadow: 'none',bgcolor: '#f8f9fa' }}>السجل التجاري</Item>
          <Item sx={{ boxShadow: 'none',bgcolor: '#f8f9fa' }}>112345678</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ boxShadow: 'none',bgcolor: '#f8f9fa' }}>
          <img src={logo} alt="logo" />
          <Box sx={{ display: 'flex', paddingTop: '30px',bgcolor: '#f8f9fa' }}>
          <Box component="img" sx={{ width: '10%', paddingLeft: '3px',bgcolor: '#f8f9fa' }} src={face}></Box>
          <Box component="img" sx={{ width: '10%', paddingLeft: '3px',bgcolor: '#f8f9fa' }} src={insta}></Box>
          <Box component="img" sx={{ width: '10%', paddingLeft: '3px',bgcolor: '#f8f9fa' }} src={linkedin}></Box>
          <Box component="img" sx={{ width: '10%', borderRadius: '10px', paddingLeft: '3px',bgcolor: '#f8f9fa'}} src={x}></Box>

          </Box>

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}