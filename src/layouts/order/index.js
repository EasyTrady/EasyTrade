
import React, { useRef, useState, useEffect } from 'react'
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

import { ORDERS } from "data/api"
import useRequest from 'hooks/useRequest'
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box, Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
// import { useLocation, useNavigate } from 'react-router-dom'

function Order({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem('sub_domain')
    let navigate=useNavigate()
    let orders = useSelector((state) => state.orders.value)
    let Token = localStorage.getItem('token');
    const columns=[
        {
            field: 'id',
            headerName: 'order ID',
            type: 'text',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return   <Typography component={"p"} sx={{ fontSize: "14px" ,cursor:"pointer"}} onClick={()=>navigate(`/${sub_domain}/dashboard/order/${row.id}`)}>{row.id}</Typography>
                
            },
            editable: false,
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
            renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{moment(params.row.created_at).format("YYYY/MM/DD")}</Typography>
        },{
            field: 'customer_name',
            headerName: 'Client name',
            type: 'text',
            width:200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            filterable: false,
            sortable: false, disableColumnMenu: true,
            renderCell: (params) => <Typography sx={{color:"#1B53C5",fontSize:"14px"}}>{params.row.customer.full_name}</Typography>
        },
        {
            field: 'status',
            headerName: 'Type',
            type: 'text',
            width:200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            filterable: false,
            sortable: false, disableColumnMenu: true,
            renderCell: (params) =>params.row.status==="pending"? <Typography sx={{color:(theme)=>theme.palette.blue.main,
                fontSize:"14px",borderRadius:"8px",
                backgroundColor:(theme)=>theme.palette.blue.hover,
                padding:"5px 16px 5px 16px"
            }}>{params.row.status}</Typography>:params.row.status==="canceled"? <Typography sx={{color:(theme)=>theme.palette.error.main,
                fontSize:"14px",borderRadius:"8px",
                backgroundColor:(theme)=>theme.palette.error.hover,
                padding:"5px 16px 5px 16px"
            }}>{params.row.status}</Typography>:params.row.status==="Delivered"?<Typography sx={{color:(theme)=>theme.palette.success.main,
                fontSize:"14px",borderRadius:"8px",
                backgroundColor:(theme)=>theme.palette.success.hover,
                padding:"5px 16px 5px 16px"
            }}>{params.row.status}</Typography>:params.row.status==="shipped"?<Typography sx={{color:(theme)=>theme.palette.warning.main,
                fontSize:"14px",borderRadius:"8px",
                backgroundColor:(theme)=>theme.palette.warning.focus,
                padding:"5px 16px 5px 16px"
            }}>{params.row.status}</Typography>:<></>
        },
            {
                field: 'total',
                headerName: 'Total Price',
                type: 'text',
                width:100,
                align: 'left',
                headerAlign: 'left',
                editable: false,
                filterable: false,
                sortable: false, disableColumnMenu: true,
        },{
            field: 'sub_total',
            headerName: 'sub total',
            type: 'text',
            width:100,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            filterable: false,
            sortable: false, disableColumnMenu: true,
    },{
        field: 'discount',
        headerName: 'discount',
        type: 'text',
        width:100,
        align: 'left',
        headerAlign: 'left',
        editable: false,
        filterable: false,
        sortable: false, disableColumnMenu: true,
}
    ]
    let [rows,setRows]=useState([])
    let dispatch = useDispatch()
    const [OrderRequest, getOrderResponce] =
        useRequest({
            path: ORDERS,
            method: "get",
            Token: `Token ${Token}`,

        });
        const [OrderDeleteRequest, deleteOrderResponce] =
        useRequest({
            path: ORDERS,
            method: "delete",
            Token: `Token ${Token}`,

        });
        function onDelete(row) {
            console.log(row)
            OrderDeleteRequest({
                id: row,
                onSuccess: () => {
                    dispatch({ type: "orders/deleteItem", payload: { id: row } })
                }
            })
        }
    useEffect(() => {
        OrderRequest({
            onSuccess: (res) => {
                console.log(res.data)
                
                dispatch({ type: "orders/set", payload: res.data })
            }
        })
    }, [])
    useEffect(()=>{
        setRows(orders?.results)
    },[orders])
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container maxWidth={false} sx={{ p: 4 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
                </SoftBox>
                <DataGridCustom
                    rows={rows}
                    loading={getOrderResponce.isPending}
                    // onDelete={onDelete}
                    // onDialog={onEdit}
                    columns={columns}
                    checkboxSelection={true}
                    onRowClick={(e) => navigate(`/${sub_domain}/dashboard/order/${e?.row.id}`)}
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

export default Order

Order.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Order
Order.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};