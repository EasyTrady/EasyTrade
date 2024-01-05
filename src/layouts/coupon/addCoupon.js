import React, { useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useRequest from "hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SoftButton from "components/SoftButton";
import Breadcrumbs from "examples/Breadcrumbs";
import {
  Avatar,
  Container,
  InputLabel,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
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
  CircularProgress,
} from "@mui/material";
import Form from "components/common/Form";
import { useTranslation } from "react-i18next";
import SoftInput from "components/SoftInput";
import useControls from "hooks/useControls";
import DatePickerField from "components/common/DatePicker";
import DateIcon2 from "examples/Icons/DateIcon2";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import { COUPONS } from "data/api";

function AddCoupon({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  let Token = localStorage.getItem("token");
  let dispatch = useDispatch();
  const sub_domain = localStorage.getItem("sub_domain");
  let navigate = useNavigate();
  let { t } = useTranslation("common");
  const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
    useControls([
      { control: "id", value: "", isRequired: false },
      { control: "image", value: "", isRequired: false },

      {
        control: "name",
        value: "",
        isRequired: true,
      },
      {
        control: "coupon_code",
        value: "",
        isRequired: true,
      },
      {
        control: "coupon_end_date",
        value: "",
        isRequired: true,
      },
      {
        control: "discount_amount",
        value: "",
        isRequired: true,
      },
      {
        control: "is_percentage_discount",
        value: true,
        isRequired: true,
      },
      {
        control: "max_users_number",
        value: "",
        isRequired: true,
      },
      {
        control: "justOneUser",
        value: false,
        isRequired: true,
      },
      {
        control: "appliesto",
        value: "",
        isRequired: true,
      },
      {
        control: "search",
        value: "",
        isRequired: true,
      },
      {
        control: "coupon_products",
        value: [],
        isRequired: false,
      },
      {
        control: "minimumrequirement",
        value: "None",
        isRequired: true,
      },
      {
        control: "minimum_items_quantity",
        value: 0,
        isRequired: true,
      },
      {
        control: "minimum_purchase_amount",
        value: "",
        isRequired: true,
      },
      {
        control: "customerSelect",
        value: "everyone",
        isRequired: true,
      },
    ]);
  const [couponRequest, couponResponce] = useRequest({
    path: COUPONS,
    method: "post",
    Token: `Token ${Token}`,
  });
  function handleSubmit() {
    couponRequest({
      body: {
        coupon_products: [],
        name: "Coupon for all",
        coupon_code: controls?.coupon_code,
        coupon_end_date: controls?.coupon_end_date,
        discount_amount: controls?.discount_amount,
        is_percentage_discount: controls?.is_percentage_discount,
        max_users_number: 1,
        minimum_purchase_amount: controls?.minimum_purchase_amount
          ? controls?.minimum_purchase_amount
          : 0,
        minimum_items_quantity: controls?.minimum_items_quantity
          ? controls?.minimum_items_quantity
          : 0,
      },
      onSuccess: (res) => {
        dispatch({ type: "coupon/addItem", payload: res.data });
        navigate(`/${sub_domain}/dashboard/coupons`);
      },
    });
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={"Add new coupon"} route={route} light={light} />
        </SoftBox>
        <Form
          component="form"
          childrenProps={{
            title: t("Coupon details"),
          }}
          sx={{ width: "100%", borderRadius: "8px" }}
          hideFooter={true}
        >
          <Box sx={{ display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            <Box sx={{ marginY: "6px" }}>
              <InputLabel
                htmlFor="outlined-adornment-email-register"
                sx={{ marginY: "6px", fontSize: "14px" }}
              >
                {t("name*")}
              </InputLabel>
              <SoftInput
                placeholder="Coupon name"
                // icon={{ component: <PersonIcon />, direction: "left" }}

                value={controls?.name}
                onChange={(e) => {
                  setControl("name", e.target.value);
                }}
                required={required.includes("name")}
                error={Boolean(invalid?.name)}
                helperText={invalid?.name}
              />
            </Box>
            <Box sx={{ marginY: "6px" }}>
              <InputLabel
                htmlFor="outlined-adornment-email-register"
                sx={{ marginY: "6px", fontSize: "14px" }}
              >
                {t("Coupon code*")}
              </InputLabel>
              <SoftInput
                placeholder="Coupon code"
                // icon={{ component: <PersonIcon />, direction: "left" }}

                value={controls?.coupon_code}
                onChange={(e) => {
                  let tester = /^(?:[0-9A-Za-z]+|)$/;

                  tester.test(e.target.value) && setControl("coupon_code", e.target.value);
                }}
                required={required.includes("coupon_code")}
                error={Boolean(invalid?.coupon_code)}
                helperText={invalid?.coupon_code}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  mb: "6px",
                }}
              >
                end date*
              </Typography>
              <DatePickerField
                value={controls?.coupon_end_date}
                onChange={(newvalue) => {
                  setControl("coupon_end_date", newvalue);
                  console.log(newvalue);
                }}
                icon={DateIcon2}
              />
            </Box>
            <Box sx={{ marginY: "6px" }}>
              <InputLabel
                htmlFor="outlined-adornment-email-register"
                sx={{ marginY: "6px", fontSize: "14px" }}
              >
                {t("amount")}
              </InputLabel>
              <SoftInput
                id="outlined-adornment-password"
                type={"text"}
                icon={{ component: <KeyboardArrowDownIcon />, direction: "right" }}
                value={controls?.discount_amount}
                sx={{
                  ".MuiInputBase-root": {
                    overflow: "hidden !important",
                    padding: "0px !important",
                    border: "unset",
                  },
                }}
                onChange={(e) => {
                  let tester = /^(?:\d+|)$/;

                  tester.test(e.target.value) && setControl("discount_amount", e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <SoftInput
                      select
                      value={controls?.is_percentage_discount ? "%" : "$"}
                      sx={{ ".MuiInputBase-root": { border: "unset" }, width: "10% !important" }}
                      onChange={(e) => {
                        setControl("is_percentage_discount", e.target.value == "%" ? true : false);
                      }}
                      required={required.includes("is_percentage_discount")}
                      error={Boolean(invalid?.is_percentage_discount)}
                      helperText={invalid?.is_percentage_discount}
                      SelectProps={{
                        defaultValue: "",
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!Boolean(selected)) {
                            return "%";
                          } else {
                            return selected;
                          }
                        },
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              maxHeight: "200px",
                              overflowY: "auto",
                              backgroundColor: "white !important",
                            },
                          },
                        },
                      }}
                    >
                      {["%", "$"]?.map((ele, index) => (
                        <MenuItem value={ele} key={index}>
                          {ele}
                        </MenuItem>
                      ))}
                    </SoftInput>
                  ),
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  mb: "6px",
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                The amount of discount as percentage (%) or fixed amount ($)
              </Typography>
            </Box>
            {/* <Box sx={{ marginY: "6px" }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Max uses*")}</InputLabel>
                            <SoftInput
                                id="outlined-adornment-password"
                                type={'text'}
                                value={controls?.max_users_number}
                                sx={{ ".MuiInputBase-root": { overflow: "hidden !important" } }}
                                onChange={(e) => {
                                    let tester = /^(?:\d+|)$/
                                
                                    tester.test(e.target.value) && setControl("max_users_number", e.target.value)
                                }} />
                        </Box> */}
            {/* <Box sx={{ marginY: "6px" }}>
                            <Switch checked={controls?.justOneUser} onChange={() => setControl("justOneUser", !controls?.justOneUser)} />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    mx: '6px',
                                    color: (theme) => theme.palette.grey[500]
                                }}
                                component={"span"}
                            >
                                One time use coupon
                            </Typography>
                        </Box> */}
          </Box>
        </Form>
        <Form
          component="form"
          childrenProps={{
            title: t("Requirements"),
          }}
          sx={{ width: "100%", borderRadius: "8px", my: "24px" }}
          hideFooter={true}
        >
          <Box sx={{ display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            {/* <Box sx={{ marginY: "6px" }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ fontSize: "14px" }}>{t("Applies to*")}</InputLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={controls.appliesto}
                                sx={{ marginX: "20px" }}
                                onChange={(e) => { setControl("appliesto", e.target.value); }}
                            >
                                <FormControlLabel value={"entireproducts"} control={<Radio />} label={t("Entire Products")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" } }} />
                                <FormControlLabel value={"specificproduct"} control={<Radio />} label={t("Specific product")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" } }} />

                            </RadioGroup>
                            {controls?.appliesto=="specificproduct" ?  <SoftInput
                                id="outlined-adornment-password"
                                type={'text'}
                                placeholder={"Search for product"}
                                value={controls?.search}
                                sx={{ ".MuiInputBase-root": { overflow: "hidden !important" } }}
                                onChange={(e) => {
                                     setControl("search", e.target.value)
                                }}
                                InputProps={{
                                    startAdornment: (<SearchOutlinedIcon sx={{height:'16px',width:'16px'}}/>)
                                    }}/>:<></>}
                        </Box> */}
            <Box sx={{ marginY: "6px" }}>
              <InputLabel htmlFor="outlined-adornment-email-register" sx={{ fontSize: "14px" }}>
                {t("Minimum requirement*")}
              </InputLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={controls.minimumrequirement}
                sx={{ marginX: "20px", mb: "6px" }}
                onChange={(e) => {
                  setControl("minimumrequirement", e.target.value);
                }}
              >
                <FormControlLabel
                  value={t("None")}
                  control={<Radio />}
                  label={t("None")}
                  sx={{
                    ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" },
                    marginLeft: "unset !important",
                  }}
                />
                <FormControlLabel
                  value={t("minimumpurchaseamount")}
                  control={<Radio />}
                  label={t("Minimum purchase amount")}
                  sx={{
                    ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" },
                    marginLeft: "unset !important",
                  }}
                />
                <FormControlLabel
                  value={t("minimumquantityofitems")}
                  control={<Radio />}
                  label={t("Minimum quantity of items")}
                  sx={{
                    ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" },
                    marginLeft: "unset !important",
                  }}
                />
              </RadioGroup>
              {(controls.minimumrequirement == "minimumpurchaseamount" ||
                controls.minimumrequirement == "minimumquantityofitems") && (
                <SoftInput
                  id="outlined-adornment-password"
                  type={"text"}
                  placeholder={
                    controls.minimumrequirement == "minimumpurchaseamount"
                      ? "Minimum amount..."
                      : "Minimum quantity..."
                  }
                  value={
                    controls.minimumrequirement == "minimumpurchaseamount"
                      ? controls?.minimum_items_quantity
                      : controls?.minimum_purchase_amount
                  }
                  sx={{ ".MuiInputBase-root": { overflow: "hidden !important" } }}
                  onChange={(e) => {
                    controls.minimumrequirement == "minimumpurchaseamount"
                      ? setControl("minimum_items_quantity", e.target.value)
                      : setControl("minimum_purchase_amount", e.target.value);
                  }}
                />
              )}
            </Box>
            {/* <Box sx={{ marginY: "6px" }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ fontSize: "14px" }}>{t("Customers illegibility*")}</InputLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={controls.customerSelect}
                                sx={{ marginX: "20px",mb:"6px" }}
                                onChange={(e) => { setControl("customerSelect", e.target.value); }}
                            >
                                <FormControlLabel value={t("everyone")} control={<Radio />} label={t("Everyone")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" },marginLeft:"unset !important" }} />
                                <FormControlLabel value={t("specificCustomer")} control={<Radio />} label={t("Specific customer")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" },marginLeft:"unset !important" }} />
                                
                            </RadioGroup>
                            { controls.customerSelect=="specificCustomer"&&<SoftInput
                            id="outlined-adornment-password"
                            type={'text'}
                            placeholder={"Search for customer"}
                            value={controls.customerSelect}
                            sx={{ ".MuiInputBase-root": { overflow: "hidden !important"} }}
                            onChange={(e) => {
                               setControl("customerSelect", e.target.value)
                            }}
                            InputProps={{
                                startAdornment: (<SearchOutlinedIcon sx={{height:'16px',width:'16px'}}/>)
                                }}
                           />}
                        </Box> */}
          </Box>
        </Form>
      </Container>
      <SoftBox sx={{ display: "flex", width: "100%", justifyContent: "flex-end", px: 5 }}>
        <SoftButton
            variant="contained"
            type="submit"
            color="dark"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
              width: "20%",
            }}
            onClick={handleSubmit}
          >
            {couponResponce.isPending ? (
              <>
                <CircularProgress size={20} color="inherit" />
                جاري التحميل...
              </>
            ) : (
                "Add Coupon"
            )}
          </SoftButton>
      </SoftBox>
      {couponResponce.failAlert}
      {couponResponce.successAlert}
    </DashboardLayout>
  );
}
export default AddCoupon;
AddCoupon.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the AddCoupon
AddCoupon.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
