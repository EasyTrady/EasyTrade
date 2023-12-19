import React, { useRef } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import useRequest from 'hooks/useRequest'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import input from "assets/theme/components/form/input";
import DataGridCustom from 'components/common/DateGridCustomer';
import { Avatar, Container, Radio, FormControlLabel, RadioGroup, FormLabel, Paper, Box, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography, Autocomplete, ListItemText, Chip } from '@mui/material';
import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import { COUPONS } from 'data/api';
import moment from 'moment';
import Breadcrumbs from 'examples/Breadcrumbs'

function Coupon({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  let [rows, setRows] = useState([])
 let coupons= useSelector((state)=>state.coupon.value)
  let Token = localStorage.getItem('token')
  let dispatch=useDispatch()
  const [couponRequest, couponResponce] =
    useRequest({
      path: COUPONS,
      method: "get",
      Token: `Token ${Token}`
    });
  useEffect(() => {
    couponRequest({
        onSuccess:(res)=>{
            dispatch({type:"coupon/set",payload:res.data})  
            console.log(res.data)
        }
    })
    
  }, [])
  const columns = [
    {
      field: 'coupon_code',
      headerName: 'Coupon code',
      type: 'text',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      // renderCell: renderImageCell,
      editable: false,
      filterable: false,
      disableColumnMenu: true
      // renderEditCell:renderEditImageCell
    },
    {
        field: 'coupon_end_date',
        headerName: 'Expire date',
        type: 'text',
        width: 200,
        align: 'left',
        headerAlign: 'left',
    renderCell: (params) => <Typography variant={"p"}
    sx={{
        fontSize: "14px"
    }}
> {moment(params.row.coupon_end_date).format('MMMM Do YYYY')} </Typography>,

        // renderCell: renderImageCell,
        editable: false,
        filterable: false,
        disableColumnMenu: true,

        // renderEditCell:renderEditImageCell
      },{
        field: 'coupon_start_date',
        headerName: 'Start date',
        type: 'text',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        // renderCell: renderImageCell,
        editable: false,
        filterable: false,
        disableColumnMenu: true,
    renderCell: (params) => <Typography variant={"p"}
    sx={{
        fontSize: "14px"
    }}
> {moment(params.row.coupon_start_date).format('MMMM Do YYYY')} </Typography>

        // renderEditCell:renderEditImageCell
      },
    ]
  useEffect(()=>{
    setRows(coupons?.results)
  },[coupons])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
      <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <DataGridCustom
          rows={rows}
          columns={columns}
          loading={couponResponce.isPending}

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
        </DashboardLayout>
  )
}
export default Coupon
Coupon.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
  };
  
  // Typechecking props for the Coupon
  Coupon.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
  };