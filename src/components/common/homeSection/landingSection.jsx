
import React from 'react';
import Grid from '@mui/material/Grid';
import home from '../../../assets/images/icons/Social Media Icon Square/home.svg';
import { Box, ButtonBase, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function landingSection () {
  const [t] = useTranslation('common');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '48px',
        background: "linear-gradient(180deg, #cde3f3 -0%, rgba(74, 153, 211, 0.00) 54.91%),#d4d2e300",
      }}
    >
      <Container>
      <Grid container spacing={0}>
        <Grid xs={12} md={6}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              sx={{
                width: '95%'
              }}
              src={home}
            ></Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Stack className='gehad' sx={{ pt: '2%', width: '100%', textAlign: 'right', mt: '10%', alignItems:{xs:'center', sm:'end', md:'end', lg:'end'} }}>
            <Typography
              sx={{
                fontSize: {xs:'28px', sm:'28px', md:'right', lg:'48px'},
                fontWeight: {xs:700, sm:700, md:600, lg:600},
                lineHeight: '50.4px',
                color: '#3D2D66',
                fontFamily: 'Cairo',
                lineHeight:'86.4px',
                textAlign:{xs:'center', sm:'right', md:'right', lg:'right'} 
              }}
            >
              {t('aselateam.title', { framework: 'react' })}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight:400,
                lineHeight: '33.73px',
                color: '#616161',
                fontFamily: 'Cairo',
                textAlign:{xs:'center', sm:'right', md:'right', lg:'right'} 
              }}
            >
              {t('ourteam.title', { framework: 'React' })}
            </Typography>

            <Stack
              direction='column'
              alignItems='flex-end'
              gap={2}

            >
              <ButtonBase
                sx={{
                  bgcolor: '#5D449B',
                  color: '#FFFFFF',
                  height:'2.5rem',
                  borderRadius: '12px',
                  textAlign: 'right', 
                  fontSize: '16px',
                  lineHeight: '22.4px',
                  fontWeight: 600,
                  mt: '15px',
                  fontFamily: 'Cairo',
                  width: '100%',
                }}
              >
                {/* <Typography sx={{ border:'1px solid', borderRadius:'50%', margin:'5px'}}>
                <ArrowBackIcon />
                </Typography> */}
                {t('getforfree.title', { framework: 'react' })}
                
              </ButtonBase>
              <Typography
                sx={{
                  color: '#782F9A',
                  width: { xl: '100%', md: '100%', xs: '100%' },
                  fontSize: '16px',
                  fontFamily: 'Cairo',
                  textAlign:'right',
                  fontWeight:500
                }}
              >
                تجربة مجانية مدتها 14 يومًا
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}