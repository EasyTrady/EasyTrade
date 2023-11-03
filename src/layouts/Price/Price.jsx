import { Typography } from '@mui/material';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Container } from '@mui/system';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Price() {
    // const data = [
    //     'سيرفرات أمنة',
    //     'دومين فرعي أمن مجانا',
    //     'دعم فني على مدار الساعة',
    //   ];
  return (
    
    <>
        <Container>
 <Typography sx={{ textAlign:'center',color:"#5D449B",fontSize:'16px',fontWeight:600,fontFamily:'Cairo'}}>  الباقات والاسعار</Typography>
    <Typography sx={{fontSize:'36px',fontWeight:600,fontFamily:'Cairo',textAlign:'center',paddingTop:'10px',color:"#2F2F30"}}>خطط تسعير ميسورة التكلفة</Typography>
    <Typography sx={{fontSize:'20px',fontWeight:400,fontFamily:'Cairo',textAlign:'center',paddingTop:"10px",color:"#667085"}}>   صممت خصيصًا لتناسب جميع أنواع التجار قارن بين الميزات</Typography>
      
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={2} sx={{ padding: '16px'}}>
          <Item sx={{fontFamily:'Cairo',fontSize:'16px',fontWeight:600,color:'#272C2E'}}>vip</Item>
         <Item sx={{fontSize:'25px', fontWeight:800}}>$1000</Item>
         <Item sx={{fontSize:'14px', fontWeight:400,textAlign:'left'}}>شهريًا/</Item>
           <Button sx={{bgcolor:"#5D449B",borderRadius:'12px',width:'100%',color:"#faf8f9",':hover': {bgcolor: '#5D449B'  }}}>ابدأ تجربتك</Button> 
        </Grid>
        <Grid item xs={2} sx={{  padding: '16px'}}>
        <Item sx={{fontFamily:'Cairo',fontSize:'16px',fontWeight:600,color:'#272C2E'}}>vip</Item>
         <Item sx={{fontSize:'25px', fontWeight:800}}>$800</Item>
         <Item sx={{fontSize:'14px', fontWeight:400,textAlign:'left'}}>شهريًا/</Item>
           <Button sx={{bgcolor:"#5D449B",borderRadius:'12px',width:'100%',color:"#faf8f9",':hover': {bgcolor: '#5D449B'  }}}>ابدأ تجربتك</Button> 
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px',}}>
        <Item sx={{fontFamily:'Cairo',fontSize:'16px',fontWeight:600,color:'#272C2E'}}>vip</Item>
         <Item sx={{fontSize:'25px', fontWeight:800}}>$500</Item>
         <Item sx={{fontSize:'14px', fontWeight:400,textAlign:'left'}}>شهريًا/</Item>
           <Button sx={{bgcolor:"#5D449B",borderRadius:'12px',width:'100%',color:"#faf8f9",':hover': {bgcolor: '#5D449B'  }}}>ابدأ تجربتك</Button> 
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px',}}>
        <Item sx={{fontFamily:'Cairo',fontSize:'16px',fontWeight:600,color:'#272C2E'}}>vip</Item>
         <Item sx={{fontSize:'25px', fontWeight:800}}>$200</Item>
         <Item sx={{fontSize:'14px', fontWeight:400,textAlign:'left'}}>شهريًا/</Item>
           <Button sx={{bgcolor:"#5D449B",borderRadius:'12px',width:'100%',color:"#faf8f9",':hover': {bgcolor: '#5D449B'  }}}>ابدأ تجربتك</Button> 
        </Grid>
        <Grid item xs={2} sx={{ padding: '16px',borderColor:'#5D449B',display:'block'}}>
        <Item sx={{fontFamily:'Cairo',fontSize:'16px',fontWeight:600,color:'#272C2E'}}>قارن بين الخطط</Item>
         <Item sx={{fontSize:'25px', fontWeight:800}}>سنوي وفر %14</Item>
         <Item sx={{fontSize:'14px', fontWeight:400,textAlign:'left'}}>كل 3 شهور</Item>
           <Button sx={{bgcolor:"#5D449B",borderRadius:'8px',width:'53px',color:"#faf8f9",':hover': {bgcolor: '#5D449B'  }}}>شهري </Button> 
        </Grid>
      </Grid>
    </Box>
    <Typography sx={{color:'#272C2E', textAlign:'right',display:'bolck',fontFamily:'Cairo',fontSize:'20px',fontWeight:700}}>المميزات الأساسية</Typography>
    <TableContainer component={Paper} sx={{direction:'rtl',width:'100%'}}>
      <Table>
        <TableBody>
          {[
            'سيرفرات أمنة',
            'دومين فرعي أمن مجانا',
            'دعم فني على مدار الساعة',
            
          ].map((text, index) => (
            <TableRow key={index} sx={{direction:"rtl"}}>
              <TableCell>
                {text}
              </TableCell>
              {[  <CheckCircleIcon sx={{color:'#6495ed'}} /> ,  <CheckCircleIcon sx={{color:'#6495ed'}} />,  <CheckCircleIcon sx={{color:'#6495ed'}} />,  <CheckCircleIcon sx={{color:'#6495ed'}} />].map((text) => (
                <TableCell key={text}>
                   <Typography> {text}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

       <Typography sx={{color:'#272C2E', textAlign:'right',display:'bolck',fontFamily:'Cairo',fontSize:'20px',fontWeight:700}}>زيادة المبيعات</Typography>
    <TableContainer component={Paper} sx={{direction:'rtl',width:'100%'}}>
      <Table>
        <TableBody >
          {[
            'صفحات هبوط احترافية',
            ' تخطي صفحة السلة ',
            '  عد تنازلي للعروض',
            'خدمات اضافية في صفحة الدفع'
            
          ].map((text, index) => (
            <TableRow key={index} sx={{direction:"rtl"}}>
              <TableCell>
                {text}
              </TableCell>
              {[  <CheckCircleIcon sx={{color:'#6495ed'}} /> ,  <CheckCircleIcon sx={{color:'#6495ed'}} />,  <CheckCircleIcon sx={{color:'#6495ed'}} />,  <CheckCircleIcon sx={{color:'#6495ed'}} /> ,<CheckCircleIcon sx={{color:'#6495ed'}} />].map((text) => (
                <TableCell key={text}>
                   <Typography> {text}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

      <Typography sx={{color:'#272C2E', textAlign:'right',display:'bolck',fontFamily:'Cairo',fontSize:'20px',fontWeight:700}}>إدارة المتجر</Typography>
    <TableContainer component={Paper} sx={{direction:'rtl',width:'100%'}}>
      <Table>
        <TableBody >
          {[
            'أستيراد وتصدير الطلبات',
            ' أسعار البيع بالجملة ',
            'دردشة حية مع العملاء ',
            
          ].map((text, index) => (
            <TableRow key={index} sx={{direction:"rtl"}}>
              <TableCell>
                {text}
              </TableCell>
              {[  <CheckCircleIcon sx={{color:'#6495ed'}} /> ,  <CheckCircleIcon sx={{color:'#6495ed'}} />,  <CheckCircleIcon sx={{color:'#6495ed'}} />,  <CheckCircleIcon sx={{color:'#6495ed'}} />].map((text) => (
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
  )
}
