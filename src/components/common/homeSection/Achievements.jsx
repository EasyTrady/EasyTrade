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
      width: '100%',
      
    }}>
      <Typography sx={{ fontSize: '50px', fontWeight: 600, textAlign: 'center', marginTop: '30px',color:'#3D2D66',fontFamily:'Cairo',my:'30px' }}>انجازاتنا</Typography>
      <Box>
        <Grid container sx={{textAlign:'center',justifyContent:'center', display: 'flex', width: '100%', alignItems: 'start',marginBottom:'100px'}}>
          <Grid item xs={4} md={3} lg={2} sx={{
            borderRight: '2px solid #C4C4C4',
            padding: '16px',
            
          }}>
            <Item sx={{
              fontSize: '48px',
              fontWeight: 700,
              boxShadow: 'none',
             bgcolor: '#f8f9fa',
             fontFamily:'Cairo'
            }}>+150</Item>
            <Item sx={{
              fontSize: '24px',
              fontWeight: 500,
              boxShadow: 'none',
              borderRightWidth: '8PX',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>عملاء</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px' }}>
            <Item sx={{
              fontSize: '48px',
              boxShadow: 'none',
              fontWeight: 700,
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>+8</Item>
            <Item sx={{
              fontSize: '24px',
              fontWeight: 500,
              boxShadow: 'none',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'

            }}>تطبيق</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px' }}>
            <Item sx={{
              fontSize: '48px',
              fontWeight: 700,
              boxShadow: 'none',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>+100</Item>
            <Item sx={{
              fontSize: '24px',
              fontWeight: 500,
              boxShadow: 'none',
              borderRightWidth: '8PX',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>صفحات</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px' }}>
            <Item sx={{
              fontSize: '48px',
              boxShadow: 'none',
              fontWeight: 700,
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>+5</Item>
            <Item sx={{
              fontSize: '24px',
              fontWeight: 500,
              borderRightWidth: '8PX',
              boxShadow: 'none',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>شركات النجاح</Item>
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ padding: '16px' }}>
            <Item sx={{
              fontSize: '48px',
              fontWeight: 700,
              boxShadow: 'none',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>+70</Item>
            <Item sx={{
              fontSize: '24px',
              fontWeight: 500,
              boxShadow: 'none',
              bgcolor: '#f8f9fa',
              fontFamily:'Cairo'
            }}>مبيعات</Item>
          </Grid>
        </Grid>
      </Box>
    
    </Container>
  );
}