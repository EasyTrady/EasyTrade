/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import imageSideBar from "assets/images/Button.png"
import imageSideBar1 from "assets/images/Button (1).png"

import whiteSideBar from "assets/images/white.png"

import greySideBar from "assets/images/grey.png"
import gradientSideBar from "assets/images/gradient.png"
import Checkbox from '@mui/material/Checkbox';
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
  setIconOnly, setColorSideBar, setColorBackground
} from "context";
import { setFOOTER } from "context";

function Configurator() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor, makeIconOnly, ColorSidenav,footerDisplay } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];
  const backgroundColors = ["#FFFFFF", "#ECF4FA", "#FAEEEC", "#FAECF9", "#EDFAEC"];
  const [value, setValue] = React.useState(0);
  
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <TabContext value={value}>

        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          pt={3}
          pb={0.8}
          px={3}
        >


          <Icon
            sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
              fontSize: `${size.md} !important`,
              fontWeight: `${fontWeightBold} !important`,
              stroke: dark.main,
              strokeWidth: "2px",
              cursor: "pointer",
              mt: 2,
            })}
            onClick={handleCloseConfigurator}
          >
            close
          </Icon>
          <SoftBox>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Dashboard Theme" value={0} />
              <Tab label="Store" value={1} />

            </Tabs>
          </SoftBox>
        </SoftBox>

        <TabPanel value={0}>


          <Divider />

          <SoftBox pt={1.25} pb={3} px={3}>
            {/* <SoftBox>
          <SoftTypography variant="h6">Sidenav Colors</SoftTypography>

          <SoftBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </SoftBox>
        </SoftBox> */}
            <SoftBox>
              <SoftTypography variant="h6">Sidenav</SoftTypography>
              <SoftTypography variant="p" sx={{ fontSize: "14px", color: "#667085" }}>choose show or hide sidebar</SoftTypography>
              <Stack sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row"
              }}>

                <SoftTypography variant="img" component="img" src={imageSideBar} sx={({ borders: { borderWidth }, palette: { white, dark, purple }, transitions }) => ({
                  width: "40%", cursor: "pointer",
                  border: `${borderWidth[1]} solid ${makeIconOnly == false ? purple.middle : white.main}`,
                  borderColor: makeIconOnly == false ? purple.middle : white.main,
                  borderRadius: "8px",
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  // backgroundColor:color,
                  // backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                  //   linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })} onClick={() => setIconOnly(dispatch, false)} />
                <SoftTypography variant="img" component="img" src={imageSideBar1} sx={({ borders: { borderWidth }, palette: { white, dark, purple }, transitions }) => ({
                  width: "40%", cursor: "pointer",
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: makeIconOnly == true ? purple.middle : white.main,
                  borderRadius: "8px",
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  // backgroundColor:color,
                  // backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                  //   linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })} onClick={() => setIconOnly(dispatch, true)} />

              </Stack>
            </SoftBox>
            <SoftBox>
              <SoftTypography variant="h6">Sidenav color</SoftTypography>
              <SoftTypography variant="p" sx={{ fontSize: "14px", color: "#667085" }}>choose show or hide sidebar</SoftTypography>
              <Stack sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row"
              }}>

                <SoftTypography variant="img" component="img" src={whiteSideBar} sx={({ borders: { borderWidth }, palette: { white, dark, purple }, transitions }) => ({
                  width: "30%", cursor: "pointer",
                  border: `${borderWidth[1]} solid ${ColorSidenav == "white" ? purple.middle : white.main}`,
                  borderColor: ColorSidenav == "white" ? purple.middle : white.main,
                  borderRadius: "8px",
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  background: ColorSidenav,
                  // backgroundColor:color,
                  // backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                  //   linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })} onClick={() => setColorSideBar(dispatch, "white")} />
                <SoftTypography variant="img" component="img" src={greySideBar} sx={({ borders: { borderWidth }, palette: { white, dark, purple }, transitions }) => ({
                  width: "30%", cursor: "pointer",
                  border: `${borderWidth[1]} solid ${ColorSidenav == "gray" ? purple.middle : white.main}`,
                  borderColor: ColorSidenav == "gray" ? purple.middle : white.main,
                  borderRadius: "8px",
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  background: ColorSidenav,
                  // backgroundColor:color,
                  // backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                  //   linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })} onClick={() => setColorSideBar(dispatch, "gray")} />
                <SoftTypography variant="img" component="img" src={gradientSideBar} sx={({ borders: { borderWidth }, palette: { white, dark, purple }, transitions }) => ({
                  width: "30%", cursor: "pointer",
                  border: `${borderWidth[1]} solid ${ColorSidenav == "linear-gradient(gray, white)" ? purple.middle : white.main}`,
                  borderColor: ColorSidenav == "linear-gradient(gray, white)" ? purple.middle : white.main,
                  borderRadius: "8px",
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  background: ColorSidenav,
                  // backgroundColor:color,
                  // backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                  //   linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })} onClick={() => setColorSideBar(dispatch, "linear-gradient(gray, white)")} />

              </Stack>
            </SoftBox>
            {/* <SoftBox mt={3} lineHeight={1}>
          <SoftTypography variant="h6">Sidenav Type</SoftTypography>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Choose between 2 different sidenav types.
          </SoftTypography>

          <SoftBox
            sx={{
              display: "flex",
              mt: 2,
            }}
          >
            <SoftButton
              color="info"
              variant={transparentSidenav ? "gradient" : "outlined"}
              onClick={handleTransparentSidenav}
              disabled={disabled}
              fullWidth
              sx={{
                mr: 1,
                ...sidenavTypeButtonsStyles,
              }}
            >
              Transparent
            </SoftButton>
            <SoftButton
              color="info"
              variant={transparentSidenav ? "outlined" : "gradient"}
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={sidenavTypeButtonsStyles}
            >
              White
            </SoftButton>
          </SoftBox>
        </SoftBox> */}
            <SoftBox>
              <SoftTypography variant="h6">Background</SoftTypography>

              <SoftBox mb={0.5}>
                {backgroundColors.map((color) => (
                  <IconButton
                    key={color}
                    sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                      width: "24px",
                      height: "24px",
                      padding: 0,
                      border: `${borderWidth[1]} solid ${white.main}`,
                      borderColor: sidenavColor === color && dark.main,
                      transition: transitions.create("border-color", {
                        easing: transitions.easing.sharp,
                        duration: transitions.duration.shorter,
                      }),
                      backgroundColor: color,
                      // backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                      //   linearGradient(gradients[color].main, gradients[color].state),

                      "&:not(:last-child)": {
                        mr: 1,
                      },

                      "&:hover, &:focus, &:active": {
                        borderColor: dark.main,
                      },
                    })}
                    onClick={() => setColorBackground(dispatch, color)}
                  />
                ))}
              </SoftBox>
            </SoftBox>

            <Stack sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}>
              <SoftTypography variant="h6">Footer</SoftTypography>
              <SoftTypography variant="p" sx={{ fontSize: "14px", color: "#667085" }}>choose None or multiple choices</SoftTypography>
             <SoftBox sx={{display:"flex",flexDirection:"column"}}>
              {footerDisplay.map((ele,index)=>(
                <SoftBox key={index}>
                <Checkbox checked={ele}
      onChange={()=>setFOOTER(dispatch,footerDisplay.map((elem,i)=>index==i?!ele:elem))}  />
                <SoftTypography variant="p" sx={{ fontSize: "14px", color: "#667085" }}>{index==0?"None":index==1?"Privacy Policy":index==2?"FAQ’s":"Copyright"}</SoftTypography>
              </SoftBox>
              ))}
              </SoftBox>
            </Stack>
            <SoftBox mt={3} mb={2} lineHeight={1}>
              <SoftTypography variant="h6">Navbar Fixed</SoftTypography>

              <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
            </SoftBox>
            <Divider />




          </SoftBox>
        </TabPanel >
      </TabContext>
      <SoftBox mt={3} textAlign="center">
        <SoftBox mb={0.5}>
          <SoftTypography variant="h6">Thank you for sharing!</SoftTypography>
        </SoftBox>

        <SoftBox display="flex" justifyContent="center">
          <SoftBox mr={1.5}>
            <SoftButton
              component={Link}
              href="//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20React%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23react%23mui&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-react"
              target="_blank"
              rel="noreferrer"
              color="dark"
            >
              <TwitterIcon />
              &nbsp; Tweet
            </SoftButton>
          </SoftBox>
          <SoftButton
            component={Link}
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard-react"
            target="_blank"
            rel="noreferrer"
            color="dark"
          >
            <FacebookIcon />
            &nbsp; Share
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
