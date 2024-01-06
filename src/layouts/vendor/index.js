import React from 'react'

import { useRef, useState, useEffect } from 'react'
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
import usePermission from 'utils/usePermission';

import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';
import SoftInput from "components/SoftInput";
import { useDispatch, useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next';
import { VENDER } from "data/api"
import useRequest from 'hooks/useRequest'
import {
  Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
  ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
  Typography, Box, Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabel, CircularProgress
} from '@mui/material'
function Vender({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  let permissionYour = useSelector((state) => state.permissionYour.value)
  let { t } = useTranslation("common")
  const navigate = useNavigate()
  let {isPermitted}=usePermission()
  const [isLoading, setIsLoading] = useState(false);
  const handleAddNewVendor = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/${sub_domain}/dashboard/venders/addNewVendor`);
      localStorage.removeItem("productId");
    }, 1000);
  };
  let venders = useSelector((state) => state.vender.value)
  let columns = [{
    field: 'id',
    headerName: 'id',
    type: 'text',
    width: 100,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{moment(params.row.created_at).format("YYYY/MM/DD")}</Typography>
  }, {
    field: 'full_name',
    headerName: 'vendor name',
    type: 'text',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
  }, {
    field: 'email',
    headerName: 'email',
    type: 'text',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
  }, {
    field: 'percentage_amount',
    headerName: 'percentage amount',
    type: 'text',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
  }, {
    field: "brand_name",
    headerName: "brand name",
    type: 'text',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    // renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
  }, {
    field: 'created_at',
    headerName: 'created at',
    type: 'text',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    filterable: false,
    sortable: false, disableColumnMenu: true,
    renderCell: (params) => <Typography sx={{ color: "#1B53C5", fontSize: "14px" }}>{moment(params.row.created_at).format("YYYY/MM/DD hh:mm a")}</Typography>
  },]
  let Token = localStorage.getItem('token');
  let [rows, setRows] = useState([])
  // const route = useLocation().pathname.split("/").slice(1);

  let dispatch = useDispatch()
const sub_domain = localStorage.getItem('sub_domain')

  const [venderRequest, venderResponce] =
    useRequest({
      path: VENDER,
      method: "get",
      Token: `Token ${Token}`,

    });
    const [venderDeleteRequest, venderDeleteResponce] =
    useRequest({
      path: VENDER,
      method: "delete",
      Token: `Token ${Token}`,

    });
    function onEdit(row,newRow){
      navigate(`/${sub_domain}/dashboard/venders/addNewVendor`,{state:{id:row,dataRow:newRow}})
  } function onDelete(row){
    venderDeleteRequest({
      id:row,
      onSuccess:(res)=>{
        dispatch({ type: "vender/deleteItem", payload: {id:row} })

      }
    })
    console.log(row)
}
  useEffect(() => {
    venderRequest({
      onSuccess: (res) => {


        dispatch({ type: "vender/set", payload: res.data })
      }
    })
  }, [])
  useEffect(() => {

    setRows(venders?.results)
  }, [venders])
  return (
    <DashboardLayout >
      <DashboardNavbar />
      <Container maxWidth={false} sx={{ p: 4 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox mb={{
          xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
          alignItems: "center"
        }} sx={{ textAlign: "right" }}>
          {permissionYour.map((ele) => ele.codename).includes("add_vendor") && <SoftButton variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important", "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle
              }
            }}
            onClick={handleAddNewVendor}
          >
            {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  جاري التحميل...
                </>
              ) : (
                <>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;{t("add new vendor")}
                </>
              )}
            
          </SoftButton>}
        </SoftBox>
        <DataGridCustom
          rows={rows}
          loading={venderResponce.isPending}
          onDelete={isPermitted(onDelete,["delete_vendor"])}
          onDialog={isPermitted(onEdit,["change_vendor"])}
          columns={columns}
          checkboxSelection={true}
          onRowClick={() => { }}
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