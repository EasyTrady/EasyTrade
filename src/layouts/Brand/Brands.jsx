/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Container, Grid, Icon, Skeleton } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DataGridCustom from "components/common/DateGridCustomer";
import Breadcrumbs from "examples/Breadcrumbs";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { BRANDS } from "data/api";
import useRequest from "hooks/useRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import BrandBox from "components/common/BrandBox";
import { useTranslation } from "react-i18next";
import AddBrand from "components/common/AddBrandDialog";
import AddBrandDialog from "components/common/AddBrandDialog";
const Brands = ({ absolute, light, isMini }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let { t } = useTranslation("common");
  let Token = localStorage.getItem("token");
  const brands = useSelector((state) => state.brand.value);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [BrandsGetRequest, BrandsGetResponce] = useRequest({
    path: BRANDS,
    method: "get",
    Token: `Token ${Token}`,
  });

  const getBrands = () => {
    BrandsGetRequest({
      params: {
        size: brands?.count ? brands?.count : 10,
      },
      onSuccess: (res) => {
        dispatch({ type: "brand/set", payload: res?.data });
      },
    });
  };
  //   const [BannerDeleteRequest, BannerDeleteResponce] = useRequest({
  //     path: BANNERS,
  //     method: "DELETE",
  //     Token: `Token ${Token}`,
  //   });
  //   function onDelete(row) {

  //     BannerDeleteRequest({
  //         id: row,
  //         onSuccess: () => {
  //             dispatch({ type: "banners/deleteItem", payload: { id: row } })
  //         }
  //     })
  //}

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox
          mb={{
            xs: 1,
            md: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          sx={{ textAlign: "right" }}
        >
          <Button
            onClick={() => window.print()}
            sx={{
              backgroundColor: "white !important",
              color: "black !important",
              marginX: "10px",
              p: 1.5,
            }}
          >
            <LocalPrintshopIcon /> Print
          </Button>
          <SoftButton
            variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
            }}
            onClick={handleClickOpen}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} color="inherit" />
                جاري التحميل...
              </>
            ) : (
              <>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;{t("addnewbrand")}
              </>
            )}
          </SoftButton>
        </SoftBox>

        <Box sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, pb: 3 }}>
          <Container>
            <Grid item>
              <Grid container spacing={2}>
                {BrandsGetResponce.isPending ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <Grid item md={2.4} key={index}>
                      <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
                    </Grid>
                  ))
                ) : brands.results.length > 0 ? (
                  brands.results.map((brand, index) => (
                    <Grid item md={2.4} sm={6} xs={12} key={index}>
                      <BrandBox {...brand} />
                    </Grid>
                  ))
                ) : (
                  <Grid
                    item
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    no data
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
        <AddBrandDialog open={open} handleClose={handleClose} />
      </Container>
      {/* {BannerDeleteResponce.failAlert}
    {BannerDeleteResponce.successAlert} */}
    </DashboardLayout>
  );
};

export default Brands;
