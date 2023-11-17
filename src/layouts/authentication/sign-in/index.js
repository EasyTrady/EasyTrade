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
      <Card>
        <AuthWrapper1>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              gap: "2px",
              justifyContent: "space-between",
              overflow: "auto",
              bgcolor: "#FFFFFF",
              height: "fit-content",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
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
                    width: "60%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Box>
              </Box>
            </Box>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              sx={{ minHeight: "100vh", bgcolor: "#FFFFFF" }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                    px: "12px",
                  }}
                >
                  <Grid
                    container
                    justifyContent="end"
                    alignItems="center"
                    sx={{ minHeight: "calc(100vh - 68px)" }}
                  >
                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                      <AuthCardWrapper sx={{ border: "none" }}>
                        <Grid container spacing={2} alignItems="end" justifyContent="end">
                          <Grid item sx={{ mb: 3 }}>
                            <Link to="#">{/* <Logo /> */}</Link>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid
                              container
                              direction={matchDownSM ? "column-reverse" : "row"}
                              alignItems="end"
                              justifyContent="end"
                            >
                              <Grid item>
                                <Stack alignItems="end" justifyContent="end" spacing={1}>
                                  <Typography
                                  sx={{fontFamily:'Cairo',fontWeight:600,fontSize:'36px',color:'#3D2D66'}}
                                    color={theme.palette.secondary.main}
                                    gutterBottom
                                    variant={matchDownSM ? "h3" : "h2"}
                                  >
                                    تسجيل الدخول
                                  </Typography>
                                  <Typography
                                   sx={{fontFamily:'Cairo',fontWeight:400,fontSize:'16px',color:'#667085'}}
                                    variant="caption"
                                    fontSize="16px"
                                    textAlign={matchDownSM ? "center" : "inherit"}
                                  >
                                    مرحبًا بعودتك! برجاء ادخال التفاصيل الخاصة بك
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <AuthLogin />
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                              {/* <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </AuthCardWrapper>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
            </Grid>
          </Box>
        </AuthWrapper1>
      </Card>
    </PageLayout>
  );
}

export default SignIn;
