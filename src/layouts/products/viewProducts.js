import { Avatar, Box, Button, Icon, Typography } from "@mui/material";
import DataGridCustom from "components/common/DateGridCustomer";
import { CUSTOMER } from "data/api";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useRequest from "hooks/useRequest";
import Tables from "layouts/tables";
import { CustomersTableData } from "layouts/tables/data/customerTabkeData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../tables/datagrid.css";
import ProjectsTableData from "layouts/tables/data/projectsTableData";
import { ProductTableData } from "layouts/tables/data/projecttableData";
import ProductImageDialog from "components/common/product/productImageDialog";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
function Products() {
  const { columns, rows } = ProductTableData();
  const [open, setOpen] = React.useState(false);
  const navigate =useNavigate()
  const handleRouteProduct = () => navigate('/addnewproduct')
  const handleClose = () => setOpen(false);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  let dispatch = useDispatch();
  let Token = localStorage.getItem("token");
  const [customerRequest, getCustomerResponce] = useRequest({
    path: CUSTOMER,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [customerDeleteRequest, DeleteCustomerrResponce] = useRequest({
    path: CUSTOMER,
    method: "delete",
  });
  function onDelete(row) {
    console.log(row);
    customerDeleteRequest({
      id: row,
      onSuccess: () => {
        // dispatch({ type: "custom/deleteItem", payload: {id:row} })
      },
    });
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
  useEffect(() => {
    customerRequest({
      onSuccess: (res) => {
        // console.log(res.data)
        dispatch({ type: "custom/set", payload: { ...res.data } });
      },
    });
  }, []);
  // useEffect(() => {
  //     setRows(customers?.results);
  //   }, [customers])
  console.log(rows);
  // name / sku / quantity / price / status / action
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftButton variant="gradient" color="dark" onClick={handleRouteProduct}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new product
            </SoftButton>
       
        <DataGridCustom
          rows={rows}
          columns={columns}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onCopy={()=>{}}
          checkboxSelection={true}
          onRowClick={(e,row) => {
            console.log(e,row);
            setClick({ ...e.id });
          }}
          notProduct={false}
          // rowsPerPageOptions={[5, 10, 15, 20]}
          // onPaginationModelChange={setPaginationModel}
          rowHeight={100}
          getRowSpacing={4}
          sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
        />
        <ProductImageDialog open={open} onClose={handleClose} />
      </DashboardLayout>
    </>
  );
}

export default Products;
