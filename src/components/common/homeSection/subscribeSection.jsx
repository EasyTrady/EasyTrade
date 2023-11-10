import React from 'react';
import SubscribePanel from './subscribePanel';
import { Box, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@emotion/react';

const SubscribeSection = () => {

  let fTheme = createTheme({ color: 'red' })
  fTheme = responsiveFontSizes(fTheme)

  const { t } = useTranslation('common');
  const titleStyle = { fontSize: '40px', fontWeight: 700, liheHeight: '60px', letterSpacing: '-0.5px', color: '#272C2E' };
  const descStyle = { fontSize: '18px', fontWeight: 400, liheHeight: '25.2px', letterSpacing: '-0.5px', color: '#616161' };
  return (
    <ThemeProvider theme={fTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', my: '40px' }}>
        <Box sx={{ textAlign: 'Center' }}>
          <Typography sx={titleStyle}>{t('pickplan.title', { framework: 'react' })}</Typography>
          <Typography sx={descStyle}>{t('priceplan.title', { framework: 'raect' })}</Typography>
        </Box>
        <SubscribePanel />
      </Box>
    </ThemeProvider>
  );
};

export default SubscribeSection;