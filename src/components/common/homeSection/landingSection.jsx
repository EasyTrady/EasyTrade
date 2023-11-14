
import React from 'react';
import Grid from '@mui/material/Grid';
import home from '../../../assets/images/icons/Social Media Icon Square/homme.svg';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
        background: 'linear-gradient(1.02deg, rgba(74, 153, 211, 0) -17.33%,#cde3f3 100%),linear-gradient(#4A99D3, #FFFFFF, #FFFFFF)'
      }}
    >
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
          <Stack sx={{ pt: '2%', width: '100%', textAlign: 'center', mt: '10%' }}>
            <Typography
              sx={{
                fontSize: '25px',
                fontWeight: 900,
                lineHeight: '86.4px',
                color: '#03090d',
                fontFamily: 'Cairo'
              }}
            >
              {t('aselateam.title', { framework: 'react' })}
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                lineHeight: '21.33px',
                color: '#616161',
                px: '10px',
                fontFamily: 'Cairo'

              }}
            >
              {t('ourteam.title', { framework: 'React' })}
            </Typography>

            <Stack
              gap={2}
              sx={{
                flexDirection: {
                  xl: 'row',
                  lg: 'row',
                  md: 'row',
                  sm: 'column',
                  xs: 'column'
                },
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ButtonBase
                sx={{
                  bgcolor: '#5D449B',
                  color: '#FFFFFF',
                  height: '9vh',
                  borderRadius: '12px',
                  // textAlign: "right",
                  // float:'right',

                  fontSize: '14px',
                  lineHeight: '22.4px',
                  fontWeight: 600,
                  mt: '15px',
                  width: { md: '30%', xs: '50%', xL: '30%', sm: '50%', lg: '30%' }
                }}
              >
                {t('getforfree.title', { framework: 'react' })}
              </ButtonBase>
              <Typography
                sx={{
                  color: '#8a2296',
                  width: { xl: '100%', md: '100%', xs: '100%' },
                  fontSize: '20px',
                  fontFamily: 'Cairo'
                  // textAlign:'right'
                }}
              >
                تجربة مجانية مدتها 14 يومًا
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}