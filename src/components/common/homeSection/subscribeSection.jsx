import React from 'react';
import SubscribePanel from './subscribePanel';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SubscribeSection = () => {
  const { t } = useTranslation('common');
  const titleStyle = { fontSize: '40px', fontWeight: 700, liheHeight: '60px', letterSpacing: '-0.5px', color: '#272C2E' };
  const descStyle = { fontSize: '18px', fontWeight: 400, liheHeight: '25.2px', letterSpacing: '-0.5px', color: '#616161' };
  return (
    <Box sx={{ height: '749px', mb: '48px',display:'flex',flexDirection:'column',gap:10}}>
      <Box sx={{ textAlign: 'Center', mb: '24px' }}>
        <Typography sx={titleStyle}>{t('pickplan.title', { framework: 'react' })}</Typography>
        <Typography sx={descStyle}>{t('priceplan.title', { framework: 'raect' })}</Typography>
      </Box>
      <SubscribePanel />
    </Box>
  );
};

export default SubscribeSection;
