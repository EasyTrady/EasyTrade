import React from 'react'

import  { useRef, useState, useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import { useLocation, useNavigate } from 'react-router-dom'
import SoftButton from "components/SoftButton";
import DataGridCustom from 'components/common/DateGridCustomer'
import moment from 'moment';

import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';
import SoftInput from "components/SoftInput";
import { useDispatch, useSelector } from 'react-redux'

import { VENDER } from "data/api"
import useRequest from 'hooks/useRequest'
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box, Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
function Vender({absolute, light, isMini}) {
  const route = useLocation().pathname.split("/").slice(1);
  let permissionYour = useSelector((state) => state.permissionYour.value)
  let venders = useSelector((state) => state.vender.value)
  let columns=[{
    field: 'id',
    headerName: 'id',
    type: 'text',
    width:200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{moment(params.row.created_at).format("YYYY/MM/DD")}</Typography>
},{
  field: 'full_name',
  headerName: 'vendor name',
  type: 'text',
  width:200,
  align: 'left',
  headerAlign: 'left',
  editable: false,
  filterable: false,
  sortable: false, disableColumnMenu: true,
  // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
},{
  field: 'email',
  headerName: 'email',
  type: 'text',
  width:200,
  align: 'left',
  headerAlign: 'left',
  editable: false,
  filterable: false,
  sortable: false, disableColumnMenu: true,
  // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
},{
    field: 'created_at',
    headerName: 'created at',
    type: 'text',
    width:200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{moment(params.row.created_at).format("YYYY/MM/DD hh:mm a")}</Typography>
},]
  let Token = localStorage.getItem('token');
  let [rows,setRows]=useState([])
  let dispatch = useDispatch()
  const [venderRequest, venderResponce] =
  useRequest({
      path: VENDER,
      method: "get",
      Token: `Token ${Token}`,

  });
  useEffect(() => {
    venderRequest({
        onSuccess: (res) => {
           
            
            dispatch({ type: "vender/set", payload: res.data })
        }
    })
}, [])
  useEffect(()=>{
    
    setRows([venders])
},[venders])
  return (
    <DashboardLayout >
    <DashboardNavbar />
    <Container maxWidth={false} sx={{ p: 4 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
        </SoftBox>
        <DataGridCustom
            rows={rows}
            loading={venderResponce.isPending}
            // onDelete={onDelete}
            // onDialog={onEdit}
            columns={columns}
            checkboxSelection={true}
            onRowClick={() =>{}}
            // sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
            // onEdit={onEdit}
            rowHeight={100}
        // slots={{
        //     noRowsOverlay: MyCustomNoRowsOverlay
        // }}

        />
    </Container>
</DashboardLayout>
  )
}

export default Vender

Vender.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Vender
Vender.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};