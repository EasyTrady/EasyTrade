import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import vector from '../../../assets/images/Vector6.png';
import Slider from "react-slick";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function RowAndColumnSpacing() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box 
    sx={{
      width: '100%',
      backgroundImage: `url(${vector})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Container>
      <Typography sx={{ fontSize: '50px', fontWeight: 600, textAlign: 'center', marginTop: '30px',color:'#3D2D66',fontFamily:'Cairo',my:'30px', lineHeight:'60px' }}>انجازاتنا</Typography>
        <Box>
          <Slider {...settings}>
          <Grid 
              className='salem'
              item 
              xs={12} md={6} lg={4} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px !important' }}>
                <Item sx={{
                  fontSize: '48px',
                  fontWeight: 700,
                  boxShadow: 'none',
                  background: 'transparent',
                  lineHeight:'60px',
                  fontFamily:'Cairo',
                  color:'#272C2E'
                }}>+150</Item>
                <Item sx={{
                  fontSize: '24px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  borderRightWidth: '8PX',
                  background: 'transparent',
                  fontFamily:'Cairo',
                  color:'#505050',
                  lineHeight:'60px',
                }}>عملاء</Item>
              </Grid>
              <Grid 
              item 
              xs={12} md={6} lg={4} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px !important' }}>
                <Item sx={{
                  fontSize: '48px',
                  fontWeight: 700,
                  boxShadow: 'none',
                  background: 'transparent',
                  lineHeight:'60px',
                  fontFamily:'Cairo',
                  color:'#272C2E'
                }}>+8</Item>
                <Item sx={{
                  fontSize: '24px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  borderRightWidth: '8PX',
                  background: 'transparent',
                  fontFamily:'Cairo',
                  color:'#505050',
                  lineHeight:'60px',
                }}>تطبيق</Item>
              </Grid>
              <Grid 
              item 
              xs={12} md={6} lg={4} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px !important' }}>
                <Item sx={{
                  fontSize: '48px',
                  fontWeight: 700,
                  boxShadow: 'none',
                  background: 'transparent',
                  lineHeight:'60px',
                  fontFamily:'Cairo',
                  color:'#272C2E'
                }}>+100</Item>
                <Item sx={{
                  fontSize: '24px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  borderRightWidth: '8PX',
                  background: 'transparent',
                  fontFamily:'Cairo',
                  color:'#505050',
                  lineHeight:'60px',
                }}>صفحات</Item>
              </Grid>
              <Grid 
              item 
              xs={12} md={6} lg={4} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px !important' }}>
                <Item sx={{
                  fontSize: '48px',
                  fontWeight: 700,
                  boxShadow: 'none',
                  background: 'transparent',
                  lineHeight:'60px',
                  fontFamily:'Cairo',
                  color:'#272C2E'
                }}>+5</Item>
                <Item sx={{
                  fontSize: '24px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  borderRightWidth: '8PX',
                  background: 'transparent',
                  fontFamily:'Cairo',
                  color:'#505050',
                  lineHeight:'60px',
                }}>شركات النجاح</Item>
              </Grid>
              <Grid 
              item 
              xs={12} md={6} lg={4} sx={{ borderRight: '2px solid #C4C4C4', padding: '16px !important' }}>
                <Item sx={{
                  fontSize: '48px',
                  fontWeight: 700,
                  boxShadow: 'none',
                  background: 'transparent',
                  lineHeight:'60px',
                  fontFamily:'Cairo',
                  color:'#272C2E'
                }}>+70</Item>
                <Item sx={{
                  fontSize: '24px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  borderRightWidth: '8PX',
                  background: 'transparent',
                  fontFamily:'Cairo',
                  color:'#505050',
                  lineHeight:'60px',
                }}>مبيعات</Item>
              </Grid>
          </Slider>
        </Box>
    </Container>
    </Box>
  );
}
