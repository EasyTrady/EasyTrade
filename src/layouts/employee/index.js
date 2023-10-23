import { Avatar ,Box,Typography} from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';

import { EMPLOYEE } from 'data/api';
import useRequest from 'hooks/useRequest';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,  } from 'react-router';

import { useEffect } from 'react';
import DataGridCustom from 'components/common/DateGridCustomer';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
function Employee() {
    let { pathname } = useLocation()
    let [click, setClick] = useState({})
    // let shopName=localStorage.getItem('shop_name')
    let Token=localStorage.getItem('token')
    const columns = [
      {
        field: 'image',
        headerName: 'image',
        type: 'image',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => <Avatar src={params.row.image} />,
        editable: true,
      }
      , {
        field: 'full_name',
        headerName: 'full_name',
        type: 'text',
        width: 500,
        align: 'left',
        headerAlign: 'left',
        editable: true,
        renderCell:(params)=><Box sx={{display:"flex",flexDirection:"column"}}>
          <Typography component={"h3"} sx={{color:"#673ab7",}}>{params.row.full_name}</Typography>
          <Typography component={"p"}>{params.row.email} </Typography>
  
        </Box>
      }, 
    
      {
        field: 'phone',
        headerName: 'phone',
        type: 'text',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
  
     
    ]
   
    let [rows,setRows]=useState([])
    let employees = useSelector((state) => state.employee.value)
  
    // const navigate = useNavigate()
  
    const [employeeRequest, getemployeeResponce] =
      useRequest({
        path: EMPLOYEE,
        method: "get",
        Token: `Token ${Token}`
      });
      const [EmployeeDeleteRequest, DeleteEmployeerResponce] =
      useRequest({
        path: EMPLOYEE,
        method: "delete",
        Token: `Token ${Token}`
      });
      const [EmployeePatchRequest, PatchEmployeerResponce] =
      useRequest({
        path: EMPLOYEE,
        method: "patch",
        Token: `Token ${Token}`
      });
    let dispatch = useDispatch()
    useEffect(() => {
        employeeRequest({
        onSuccess: (res) => {
          // console.log(res.data)
          dispatch({ type: "employee/set", payload: { ...res.data } })
  
        }
      })
      console.log(pathname, click)
    }, [])
    useEffect(()=>{
     
      // console.log(Object.keys(employees?.results[0]?employees?.results[0]:))
        setRows(employees?.results);
    },[employees])
    function onDelete(row){
      console.log(row)
      EmployeeDeleteRequest({
        id:row,
        onSuccess:()=>{
          dispatch({ type: "employee/deleteItem", payload: {id:row} })
        }
      })
    }
    function onEdit(row,newRow){
      console.log(row)
      EmployeePatchRequest({
        id:row,
        body:newRow,
        onSuccess:(res)=>{
          dispatch({ type: "employee/patchItem", payload: {id:row} })
          console.log(res)
        }
      })
    }
    return (<>
    <DashboardLayout>
    <DashboardNavbar />
      
  <DataGridCustom
     rows={rows} onDelete={onDelete}
      columns={columns} checkboxSelection={true}
       onRowClick={(e) => { setClick({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
       sx={{backgroundColor:"white"}}
       onEdit={onEdit}
      /> 

      {getemployeeResponce.failAlert}
      {DeleteEmployeerResponce.failAlert}
      {PatchEmployeerResponce.failAlert}
      </DashboardLayout>
    </>
    )
}

export default Employee