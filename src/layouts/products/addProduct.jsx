/* eslint-disable react/prop-types */
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import borders from "assets/theme/base/borders";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import "./description.css";
import "react-quill/dist/quill.snow.css";
import { validate } from "uuid";
import useControls from "hooks/useControls";
import input from "assets/theme/components/form/input";
import inputBase from "assets/theme/components/form/inputBase";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import SoftButton from "components/SoftButton";
import stepper from "assets/theme/components/stepper";
import useRequest from "hooks/useRequest";
import { EMPLOYEE } from "data/api";
import InputField from "components/common/TextField";
import NumberField from "components/common/NumberFeild";
import SelectField from "components/common/SelectField";
import AddProductTitle from "components/common/AddProductTitle";
import DatePickerField from "components/common/DatePicker";
import SelectValue from "components/common/SelectValue";
import { useLocation } from "react-router-dom";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import { PRODUCTS } from "data/api";
import { CATEGORY } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import filter from "utils/ClearNull";
import PictureField from "components/common/PictureField";
const ReactQuill = require("react-quill");

const AddProduct = ({ light, isMini }) => {
  const category = useSelector((state) => state.category.value);
  const dispatch = useDispatch();
  const route = useLocation().pathname.split("/").slice(1);
  const { borderWidth, borderColor } = borders;
  const [value, setValue] = useState("");
  let Token = localStorage.getItem("token");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  //   form status control
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "main_image", value: "", isRequired: false },
    {
      control: "name",
      value: "",
      isRequired: false,
      validations: [
        {
          test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
          message: "not valid name",
        },
      ],
    },
    {
      control: "require_shipping",
      value: "",
      isRequired: false,
    },
    {
      control: "quantity",
      value: "",
      isRequired: false,
      validations: [
        {
          test: /[^0-9]/g,
          message: "not valid quantity",
        },
      ],
    },
    {
      control: "price",
      value: "",
      isRequired: false,
    },
    {
      control: "sku",
      value: "",
      isRequired: false,
    },
    {
      control: "mpn",
      value: "",
      isRequired: false,
    },
    {
      control: "gtin",
      value: "",
      isRequired: false,
    },
    {
      control: "purchase_price",
      value: "",
      isRequired: false,
    },
    {
      control: "is_percentage_discount",
      value: "",
      isRequired: false,
    },
    {
      control: "discount",
      value: "",
      isRequired: false,
    },
    {
      control: "discount_start_date",
      value: "",
      isRequired: false,
    },
    {
      control: "discount_end_date",
      value: "",
      isRequired: false,
    },
    { control: "require_shipping", value: "", isRequired: false },
    { control: "require_shipping", value: "", isRequired: false },
    { control: "maximum_order_quantity", value: "", isRequired: false },
    { control: "description", value: "", isRequired: false },
    { control: "product_categories", value: "", isRequired: false },
    { control: "custom_shipping_price", value: "", isRequired: false },
    { control: "dimensions", value: "", isRequired: false },
    { control: "weight", value: "", isRequired: false },
  ]);
  const [categoryRequest, getcategoryResponce] = useRequest({
    path: CATEGORY,
    method: "get",
    Token: `Token ${Token}`,
  });

  const getCategory = () => {
    categoryRequest({
      onSuccess: (res) => {
        console.log(res.data);
        dispatch({ type: "category/set", payload: res?.data });
      },
    });
  };
  // form request add product
  const [AddProductRequest, AddProductResponce] = useRequest({
    path: PRODUCTS,
    method: "post",
    Token: `Token ${Token}`,
    contentType:'multipart/form-data'
  });
  function handleSubmit() {
    
    validate()?.then((output) => {
      console.log(output);
      if (!output.isOk) return;
      AddProductRequest({
        body: filter({
          obj: {
            product_categories: controls.product_categories,
            sku: controls.sku,
            mpn: controls.mpn,
            gtin: controls.gtin,
            name: controls.name,
            description: controls.description,
            price: controls.price,
            main_image: controls.main_image,
            discount: controls.discount,
            discount_start_date: controls.discount_start_date,
            discount_end_date: controls.discount_end_date,
            is_percentage_discount: controls.is_percentage_discount,
            purchase_price: controls.purchase_price,
            custom_shipping_price: controls.custom_shipping_price,
            maximum_order_quantity: controls.maximum_order_quantity,
            is_piblished: controls.is_piblished,
            in_taxes: controls.in_taxes,
            require_shipping: controls.require_shipping,
            quantity: controls.quantity,
            weight: controls.weight,
            dimensions: controls.dimensions,
          },
          output: "formData",
        }),
        onSuccess: (res) => {
          console.log(res.data, controls);
        },
      }).then((res) => {
        let response = res?.response?.data;
        console.log(res);
        const responseBody = filter({
          obj: {
             product_categories: response.product_categories,
            sku: response.sku,
            mpn: response.mpn,
            gtin: response.gtin,
            name: response.name,
            description: response.description,
            price: response.price,
            main_image: response.main_image,
            discount: response.discount,
            discount_start_date: response.discount_start_date,
            discount_end_date: response.discount_end_date,
            is_percentage_discount: response.is_percentage_discount,
            purchase_price: response.purchase_price,
            custom_shipping_price: response.custom_shipping_price,
            maximum_order_quantity: response.maximum_order_quantity,
            is_piblished: response.is_piblished,
            in_taxes: response.in_taxes,
            require_shipping: response.require_shipping,
            quantity: response.quantity,
            weight: response.weight,
            dimensions: response.dimensions,
          },
          output: "object",
        });

        setInvalid(responseBody);
        resetControls("");
      });
    });
  }

  return (
    <>
      <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
        <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
      </SoftBox>
      <Box  sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", pb: 4 }}>
        <AddProductTitle title={"Basic info"} />
        <Container>
          <SoftBox
            py={'20px'}
            display="flex"
            flexDirection="column"
            gap={"20px"}
            sx={{ width: "100%", height: "100%" }}
          >
            <InputField
              variant="outlined"
              label={"Product name"}
              placeholder={"Arabic Product"}
              value={controls.name}
              onChange={(e) => setControl("name", e.target.value)}
              required={required.includes("name")}
              error={Boolean(invalid.name)}
              helperText={invalid.name}
              sx={input}
            />
            <InputField
              variant="outlined"
              placeholder={"English Product"}
              value={controls.name}
              onChange={(e) => setControl("name", e.target.value)}
              required={required.includes("name")}
              error={Boolean(invalid.name)}
              helperText={invalid.name}
              sx={{ width: "100%" }}
            />
            <NumberField
              variant="outlined"
              label="Quantity"
              placeholder="Quantity"
              value={controls.quantity}
              onChange={(e) => setControl("quantity", e.target.value)}
              required={required.includes("quantity")}
              error={Boolean(invalid.quantity)}
              helperText={invalid.quantity}
              sx={input}
            />
            <SelectField
              variant="outlined"
              placeholder="category"
              label="Category"
              thousandSeparator
              isPending={getcategoryResponce.isPending}
              onOpen={getCategory}
              renderValue={(selected) => {
												return category.find(
												  (category) => category.id === selected
												)?.name
											  }}
              value={controls.product_categories}
              onChange={(e) => setControl("product_categories", e.target.value)}
              required={required.includes("product_categories")}
              textHelper={controls.category}
              error={Boolean(invalid.product_categories)}
              helperText={invalid.product_categories}
              sx={{ width: "100%", fontSize: "14px",background:'#fff' }}
            >
              {category?.map((category) => (
                <MenuItem key={category.id} value={category?.id}>
                  {category?.name}
                </MenuItem>
              ))}
            </SelectField>

            <Box sx={{ mb: "20px" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: " 20px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                Description
              </Typography>
              <ReactQuill
                theme="snow"
                value={controls.description}
                onChange={(e)=>setControl('description',e)}
                placeholder="Typing the description of product."
                onBlur={(e) => validate({ content: e.index })}
                modules={modules}
                style={{ height: "118px"}}
              />
            </Box>
            <Box my={4}>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Typing the description of product."
                onBlur={(e) => validate({ content: e.index })}
                modules={modules}
                style={{ height: "118px",  }}
              />
            </Box>

            {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
          </SoftBox>
        </Container>
      </Box>
      <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
        <AddProductTitle title={"Product Specifications"} switch />
      </Box>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "8px",
          height: "100%",
          mt: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          pb: 2,
        }}
      >
        <AddProductTitle title={"Product details"} />
        <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <NumberField
            variant="outlined"
            label={"barcode"}
            placeholder={"barcode"}
            value={controls.mpn}
            onChange={(e) => setControl("mpn", e.target.value)}
            required={required.includes("mpn")}
            error={Boolean(invalid.mpn)}
            helperText={invalid.mpn}
            // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
            sx={input}
            borderBottom="none"
          />
          <NumberField
            variant="outlined"
            label={"Gtin"}
            placeholder={"Gtin"}
            value={controls.gtin}
            onChange={(e) => setControl("gtin", e.target.value)}
            required={required.includes("gtin")}
            error={Boolean(invalid.gtin)}
            helperText={invalid.gtin}
            // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
            sx={input}
            borderBottom="none"
          />
          <NumberField
            variant="outlined"
            label={"SKU"}
            placeholder={"SKU-123456"}
            value={controls.sku}
            onChange={(e) => setControl("sku", e.target.value)}
            required={required.includes("sku")}
            error={Boolean(invalid.sku)}
            helperText={invalid.sku}
            sx={input}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <SelectValue
              variant="outlined"
              label={"Weight*"}
              placeholder={"Weight"}
              value={controls.weight}
              onChange={(e) => setControl("weight", e.target.value)}
              required={required.includes("weight")}
              error={Boolean(invalid.weight)}
              helperText={invalid.weight}
              sx={input}
            />
            <NumberField
              variant="outlined"
              label={"Dimensions (L*W*H)"}
              placeholder={"l*W..."}
              value={controls.dimensions}
              onChange={(e) => setControl("dimensions", e.target.value)}
              required={required.includes("dimensions")}
              error={Boolean(invalid.dimensions)}
              helperText={invalid.dimensions}
              sx={input}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <NumberField
              variant="outlined"
              label={"Maximum order quantity*"}
              placeholder={"Maximum order quantity"}
              value={controls.maximum_quantity}
              onChange={(e) => setControl("maximum_quantity", e.target.value)}
              required={required.includes("maximum_quantity")}
              error={Boolean(invalid.maximum_quantity)}
              helperText={invalid.maximum_quantity}
              sx={input}
            />

            <NumberField
              variant="outlined"
              label={"Minimum stock quantity*"}
              placeholder={"Minimum stock quantity"}
              value={controls.minimum_quantity}
              onChange={(e) => setControl("minimum_quantity", e.target.value)}
              required={required.includes("minimum_quantity")}
              error={Boolean(invalid.minimum_quantity)}
              helperText={invalid.minimum_quantity}
              sx={input}
            />
          </Box>
        </Container>
      </Box>
      <Box
        
        sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", pb: 4, mt: 2.5 }}
      >
        <AddProductTitle title={"Additional info"} />
        <Container sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}>
          <NumberField
            variant="outlined"
            label={"Purchase price"}
            placeholder={"Purchase price"}
            value={controls?.purchase_price}
            onChange={(e) => setControl("purchase_price", e.target.value)}
            required={required?.includes("purchase_price")}
            error={Boolean(invalid?.purchase_price)}
            helperText={invalid?.purchase_price}
            // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
            sx={input}
            borderBottom="none"
          />
          <NumberField
            variant="outlined"
            label={"Product price"}
            placeholder={"99 EGP"}
            value={controls.price}
            onChange={(e) => setControl("price", e.target.value)}
            required={required?.includes("price")}
            error={Boolean(invalid?.price)}
            helperText={invalid?.price}
            sx={input}
          />
          <NumberField
        variant='outlined'
        label={"shipping price"}
        placeholder={"99 EGP"}
        value={controls.custom_shipping_price}
        onChange={(e) => setControl("custom_shipping_price", e.target.value)}
        required={required?.includes("custom_shipping_price")}
        error={Boolean(invalid?.custom_shipping_price)}
        helperText={invalid?.custom_shipping_price}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        </Container>
      </Box>
      <Box
       
        sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", pb: 4, mt: 2.5 }}
      >
        <AddProductTitle title={"Discount details (Optional)"} />
        <Container sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}>
          <NumberField
            variant="outlined"
            placeholder={"Discount"}
            value={controls.discount}
            onChange={(e) => setControl("discount", e.target.value)}
            required={required.includes("discount")}
            error={Boolean(invalid.discount)}
            helperText={invalid.discount}
            icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
            sx={input}
            borderBottom="none"
          />
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
            >
              Start date*
            </Typography>
            <DatePickerField value={controls.discount_start_date} onChange={(e)=>setControl('discount_start_date',e.target.value)}/>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
            >
              End date*
            </Typography>
            <DatePickerField value={controls.discount_end_date} onChange={(e)=>setControl('discount_end_date',e.target.value)}/>
          </Box>
        </Container>
      </Box>
      <Box
        
        sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", pb: 4, mt: 2.5 }}
      >
        <AddProductTitle title={"Toggles"} />
        <Container >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}>
          <FormControlLabel
            sx={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.02em",
            }}
            label={"No tax"}
            control={
              <Switch
                defaultChecked
                value={controls.in_taxes}
                onChange={(e) => setControl("in_taxes", e.target.checked)}
                color="secondary"
              />
            }
          />
          <FormControlLabel
            sx={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.02em",
            }}
            label={"Publish on website"}
            control={
              <Switch
                value={controls.is_piblished}
                onChange={(e) => setControl("is_piblished", e.target.checked)}
                defaultChecked
                color="secondary"
              />
            }
          />

          <FormControlLabel
            sx={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.02em",
            }}
            label={"Must pay shipping"}
            control={
              <Switch
                value={controls.require_shipping}
                onChange={(e) => setControl("require_shipping", e.target.checked)}
                defaultChecked
                color="secondary"
              />
            }
          />
          <PictureField
          value={controls.main_image}
          onChange={(e)=>setControl('main_image',e.target.value)}
          />
          </Box>

        </Container>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: "24px" }}>
        <SoftButton
          type="submit"
          variant="gradient"
          sx={{
            backgroundColor: (theme) => theme.palette.purple.middle,
            color: "white !important",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.purple.middle,
            },
            width: "260px",
          }}
          onClick={handleSubmit}
        >
          Next
        </SoftButton>
      </Box>
      {AddProductResponce.failAlert}
      {AddProductResponce.successAlert}
    </>
  );
};

export default AddProduct;
