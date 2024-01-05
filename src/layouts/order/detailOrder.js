import React, { useRef, useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import Breadcrumbs from "examples/Breadcrumbs";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import PropTypes from "prop-types";
import moment from "moment";
import SoftInput from "components/SoftInput";
import Accordion from "@mui/material/Accordion";
import SoftButton from "components/SoftButton";
import CircularProgress from "@mui/material/CircularProgress";
import useControls from "hooks/useControls";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useRequest from "hooks/useRequest";
import { ORDERS, CUSTOMER, ORDERSTATE } from "data/api";
import EditIcon from "examples/Icons/EditIcon";
import compare from "utils/compare";
import SelectField from "components/common/SelectField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Collapse,
  Dialog,
  Icon,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  Container,
  Divider,
  Avatar,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  CardHeader,
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import PhoneField from "components/common/PhoneField";
function DetailOrder({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  let dispatch = useDispatch();
  let Token = localStorage.getItem("token");
  let [edit, setEdit] = useState(false);
  let { t } = useTranslation("common");
  let { id } = useParams();
  const MenuProps = {
    PaperProps: {
      sx: {
        maxHeight: "200px",
        overflowY: "auto",
        backgroundColor: "white !important",
      },
    },
  };
  const createMarkup = (word) => {
    return { __html: word };
  };
  let orders = useSelector((state) => state.orders.value);
  let [order, setOrder] = useState({});
  let [status, setstatus] = useState([]);
  let [activity, setActivity] = useState([]);

  let [Customer, setCustomer] = useState(null);
  const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
    useControls([
      {
        control: "status",
        value: "",
        isRequired: false,
      },
      {
        control: "name",
        value: "",
        isRequired: false,
      },
      {
        control: "address",
        value: "",
        isRequired: false,
      },
      {
        control: "country",
        value: "",
        isRequired: false,
      },
      {
        control: "governorate",
        value: "",
        isRequired: false,
      },
      {
        control: "city",
        value: "",
        isRequired: false,
      },
      {
        control: "phone",
        value: "",
        isRequired: false,
      },
      {
        control: "code",
        value: "+20",
        isRequired: false,
      },
    ]);
  const [OrderByIdRequest, getOrderByIdResponce] = useRequest({
    path: ORDERS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [customerByIdRequest, getcustomerByIdResponce] = useRequest({
    path: CUSTOMER,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [updataOrderRequest, patchOrderResponce] = useRequest({
    path: ORDERS,
    method: "patch",
    Token: `Token ${Token}`,
  });
  const [statusOrderRequest, stateOrderResponce] = useRequest({
    path: ORDERSTATE,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [activiteOrderRequest, activiteOrderResponce] = useRequest({
    path: ORDERS,
    method: "get",
    Token: `Token ${Token}`,
  });

  const [updataOrderstatusRequest, patchOrderstatusResponce] = useRequest({
    path: ORDERS,
    method: "patch",
    Token: `Token ${Token}`,
  });
  useEffect(() => {
    if (Boolean(orders.results.find((ele) => ele.id == id))) {
      setOrder(orders.results.find((ele) => ele.id == id));
    } else {
      OrderByIdRequest({
        id: id,
        onSuccess: (res) => {
          setOrder(res.data);
        },
      });
    }
  }, [orders]);
  useEffect(() => {
    if (!Boolean(Customer)) {
      customerByIdRequest({
        id: order.customer,
        onSuccess: (res) => {
          setCustomer(res.data);
        },
      });
    }
  }, [order.customer]);
  useEffect(() => {
    if (controls.status) {
      updataOrderstatusRequest({
        id: order.id,
        body: { status: controls.status.id },
        onSuccess: (res) => {
          dispatch({ type: "orders/patchItem", payload: { id: order.id, item: res.data } });
        },
      });
    }
  }, [controls.status]);
  useEffect(() => {
    if (Boolean(order?.shipping_address)) {
      Object.entries(order?.shipping_address).map(([key, value]) => setControl(key, value));
    }
  }, [order.shipping_address]);
  function handleSubmit() {
    let result = compare([
      [controls?.name, order?.shipping_address?.name, "name"],
      [controls?.address, order?.shipping_address?.address, "address"],
      [controls?.country, order?.shipping_address?.country, "country"],
      [controls?.city, order?.shipping_address?.city, "city"],
      [controls?.governorate, order?.shipping_address?.governorate, "governorate"],
      [controls?.phone, order?.shipping_address?.phone, "phone"],
    ]);
    if (result.nochange) {
      updataOrderRequest({
        id: order.id + "/updateaddress/" + order.shipping_address.id,
        body: result.array,
        onSuccess: (res) => {},
      });
    }
  }
  useEffect(() => {}, [controls.status]);
  useEffect(() => {
    if (status.length == 0) {
      statusOrderRequest({
        onSuccess: (res) => {
          setstatus(res.data.map((ele) => ele));
        },
      });
    }
    if (order.id && status.length > 0) {
      activiteOrderRequest({
        id: order.id + "/activity",
        onSuccess: (res) => {
          setActivity(res.data);
        },
      });
    }
  }, [order.id, status]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth={false} sx={{ p: 4 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
        </SoftBox>
        <Stack
          direction={"row"}
          sx={{ gap: "24px", flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" } }}
        >
          <SoftBox
            sx={{
              width: { lg: "70%", md: "70%", sm: "100%", xs: "100%" },
              backgroundColor: (theme) => theme.palette.white.main,
              borderRadius: "8px",
            }}
          >
            <SoftBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 24px 12px 24px",
                borderBottom: "1px solid gray",
                borderColor: (theme) => theme.palette.grey[500],
              }}
            >
              <SoftBox>
                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                  {t("OrderId")}
                  <Typography component={"span"} sx={{ padding: "20px", fontSize: "16px" }}>
                    {id}
                  </Typography>
                </Typography>
                <Typography sx={{ color: (theme) => theme.palette.grey[500], fontSize: "14px" }}>
                  {moment(order?.created_at).format("YYYY/MM/DD")}
                </Typography>
              </SoftBox>
              <SoftBox>
                {order?.status_name === "In Progress" ? (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.blue.main,
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: (theme) => theme.palette.blue.hover,
                      padding: "5px 16px 5px 16px",
                    }}
                  >
                    {order?.status_name}
                  </Typography>
                ) : order?.status_name === "Cancelled" ? (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.error.main,
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: (theme) => theme.palette.error.hover,
                      padding: "5px 16px 5px 16px",
                    }}
                  >
                    {order?.status_name}
                  </Typography>
                ) : order?.status_name === "Delivered" ? (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.success.main,
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: (theme) => theme.palette.success.hover,
                      padding: "5px 16px 5px 16px",
                    }}
                  >
                    {order?.status_name}
                  </Typography>
                ) : order?.status_name === "Shipped" ? (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.warning.main,
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: (theme) => theme.palette.warning.focus,
                      padding: "5px 16px 5px 16px",
                    }}
                  >
                    {order?.status_name}
                  </Typography>
                ) : order?.status_name === "In Packaging" ? (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.babyblue.main,
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: (theme) => theme.palette.babyblue.hover,
                      padding: "5px 16px 5px 16px",
                    }}
                  >
                    {order?.status_name}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.orange.main,
                      fontSize: "14px",
                      borderRadius: "8px",
                      backgroundColor: (theme) => theme.palette.orange.hover,
                      padding: "5px 16px 5px 16px",
                    }}
                  >
                    {order?.status_name}
                  </Typography>
                )}
              </SoftBox>
            </SoftBox>
            <SoftBox
              sx={{
                padding: "12px 24px 12px 24px",
                borderBottom: "1px solid gray",
                borderColor: (theme) => theme.palette.grey[500],
              }}
            >
              <Typography sx={{ color: (theme) => theme.palette.grey[500], fontSize: "14px" }}>
                {t("Products")}
              </Typography>
              {order?.products?.map((ele) => (
                <SoftBox
                  sx={{ display: "flex", justifyContent: "space-between", marginY: "10px" }}
                  key={ele?.id}
                >
                  <SoftBox sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      variant={"img"}
                      component={"img"}
                      src={ele?.main_image}
                      sx={{
                        width: "78px",
                        height: "78px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography sx={{ marginX: "10px" }}>
                      <div
                        dangerouslySetInnerHTML={createMarkup(ele?.description)}
                        style={{ fontSize: "14px" }}
                      />
                    </Typography>
                  </SoftBox>
                  <SoftBox>
                    <Typography variant={"h6"} component={"h6"}>
                      {ele?.price}EGP
                    </Typography>
                  </SoftBox>
                </SoftBox>
              ))}
            </SoftBox>
            <SoftBox
              sx={{
                padding: "12px 24px 12px 24px",
                borderBottom: "1px solid gray",
                borderColor: (theme) => theme.palette.grey[500],
              }}
            >
              <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant={"h6"}
                  component={"h6"}
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  {t("Subtotal")}
                </Typography>
                <Typography variant={"h6"} component={"h6"}>
                  {order?.sub_total}
                </Typography>
              </SoftBox>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant={"h6"}
                  component={"h6"}
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  {t("discount")}
                </Typography>
                <Typography variant={"h6"} component={"h6"}>
                  {order?.discount}
                </Typography>
              </SoftBox>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant={"h6"}
                  component={"h6"}
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  {t("Shoppingcost")}
                </Typography>
                <Typography variant={"h6"} component={"h6"}>
                  {order?.shipping_cost}
                </Typography>
              </SoftBox>
            </SoftBox>
            <SoftBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 24px 12px 24px",
              }}
            >
              <Typography variant={"h6"} component={"h6"}>
                {t("total")}
              </Typography>
              <Typography variant={"h6"} component={"h6"}>
                {order?.total}
              </Typography>
            </SoftBox>
          </SoftBox>

          <SoftBox
            sx={{
              width: { lg: "25%", md: "25%", sm: "100%", xs: "100%" },
              height: "100%",
              backgroundColor: (theme) => theme.palette.white.main,
              borderRadius: "8px",
            }}
          >
            <SoftBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 24px 12px 24px",
                borderBottom: "1px solid gray",
                borderColor: (theme) => theme.palette.grey[500],
                fontSize: "16px",
              }}
            >
              {t("Activity")}
            </SoftBox>
            <Container sx={{ padding: "24px" }}>
              <Stack
                alignItems="center"
                justifyContent="flex-start"
                sx={{ alignItems: "flex-start" }}
              >
                {activity.map((ele, index) =>
                  index % 2 == 0 ? (
                    <SoftBox
                      key={index}
                      sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
                    >
                      <SoftBox
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#F09343",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></Typography>
                        <Typography
                          sx={{
                            height: index != activity.length - 1 ? "55px" : "0px",
                            width: "1px",
                            backgroundColor: "#000000",
                            marginTop: "3px",
                          }}
                        ></Typography>
                      </SoftBox>
                      <SoftBox sx={{ marginX: "10px" }}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: "16px" }}>{ele.status}</Typography>
                          <Typography
                            component={"span"}
                            sx={{ color: "#757575", fontSize: "14px", marginX: "10px" }}
                          >
                            {moment(ele?.history_date).format("YYYY/MM/DD")}
                          </Typography>
                        </SoftBox>
                        <Typography sx={{ fontSize: "16px", color: "#757575" }}>
                          {ele.user}
                        </Typography>
                      </SoftBox>
                    </SoftBox>
                  ) : (
                    <SoftBox
                      key={index}
                      sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
                    >
                      <SoftBox
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#F2BD00",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></Typography>
                        <Typography
                          sx={{
                            height: index != activity.length - 1 ? "55px" : "0px",
                            width: "1px",
                            backgroundColor: "#000000",
                            marginTop: "3px",
                          }}
                        ></Typography>
                      </SoftBox>
                      <SoftBox sx={{ marginX: "10px" }}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: "16px" }}>{ele.status}</Typography>
                          <Typography sx={{ color: "#757575", fontSize: "14px", marginX: "10px" }}>
                            {moment(ele?.date).format("YYYY/MM/DD")}
                          </Typography>
                        </SoftBox>
                        <Typography sx={{ fontSize: "16px", color: "#757575" }}>
                          {ele.user}
                        </Typography>
                      </SoftBox>
                    </SoftBox>
                  )
                )}
                {/*                                 
                                <SoftBox sx={{display: "flex",
    flexDirection: "column",
    alignItems: "center"}}>
                                  
                                    <Typography sx={{backgroundColor:"#F2BD00",width:"10px",height:"10px",borderRadius:"50%",}}></Typography>
                                    <Typography sx={{height: "55px",
        width: "1px",
        backgroundColor: "#000000",marginTop:"3px"}}></Typography>
                                </SoftBox>
                                <SoftBox sx={{display: "flex",
    flexDirection: "column",
    alignItems: "center"}}>
                                   
                                    <Typography sx={{backgroundColor:"#F09343",width:"10px",height:"10px",borderRadius:"50%",}}></Typography></SoftBox> */}
                <SoftBox></SoftBox>
              </Stack>
            </Container>
          </SoftBox>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            gap: "24px",
            mt: 4,
            flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
            alignItems: "center",
          }}
        >
          <Stack
            direction={"column"}
            sx={{ width: { lg: "70%", md: "70%", sm: "100%", xs: "100%" } }}
          >
            <Accordion
              sx={{
                marginY: "24px",
                width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
                boxShadow: "unset",
                borderRadius: "8px",
                alignSelf: "flex-start",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontSize: "18px" }}>{t("Customerdetails")}</Typography>
                {/* <EditIcon onClick={()=>setEdit(true)}/> */}
              </AccordionSummary>
              <AccordionDetails>
                {/* {edit?} */}
                <Table sx={{ display: "flex", overflow: "auto" }}>
                  <TableBody>
                    <TableRow sx={{ border: "unset" }}>
                      <TableCell
                        sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                      >
                        {t("Name")}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "unset" }}>
                        {order?.customer?.full_name}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ border: "unset" }}>
                      <TableCell
                        sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                      >
                        {t("Address")}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "unset" }}>
                        {order?.customer?.country}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow sx={{ border: "unset" }}>
                      <TableCell
                        sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                      >
                        {t("Email")}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "unset" }}>{order?.customer?.email}</TableCell>
                    </TableRow>
                    <TableRow sx={{ border: "unset" }}>
                      <TableCell
                        sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                      >
                        {t("Phone")}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "unset" }}>{order?.customer?.phone}</TableCell>
                    </TableRow>
                    <TableRow sx={{ border: "unset" }}>
                      <TableCell
                        sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                      >
                        {t("PaymentMethod")}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "unset" }}>{order?.payment_method}</TableCell>
                    </TableRow>

                    <TableRow sx={{ border: "unset" }}>
                      <TableCell
                        sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                      >
                        {t("status")}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "unset" }}>{order?.status}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                marginY: "24px",
                width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
                boxShadow: "unset",
                borderRadius: "8px",
                alignSelf: "flex-start",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontSize: "18px" }}>{t("Shippingdetails")}</Typography>
                <EditIcon onClick={() => setEdit(!edit)} />
              </AccordionSummary>
              <AccordionDetails>
                {edit ? (
                  <Table
                    sx={{
                      display: "flex",
                      overflow: "auto",
                      justifyContent: "space-between",
                      flexDirection: { lg: "row", md: "column", sm: "column", xs: "column" },
                    }}
                  >
                    <TableBody sx={{ width: { lg: "50%", md: "100%", sm: "100%", xs: "100%" } }}>
                      <TableRow sx={{ border: "unset", fontSize: "15px", display: "block", my: 1 }}>
                        {t("Name")}
                      </TableRow>
                      <SoftInput
                        placeholder={order?.shipping_address?.name}
                        value={controls.name}
                        // onChange={(e) => setControl("name", e.target.value)}
                        onChange={(e) => setControl("name", e.target.value)}
                        required={required.includes("name")}
                        error={Boolean(invalid?.name)}
                        helperText={invalid?.name}
                      />

                      <TableRow
                        sx={{ borderBottom: "unset", fontSize: "15px", display: "block", my: 1 }}
                      >
                        {t("Address")}
                      </TableRow>
                      <SoftInput
                        placeholder={order?.shipping_address?.address}
                        value={controls.address}
                        // onChange={(e) => setControl("address", e.target.value)}
                        onChange={(e) => setControl("address", e.target.value)}
                        required={required.includes("address")}
                        error={Boolean(invalid?.address)}
                        helperText={invalid?.address}
                      />
                      <TableCell sx={{ borderBottom: "unset" }}></TableCell>

                      <TableRow
                        sx={{ borderBottom: "unset", fontSize: "15px", display: "block", my: 1 }}
                      >
                        {t("country")}
                      </TableRow>
                      <SoftInput
                        placeholder={order?.shipping_address?.country}
                        value={controls.country}
                        // onChange={(e) => setControl("country", e.target.value)}
                        onChange={(e) => setControl("country", e.target.value)}
                        required={required.includes("country")}
                        error={Boolean(invalid?.country)}
                        helperText={invalid?.country}
                      />

                      <TableRow
                        sx={{ borderBottom: "unset", fontSize: "15px", display: "block", my: 1 }}
                      >
                        {t("governorate")}
                      </TableRow>
                      <SoftInput
                        placeholder={order?.shipping_address?.governorate}
                        value={controls.governorate}
                        // onChange={(e) => setControl("governorate", e.target.value)}
                        onChange={(e) => setControl("governorate", e.target.value)}
                        required={required.includes("governorate")}
                        error={Boolean(invalid?.governorate)}
                        helperText={invalid?.governorate}
                      />

                      <TableRow
                        sx={{ borderBottom: "unset", fontSize: "15px", display: "block", my: 1 }}
                      >
                        {t("city")}
                      </TableRow>
                      <SoftInput
                        placeholder={order?.shipping_address?.city}
                        value={controls.city}
                        // onChange={(e) => setControl("city", e.target.value)}
                        onChange={(e) => setControl("city", e.target.value)}
                        required={required.includes("city")}
                        error={Boolean(invalid?.city)}
                        helperText={invalid?.city}
                      />
                    </TableBody>
                    <TableBody sx={{ width: { lg: "45%", md: "100%", sm: "100%", xs: "100%" } }}>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("postal_code")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.postal_code}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ borderBottom: "unset", fontSize: "15px", display: "block", my: 1 }}
                      >
                        {t("Phone")}
                      </TableRow>
                      <PhoneField
                        selectProps={{
                          value: controls.code,
                          onChange: (e) => {
                            setControl("code", e.target.value);
                          },
                        }}
                        requiredCode
                        required={required.includes("phone")}
                        value={controls.phone}
                        onChange={(e) => setControl("phone", e.target.value)}
                        error={Boolean(invalid.phone)}
                        helperText={invalid.phone}
                        sx={{ width: "100%" }}
                      />

                      {/* <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("Phone")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}}>{order?.shipping_address?.phone}</TableCell>
                                </TableRow> */}
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("PaymentMethod")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.payment_method}
                        </TableCell>
                      </TableRow>

                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("status")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>{order?.status}</TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("additional_information")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.additional_information}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <Table
                    sx={{ display: "flex", overflow: "auto", justifyContent: "space-between" }}
                  >
                    <TableBody>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("Name")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.name}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("Address")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.address}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("country")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.country}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("governorate")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.governorate}
                        </TableCell>
                      </TableRow>

                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("city")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.city}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("postal_code")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.postal_code}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("Phone")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.phone}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("PaymentMethod")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.payment_method}
                        </TableCell>
                      </TableRow>

                      <TableRow sx={{ border: "unset" }}>
                        <TableCell
                          sx={{ color: (theme) => theme.palette.grey[500], borderBottom: "unset" }}
                        >
                          {t("status")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>{order?.status}</TableCell>
                      </TableRow>
                      <TableRow sx={{ border: "unset" }}>
                        <TableCell sx={{ color: (theme) => theme.palette.grey[500] }}>
                          {t("additional_information")}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "unset" }}>
                          {order?.shipping_address?.additional_information}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </AccordionDetails>
            </Accordion>
          </Stack>
          <SoftBox
            sx={{
              width: { lg: "25%", md: "25%", sm: "100%", xs: "100%" },
              backgroundColor: (theme) => theme.palette.white.main,
              borderRadius: "8px",
              alignSelf: "flex-start",
            }}
          >
            <SoftBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 24px 12px 24px",
                borderBottom: "1px solid gray",
                borderColor: (theme) => theme.palette.grey[500],
                fontSize: "16px",
              }}
            >
              {t("status")}
            </SoftBox>

            <Container sx={{ m: 4 }}>
              <SelectField
                variant="outlined"
                placeholder={"Select..."}
                // onOpen={getAttributies}
                renderValue={(selected) => {
                  return Boolean(controls?.status) ? selected?.name : selected;
                }}
                // isPending={attributeResponse.isPending}
                value={Boolean(controls?.status) ? controls?.status : order?.status_name}
                onChange={(e) => {
                  setControl("status", e.target.value);
                }}
                required={required.includes("status")}
                error={Boolean(invalid?.status)}
                helperText={invalid?.status}
                MenuProps={MenuProps}
                onOpen={() =>
                  statusOrderRequest({
                    onSuccess: (res) => {
                      setstatus(res.data.map((ele) => ele));
                    },
                  })
                }
              >
                {status.map((ele, index) => (
                  <MenuItem key={index} value={ele}>
                    {ele.name}
                  </MenuItem>
                ))}
              </SelectField>
            </Container>
          </SoftBox>
        </Stack>
        {edit && (
          <SoftBox sx={{ textAlign: "right" }}>
            {" "}
            <SoftButton
              type="submit"
              variant="gradient"
              disabled={patchOrderResponce.isPending}
              sx={{
                backgroundColor: (theme) => theme.palette.purple.middle,
                color: "white !important",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.purple.middle,
                },
                // width: "260px",
              }}
              onClick={handleSubmit}
            >
              {patchOrderResponce.isPending ? (
              <>
                <CircularProgress size={20} color="inherit" />
                جاري التحميل...
              </>
            ) : (
                "Add"
            )}
            </SoftButton>{" "}
          </SoftBox>
        )}
      </Container>
    </DashboardLayout>
  );
}

export default DetailOrder;
DetailOrder.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Order
DetailOrder.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
