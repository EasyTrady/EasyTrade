import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from '@mui/system';
import SubscribeCard from "./subscribeCard";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
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
        <Box sx={{ mb: "48px" }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SubscribePanel = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("common");
  const handelChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Container sx={{padding:'0 !important', margin:'0 !important'}}>
      <Box sx={{
          mb: "50px",
          mx: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
      <Tabs
        textColor="inherit"
        value={value}
        onChange={handelChange}
        centered
        sx={{
          border: "2px solid #5D449B",
          borderRadius: "11px",
          width: "fit-content",
          '.MuiTabs-indicator': {
            position:'unset !important',
            width:'0px !important'
            
          },
        }}
      >
        <Tab
            sx={{
              margin: "0 30px 0 0",
              padding: "10px 30px",
              border: "none !important",
              fontFamily:'Cairo',
              fontSize:'16px',
              fontWeight:500,
              lineHeight:'19.2px',
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#5D449B",
                borderRadius: "0 10px 10px 0",
                border: "none !important",
              },
              margin:{md:'0'}
            }}
            label={t("yearly.title", { framwork: "react" })}
            {...a11yProps(0)}/>
          <Tab
            sx={{
              margin: "0 30px",
              padding: "10px 30px",
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#5D449B",
                borderRadius: "11px",
              },
              fontFamily:'Cairo',
              fontSize:'16px',
              fontWeight:500,
              lineHeight:'19.2px',
              margin:{md:'0'}
            }}
            
            label={t("كل 3 شهور")}/>
          <Tab
            sx={{
              margin: "0 0 0 30px",
              padding: "10px 30px",
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#5D449B",
                borderRadius: "10px 0 0 10px",
              },
              fontFamily:'Cairo',
              fontSize:'16px',
              fontWeight:500,
              lineHeight:'19.2px',
              margin:{md:'0'}
            }}
            label={t("monthly.title", { framwork: "react" })}
            {...a11yProps(1)}/>
      </Tabs>
    </Box>
      <Box sx={{
          '@media only screen and (min-width: 600px)': 
          {
            flexDirection: 'row !important',
          },
          '@media only screen and (max-width: 992px)': 
          {
            flexDirection: 'row !important',
          },}}>
        <TabPanel value={value} index={0}>
          <SubscribeCard type="annual" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SubscribeCard type="monthly" />
        </TabPanel>
      </Box>
    </Container>
    
  );
};

export default SubscribePanel;
