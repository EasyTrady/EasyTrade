/* eslint-disable react/jsx-key */
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';

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

    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={2} sx={{ padding: '16px' }}>
          <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', fontWeight: 600, color: '#272C2E', boxShadow: 'none' }}>vip</Item>
         <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none' }}>$1000</Item>
         <Item sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left', boxShadow: 'none' }}>شهريًا/</Item>
           <Button sx={{ bgcolor: '#5D449B', borderRadius: '12px', width: '100%', boxShadow: 'none', color: '#faf8f9', ':hover': { bgcolor: '#5D449B' } }}>ابدأ تجربتك</Button>
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px' }}>
        <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', fontWeight: 600, color: '#272C2E', boxShadow: 'none' }}>vip</Item>
         <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none' }}>$800</Item>
         <Item sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left', boxShadow: 'none' }}>شهريًا/</Item>
           <Button sx={{ bgcolor: '#5D449B', borderRadius: '12px', boxShadow: 'none', width: '100%', color: '#faf8f9', ':hover': { bgcolor: '#5D449B' } }}>ابدأ تجربتك</Button>
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px' }}>
        <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', boxShadow: 'none', fontWeight: 600, color: '#272C2E' }}>vip</Item>
         <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none' }}>$500</Item>
         <Item sx={{ fontSize: '14px', fontWeight: 400, boxShadow: 'none', textAlign: 'left' }}>شهريًا/</Item>
           <Button sx={{ bgcolor: '#5D449B', borderRadius: '12px', boxShadow: 'none', width: '100%', color: '#faf8f9', ':hover': { bgcolor: '#5D449B' } }}>ابدأ تجربتك</Button>
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px' }}>
        <Item sx={{ fontFamily: 'Cairo', fontSize: '16px', boxShadow: 'none', fontWeight: 600, color: '#272C2E' }}>vip</Item>
         <Item sx={{ fontSize: '25px', fontWeight: 800, boxShadow: 'none' }}>$200</Item>
         <Item sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left', boxShadow: 'none' }}>شهريًا/</Item>
           <Button sx={{ bgcolor: '#5D449B', borderRadius: '12px', boxShadow: 'none', width: '100%', color: '#faf8f9', ':hover': { bgcolor: '#5D449B' } }}>ابدأ تجربتك</Button>
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px', borderColor: '#5D449B', display: 'block' }}>
        <Item sx={{ fontFamily: 'Cairo', boxShadow: 'none', fontSize: '16px', fontWeight: 600, color: '#272C2E' }}>قارن بين الخطط</Item>
        <Box sx={{ display: 'flex', gap: '5px', border: '1px solid', borderColor: '#5D449B', borderRadius: '12px', width: 'auto', padding: '5px' }}>
         <Typography sx={{ fontSize: '12px', fontWeight: 200, color: '#C02431' }}>%وفر 14 </Typography>
         <Typography sx={{ fontSize: '12px', fontWeight: 200, color: '#7F7F7F' }}>سنوي </Typography>
         <Typography sx={{ fontSize: '12px', fontWeight: 200, color: '#7F7F7F' }}>كل 3 شهور</Typography>
           <Button sx={{ bgcolor: '#5D449B', borderRadius: '8px', boxShadow: 'none', color: '#faf8f9', ':hover': { bgcolor: '#5D449B' } }}>شهري </Button>
           </Box>
        </Grid>
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
            'خدمات اضافية في صفحة الدفع'

          ].map((text, index) => (
            <TableRow key={index} sx={{ direction: 'rtl' }}>
              <TableCell sx={{ textAlign: 'right' }}>
                {text}
              </TableCell>
              {[<CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />, <CheckCircleIcon sx={{ color: '#6495ed' }} />].map((text) => (
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