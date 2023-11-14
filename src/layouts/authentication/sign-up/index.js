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
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import * as Yup from "yup";
import { Formik } from "formik";

import { Box, FormControl } from "@mui/material";
import { useTheme } from "@emotion/react";
import PhoneField from "components/common/PhoneField";
import PageLayout from "examples/LayoutContainers/PageLayout";
import AuthWrapper1 from "../AuthWrapper1";
import { useLocation } from "react-router-dom";

// material-ui

import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports

import AuthCardWrapper from "../AuthCardWrapper";
import AuthRegister from "../../authentication/auth-forms/AuthRegister";
// import AuthFooter from 'ui-component/cards/AuthFooter';
import signup from "../../../assets/images/icons/Social Media Icon Square/login.png";

function SignUp({ ...others }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [agreement, setAgremment] = useState(true);
  const location = useLocation();
  const { state } = location;
  const handleSetAgremment = () => setAgremment(!agreement);
  console.log(others, "others", state);
  return (
    <Card>
      <PageLayout>
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
            <Box sx={{
              width:'100%',
            }}>
              <Box
                sx={{
                  backgroundImage: `URL(${signup})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  // width: { xl: "50%", lg: "50%", md: "100%", sm: "100%", sx: "100%" },
                  height: { md: "30vh", sm: "30vh", xs: "30vh", lg:'100%' },
                  width: "100%",
                }}
              />
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
                    alignItems: 'center',
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
                          <Grid item xs={12}>
                            <Grid
                              container
                              direction={matchDownSM ? "column-reverse" : "row"}
                              alignItems="end"
                              justifyContent="end"
                            >
                              <Grid item alignItems="end" justifyContent="end">
                                <Stack alignItems="end" justifyContent="end" spacing={1}>
                                  <Typography
                                    color={theme.palette.secondary.main}
                                    gutterBottom
                                    variant={matchDownSM ? "h3" : "h2"}
                                  >
                                    تسجيل حساب
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    fontSize="16px"
                                    textAlign={matchDownSM ? "center" : "inherit"}
                                  >
                                    مرحبًا! الرجاء ادخال التفاصيل الخاصة بك
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <AuthRegister subscribtionId={state?.subscribtionId} />
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                              <Typography
                                component={Link}
                                to="/login"
                                variant="subtitle1"
                                sx={{ textDecoration: "none", color: "#5D449B" }}
                              >
                                لديك حساب بالفعل؟ تسجيل الدخول
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </AuthCardWrapper>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                {/* <AuthFooter /> */}
              </Grid>
            </Grid>
          </Box>
        </AuthWrapper1>
      </PageLayout>
      {/* </form>)}
        </Formik> */}
    </Card>
  );
}

export default SignUp;
