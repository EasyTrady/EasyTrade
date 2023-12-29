import React from 'react';
import SubscribePanel from './subscribePanel';
import { Box, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@emotion/react';

const SubscribeSection = () => {

  let fTheme = createTheme({ color: 'red' })
  fTheme = responsiveFontSizes(fTheme)

  const { t } = useTranslation('common');
  const titleStyle = {
    fontFamily:'Cairo',
    fontSize: { md:'35px', lg:'48px'}, 
          fontWeight: { md:600, lg:500},
    lineHeight:'52.5px',
    letterSpacing: '-0.5px', 
    color: '#3D2D66' };
  const descStyle = {
    fontFamily:'Cairo',
    fontSize:{md:'16px', lg:'18px'},
    lineHeight:'27px',
    fontWeight: 400, 
    letterSpacing: '-0.5px', 
    color: '#616161' };
  return (
    <ThemeProvider theme={fTheme}>
      <Box 
        
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          my: '40px'
          }}>
        <Box sx={{ textAlign: 'Center' }}>
          <Typography sx={titleStyle}>{t('pickplan.title', { framework: 'react' })}</Typography>
          <Typography sx={descStyle}>{t('priceplan.title', { framework: 'raect' })}</Typography>
        </Box>
        
      </Box>
      <Box
      
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          margin: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          }}>
        <SubscribePanel />
      </Box>
      
    </ThemeProvider>
  );
};

export default SubscribeSection;