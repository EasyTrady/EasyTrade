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
import "../tables/datagrid.css"
function Customer() {
    const { columns, rows } =CustomersTableData()
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
      path: CUSTOMER,
      method: "delete",
    });
    function onDelete(row){
      
        customerDeleteRequest({
          id:row,
          onSuccess:()=>{
            // dispatch({ type: "custom/deleteItem", payload: {id:row} })
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
    
    <DataGridCustom
     rows={rows} 
      columns={columns} checkboxSelection={true}
       onRowClick={(e) => { setClick({ ...e?.row });/* navigate(`/${shopName}/dashboard/customer/${e?.row?.id}`) */}}
       sx={{backgroundColor:"white"}}
       rowsPerPageOptions={[5,10,15,20]}
       onState={()=>{}}
       onPaginationModelChange={setPaginationModel}
      /> 
  </DashboardLayout></>
  )
}

export default Customer