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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavCard from "examples/Sidenav/SidenavCard";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { StarBorder } from "@mui/icons-material";
// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Soft UI Dashboard React context
import { useSoftUIController, setMiniSidenav } from "context";
import NavCollapse from "./CollapseNav";
import NavItem from "./CollapseItem";
import VisitSite from "examples/Icons/VisitSite";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Permissition from "components/common/Permissition";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav,sidenavColor,makeIconOnly ,ColorSidenav} = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").pop();
  const image = localStorage.getItem('logo')
  const shop_name = localStorage.getItem('shop_name')
  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);
  let [active,setActive]=useState("")
console.log(active)
  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, path, children,color,permission }) => {
    let returnValue;
    let [open,setOpen]=useState(false)
    // console.log(key,active)
    const menus = children?.map((item) => {
  console.log(permission,item)
      switch (item.type) {
        case 'collapse':
          return <NavCollapse key={item.id} menu={item}  />;
        case 'item':
          return <Permissition permission={item.permission}type={item.type}><NavItem key={item.id} item={item} color={sidenavColor}/></Permissition>;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
   
    if (type === "collapse") {
      returnValue = path ? (
        <Permissition permission={permission}type={type}> <Link
          href={path}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
          onClick={(e)=>setActive((previous)=>previous===key?previous:key)}
        >
          

          <SidenavCollapse
            color={sidenavColor}
            name={name}
            icon={icon}
            setOpen={setOpen}
            open={open}
          active={key === active}
          noCollapse={noCollapse}
          >
            {menus}
          </SidenavCollapse>
        </Link></Permissition>
      ) : (
        <Permissition permission={permission}type={type}> <NavLink to={!noCollapse&&route} key={key} onClick={(e)=>setActive((previous)=>previous===key?previous:key)}>
          <SidenavCollapse
            color={sidenavColor}
            key={key}
            name={name}
            icon={icon}
            setOpen={setOpen}
            open={key === active?open:false}
          active={key === active}
          noCollapse={noCollapse}
          onClick={()=>setOpen(!open)}
          >
             {menus}
          </SidenavCollapse>
          
        </NavLink></Permissition>
      );
    } else if (type === "title") {
      returnValue = (
        <SoftTypography
          key={key}
          display={makeIconOnly?"none":"block"}
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={makeIconOnly?0:0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
         
        >
          {title}
        </SoftTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav ,ColorSidenav,makeIconOnly}}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        <SoftBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <SoftBox component="img" src={brand} alt="Soft UI Logo" width="2rem" />}
          <SoftBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav,makeIconOnly })}
          >
            <SoftTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SoftTypography>
            
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>

    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
