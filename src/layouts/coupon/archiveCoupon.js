import React, { useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useRequest from "hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import input from "assets/theme/components/form/input";
import DataGridCustom from "components/common/DateGridCustomer";
import {
  Avatar,
  Container,
  Radio,
  Switch,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Paper,
  Box,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
  ListItemText,
  Chip,
} from "@mui/material";
import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import { COUPONS, DELETENOTCOUPONS } from "data/api";
import moment from "moment";
import Breadcrumbs from "examples/Breadcrumbs";
import SoftButton from "components/SoftButton";
import { useTranslation } from "react-i18next";
import usePermission from "utils/usePermission";

function ArchiveCoupon({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  let permissionYour = useSelector((state) => state.permissionYour.value);
  let { t } = useTranslation("common");
  let [rows, setRows] = useState([]);
  let navigate = useNavigate();
  let { isPermitted } = usePermission();

  let deleteCoupon = useSelector((state) => state.deleteCoupon.value);
  const sub_domain = localStorage.getItem("sub_domain");
  let Token = localStorage.getItem("token");
  let dispatch = useDispatch();
  const [couponRequest, couponResponce] = useRequest({
    path: DELETENOTCOUPONS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [couponpatchRequest, couponpatchResponce] = useRequest({
    path: COUPONS,
    method: "patch",
    Token: `Token ${Token}`,
  });

  const [coupondeleteRequest, coupondeleteResponce] = useRequest({
    path: DELETENOTCOUPONS,
    method: "post",
    Token: `Token ${Token}`,
  });

  useEffect(() => {
    couponRequest({
      onSuccess: (res) => {
        dispatch({ type: "deletecoupon/set", payload: res.data });
      },
    });
  }, []);

  // function updateStatus(ele,newResult){
  //     couponpatchRequest({
  //         id:ele.id,
  //         body:{status:newResult},
  //         onSuccess:(res)=>{
  //             dispatch({ type: "deletecoupon/patchItem", payload:{ id:ele.id,item:res.data} })

  //         }
  //     })
  // }

  function onDelete(row) {
    console.log(row);
    coupondeleteRequest({
      id: row + "/restore/",
      onSuccess: (res) => {
        dispatch({ type: "deletecoupon/deleteItem", payload: { id: row } });
      },
    });
  }

  const columns = [
    {
      field: "coupon_code",
      headerName: "Coupon code",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      // renderCell: renderImageCell,
      editable: false,
      filterable: false,
      disableColumnMenu: true,
      // renderEditCell:renderEditImageCell
    },
    {
      field: "coupon_end_date",
      headerName: "Expire date",
      type: "text",
      width: 300,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          variant={"p"}
          sx={{
            fontSize: "14px",
            color: (theme) => theme.palette.blue.main,
          }}
        >
          {" "}
          {moment(params.row.coupon_end_date).format("MMMM Do YYYY")}{" "}
        </Typography>
      ),

      // renderCell: renderImageCell,
      editable: false,
      filterable: false,
      disableColumnMenu: true,

      // renderEditCell:renderEditImageCell
    },
    {
      field: "coupon_start_date",
      headerName: "Start date",
      type: "text",
      width: 300,
      align: "left",
      headerAlign: "left",
      // renderCell: renderImageCell,
      editable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Typography
          variant={"p"}
          sx={{
            fontSize: "14px",
            color: (theme) => theme.palette.blue.main,
          }}
        >
          {" "}
          {moment(params.row.coupon_start_date).format("MMMM Do YYYY")}{" "}
        </Typography>
      ),

      // renderEditCell:renderEditImageCell
    },
  ];
  useEffect(() => {
    setRows(deleteCoupon?.results);
  }, [deleteCoupon]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={"Archive coupons"} route={route} light={light} />
        </SoftBox>
        {/* <SoftBox mb={{
                    xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
                    alignItems: "center"
                }} sx={{ textAlign: "right" }}>
                    {permissionYour.map((ele)=>ele.codename).includes("add_coupon")&&<SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }
                        }}
                        onClick={() => navigate(`/${sub_domain}/dashboard/addcoupons`)}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("Add New Coupon")}
                    </SoftButton>}
                
                    </SoftBox> */}
        <DataGridCustom
          rows={rows}
          columns={columns}
          loading={couponResponce.isPending}
          //   onDialog={onEdit}

          onRestore={isPermitted(onDelete, ["delete_coupon"])}
          checkboxSelection={true}
          //   onRowClick={(e,row) => {
          //     console.log(e,row);
          //     // setClick({ ...e.id });
          //   }}
          // notProduct={false}
          // rowsPerPageOptions={[5, 10, 15, 20]}
          // onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}
          sx={{
            backgroundColor: "white !important",
            " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
          }}
        />
      </Container>
    </DashboardLayout>
  );
}
export default ArchiveCoupon;
ArchiveCoupon.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the ArchiveCoupon
ArchiveCoupon.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
