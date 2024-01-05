import { Avatar, Box, Typography, Container, Button, Icon } from "@mui/material";
import DataGridCustom from "components/common/DateGridCustomer";
import { CUSTOMER } from "data/api";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useRequest from "hooks/useRequest";
import Tables from "layouts/tables";
import { CustomersTableData } from "layouts/tables/data/customerTabkeData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

// import "../tables/datagrid.css"
import SoftBox from "components/SoftBox";
import Breadcrumbs from "examples/Breadcrumbs";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import { useLocation, useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
function Customer({ absolute, light, isMini }) {
  const { columns, rows } = CustomersTableData();
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 8,
  });
  let dispatch = useDispatch();
  let Token = localStorage.getItem("token");
  let sub_domain = localStorage.getItem("sub_domain");

  const [customerRequest, getCustomerResponce] = useRequest({
    path: CUSTOMER,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [customerDeleteRequest, DeleteCustomerrResponce] = useRequest({
    path: CUSTOMER,
    method: "patch",
    Token: `Token ${Token}`,
  });
  function onBlock(row, data) {
    customerDeleteRequest({
      id: row + "/activation",
      onSuccess: (res) => {
        dispatch({
          type: "custom/patchItem",
          payload: { id: row, item: { ...data, is_active: res.data.active } },
        });
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
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Container sx={{ p: 2 }}>
          <SoftBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </SoftBox>
          <SoftBox
            mb={{
              xs: 1,
              md: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            sx={{ textAlign: "right" }}
          >
            <Button
              onClick={() => window.print()}
              sx={{
                backgroundColor: "white !important",
                color: "black !important",
                marginX: "10px",
                p: 1.5,
              }}
            >
              <LocalPrintshopIcon /> Print
            </Button>
            {/* <SoftButton variant="gradient"
            sx={{backgroundColor:(theme)=>theme.palette.purple.middle,
            color:"white !important","&:hover":{
              backgroundColor:(theme)=>theme.palette.purple.middle
            }}} 
            onClick={()=>navigate(`/${sub_domain}/dashboard/addNewCustomer/`)}
            >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new customer
            </SoftButton> */}
          </SoftBox>
          <DataGridCustom
            rows={rows}
            columns={columns}
            checkboxSelection={true}
            loading={getCustomerResponce.isPending}
            /* navigate(`/${shopName}/dashboard/customer/${e?.row?.id}`) */
            sx={{
              backgroundColor: "white !important",
              " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
            }}
            // onDelete={onDelete}
            rowsPerPageOptions={[5, 10, 15, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
          {DeleteCustomerrResponce.failAlert}
        </Container>
      </DashboardLayout>
    </>
  );
}

export default Customer;

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
