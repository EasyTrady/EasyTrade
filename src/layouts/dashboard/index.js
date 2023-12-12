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
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import React from "react"
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { setDirection } from "context";
import { useEffect } from "react";
import { useSoftUIController } from "context";
import { PROFILE } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "hooks/useRequest";
import CardIcon from "examples/Icons/CardIcon";
import UsersIcon from "examples/Icons/UsersIcon";
import Employee from "examples/Icons/Employee";
import VendorIcon from "examples/Icons/VendorIcon";
import Chart from "examples/Charts/VerticalChart";
import MixedChart from "examples/Charts/MixedChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import horizantLineChartData from "./data/horizantelChartData";
// import Chart from "examples/Charts/VerticalChart/Chart";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [, dispatch] = useSoftUIController();
  const profile=useSelector((state)=>state.profile)
  const Dispatch=useDispatch()
  let[filter,setFilter]=React.useState("")
  let Token = localStorage.getItem("token");
  const [profileRequest, getProfileResponce] = useRequest({
    path: PROFILE,
    method: "get",
    Token: `Token ${Token}`,
  });
  useEffect(()=>{
    profileRequest({
      onSuccess: (res) => {

         Dispatch({ type: "profile/set", payload: { ...res.data } });
      },
    });
  },[])
// Changing the direction to rtl
useEffect(() => {
  setDirection(dispatch, "ltr");

  return () => setDirection(dispatch, "ltr");
}, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{p:2}}>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "46,827" }}
                count="Orders"
                percentage={{ color: "text", text: "-0.91% this week" }}
                icon={{ color: "white", component: <CardIcon/> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "23,283.5" }}
                count="Users"
                percentage={{ color: "text", text: "-0.91% this week" }}
                icon={{ color: "white", component: <UsersIcon/> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "23" }}
                count="Employees"
                percentage={{ color: "text", text: "-0.91% this week" }}
                icon={{ color: "white", component: <Employee/> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
               title={{ text: "23,283.5" }}
               count="Vendors"
               percentage={{ color: "text", text: "+0.49% this week" }}
               icon={{ color: "white", component: <VendorIcon/> }}
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
          <Grid container spacing={3}>
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
            <Grid item xs={12} lg={12}>
              <GradientLineChart
                title="Total amount Orders Analytics"
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
                     ["Monthly","Yearly"].map((product, index) => (

                          <MenuItem key={index} value={product}>{product}</MenuItem>
                      ))
                  }
              </SelectField>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <HorizontalBarChart
                title="Total amount Orders Analytics"
                description={
                <></>
                }
                height="20.25rem"
                chart={horizantLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Projects />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid> */}
        </Grid>
      </SoftBox>
      <Footer />
      </Container >
    </DashboardLayout>
  );
}

export default Dashboard;
