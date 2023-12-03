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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import * as Yup from "yup";

import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import dots from "../../../assets/images/icons/Social Media Icon Square/dots.png";
import vector from "../../../assets/images/icons/Social Media Icon Square/authvector.svg";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { Formik } from "formik";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import { useTheme } from "@emotion/react";
import AuthLogin from "../../authentication/auth-forms/AuthLogin";
import Card from "@mui/material/Card";

function SignIn() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [rememberMe, setRememberMe] = useState(true);
  let navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <PageLayout>
      <Box sx={{height:'100vh'}}>
      <Grid item>
        <Grid container>
          <Grid item md={6} xs={12}  height={{md:"100vh",xs:"100%"}}>
            <Box
              sx={{
                backgroundImage: `URL(${dots})`,
                backgroundSize: "30px",
                backgroundRepeat: "repeat",
                backgroundPosition: "center center",
                height: { md: "30vh", sm: "30vh", xs: "30vh", lg: "100%" },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `URL(${vector})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  height: { md: "30vh", sm: "30vh", xs: "30vh", lg: "100%" },
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}  height="100vh" >
            <Container>
            <Box  sx={{alignItems:"flex-end",justifyContent:"center", height:"100vh",display:'flex',flexDirection:'column',width:{md:'60%',xs:'100%'},margin:'auto',}} >
              <Typography
                sx={{ fontFamily: "Cairo", fontWeight: 600, fontSize: "36px", color: "#3D2D66" ,mb:"12px"}}
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? "h3" : "h2"}
              >
                تسجيل الدخول
              </Typography>
              <Typography
                sx={{ fontFamily: "Cairo", fontWeight: 400, fontSize: "16px", color: "#667085",mb:'32px' }}
                
                fontSize="16px"
                textAlign={matchDownSM ? "center" : "inherit"}
              >
                مرحبًا بعودتك! برجاء ادخال التفاصيل الخاصة بك
              </Typography>
              <AuthLogin/>
            </Box>
            </Container>
          </Grid>
        </Grid>
      </Grid>
      </Box>
    </PageLayout>
  );
}

export default SignIn;
