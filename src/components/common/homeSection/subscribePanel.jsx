import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <Box>
      <Box
        sx={{
          
          mx: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          textColor="inherit"
          value={value}
          onChange={handelChange}
          centered
          sx={{
            border: "2px solid #5D449B",
            borderRadius: "10px",
            padding: "5px 40px",
            my: "30px",
            width: "fit-content",
            '.css-1aquho2-MuiTabs-indicator': {
              position:'unset !important',
              width:'0px !important'
              
            },
          }}
        >
         
          <Tab
            sx={{
              margin: "0 20px",
              padding: "10px 30px",
              border: "none !important",
                 
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#5D449B",
                borderRadius: "12px",
                border: "none !important",
              },
            }}
            label={t("yearly.title", { framwork: "react" })}
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              margin: "0 20px",
              padding: "10px 30px",
              // border: "none !important",
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#5D449B",
                borderRadius: "12px",
                // border: "none !important",
              },
            }}
            label={t("monthly.title", { framwork: "react" })}
            {...a11yProps(1)}
          />
            <Tab
            sx={{
              margin: "0 20px",
              padding: "10px 30px",
              // border: "none !important",
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#5D449B",
                borderRadius: "12px",
                // border: "none !important",
              },
            }}
            label={t("كل 3 شهور")}
          
          />
          
        </Tabs>
      </Box>
      <Box sx={{}}>
        <TabPanel value={value} index={0}>
          <SubscribeCard type="annual" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SubscribeCard type="monthly" />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default SubscribePanel;
