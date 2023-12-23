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

import { Box, Container, FormControl } from "@mui/material";
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
// import signup from "../../../assets/images/icons/Social Media Icon Square/login.png";
import dots from "../../../assets/images/icons/Social Media Icon Square/dots.png";
import vector from "../../../assets/images/icons/Social Media Icon Square/authvector.svg";
import LanguageIcon from '@mui/icons-material/Language';


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
        <AuthWrapper1 sx={{height:'100vh'}}>
          <Grid item sx={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: {
                xl: "column",
                lg: "column",
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
            }}>
            <Grid container>
              {/* side banner  */}
              <Grid item md={6} xs={12} minHeight={{md:"100vh",xs:"100%"}}>
                <Box
                      sx={{
                        backgroundImage: `URL(${dots})`,
                        backgroundSize: "30px",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center center",
                        height: { md: "100%", sm: "30vh", xs: "30vh", lg: "100%" },
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
                          paddingTop:'10px',
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></Box>
                </Box>
              </Grid>
              {/* end side banner */}
              <Grid item md={6} xs={12} minHeight={{md:"100vh",xs:"100%"}} sx={{ bgcolor: "#FFFFFF", alignItems: {md:'center', xs: 'flex-start'}, display:'flex', justifyContent: 'center',
                  flexDirection:'column',
                  overflow:'hidden'
                }}>
                  <Container sx={{ width: {md:'100%'}}}>
                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0, textAlign:'center'}}>
                      <AuthCardWrapper sx={{ border: "none",boxShadow:'none ' }}>
                        <Grid item xs={12}>
                              <Grid
                                container
                                direction={matchDownSM ? "column-reverse" : "row"}
                                alignItems="end"
                                justifyContent="end"
                              >
                                <Stack 
                                    alignItems="end" 
                                    justifyContent="end" 
                                    spacing={1}
                                    >
                                    <Typography
                                    sx={{fontFamily:'Cairo',fontWeight:600,fontSize:'36px',color:'#3D2D66', textAlign: 'right'}}
                                      color={theme.palette.secondary.main}
                                      gutterBottom
                                      variant={matchDownSM ? "h3" : "h2"}
                                    >
                                      انشاء حساب
                                    </Typography>
                                    <Typography
                                      sx={{fontFamily:'Cairo',fontWeight:400,fontSize:'16px',color:'#667085'}}
                                      variant="caption"
                                      textAlign={matchDownSM ? "center" : "right"}
                                    >
                                      مرحبًا! الرجاء ادخال التفاصيل الخاصة بك
                                    </Typography>
                                  </Stack>
                              </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthRegister subscribtionId={state?.subscribtionId} />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid item container direction="row-reverse" justifyContent="center" alignItems="center" xs={12}>
                            <Typography
                              sx={{fontFamily:'Cairo',fontWeight:400,fontSize:'14px',color:'#667085', textDecoration: "none",
                              lineHeight:'20px'
                            }}
                              component={Link}
                              to="/login"
                              variant="subtitle1"
                            >
                              لديك حساب بالفعل؟ 
                            </Typography>
                            <Typography sx={{fontFamily:'Cairo',fontWeight:400,fontSize:'14px',color:'#6941C6', }}>
                                تسجيل الدخول
                              </Typography>
                          </Grid>
                        </Grid>
                      </AuthCardWrapper>
                    </Grid>
                    <Box sx={{width:'100%', padding:'10px 20px'}}>
                    <Divider sx={{ alignSelf: "center", width: "100%", margin:'0.7rem 0'}} orientation="horizontal" flexItem />

                    <Box sx={{display:'flex', justifyContent:'space-between  !important'}}>
                      <Typography
                        sx={{
                          color: "#9795B5",
                          fontFamily:'Cairo',
                          fontWeight: 400,
                          fontSize: '14px'
                        }}
                      >
                        Copyright © 2023 Easytrade | All Rights Reserved
                      </Typography>
                      <Typography>
                      <LanguageIcon />
                      </Typography>
                    </Box>
                  </Box>
                  </Container>
              </Grid>
            </Grid>
          </Grid>
          
        </AuthWrapper1>
      </PageLayout>
      {/* </form>)}
        </Formik> */}
    </Card>
  );
}

export default SignUp;
