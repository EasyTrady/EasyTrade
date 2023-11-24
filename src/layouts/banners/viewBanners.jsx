/* eslint-disable react/prop-types */
import {  Button, Container, Icon } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import DataGridCustom from 'components/common/DateGridCustomer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
const ViewBanners = ({ absolute, light, isMini }) => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
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
            onClick={() => navigate(`/${sub_domain}/dashboard/banners/addnewbanner`)}
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;{t("addnewbanner")}
          </SoftButton>
        </SoftBox>
        {/* <DataGridCustom
          rows={offers?.results}
          columns={columns}
          onEdit={()=>{}}
          onDelete={onDelete}
          onCopy={() => {}}
          checkboxSelection={true}
          onRowClick={(e, row) => {
            console.log(e, row);
             setClick({ ...e.id });
          }}
          notProduct={false}
          rowsPerPageOptions={[5, 10, 15, 20]}
          onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}
          sx={{
            backgroundColor: "white !important",
            " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
          }}
        /> */}
      </Container>
    </DashboardLayout>
  )
}

export default ViewBanners