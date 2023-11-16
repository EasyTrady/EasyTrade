/* eslint-disable react/prop-types */
import { Box, Breadcrumbs, Container, FormControlLabel, Switch, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import AddProductTitle from 'components/common/AddProductTitle'
import DatePickerField from 'components/common/DatePicker'
import InputField from 'components/common/TextField'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const AddNewOffers = ({ absolute, light, isMini }) => {
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem('sub_domain')
    let { t } = useTranslation('common')
    // let dispatch = useDispatch()
   
    const navigate = useNavigate()

    const location = useLocation();
    const { state } = location;
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <Container sx={{ p: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                <SoftBox sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
                <AddProductTitle title={"Offer details"} />
                <Container>
          <SoftBox
            py={"20px"}
            display="flex"
            flexDirection="column"
            gap={"20px"}
            sx={{ width: "100%", height: "100%" }}
          >
            <InputField
              variant="outlined"
              label={"Product name"}
              placeholder={"Arabic Product"}
            //   value={controls.name}
            //   onChange={(e) => setControl("name", e.target.value)}
            //   required={required.includes("name")}
            //   error={Boolean(invalid.name)}
            //   helperText={invalid.name}
            sx={{ width: "100%" }}
            />
            <InputField
              variant="outlined"
              placeholder={"English Product"}
            //   value={controls.name}
            //   onChange={(e) => setControl("name", e.target.value)}
            //   required={required.includes("name")}
            //   error={Boolean(invalid.name)}
            //   helperText={invalid.name}
              sx={{ width: "100%" }}
            />
            
            <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
            >
              Start date*
            </Typography>
            <DatePickerField
            //   value={controls.discount_start_date}
            //   onChange={(e) => setControl("discount_start_date", e)}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
            >
              End date*
            </Typography>
            <DatePickerField
            //   value={controls.discount_start_date}
            //   onChange={(e) => setControl("discount_start_date", e)}
            />
          </Box>
          <FormControlLabel
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "20px",
                  color:' #626C70'
                  
                }}
                label={"Offer Expired"}
                control={
                  <Switch
                    
                    // value={controls.in_taxes}
                    // onChange={(e) => setControl("in_taxes", e.target.checked)}
                    color="secondary"
                  />
                }
              />
           

            {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
          </SoftBox>
        </Container>
                </SoftBox>
                </Container>
                </DashboardLayout>
  )
}

export default AddNewOffers