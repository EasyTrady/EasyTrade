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

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { setDirection } from "context";
import { useEffect, useState } from "react";
import { useSoftUIController } from "context";
import { PROFILE } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "hooks/useRequest";
import SelectField from "components/common/SelectField";
import { MenuItem } from "react-pro-sidebar";
import ComputerIcon from "examples/Icons/ComputerIcon";
import LaptopIcon from "examples/Icons/LaptopIcon";
import TabletIcon from "examples/Icons/TabletIcon";
import MobileIcon from "examples/Icons/MobileIcon";
import CardDevice from "./components/CardDevice";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

function Dashboard(amountLineChartData) {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [, dispatch] = useSoftUIController();
  const profile=useSelector((state)=>state.profile)
  const Dispatch=useDispatch()
  const {t} = useTranslation()
  const [filter, setFilter] = useState()
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
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
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
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
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
          </Grid>
        </SoftBox>
        <Footer />
      </Container >
    </DashboardLayout>
  );
}

export default Dashboard;
