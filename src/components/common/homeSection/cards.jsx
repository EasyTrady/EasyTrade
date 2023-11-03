import * as React from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import imgs from '../../../assets/images/icons/images.png';
import coding from '../../../assets/images/icons/coding.png';
import time from '../../../assets/images/icons/save-time.png';
import performance from '../../../assets/images/icons/performance4.png';
import folder from '../../../assets/images/icons/folder.png';
import ui from '../../../assets/images/icons/ui-design.png';


export default function ResponsiveGrid() {
  return (
    <Grid
      container
      sx={{ padding: '50px', gridGap: '20px', justifyContent: 'center' }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      
        <Grid
          sx={{
           padding:"18px",
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgb(227, 232, 239)',
            height: '40vh'
          }}
          xs={2}
          sm={3}
          md={3}
          key="1"
        >
          <CardMedia
            component="img"
            sx={{
              width: '70px',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              // borderRadius:'50%',
              bgcolor:'#FFFEF5',
             alignItems:'center',
             padding:'5px 0 0 5px'
             
            }}
            image={imgs}
            alt="Paella dish"
          />
          <Typography
            sx={{
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              fontSize: '20px',
              textAlign:'right',
              fontWeight: 900,
              fontFamily: 'Cairo',
              padding: '5px 10px',
              flexDirection: 'column'
            }}
          >
            بجميع المقاسات
          </Typography>
          <Typography
            sx={{
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              textAlign:'right',
              fontSize: '18px',
              fontWeight: 50,
              fontFamily: 'Cairo',
              padding: '10px',
              flexDirection: 'column',
            }}
          >
          من خلال تقنيات وموارد قابلة للتطوير لضمان بقاء لوحة الادارة الخاصة بك فعالة وفعّالة مع تطوير احتياجاتك
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding:"18px",
            borderRadius: '8px',
            border: '1px solid rgb(227, 232, 239)',
            height: '40vh'
          }}
          xs={2}
          sm={3}
          md={3}
          key="1"
        >
          <CardMedia
            component="img"
            sx={{
              width: '70px',
              // borderRadius:'50%',
              // bgcolor:'#FFFEF5',
              marginLeft: 'auto',
              textAlign:'right',
              marginRight: 0,
              display: 'block',
             alignItems:'center',
             padding:'5px 0 0 5px'
            }}
            image={coding}
            alt="Paella dish"
          />
          <Typography
            sx={{
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              fontSize: '20px',
              textAlign:'right',
              fontWeight: 900,
              fontFamily: 'Cairo',
              padding: '5px 10px',
              flexDirection: 'column'
            }}
          >
            تقليل التطوير 
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              marginLeft: 'auto',
              textAlign:'right',
              marginRight: 0,
              display: 'block',
              fontWeight: 50,
              fontFamily: 'Cairo',
              padding: '10px',
              flexDirection: 'column'
            }}
          >
         من خلال اعداد السمة بسهولة والتعليمات البرمجية الواضحة مع خيارات التخطيطات المرنة 
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding:"18px",
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgb(227, 232, 239)',
            height: '40vh'
          }}
          xs={2}
          sm={3}
          md={3}
          key="1"
        >
          <CardMedia
            component="img"
            sx={{
              width: '70px',
              // borderRadius:'50%',
              // bgcolor:'#FFFEF5',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
             alignItems:'center',
             padding:'5px 0 0 5px'
            }}
            image={time}
            alt="Paella dish"
          />
          <Typography
            sx={{
              fontSize: '20px',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              textAlign:'right',
              fontWeight: 900,
              fontFamily: 'Cairo',
              padding: '5px 10px',
              flexDirection: 'column'
            }}
          >
            توفير الوقت والتكلفة
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              marginLeft: 'auto',
              marginRight: 0,
              textAlign:'right',
              display: 'block',
              fontWeight: 50,
              fontFamily: 'Cairo',
              padding: '10px',
              flexDirection: 'column'
            }}
          >
            من خلال توفير واجهة مستخدم معدة مسبقًا,مما يسمح لهم بالتركيز على جوانب أخرى من المشروع 
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding:"18px",
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgb(227, 232, 239)',
            height: '40vh'
          }}
          xs={2}
          sm={3}
          md={3}
          key="1"
        >
          <CardMedia
            component="img"
            sx={{
              width: '70px',
              // borderRadius:'50%',
              // bgcolor:'#FFFEF5',
             alignItems:'center',
             marginLeft: 'auto',
             marginRight: 0,
             display: 'block',
             padding:'5px 0 0 5px'
            }}
            image={performance}
            alt="Paella dish"
          />
          <Typography
            sx={{
              fontSize: '18px',
              marginLeft: 'auto',
              marginRight: 0,
              textAlign:'right',
              display: 'block',
              fontWeight: 900,
              fontFamily: 'Cairo',
              padding: '5px 10px',
              flexDirection: 'column'
            }}
          >
            تتمحور حول الأداء
          </Typography>
          <Typography
            sx={{
              fontSize: '16px', marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              fontWeight: 50,
              textAlign:'right',
              fontFamily: 'Cairo',
              padding: '10px',
              flexDirection: 'column'
            }}
          >
            هو قالب لوحة معلومات يركز على الأداء, وقد تم تصميمه لتقديم الأداء الأمثل للوحة الادارة الخاصة بك
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding:"18px",
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgb(227, 232, 239)',
            height: '40vh'
          }}
          xs={2}
          sm={3}
          md={3}
          key="1"
        >
          <CardMedia
            component="img"
            sx={{
              width: '70px',
              // borderRadius:'50%',
              // bgcolor:'#FFFEF5',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
             alignItems:'center',
             padding:'5px 0 0 5px'
            }}
            image={folder}
            alt="Paella dish"
          />
          <Typography
            sx={{
              fontSize: '20px',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              textAlign:'right',
              fontWeight: 900,
              fontFamily: 'Cairo',
              padding: '5px 10px',
              flexDirection: 'column'
            }}
          >
            موثقة ومدعومة بشكل جيد 
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              textAlign:'right',
              fontWeight: 50,
              fontFamily: 'Cairo',
              padding: '10px',
              flexDirection: 'column',
            }}
          >
        من خلال الاسئلة الشائعة لمساعدة المستخدمين على فهم EASYTRADE واستخدامها بشكل فعال 
       </Typography>
        </Grid>
        <Grid
          sx={{
            height: '40vh',
            padding:"18px",
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgb(227, 232, 239)',
          }}
          xs={2}
          sm={3}
          md={3}
          key="1"
        >
          <CardMedia
            component="img"
            sx={{
              width: '70px',
              // borderRadius:'50%',
              // bgcolor:'#FFFEF5',
             alignItems:'center',
             marginLeft: 'auto',
             marginRight: 0,
             display: 'block',
             padding:'5px 0 0 5px'
            }}
            image={ui}
            alt="Paella dish"
          />
          <Typography
            sx={{
              fontSize: '20px',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              textAlign:'right',
              fontWeight: 900,
              fontFamily: 'Cairo',
              padding: '5px 10px',
              flexDirection: 'column'
            }}
          >
            واجهة مستخدم جميلة 
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              marginLeft: 'auto',
              marginRight: 0,
              display: 'block',
              fontWeight: 50,
              textAlign:'right',
              fontFamily: 'Cairo',
              padding: ' 5px 10px',
              flexDirection: 'column'
            }}
          >
            من خلال توفير تصميم واضح وبديهي وشكل ومظهر متسقين
          </Typography>
        </Grid>
      
    </Grid>
  );
}
