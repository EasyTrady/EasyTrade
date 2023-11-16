/* eslint-disable react/prop-types */
import { Button, Container, Icon } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import Breadcrumbs from 'examples/Breadcrumbs'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import { useTranslation } from 'react-i18next'

const Offers = ({ absolute, light, isMini }) => {
    const navigate=useNavigate()
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem('sub_domain')
    let { t } = useTranslation("common")
    // let offers = useSelector((state) => state.offers.value)
    let Token = localStorage.getItem('token');

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <Container sx={{ p: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                <SoftBox mb={{
                    xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
                    alignItems: "center"
                }} sx={{ textAlign: "right" }}>
                    <Button onClick={() => window.print()} sx={{
                        backgroundColor: "white !important",
                        color: "black !important", marginX: "10px", p: 1.5
                    }}><LocalPrintshopIcon /> Print</Button>
                    <SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }
                        }}
                        onClick={() => navigate(`/${sub_domain}/dashboard/offers/addnewoffer`)}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("addnewoffer")}
                    </SoftButton>
                </SoftBox>
                </Container>
    </DashboardLayout>
  )
}

export default Offers