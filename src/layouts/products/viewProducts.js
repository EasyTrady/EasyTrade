import { Avatar, Box, Button, Chip, Divider, Icon, Stack, TextField, Typography } from "@mui/material";
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
import Footer from "examples/Footer";

import ProjectsTableData from "layouts/tables/data/projectsTableData";
import { ProductTableData } from "layouts/tables/data/projecttableData";
import ProductImageDialog from "components/common/product/productImageDialog";
import SoftButton from "components/SoftButton";
import { useLocation, useNavigate } from "react-router-dom";
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import { PRODUCTS } from "data/api";
import usePermission from 'utils/usePermission';

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { MainButton } from "styles/productStyle";
import { PrintButton } from "styles/productStyle";
function Products({ absolute, light, isMini }) {
  const { columns, rows } = ProductTableData();
  let permissionYour = useSelector((state) => state.permissionYour.value)

  const [open, setOpen] = React.useState(false);
  const products=useSelector((state)=>state.products.value)
  const navigate =useNavigate()
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem('sub_domain')
  const handleClose = () => setOpen(false);
  let {isPermitted}=usePermission()

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  let dispatch = useDispatch();
  let Token = localStorage.getItem("token");
  const [RequestGetProducts, ResponseGetProducts] = useRequest({
    path: PRODUCTS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [RequestDeleteProducts, ResponseDeleteProducts] = useRequest({
    path: PRODUCTS,
    method: "delete",
    Token: `Token ${Token}`,
  });
  const [customerDeleteRequest, DeleteCustomerrResponce] = useRequest({
    path: CUSTOMER,
    method: "delete",
  });
  function onDelete(row) {

    RequestDeleteProducts({
      id: row,
      onSuccess: () => {
        dispatch({ type: "products/deleteItem", payload: {id:row} })
      },
    });
  }
  function onEdit(row,newRow) {
   
    localStorage.setItem('productId', row);

    navigate(`/${sub_domain}/dashboard/products/addnewproduct`,{state:{id:row}})
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
    RequestGetProducts({
      onSuccess: (res) => {
        // console.log(res.data)
        dispatch({ type: "products/set", payload: { ...res.data } });
      },
    });
  }, []);
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
        <Box sx={{px:'24px'}}>
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
                   {permissionYour.map((ele)=>ele.codename).includes("add_product")&& <SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }, padding: "7px 16px 7px 16px"
                        }}
                        onClick={() => {navigate(`/${sub_domain}/dashboard/products/addnewproduct`); localStorage.removeItem('productId');}}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Add new product
                    </SoftButton>} 
                   
                </SoftBox>
            {/* <Box sx={{p:'16px',bgcolor:'#fff',mt:'24px'}}>
              <TextField sx={{height:'41px',borderRadius:'4px',width:'100%'}} placeholder="Search product name,SKU..."/>
              <Stack direction="row" spacing={1} mt={1}>
      <Chip
        label="Price between : 100 up to 200"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="out of stock"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </Stack>
            </Box> */}
        <DataGridCustom
          rows={products?.results}
          columns={columns}
          loading={ResponseGetProducts.isPending}

          onDialog={isPermitted(onEdit,["change_product"])}

          onDelete={isPermitted(onDelete,["delete_product"])}

          checkboxSelection={true}
          onRowClick={(e,row) => {
           
            // setClick({ ...e.id });
          }}
          // notProduct={false}
          
          // onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}
          sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
        />
        </Box>
        <ProductImageDialog open={open} onClose={handleClose} />
        <Footer />
      </DashboardLayout>
      {ResponseGetProducts.successAlert}
      {ResponseGetProducts.failAlert}
      {ResponseDeleteProducts.failAlert}
    </>
  );
}

export default Products;
Products.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Products
Products.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};