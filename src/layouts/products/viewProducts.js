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
import { MainButton } from "styles/productStyle";
import { PrintButton } from "styles/productStyle";
function Products({ absolute, light, isMini }) {
  const { columns, rows } = ProductTableData();
  const [open, setOpen] = React.useState(false);
  const products=useSelector((state)=>state.products.value)
  const navigate =useNavigate()
  const route = useLocation().pathname.split("/").slice(1);
  const handleRouteProduct = () => navigate('/addnewproduct')
  const handleClose = () => setOpen(false);
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
  console.log(products);
  // name / sku / quantity / price / status / action
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <Box sx={{px:'24px'}}>
        <Box sx={{width:'100%',display:'flex',justifyContent:'right',flexDirection:'row',
}}>
          <PrintButton>
          <Icon >print</Icon>
                &nbsp;Print
          </PrintButton>
          <Divider orientation="vertical" sx={{width:'1px'}}/>
        <MainButton variant="gradient"  onClick={handleRouteProduct}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new product
            </MainButton>
            </Box>
            <Box sx={{p:'16px',bgcolor:'#fff',mt:'24px'}}>
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
            </Box>
        <DataGridCustom
          rows={products?.results}
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
          rowHeight={72}
          getRowSpacing={4}
          sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
        />
        </Box>
        <ProductImageDialog open={open} onClose={handleClose} />
      </DashboardLayout>
      {ResponseGetProducts.successAlert}
      {ResponseGetProducts.failAlert}
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