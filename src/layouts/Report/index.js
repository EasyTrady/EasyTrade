import React,{useState} from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import HorizontalBarChart from 'examples/Charts/BarCharts/HorizontalBarChart';
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import Chart from 'examples/Charts/VerticalChart.js';
import Grid from "@mui/material/Grid";
import SoftTypography from "components/SoftTypography";
import SoftBox from 'components/SoftBox'
import SoftInput from 'components/SoftInput'
import SelectField from "components/common/SelectField";
import DataGridCustom from 'components/common/DateGridCustomer'
import DatePickerField from "components/common/DatePicker";
import useControls from "hooks/useControls";
import {
   Container,InputAdornment,Avatar
} from '@mui/material'
import moment from 'moment';

import DateIcon from 'examples/Icons/DateIcon';
import useRequest from "hooks/useRequest";
import {  REPORT} from "data/api";
import { BaseUrl } from 'data/api';
function Report() {
    const { chart, items } = reportsBarChartData;
    let[rows,setRows]=useState([])
    let[columns,setColumns]=useState([])

    let Token = localStorage.getItem("token");
   
    const [ReportRequest, getReportResponce] = useRequest({
      path: REPORT,
      method: "get",
      Token: `Token ${Token}`,
    });
    const [{ controls, invalid, required }, { setControl, resetControls, validate ,setInvalid}] = useControls([
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
      },{
        control: `total_products`,
        value: "",
        isRequired: false,
      },{
        control: `total_profit`,
        value: "",
        isRequired: false,
      },{
        control: `total_customers`,
        value: "",
        isRequired: false,
      },{
        control: `total_employees`,
        value: "",
        isRequired: false,
      },
    ]);
    function togetdataoftable(data){
      
        ReportRequest({
          id:data,
          params:{
            start_date:controls?.start_date,
            end_date:controls?.end_date
          },
          onSuccess:(res)=>{
          setControl(`total_${data}`,res.data.total)
            setRows(res.data.results.map((ele)=>ele))
              setColumns(res.data.results.length>0?Object.keys(res.data.results[0]).map((elem)=>(elem=="created_at"||elem=="date"?{field:elem, renderCell: (params) => (moment(params.row.created_at).format('MMMM-DD-YYYY')), headerName: elem.replace("_"," "),width:150}:elem=="main_image"?{field:elem,renderCell: (params) => <Avatar src={BaseUrl+params.row.main_image}/>, headerName: elem.replace("_"," "),width:150}:{field:elem, headerName: elem.replace("_"," "),width:150})):[])
            
          }
        })
      }
    
  return (
    <DashboardLayout >
    <DashboardNavbar />
    <Container sx={{marginY:2}}>
    {/* <ReportsBarChart title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items} /> */}
                 <Grid container spacing={2}>
                 <Grid item xs={6} sm={3} md={2.3} onClick={()=>togetdataoftable("sales")}>
                 <Chart color={"red"} chart={gradientLineChartData} title={controls.total_sales} description={"sales"}subDescription={"-0.91% this week"} />

    </Grid><Grid item xs={6} sm={3} md={2.3} onClick={()=>togetdataoftable("products")}>
                 <Chart color={"#F9C74F"} chart={gradientLineChartData} title={controls.total_products} description={"products"}subDescription={"-0.91% this week"}/>

    </Grid><Grid item xs={6} sm={3} md={2.3} onClick={()=>togetdataoftable("profit")}>
                 <Chart  color={"#F8961E"}chart={gradientLineChartData} title={controls.total_profit} description={"profile"}subDescription={"-0.91% this week"}/>

    </Grid><Grid item xs={6} sm={3} md={2.3} onClick={()=>togetdataoftable("customers")}>
                 <Chart  color={"#F3722C"}chart={gradientLineChartData} title={controls.total_customers} description={"customer"}subDescription={"-0.91% this week"}/>

    </Grid><Grid item xs={6} sm={3} md={2.3} onClick={()=>togetdataoftable("employees")}>
                 <Chart  color={"#52C41A"}chart={gradientLineChartData} title={controls.total_employees} description={"employee"}subDescription={"-0.91% this week"}/>

    </Grid>
            </Grid>
            <SoftBox sx={{display:"flex", justifyContent:"space-between", marginY:"24px"}}>
            <SoftTypography variant="h5">Sales Report</SoftTypography>
            <SoftBox sx={{display:"flex",width:"50%",borderRadius: '8px',
border: "1px solid #D9D9D9",overflow:"hidden",alignItems:"center"}}>
          
                                 <DatePickerField
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
            />                   
            </SoftBox>
            <SoftBox>
            <SelectField
          variant="outlined"
          placeholder={"Export"}
         
          // onOpen={getProducts}
          value={"Export"}
          // onChange={onChange}
          renderValue={(selected)=>{
            return "Export"
          }}
          sx={{ width: "100% !important" }}
        >
          {/* {
            products?.results?.map((product)=>(
              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
            ))
          } */}
        </SelectField>
        </SoftBox>
            </SoftBox>

            <DataGridCustom  rows={rows}  columns={columns}   checkboxSelection={true}
          onRowClick={(e,row) => {
            console.log(e,row);
            // setClick({ ...e.id });
          }}
          // notProduct={false}
          // rowsPerPageOptions={[5, 10, 15, 20]}
          // onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}/>

            </Container>
    </DashboardLayout>
  )
}

export default Report