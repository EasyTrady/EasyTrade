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
      <AuthWrapper1>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
            gap: 2,
            justifyContent: "space-between",
            // overflow: 'auto',
            bgcolor: "#FFFFFF",
            // paddingTop: '70px'
          }}
        >
          <Box
            component="img"
            sx={{
              width: { xl: "50%", lg: "50%", md: "50%", sm: "0%", sx: "0%" },
              height: { xl: "100%", lg: "100%", md: "100vh", sm: "30vh", sx: "30vh" },
            }}
            src={signup}
          ></Box>
          <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: "100vh" }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: 2,
                  px: "12px",
                  bgcolor: "#fcc",
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: "calc(100vh - 68px)" }}
                >
                  <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                    <AuthCardWrapper>
                      <Grid sx={{backgroundColor: 'red'}} container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction={matchDownSM ? "column-reverse" : "row"}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item>
                              <Stack alignItems="center" justifyContent="center" spacing={1}>
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
                          <AuthRegister subscribtionId={location?.state?.subscribtionId} />
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
  );
};

export default Register;
