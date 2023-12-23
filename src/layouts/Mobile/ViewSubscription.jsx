/* eslint-disable react/prop-types */
import { Container, Grid, Stack, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import arrow  from '../../assets/images/arrow.svg'
import DataGridCustom from 'components/common/DateGridCustomer'
import moment from 'moment'
const ViewSubscription = ({ absolute, light, isMini }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem("sub_domain");
    let { t } = useTranslation("common");
  
    let Token = localStorage.getItem("token");
    const  columns = [
        {
            field: 'date',
            headerName: 'Date',
            type: 'text',
            width: 254,
            align: 'start',
            color:'#1B53C5',
            headerAlign: 'start',
            editable: true,
            filterable: true,
            sortable: false,disableColumnMenu: true,
            renderCell: (params) => {
              const { row } = params;
              return (<Stack direction={"row"} justifyContent={'flex-start'} alignItems={'center'}>
                  <Typography sx={{color:'#1B53C5',fontSize:'14px',fontWeight:400}}>{moment(row?.offer_end_date).format("YYYY-MM-DD")}</Typography>
              </Stack>
              );
          },
        }, 
        {
          field: 'App Store',
          headerName: 'App Store',
          type: 'text',
          width: 240,
          height:72,
          align: 'center',
          headerAlign: 'center',
          editable: true,
          filterable: false,
          sortable: false,disableColumnMenu: true
        },
        {
            field: 'Google play',
            headerName: 'Google play',
            type: 'text',
            width: 240,
            height:72,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            filterable: false,
            sortable: false,disableColumnMenu: true
          },
          {
            field: 'Total devices',
            headerName: 'Total devices',
            type: 'text',
            width: 220,
            height:72,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            filterable: false,
            sortable: false,disableColumnMenu: true
          }
      ]
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox sx={{display:'flex',flexDirection:{md:'row',xs:'column'},gap:'24px',width:'100%'}}>
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, py: 3 ,width:'100%'}}>
          <Container>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item md={3}>
                  <SoftBox sx={{ width: "112.48px", height: "112.48px" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={"value"}
                      viewBox={`0 0 256 256`}
                    />
                  </SoftBox>
                </Grid>
                <Grid item md={7}>
                  <SoftBox>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}
                    >
                      Download on App store
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}
                    >
                      Scan to download
                    </Typography>
                  </SoftBox>
                </Grid>
                <Grid item md={2}>
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
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, py: 3 ,width:'100%'}}>
          <Container>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item md={3}>
                  <SoftBox sx={{ width: "112.48px", height: "112.48px" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={"value"}
                      viewBox={`0 0 256 256`}
                    />
                  </SoftBox>
                </Grid>
                <Grid item md={7}>
                  <SoftBox>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}
                    >
                      Get it on Google play
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}
                    >
                      Scan to download
                    </Typography>
                  </SoftBox>
                </Grid>
                <Grid item md={2}>
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
        </SoftBox>
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, py: 3 ,width:'100%'}}>
            <Container>
            <SoftBox>
                <Typography  sx={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}>Total app downloads </Typography>
                <Typography  sx={{
                        fontFamily: "Inter",
                        fontSize: "24px",
                        fontWeight: 400,
                        lineHeight: "30px",
                        letterSpacing: "0em",
                        color: "#101828",
                      }}>207,388</Typography>
            </SoftBox>
            <SoftBox>
                <Typography sx={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        letterSpacing: "0em",
                        color: "#252B41A3",
                      }}>Google play</Typography>
                      
            </SoftBox>
            <SoftBox>
                <Typography sx={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        letterSpacing: "0em",
                        color: "#252B41A3",
                      }}>App Store</Typography>
                      
            </SoftBox>
            </Container>
        </SoftBox>
        <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", mt: 3, py: 3 ,width:'100%'}}>
            <Container>
        <DataGridCustom
                    rows={[]}
                    columns={columns}
                    // loading={couponResponce.isPending}

                    //   onDialog={onEdit}

                    //   onDelete={onDelete}

                    checkboxSelection={true}
                    //   onRowClick={(e,row) => {
                    //     console.log(e,row);
                    //     // setClick({ ...e.id });
                    //   }}
                    // notProduct={false}
                    // rowsPerPageOptions={[5, 10, 15, 20]}
                    // onPaginationModelChange={setPaginationModel}
                    rowHeight={72}
                    getRowSpacing={4}
                    sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                />
                </Container>
        </SoftBox>
        </Container>
        </DashboardLayout>
  )
}

export default ViewSubscription