import React from 'react'
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { useMemo } from "react";
// import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { ChartContainer, BarPlot } from '@mui/x-charts';
function Chart({ color, title, description, chart, items, subDescription }) {
  const uData = [1000, 1000, 2000, 2780, 1890, 2390, 3490, 1000, 2000, 1000, 1000, 2000, 1000];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
    'Page H',
    'Page I',
    'Page L',
    'Page H',
    'Page I',
    'Page L',
  ];
  return (
    <Card sx={{ height: "100%",justifyContent: "space-around" }}>
      <SoftBox padding="1rem">

        <SoftBox px={1}>
          <SoftBox >
            <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}  SAR
            </SoftTypography>
            <SoftTypography component="div" variant="button" color="text" fontWeight="regular">
              {description}
            </SoftTypography>
          </SoftBox>
          <SoftBox  sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"11vh"}}  px={0.5}>
          {useMemo(
            () => (
              <ChartContainer
              width={800}height={300}
                series={[{ data: uData, label: 'uv', type: 'bar' }]}
                xAxis={[{ scaleType: 'band', data: xLabels }]}
                
                colors={[color]}
                sx={{}}
              >
                <BarPlot />
              </ChartContainer>
            ),
            [color]
          )}
          </SoftBox>
          
          <SoftBox>

            <SoftTypography variant="p" fontWeight="regular" textTransform="capitalize" fontSize="12px">
              {subDescription}
            </SoftTypography>
          </SoftBox>

        </SoftBox>

      </SoftBox>
    </Card>


  )
}
Chart.defaultProps = {
  color: "dark",
  description: "",
  items: [],
};

// Typechecking props for the Chart
Chart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  subDescription: PropTypes.string
};
export default Chart