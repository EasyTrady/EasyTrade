import React from 'react';
// import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ebuy from '../../../assets/images/icons/Social Media Icon Square/ebuy.png';
import fawry from '../../../assets/images/icons/Social Media Icon Square/fawry.png';
import value from '../../../assets/images/icons/Social Media Icon Square/value.png';
import paymob from '../../../assets/images/icons/Social Media Icon Square/paymob.png';
import posta from '../../../assets/images/icons/Social Media Icon Square/posta.png';
import { Box, Container, Typography } from '@mui/material';
//  import { useTranslation } from 'react-i18next';

const CompanySection = () => {
  return ( 
    <Box sx={{ paddingBottom:'60px'}}>
    <Container sx={{
      minHeight: '40vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'

    }}>
      <Typography sx={{ fontFamily: 'Cairo', fontSize: { md:'35px', lg:'48px'}, 
          fontWeight: { md:600, lg:500}, textAlign: 'center', color: '#3D2D66', lineHeight:'52.5px', marginBottom:'15px' }}>قدم لعملائك تجربة دفع وشحن مريحة</Typography>
      <Typography sx={{ fontFamily: 'Cairo', fontSize:{md:'16px', lg:'18px'}, fontWeight: 400, textAlign: 'center', color: '#505050',lineHeight:'30px', marginBottom:'15px'  }}>(الكروت - المحافظ - التقسيط - الدفع عند الاستلام)</Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={7} >

        <Grid item sx={{ width: '150px', height: '150px' }} >
          <img src={ebuy} alt="posta" />
        </Grid>
        <Grid item sx={{ width: '150px', height: '150px' }}>
          <img src={fawry} alt="Image 2" />
        </Grid>
        <Grid item sx={{ width: '150px', height: '150px' }}>
          <img src={value} alt="Image 3" />
        </Grid>
        <Grid item sx={{ width: '150px', height: '150px' }}>
          <img src={paymob} alt="Image 4" />
        </Grid>
        <Grid item sx={{ width: '150px', height: '150px' }}>
          <img src={posta} alt="Image 5" />
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default CompanySection;