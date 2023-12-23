/* eslint-disable react/prop-types */
import { Container, Grid, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import Breadcrumbs from "examples/Breadcrumbs";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import SoftButton from "components/SoftButton";
import subscription from '../../assets/images/image_2-removebg-preview 1.png'
const MobileSubscription = ({ absolute, light, isMini }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let { t } = useTranslation("common");

  let Token = localStorage.getItem("token");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, py: 3 }}>
          <Container>
            <Grid item>
              <Grid container>
                <Grid item md={2}>
                  <SoftBox sx={{ width: "112.48px", height: "112.48px" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={"value"}
                      viewBox={`0 0 256 256`}
                    />
                  </SoftBox>
                </Grid>
                <Grid item md={5}>
                  <SoftBox>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}
                    >
                      Now a free trial version is available, guaranteeing you the opportunity to
                      test everything you want before subscribing ,just scan the Qr code and install
                      test mobile application.
                    </Typography>
                  </SoftBox>
                </Grid>
                <Grid item md={5}>
                  <SoftBox
                    sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" ,height:'100%'}}
                  >
                    <img src={arrow} alt="arrow" />
                  </SoftBox>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </SoftBox>
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, py: 3 }}>
          <Container>
            <Grid item>
              <Grid container>
                <Grid item md={8}>
                  <SoftBox sx={{width:'80%'}}>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}
                    >
                      Provide your customers with a unique and smooth shopping experience that
                      enables them to browse and buy your products easily by designing a
                      professional application for your store and launching it on iOS and Android
                      devices without the need to hire a programmer or app designer!
                    </Typography>
                  </SoftBox>
                  <SoftBox sx={{mt:3 ,display:'flex',alignItems:'end',height:'max-content'}}>
                  <SoftButton
          type="submit"
          variant="gradient"
          sx={{
            backgroundColor: (theme) => theme.palette.purple.middle,
            color: "white !important",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.purple.middle,
            },
            width: {md:"25%",xs:'50px'},
            textTransform:'none'
          }}
          onClick={()=>navigate(`/${sub_domain}/dashboard/mobilesubscription/viewsubscription`)}
        >
            Subscribe
        </SoftButton>
                  </SoftBox>
                </Grid>
                <Grid item md={4}>
                  <SoftBox
                    // sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                  >
                    <img src={subscription} alt="arrow" />
                  </SoftBox>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </SoftBox>
      </Container>
    </DashboardLayout>
  );
};

export default MobileSubscription;
