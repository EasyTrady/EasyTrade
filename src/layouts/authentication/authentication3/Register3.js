import React from "react";
import { Link, useLocation } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthRegister from "../auth-forms/AuthRegister";
// import AuthFooter from 'ui-component/cards/AuthFooter';
import signup from "../../../assets/images/icons/Social Media Icon Square/login.png";
import PageLayout from "examples/LayoutContainers/PageLayout";

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const location = useLocation();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <PageLayout>
      
    </PageLayout>
  );
};

export default Register;
