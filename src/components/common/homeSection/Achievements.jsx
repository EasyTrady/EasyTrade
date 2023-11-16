import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function RowAndColumnSpacing() {
  return (
    <Container sx={{
      width: '100%'
    }}>
      <Typography sx={{ fontSize: '50px', fontWeight: 600, textAlign: 'center', marginTop: '30px',color:'#3D2D66',fontFamily:'Cairo' }}>انجازاتنا</Typography>
      <Box>
        <Grid container sx={{textAlign:'center',justifyContent:'center', display: 'flex', width: '100%', alignItems: 'start',marginBottom:'100px'}}>
          <Grid item xs={4} md={3} lg={2} sx={{
            borderRight: '2px solid #C4C4C4',
            padding: '16px',
            
          }}>
            <Item sx={{
              fontSize: '35px',
              fontWeight: 900,
              boxShadow: 'none',
             bgcolor: '#f8f9fa'
            }}>+150</Item>
            <Item sx={{
              fontSize: '25px',
              fontWeight: 300,
              boxShadow: 'none',
              borderRightWidth: '8PX',
              bgcolor: '#f8f9fa'
            }}>عملاء</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px' }}>
            <Item sx={{
              fontSize: '35px',
              boxShadow: 'none',
              fontWeight: 900,
              bgcolor: '#f8f9fa'
            }}>+8</Item>
            <Item sx={{
              fontSize: '25px',
              fontWeight: 300,
              boxShadow: 'none',
              bgcolor: '#f8f9fa'

            }}>تطبيق</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px' }}>
            <Item sx={{
              fontSize: '35px',
              fontWeight: 900,
              boxShadow: 'none',
              bgcolor: '#f8f9fa'
            }}>+100</Item>
            <Item sx={{
              fontSize: '25px',
              fontWeight: 300,
              boxShadow: 'none',
              borderRightWidth: '8PX',
              bgcolor: '#f8f9fa'
            }}>صفحات</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px' }}>
            <Item sx={{
              fontSize: '35px',
              boxShadow: 'none',
              fontWeight: 900,
              bgcolor: '#f8f9fa'
            }}>+5</Item>
            <Item sx={{
              fontSize: '25px',
              fontWeight: 300,
              borderRightWidth: '8PX',
              boxShadow: 'none',
              bgcolor: '#f8f9fa'
            }}>شركات النجاح</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ padding: '16px' }}>
            <Item sx={{
              fontSize: '35px',
              fontWeight: 900,
              boxShadow: 'none',
              bgcolor: '#f8f9fa'
            }}>+70</Item>
            <Item sx={{
              fontSize: '25px',
              fontWeight: 300,
              boxShadow: 'none',
              bgcolor: '#f8f9fa'
            }}>مبيعات</Item>
          </Grid>
        </Grid>
      </Box>
    
    </Container>
  );
}