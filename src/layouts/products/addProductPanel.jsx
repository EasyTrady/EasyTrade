import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddProduct from './addProduct';
import AddProductFetures from './addProductFetures';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

export default function AddProductPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{  }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{fontFamily: 'Inter',
fontSize: '14px',
fontWeight: 500,
lineHeight: '17px',
letterSpacing: '0em',
textAlign: 'left',
bgcolor:'transparent',
'.MuiTabs-indicator': {
  backgroundColor: '#transparent',
  height: '100%',
  width: '100%',
  color:'#fff !important',
  zIndex: -1,
}
}}>
          <Tab label="Product details  (1st step)" {...a11yProps(0)} />
          <Tab label="Product images (2nd step)" {...a11yProps(1)} />
          <Tab label="Attributes (3rd step)" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      
       <AddProduct/>
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     
        <AddProductFetures/>
       
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
     
        Item Three
       
      </CustomTabPanel>
      </DashboardLayout>
  );
}


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}