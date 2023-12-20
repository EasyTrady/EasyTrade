import React, { useState,useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import HorizontalBarChart from 'examples/Charts/BarCharts/HorizontalBarChart';
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import Chart from 'examples/Charts/VerticalChart';
import Breadcrumbs from 'examples/Breadcrumbs'
import Grid from "@mui/material/Grid";
import SoftTypography from "components/SoftTypography";
import SoftBox from 'components/SoftBox'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SoftInput from 'components/SoftInput'
import input from "assets/theme/components/form/input";
import SelectField from "components/common/SelectField";
import DataGridCustom from 'components/common/DateGridCustomer'
import DatePickerField from "components/common/DatePicker";
import useControls from "hooks/useControls";
import Switch from '@mui/material/Switch';
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs from 'dayjs';
import SoftButton from "components/SoftButton";
import * as FileSaver from "file-saver"
import XLSX from "sheetjs-style"
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
// import  LocalizationProvider  from '@mui/lab/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from "prop-types";
import {
  Container, InputAdornment, Avatar, Icon, TextField
} from '@mui/material'
import moment from 'moment';
import Footer from "examples/Footer";
// import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateIcon from 'examples/Icons/DateIcon';
import useRequest from "hooks/useRequest";
import { REPORT ,TOTALREPORT} from "data/api";
import { BaseUrl } from 'data/api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function Report({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  const [dateRange, setDateRange] = useState([null, null]);


  const { chart, items } = reportsBarChartData;
  let [rows, setRows] = useState([])
  let [total, setTotal] = useState({total_orders: 0,
  total_products: 0,
  total_profit: 0,
  total_customers: 0,
  total_employees: 0})

  let [columns, setColumns] = useState([])

  let Token = localStorage.getItem("token");

  const [ReportRequest, getReportResponce] = useRequest({
    path: REPORT,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [totalRequest, gettotalResponce] = useRequest({
    path: TOTALREPORT,
    method: "get",
    Token: `Token ${Token}`,
  });
  
  const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] = useControls([
    {
      control: "start_date",
      value: "",
      isRequired: false,
    },
    {
      control: "end_date",
      value: "",
      isRequired: false,
    },
    {
      control: `total_sales`,
      value: "",
      isRequired: false,
    }, {
      control: `total_products`,
      value: "",
      isRequired: false,
    }, {
      control: `total_profit`,
      value: "",
      isRequired: false,
    }, {
      control: `total_customers`,
      value: "",
      isRequired: false,
    }, {
      control: `total_employees`,
      value: "",
      isRequired: false,
    },
  ]);
  const handleDateChange = (newDates) => {
    setControl("start_date", dayjs(newDates[0]))
    setControl("end_date", dayjs(newDates[1]))
    setDateRange(newDates);
  };
  function togetdataoftable(data) {

    ReportRequest({
      id: data,
      params: {
        start_date: controls?.start_date,
        end_date: controls?.end_date
      },
      onSuccess: (res) => {
        // setControl(`total_${data}`, res.data.count)
        setRows(res.data.results.map((ele) => ele))
        setColumns(res.data.results.length > 0 ? Object.keys(res.data.results[0]).map((elem) => (elem == "created_at" || elem == "date" ?
          { field: elem, renderCell: (params) => (moment(params.row.created_at).format('MMMM-DD-YYYY')), headerName: elem.replace("_", " "), width: 150 } : elem == "main_image" ?
            { field: elem, renderCell: (params) => <Avatar src={BaseUrl + params.row.main_image} />, headerName: elem.replace("_", " "), width: 150 }
            : elem == "is_active" ? { field: elem, renderCell: (params) => <Switch checked={params.row.is_active} inputProps={{ 'aria-label': 'uncontrolled' }} />, headerName: elem.replace("_", " "), width: 150 } : { field: elem, headerName: elem.replace("_", " "), width: 150 })) : [])

      }
    })
  }
  function ExportExcel(){
    const ws=XLSX.utils.json_to_sheet(rows)
    const wb={Sheets:{"data":ws},SheetNames:["data"]}
    const excelBuffer=XLSX.write(wb,{bookType:"xlsx",type:"array"})
    const data=new Blob([excelBuffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"})
    FileSaver.saveAs(data,"data.xlsx")
  }
  useEffect(()=>{
    totalRequest({
      onSuccess:(res)=>{
        setTotal({...res.data})
        console.log(res.data)
      }
    })
    togetdataoftable("sales")
  },[])
  return (
    <DashboardLayout >
      <DashboardNavbar />
      <Container sx={{ marginY: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {/* <ReportsBarChart title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items} /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2.3} onClick={() => togetdataoftable("sales")}>
            <Chart color={"red"} chart={gradientLineChartData} title={total.total_orders} description={"sales"} subDescription={"-0.91% this week"} />

          </Grid><Grid item xs={12} sm={6} md={2.3} onClick={() => togetdataoftable("products")}>
            <Chart color={"#F9C74F"} chart={gradientLineChartData} title={total.total_products} description={"products"} subDescription={"-0.91% this week"} />

          </Grid><Grid item xs={12} sm={6} md={2.3} onClick={() => togetdataoftable("profit")}>
            <Chart color={"#F8961E"} chart={gradientLineChartData} title={total.total_profit} description={"profit"} subDescription={"-0.91% this week"} />

          </Grid><Grid item xs={12} sm={6} md={2.3} onClick={() => togetdataoftable("customers")}>
            <Chart color={"#F3722C"} chart={gradientLineChartData} title={total.total_customers} description={"customer"} subDescription={"-0.91% this week"} />

          </Grid><Grid item xs={12} sm={6} md={2.3} onClick={() => togetdataoftable("employees")}>
            <Chart color={"#52C41A"} chart={gradientLineChartData} title={total.total_employees} description={"employee"} subDescription={"-0.91% this week"} />

          </Grid>
        </Grid>
        <SoftBox sx={{ display: "flex", justifyContent: "space-between", marginY: "24px", flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" } }}>
          <SoftTypography variant="h5">Sales Report</SoftTypography>
          <SoftBox sx={{
            justifyContent: "flex-end",
            display: "flex", alignItems: "center", width: "40%"
          }}>
            <SoftBox sx={{
              display: "flex", width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" }, borderRadius: '8px',
              border: "1px solid #D9D9D9", overflow: "hidden", alignItems: "center"
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  localeText={{ start: "", end: "" }}
                  // format='YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]'
                  startText=""
                  endText=""
                  value={dateRange}
                  slots={{ field: SingleInputDateRangeField }}
                  sx={{ ".MuiInputBase-root": { width: "117% !important" } }}
                  onChange={handleDateChange}
                  label=""

                // renderInput={(startProps, endProps) => (
                //   <React.Fragment>
                //     {console.log(startProps.inputProps)}
                //     {/* <TextField  /> */}
                //     <SoftBox sx={{ mx: 2 }}> to </SoftBox>
                //     <TextField InputLabelProps={{ shrink: true }}  />
                //   </React.Fragment>
                // )}
                />

              </LocalizationProvider>
              {/* <DatePickerField
              value={controls.start_date}
              onChange={(newvalue) => {setControl("start_date",newvalue)}}
              icon={DateIcon}
              sx={{".MuiInputBase-root":{border:"unset !important",borderRadius:"unset !important"}}}
            /> 
             
             <DatePickerField
              value={controls.end_date}
              onChange={(newvalue) => {setControl("end_date",newvalue)}}
              icon={"to"}
              sx={{".MuiInputBase-root":{border:"unset !important",borderRadius:"unset !important"}}}
            />                    */}
            </SoftBox>
            <SoftBox sx={{ marginX: "10px" }}>
              <SoftButton
                variant="contained"
                placeholder={"Export"}
                onClick={ExportExcel}
                // onOpen={getProducts}
                value={"Export"}
                // onChange={onChange}
               
                sx={{ width: "100% !important" }}
              >
                {/* {
            products?.results?.map((product)=>(
              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
            ))
          } */}
          Export
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>

        <DataGridCustom rows={rows} columns={columns} checkboxSelection={true}
          onRowClick={(e, row) => {
            console.log(e, row);
            // setClick({ ...e.id });
          }}
          loading={getReportResponce.isPending}
          // notProduct={false}
          // rowsPerPageOptions={[5, 10, 15, 20]}
          // onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4} />

      </Container>
      <Footer />
    </DashboardLayout>
  )
}

export default Report
Report.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Report
Report.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};