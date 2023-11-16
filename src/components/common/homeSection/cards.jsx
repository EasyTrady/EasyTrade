/* eslint-disable react/prop-types */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { Box, Container, Typography } from '@mui/material';
import imgs from '../../../assets/images/icons/images.png';
import coding from '../../../assets/images/icons/coding.png';
import time from '../../../assets/images/icons/save-time.png';
import performance from '../../../assets/images/icons/performance4.png';
import folder from '../../../assets/images/icons/folder.png';
import ui from '../../../assets/images/icons/ui-design.png';

export function Card ({ title, desc, img, bgcolor, className }) {
  return (

    

    <Grid
      className={className}
      sx={{
        padding: '18px',
        borderRadius: '8px',
        border: '1px solid rgb(227, 232, 239)',
        position: 'relative',
        width: { xs: '100%', md: 'calc(50% - 40px)', lg: 'calc(100% / 3 - 40px)' },
        margin: { xs: '30px 0', md: '30px 20px', lg: '30px 20px' }
      }}
    >


          <Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: '100%'
        }}
      >
        
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: bgcolor,
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            top: '0',
            right: '0',
            transform: 'translate(-30px,-50%)'
          }}
        >
          <Box
            sx={{
              maxHeight: '60px',
              aspectRatio: '1'
            }}
            component="img"
            src={img}
          />
        </Box>
      </Box>
      <Box sx={{ pt: '40px', overflow: 'hidden' }}>
        <Typography
          sx={{
            display: 'block',
            fontSize: '20px',
            textAlign: 'right',
            fontWeight: 900,
            fontFamily: 'Cairo',
            padding: '5px 10px',
            flexDirection: 'column'
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            textAlign: 'right',
            display: 'block',
            fontWeight: 50,
            fontFamily: 'Cairo',
            padding: '10px',
            flexDirection: 'column'
          }}
        >
          {desc}
        </Typography>
      </Box>
      </Container>

    </Grid>


  );
}

export default function ResponsiveGrid () {
  const data = [
    {
      title: 'بجميع المقاسات',
      img: imgs,
      desc: '  احتياجاتك من خلال تقنيات وموارد قابلة للتطوير لضمان بقاء لوحة الادارة الخاصة بك فعالة وفعّالة مع ',
      bgcolor: '#FFFEF5'
    },
    {
      title: ' تقليل التطوير',
      img: coding,
      desc: 'من خلال إعداد السمة بسهولة والتعليمات البرمجية الواضحة مع خيارات التخطيطات المرنة',
      bgcolor: '#FFF9F5'
    },
    {
      title: 'توفير الوقت والتكلفة',
      img: time,
      desc: ' من خلال توفير واجهة مستخدم معدة مسبقًا، مما يسمح لهم بالتركيز على جوانب أخرى من المشروع',
      bgcolor: '#F5FFFB'
    },
    {
      title: 'واجهة مستخدم جميلة ',
      img: ui,
      desc: 'من خلال توفير تصميم واضح وبديهي وشكل ومظهر متسقين',
      bgcolor: '#FFF5F5'
    },
    {
      title: 'موثقة ومدعومة بشكل جيد',
      img: folder,
      desc: 'من خلال الأسئلة الشائعة لمساعدة المستخدمين على فهم EasyTrade واستخدامها بشكل فعال',
      bgcolor: '#FCF5FF'
    },
    {
      title: 'تتمحور حول الأداء',
      img: performance,
      desc: ' هو قالب لوحة معلومات يركز على الأداء، وقد تم تصميمه لتقديم الأداء الأمثل للوحة الإدارة الخاصة بك',
      bgcolor: '#F5F7FF'
    }
  ];
  return (
    <Grid
      container
      sx={{ padding: '50px', justifyContent: 'shrink', display: 'flex' }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data.map((card, index) => {
        return (
          <Card
            key={index}
            title={card.title}
            desc={card.desc}
            img={card.img}
            bgcolor={card.bgcolor}
            className="mohamed"
          />
        );
      })}
    </Grid>

  );
}