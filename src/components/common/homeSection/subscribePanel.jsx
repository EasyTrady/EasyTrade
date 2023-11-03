import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SubscribeCard from './subscribeCard';
import { useTranslation } from 'react-i18next';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ mb: '48px' }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const SubscribePanel = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation('common');
  const handelChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box maxHeight={39} sx={{ mx: 'auto', width: { xl: '13%', md: '13.6%', sm: '25%', xs: '40%' } }}>
        <Tabs
          textColor="inherit"
          value={value}
          onChange={handelChange}
          centered
          sx={{
            borderRadius: '38px',
            border: '2px solid #5D449B',
            maxHeight: '39px',
            fontSize: '16px',
            textTransform: 'none',
            '.MuiTabs-indicator': {
              backgroundColor: '#5D449B',
              height: '100%',
              width: '100%',
              color:'#fff !important',
              borderRadius: '38px',
              zIndex: -1,
            }
          }}
        >
        <Tab sx={{color:'#989898'}} label={t('yearly.title', { framwork: 'react' })} {...a11yProps(0)} />
          <Tab sx={{color:'#A8A8A8'}} label={t('monthly.title', { framwork: 'react' })} {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* <Box sx={{width:'100%',overflowX:'auto',display:'flex',flexDirection:'row'}}> */}
      <TabPanel value={value} index={0}>
        <SubscribeCard type="annual" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubscribeCard type="monthly" />
      </TabPanel>
      {/* </Box> */}
    </Box>
  );
};

export default SubscribePanel;
