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
import { Container } from '@mui/material';
import ProductAttributes from './productAttributes';

export default function AddProductPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (e,newValue,id) => {
  console.log(newValue,id)

    setValue(newValue);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ mt:4 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{fontFamily: 'Inter',
 fontSize:'18px',
 fonrWeight:600,
lineHeight: '17px',
letterSpacing: '0em',
textAlign: 'left',
background:'transparent',
color:'#5D449B',
'.MuiTabs-indicator': {
  backgroundColor: '#transparent',
  height: '100%',
  width: '100%',
  color:'#5D449B !important',
  zIndex: -1,
 
}
}}>
          <Tab label="Product details  (1st step)" {...a11yProps(0)} />
          <Tab label="Product images (2nd step)" {...a11yProps(1)} />
          <Tab label="Attributes (3rd step)" {...a11yProps(2)} />
        </Tabs>
      </Container>
      <CustomTabPanel value={value} index={0}>
      
       <AddProduct  handleChange={handleChange}/>
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     
        <AddProductFetures handleChange={handleChange}/>
       
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
     
       <ProductAttributes/>
       
      </CustomTabPanel>
      </DashboardLayout>
  );
}


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log(index,value)
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3,pt:0 }}>
         
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