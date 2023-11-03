/* eslint-disable react/prop-types */
import { Box, Container, Switch, Typography } from '@mui/material';
import React from 'react';

const AddProductTitle = ({ switch: showSwitch, title }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box
      sx={{
        width: '100%',
        height: '56px',
        padding: '12px 24px', // Adjusted padding values
        boxShadow: '0px -1px 0px 0px #E5E7E8 inset',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container>
        <Box sx={{ display: 'flex',
        alignItems: 'center',justifyContent:'space-between'}}>
        <Typography
          sx={{
            fontFamily: 'Cairo',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
            letterSpacing: '0em',
            textAlign: 'left',
          }}
        >
          {title}
        </Typography>
        {showSwitch && <Switch {...label} defaultChecked />}
        </Box>
      </Container>
    </Box>
  );
};

export default AddProductTitle;