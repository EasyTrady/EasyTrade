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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem"
import {Box,Stack} from "@mui/material"
import SelectField from "components/common/SelectField";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import Customer from "layouts/dashboard/components/Customer";

import OrderOverview from "layouts/dashboard/components/OrderOverview";
import React from "react"
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { setDirection } from "context";
import { useEffect } from "react";
import { useSoftUIController } from "context";
import { PROFILE, STATISTICSTOTAL } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "hooks/useRequest";
import CardIcon from "examples/Icons/CardIcon";
import UsersIcon from "examples/Icons/UsersIcon";
import Employee from "examples/Icons/Employee";
import VendorIcon from "examples/Icons/VendorIcon";
import Chart from "examples/Charts/VerticalChart";
import MixedChart from "examples/Charts/MixedChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import data from "layouts/dashboard/components/Customer/data";
import horizantLineChartData from "./data/horizantelChartData";
import gradientLinetDatas from "./data/gradientLineDatas";
import orderData from "./data/orderData";
import { GradientLine } from "./data/gradientLineChartData";
import { useTranslation } from 'react-i18next';
import ComputerIcon from "examples/Icons/ComputerIcon";
import LaptopIcon from "examples/Icons/LaptopIcon";
import TabletIcon from "examples/Icons/TabletIcon";
import MobileIcon from "examples/Icons/MobileIcon";
import CardDevice from "./components/CardDevice";
// import Chart from "examples/Charts/VerticalChart/Chart";
// import useRequest from 'hooks/useRequest';

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const profile = useSelector((state) => state.profile)
  const totals = useSelector((state) => state.totals.value)

  const Dispatch = useDispatch()
  let {t}= useTranslation("common")
  let [filter, setFilter] = React.useState("")
  let Token = localStorage.getItem("token");
  const [profileRequest, getProfileResponce] = useRequest({
    path: PROFILE,
    method: "get",
    Token: `Token ${Token}`,
  });
  let { gradientLineChartData, amountLineChartData } = GradientLine()
  useEffect(() => {
    profileRequest({
      onSuccess: (res) => {
        Dispatch({ type: "profile/set", payload: { ...res.data } });
      },
    });
  }, [])
  // Changing the direction to rtl
  useEffect(() => {
    // setDirection(dispatch, "ltr");
    totalRequest({
      onSuccess: (res) => {
        Dispatch({ type: "totals/set", payload: res.data })

      }
    })
    // return () => setDirection(dispatch, "ltr");
  }, []);
  const [totalRequest, gettotalResponce] =
    useRequest({
      path: STATISTICSTOTAL,
      method: "get",
      Token: `Token ${Token}`
    });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: totals?.total_orders }}
                  count="Orders"
                  percentage={{ color: "text", text: "-0.91% this week" }}
                  icon={{ color: "white", component: <CardIcon /> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: totals?.total_users }}
                  count="Users"
                  percentage={{ color: "text", text: "-0.91% this week" }}
                  icon={{ color: "white", component: <UsersIcon /> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: totals?.total_employees }}
                  count="Employees"
                  percentage={{ color: "text", text: "-0.91% this week" }}
                  icon={{ color: "white", component: <Employee /> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: totals?.total_vendors }}
                  count="Vendors"
                  percentage={{ color: "text", text: "+0.49% this week" }}
                  icon={{ color: "white", component: <VendorIcon /> }}
                />
              </Grid>
            </Grid>
          </SoftBox>
          {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */}
          <SoftBox mb={3}>
            <Grid container spacing={3} >
              {/* <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid> */}
              <Grid item xs={12} lg={12} md={12} sm={12} xl={12}>

                <GradientLineChart
                  title="Total amount Orders Analytics"
                  height="22rem"
                  description={
                    <SelectField
                      variant="outlined"
                      placeholder={"Export"}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      renderValue={(selected) => {

                        return <SoftBox sx={{ display: "flex" }}>{selected}</SoftBox>
                      }}

                      sx={{ width: "100% !important" }}
                    >
                      {
                        ["Monthly", "Yearly"].map((product, index) => (

                          <MenuItem key={index} value={product}>{product}</MenuItem>
                        ))
                      }
                    </SelectField>
                  }

                  chart={gradientLineChartData}
                />

              </Grid>
              {/* <Grid item xs={12} lg={12}>
              <HorizontalBarChart
                title="Total amount Orders Analytics"
                description={
                <></>
                }
                height="186px"
                chart={horizantLineChartData}
              />
            </Grid> */}
            </Grid>
          </SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Projects title={" Products with low Qty of stock"} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Customer title="Customer have cart 7 days" data={data} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Customer title="Offers will expire" data={orderData} />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid> */}
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12} xl={12} sx={{ my: 2 }}>
            <GradientLineChart
              title="Total amount Orders Analytics"
              height="23rem"
              description={
                <SelectField
                  variant="outlined"
                  placeholder={"Export"}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  renderValue={(selected) => {

                    return <SoftBox sx={{ display: "flex" }}>{selected}</SoftBox>
                  }}

                  sx={{ width: "100% !important" }}
                >
                  {
                    ["Monthly", "Yearly"].map((product, index) => (

                      <MenuItem key={index} value={product}>{product}</MenuItem>
                    ))
                  }
                </SelectField>
              }

              chart={gradientLinetDatas}
            />
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12} xl={12} sx={{ my: 2 }}>
          <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%"}}>
            <SoftTypography component={"p"} sx={{borderBottom:"1px solid #E5E7E8", padding: "12px 24px 12px 24px"}}>
           {t("Devices Overview")}
            </SoftTypography>
            <Stack flexDirection={"row"} sx={{padding:"24px",gap:"24px",flexWrap:"wrap",justifyContent:"center"}}>
              
                <CardDevice icon={<ComputerIcon/>} title={"Computer"}range={"54%"}user={"5,761,687 Users"}/>
             
                <CardDevice icon={<LaptopIcon/>} title={"Laptop"}range={"23%"}user={"698,723 Users"}/>
                <CardDevice icon={<TabletIcon/>} title={"Tablet"}range={"19%"}user={"+68,412 Users"}/>
                <CardDevice icon={<MobileIcon/>} title={"Mobile"}range={"19%"}user={"+68,412 Users"}/>
            
              
              
             
            </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12} xl={12} sx={{ my: 2 }}>

            <GradientLineChart
              title="Total numbers Order Analytics"
              height="22rem"
              description={
                <SelectField
                  variant="outlined"
                  placeholder={"Export"}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  renderValue={(selected) => {

                    return <SoftBox sx={{ display: "flex" }}>{selected}</SoftBox>
                  }}

                  sx={{ width: "100% !important" }}
                >
                  {
                    ["Monthly", "Yearly"].map((product, index) => (

                      <MenuItem key={index} value={product}>{product}</MenuItem>
                    ))
                  }
                </SelectField>
              }

              chart={amountLineChartData}
            /></Grid>
        </SoftBox>
        <Footer />
      </Container >
    </DashboardLayout>
  );
}

export default Dashboard;
