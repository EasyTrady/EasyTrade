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
import {useEffect}from "react"
import usePermission from 'utils/usePermission';
export default function AddProductPanel() {
  const [value, setValue] = React.useState(0);
  let productIdEdit=localStorage.getItem('productIdEdit');
  let productId=localStorage.getItem('productId');

  const [IdProduct, setIdProduct] = React.useState(productId);
  let {isPermitted}=usePermission()
  const handleChange = (e,newValue,id) => {
 
 
  if((newValue==1||newValue==2)&&(Boolean(id)||Boolean(productId)||Boolean(productIdEdit))){
    // if(newValue==1&&Boolean(isPermitted(true,["add_productvariantimage","change_productvariantimage","change_productvariantimages","add_productvariantimages"]))){
    //   setValue(newValue); 
    // }
    // if(newValue==2&&Boolean(isPermitted(true,["change_productvariant","add_productvariant"]))){
    //   setValue(newValue); 

    // }
    setValue(newValue); 
  }else if(newValue==0) {
    setValue(newValue);
  }
  };
  useEffect(()=>{setIdProduct(productId)},[productId])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ mx:4,my:4 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{fontFamily: 'Inter',
 fontSize:'18px',
 fonrWeight:600,
lineHeight: '17px',
letterSpacing: '0em',
textAlign: 'left',
background:'transparent',
color:'#5D449B',
width:{lg:"50%",md:"50%",sm:"100%",xs:"100%"},
'.MuiTabs-indicator': {
  backgroundColor: '#transparent',
  height: '100%',
  width: '100%',
  color:'#5D449B !important',
  zIndex: -1,
 
},".MuiTab-root":{
  justifyContent:"flex-start"
},".MuiTab-root:visited":{
  color:"#5D449B !important"
}
}}>
  
          <Tab label="Product details  (1st step)" {...a11yProps(0)}sx={{color:value==0&&"#5D449B !important"}} />
          <Tab label="Product images (2nd step)" {...a11yProps(1)}sx={{color:value==1&&"#5D449B !important"}}  />
          <Tab label="Attributes (3rd step)" {...a11yProps(2)}sx={{color:value==2&&"#5D449B !important"}}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      

       <AddProduct  handleChange={handleChange}/>

       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     
        <AddProductFetures handleChange={handleChange} idProduct={IdProduct}/>
       
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
     
       <ProductAttributes  idProduct={IdProduct}/>
       
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