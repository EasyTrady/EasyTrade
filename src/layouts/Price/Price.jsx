/* eslint-disable react/jsx-key */
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, ButtonBase } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
// import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function Price () {
  // const data = [
  //     'سيرفرات أمنة',
  //     'دومين فرعي أمن مجانا',
  //     'دعم فني على مدار الساعة',
  //   ];
  return (

    <>
        <Container>
 <Typography sx={{ textAlign: 'center', color: '#5D449B', fontSize: '16px', fontWeight: 600, fontFamily: 'Cairo' }}>  الباقات والاسعار</Typography>
    <Typography sx={{ fontSize: '36px', fontWeight: 600, fontFamily: 'Cairo', textAlign: 'center', paddingTop: '10px', color: '#2F2F30' }}>خطط تسعير ميسورة التكلفة</Typography>
    <Typography sx={{ fontSize: '20px', fontWeight: 400, fontFamily: 'Cairo', textAlign: 'center', paddingTop: '10px', color: '#667085' }}>   صممت خصيصًا لتناسب جميع أنواع التجار قارن بين الميزات</Typography>

    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
      <TableContainer component={Paper} sx={{ direction: 'rtl',boxShadow: 'none',bgcolor:'#f8f9fa' }}>
      <Table>
        <TableBody >
          {[
           <Box item xs={2} sx={{ padding: '16px', borderColor: '#5D449B', display: 'block',width:{xl:'90%',lg:'100%',md:'100%',xs:'100%',sm:'100%'} }}>
           <Item sx={{ fontFamily: 'Cairo', boxShadow: 'none', fontSize: '16px', fontWeight: 600, color: '#272C2E',bgcolor:'#f8f9fa' }}>قارن بين الخطط</Item>
           <Box sx={{ display: 'flex', gap: '7px', border: '2px solid #5D449B', borderRadius: '12px', padding: '5px',bgcolor:'#f8f9fa' }}>
           <ButtonBase sx={{ bgcolor: '#5D449B', borderRadius: '8px', boxShadow: 'none', color: '#faf8f9',padding: '4px 10px 4px 10px'}}>شهري </ButtonBase>
            <Typography sx={{ fontSize: '12px', fontWeight: 200, color: '#7F7F7F' , paddingTop:'5px'}}>كل 3 شهور</Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 200, color: '#7F7F7F' , paddingTop:'5px'}}>سنوي </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 200, color: '#C02431', paddingTop:'5px' }}>%وفر 14 </Typography>
              </Box>
           </Box>

          ].map((text, index) => (
            <TableRow key={index} sx={{ direction: 'rtl' }}>
              <TableCell sx={{ textAlign: 'right',bgcolor:'#f8f9fa' }}>
                {text}
              </TableCell>
              {[ <Grid item xs={2} sx={{ padding: '16px',bgcolor:'#f8f9fa' }}>
          <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', fontWeight: 600, color: '#272C2E', boxShadow: 'none',bgcolor:'#f8f9fa' }}>vip</Item>
         <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none',bgcolor:'#f8f9fa' }}>$1000</Item>
         
         <Item sx={{ fontSize: '14px', fontWeight: 400, boxShadow: 'none',fontFamily:'Inter',bgcolor:'#f8f9fa'}}>شهريًا/</Item>
           <ButtonBase sx={{ bgcolor: '#5D449B', borderRadius: '12px', width: '195px', boxShadow: 'none', color: '#faf8f9',padding:'10px' }}>ابدأ تجربتك</ButtonBase>
        </Grid>,
          <Grid item xs={2} sx={{ padding: '16px',bgcolor:'#f8f9fa' }}>
          <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', fontWeight: 600, color: '#272C2E', boxShadow: 'none',bgcolor:'#f8f9fa' }}>vip</Item>
           <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none',bgcolor:'#f8f9fa' }}>$800</Item>
           <Item sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left', boxShadow: 'none',fontFamily:'Inter',bgcolor:'#f8f9fa'}}>شهريًا/</Item>
             <ButtonBase sx={{ bgcolor: '#5D449B', borderRadius: '12px', boxShadow: 'none', width: '195px', color: '#faf8f9',padding:'10px'  }}>ابدأ تجربتك</ButtonBase>
          </Grid>,
           <Grid item xs={2} sx={{ padding: '16px',bgcolor:'#f8f9fa'}}>
           <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', boxShadow: 'none', fontWeight: 600, color: '#272C2E',bgcolor:'#f8f9fa' }}>vip</Item>
            <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none',bgcolor:'#f8f9fa' }}>$500</Item>
            <Item sx={{ fontSize: '14px', fontWeight: 400, boxShadow: 'none', textAlign: 'left',fontFamily:'Inter',bgcolor:'#f8f9fa' }}>شهريًا/</Item>
              <ButtonBase sx={{ bgcolor: '#5D449B', borderRadius: '12px', boxShadow: 'none', width: '195px', color: '#faf8f9',padding:'10px' }}>ابدأ تجربتك</ButtonBase>
           </Grid>,
          
      
      ].map((text) => (
                <TableCell key={text}>
                   <Typography> {text}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      
       
     
      
      </Grid>
    </Box>
    <Typography sx={{ color: '#272C2E', textAlign: 'right', display: 'bolck', fontFamily: 'Cairo', fontSize: '20px', fontWeight: 700 }}>المميزات الأساسية</Typography>
    <TableContainer component={Paper} sx={{ direction: 'rtl', width: '100%' }}>
      <Table>
        <TableBody>
          {[
            'سيرفرات أمنة',
            'دومين فرعي أمن مجانا',
            'دعم فني على مدار الساعة'

          ].map((text, index) => (
            <TableRow key={index} sx={{ direction: 'rtl' }}>
              <TableCell sx={{ textAlign: 'right' }}>
                {text}
              </TableCell>
              {[<CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />].map((text) => (

                <TableCell key={text}>
                   <Typography> {text}</Typography>
                </TableCell>
              ))}
            </TableRow>

          ))}
        </TableBody>
      </Table>
      </TableContainer>

       <Typography sx={{ color: '#272C2E', textAlign: 'right', display: 'bolck', fontFamily: 'Cairo', fontSize: '20px', fontWeight: 700 }}>زيادة المبيعات</Typography>
    <TableContainer component={Paper} sx={{ direction: 'rtl', width: '100%' }}>
      <Table>
        <TableBody >
          {[
            'صفحات هبوط احترافية',
            ' تخطي صفحة السلة ',
            '  عد تنازلي للعروض',
            // 'خدمات اضافية في صفحة الدفع'

          ].map((text, index) => (
            <TableRow key={index} sx={{ direction: 'rtl' }}>
              <TableCell sx={{ textAlign: 'right' }}>
                {text}
              </TableCell>
              {[<CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />].map((text) => (
                <TableCell key={text}>
                   <Typography> {text}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

      <Typography sx={{ color: '#272C2E', textAlign: 'right', display: 'bolck', fontFamily: 'Cairo', fontSize: '20px', fontWeight: 700 }}>إدارة المتجر</Typography>
    <TableContainer component={Paper} sx={{ direction: 'rtl', width: '100%' }}>
      <Table>
        <TableBody >
          {[
            'أستيراد وتصدير الطلبات',
            ' أسعار البيع بالجملة ',
            'دردشة حية مع العملاء '

          ].map((text, index) => (
            <TableRow key={index} sx={{ direction: 'rtl' }}>
              <TableCell sx={{ textAlign: 'right' }}>
                {text}
              </TableCell>
              {[<CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />].map((text) => (
                <TableCell key={text}>
                   <Typography> {text}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
    </>
  );
}