import { Avatar, Box, Typography } from '@mui/material';
import DataGridCustom from 'components/common/DateGridCustomer';
import { CUSTOMER } from 'data/api';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import useRequest from 'hooks/useRequest';
import Tables from 'layouts/tables'
import { CustomersTableData } from 'layouts/tables/data/customerTabkeData';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

// import "../tables/datagrid.css"
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import { useLocation } from 'react-router-dom';
function Customer({ absolute, light, isMini }) {
    const { columns, rows } =CustomersTableData()
    const route = useLocation().pathname.split("/").slice(1);

    const [paginationModel, setPaginationModel] = React.useState({
      page: 0,
      pageSize: 5,
    });
    let dispatch=useDispatch()
    let Token=localStorage.getItem('token')
    const [customerRequest, getCustomerResponce] =
    useRequest({
      path: CUSTOMER,
      method: "get",
      Token: `Token ${Token}`
    });
    const [customerDeleteRequest, DeleteCustomerrResponce] =
    useRequest({
      path: CUSTOMER+"activation/",
      method: "patch",
      Token: `Token ${Token}`

    });
    function onDelete(row){
      
        customerDeleteRequest({
          id:row,
          onSuccess:()=>{
            dispatch({ type: "custom/deleteItem", payload: {id:row} })
          }
        })
      }
    // let [rows, setRows] = useState([])
  
    // const columns = [
    //     {
    //       field: 'image',
    //       headerName: 'image',
    //       type: 'image',
    //       width: 50,
    //       align: 'left',
    //       headerAlign: 'left',
    //       renderCell: (params) => <Avatar src={params.row.image} />,
    //       editable: true,
    //     }
    //     , {
    //       field: 'full_name',
    //       headerName: 'full_name',
    //       type: 'text',
    //       width: 400,
    //       align: 'left',
    //       headerAlign: 'left',
    //       editable: true,
    //       renderCell:(params)=><Box sx={{display:"flex",flexDirection:"column"}}>
    //         <Typography component={"h3"} sx={{color:"#673ab7",}}>{params.row.full_name}</Typography>
    //         <Typography component={"p"}>{params.row.email} </Typography>
    
    //       </Box>
    //     }, 
    //     //  {
    //     //   field: 'email',
    //     //   headerName: 'email',
    //     //   type: 'email',
    //     //   width: 150,
    //     //   align: 'left',
    //     //   headerAlign: 'left',
    //     //   editable: true,
    
    //     // },
    //     {
    //       field: 'phone',
    //       headerName: 'phone',
    //       type: 'text',
    //       width: 150,
    //       align: 'left',
    //       headerAlign: 'left',
    //       editable: true,
    //     },
    
      
    //   ]
    useEffect(()=>{
        customerRequest({
            onSuccess: (res) => {
              // console.log(res.data)
              dispatch({ type: "custom/set", payload:{...res.data }})
      
            }
          })
    },[])
    // useEffect(() => {
    //     setRows(customers?.results);
    //   }, [customers])
  return (
    <>
    <DashboardLayout>
    <DashboardNavbar />
    <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
            </SoftBox>
    <DataGridCustom
     rows={rows} 
      columns={columns} checkboxSelection={true}
       /* navigate(`/${shopName}/dashboard/customer/${e?.row?.id}`) */
       sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
        // onDelete={onDelete}
       rowsPerPageOptions={[5,10,15,20]}
       onState={onDelete}
       onPaginationModelChange={setPaginationModel}
      /> 
      {DeleteCustomerrResponce.failAlert}
  </DashboardLayout></>
  )
}

export default Customer

Customer.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Customer
Customer.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};