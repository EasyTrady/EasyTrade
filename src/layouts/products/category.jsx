// import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import usePermission from 'utils/usePermission';

// import SoftBox from 'components/SoftBox'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SoftButton from 'components/SoftButton'
import { useTranslation } from 'react-i18next';
import {CATEGORY} from "data/api"
import useRequest from 'hooks/useRequest'
import DataGridCustom from 'components/common/DateGridCustomer'

import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, Container, Divider
} from '@mui/material'
function Category({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let permissionYour = useSelector((state) => state.permissionYour.value)

  const sub_domain = localStorage.getItem('sub_domain')
  let {isPermitted}=usePermission()
   let navigate= useNavigate()
    let categories = useSelector((state) => state.category.value)
   let dispatch= useDispatch()
    let [rows, setRows] = useState([])
    let { t } = useTranslation("common")
    let Token = localStorage.getItem('token')
    const [columns, setColumns] = React.useState([
        {
            field: 'Category',
            headerName: 'Category',
            type: 'text',
            width: 300,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"row"} alignItems={"center"}>
                    <SoftBox sx={{width:"64px",height:"64px",borderRadius:"8px"}}><img src={row.image} style={{width:"100%",borderRadius:"8px"}}/></SoftBox>
                    <Typography component={"p"} sx={{ fontSize: "14px",marginX:"10px" }}>{row.name}</Typography>
                    {/* <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography> */}
                </Stack>
                );
            },
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'type',
            headerName: 'type',
            type: 'text',
            width: 300,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"row"} >
                   
                    {row.is_root_node?<Typography component={"p"} sx={{ fontSize: "14px",borderRadius:"130px",marginX:"10px",padding:"5px 16px 5px 16px" ,backgroundColor:(theme)=>theme.palette.purple.hover,color:(theme)=>theme.palette.purple.middle}}>parent</Typography>:
                    <Typography component={"p"} sx={{ fontSize: "14px",borderRadius:"130px",marginX:"10px",padding:"5px 16px 5px 16px" ,backgroundColor:(theme)=>theme.palette.blue.hover,color:(theme)=>theme.palette.blue.main}}>Sub-category</Typography>}
                   
                </Stack>
                );
            },
            editable: false,
            // renderEditCell:renderEditImageCell
        },{
            field: 'parent',
            headerName: 'parent',
            type: 'text',
            width: 300,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"row"} >
                   
                    {!row.is_root_node&&<Stack direction={"row"} alignItems={"center"}>
                    <SoftBox sx={{width:"64px",height:"64px",borderRadius:"8px"}}><img src={row.parent.image} style={{width:"100%",borderRadius:"8px"}}/></SoftBox>
                    <Typography component={"p"} sx={{ fontSize: "14px",marginX:"10px" }}>{row.parent.name}</Typography>
                    {/* <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography> */}
                </Stack>}
                   
                </Stack>
                );
            },
            editable: false,
            // renderEditCell:renderEditImageCell
        }


    ])
    const [categoryRequest, getcategoryResponce] =
        useRequest({
            path: CATEGORY,
            method: "get",
            Token: `Token ${Token}`
        });
        const [categorydeleteRequest, deletecategoryResponce] =
        useRequest({
            path: CATEGORY,
            method: "delete",
            Token: `Token ${Token}`
        });
        function onDelete(row) {
            categorydeleteRequest({
                id: row,
                onSuccess: () => {
                    dispatch({ type: "category/deleteItem", payload: { id: row } })
                }
            })
        }
        function onEdit(row, newRow) {
            navigate(`/${sub_domain}/dashboard/products/category/addnewCategory`,{state:{id:row,dataRow:newRow}})
            
        }
        useEffect(() => {
            categoryRequest({
                onSuccess: (res) => {
                    dispatch({ type: "category/set", payload: res.data })
                   
    
                }
            })
        }, [])
        useEffect(()=>{
            
            setRows(categories)
        },[categories])
  return (
    <DashboardLayout >
    <DashboardNavbar />
    <Container sx={{ p: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
                </SoftBox>
                <SoftBox mb={{
                    xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
                    alignItems: "center"
                }} sx={{ textAlign: "right" }}>
                    <Button onClick={() => window.print()}
                        sx={{
                            backgroundColor: "white !important",
                            color: "black !important", marginX: "10px", padding: "13px 16px"
                        }}>
                        <LocalPrintshopIcon />
                        Print
                    </Button>
                    <Divider orientation="vertical" sx={{ width: '1px', height: "72px" }} />
                        {permissionYour.map((ele)=>ele.codename).includes("add_shopcategory")&&<SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }, padding: "7px 16px 7px 16px"
                        }}
                        onClick={() => navigate(`/${sub_domain}/dashboard/products/category/addnewCategory`)}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("addnewcategory")}
                    </SoftButton>}
                    
                </SoftBox>
                <DataGridCustom
                    rows={rows}
                    onDelete={isPermitted(onDelete,["delete_shopcategory"])}
                    onDialog={isPermitted(onEdit,["change_shopcategory"])}
                    columns={columns}
                    checkboxSelection={true}
                    loading={getcategoryResponce.isPending}
                    // onRowClick={(e) => { console.log({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
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

export default Category
Category.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Category
Category.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};