import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import Ebuy from '../../../assets/images/homeimages/ebuy.png';
import Fawry from '../../../assets/images/homeimages/fawry.png';
// import Tabby from '../../assets/images/homeimages/tabby.png';
import Paymob from '../../../assets/images/homeimages/paymob.png';
import Posta from '../../../assets/images/homeimages/posta.png';
import Value from '../../../assets/images/homeimages/value.png';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const CompanySection = () => {
  const { t } = useTranslation('common');
  return (
    <Box sx={{ mb: '48px' ,display:'flex',flexDirection:'column',gap:10}}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '40px',
            fontWeight: 700,
            color: '#272C2E',
            paddingTop:'140px',
            lineHeight: '60px'
          }}  
        >
          {t('joinourclients.title', { framework: 'react' })}
        
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '25.2px',
            color: '#616161',
            mt: '8px'
          }}
        >
          {t('makefavor.title', { framework: 'react' })}
        </Typography>
      </Box>
      <Stack 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: {
            xl: 'row',
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          },
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: 2,
          mt: '8px',
          mx: '8%'
        }} 
      >
        <Card sx={{ width: 180, height: 180, flexBasis: '25%' }} columns={{ xs: 6, sm: 6, md: 12 }} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain",
              bgcolor:"#F8F8F8",
            
            }}
              image={Ebuy}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, height: 180 }} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain",
              bgcolor:"#F8F8F8", }}
              image={Fawry}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        
        <Card sx={{ width: 180, height: 180 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain" ,
              bgcolor:"#F8F8F8",}}
              image={Paymob}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ width: 180, height: 180 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain",
              bgcolor:"#F8F8F8", }}
              image={Posta}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        {/* <Card sx={{ width: 180, height: 180 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain",
              bgcolor:"#F8F8F8", }}
              image={Tabby}
              alt="green iguana"
            />
          </CardActionArea>
        </Card> */}
        
        <Card sx={{ width: 180, height: 180 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain",
              bgcolor:"#F8F8F8", }}
              image={Value}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
      </Stack>
    </Box>
  );
};

export default CompanySection;
