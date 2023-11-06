/* eslint-disable react/prop-types */
import { Box, Breadcrumbs, Card, Container, Grid, Switch, Typography } from "@mui/material";
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
const ReactQuill = require("react-quill");
const AddProduct = ({light, isMini}) => {
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
    { control: "image", value: "", isRequired: true },
    {
      control: "name",
      value: "",
      isRequired: true,
      validations: [
        {
          test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
          message: "not valid name",
        },
      ],
    },
    {
      control: "quantity",
      value: "",
      isRequired: true,
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
      isRequired: true,
    },
    {
      control: "sku",
      value: "",
      isRequired: true,
    },
    { control: "weight", value: "", isRequired: true },
    { control: "minimum_quantity", value: "", isRequired: true },
    { control: "maximum_quantity", value: "", isRequired: true },
    { control: "description", value: "", isRequired: true },
    { control: "category", value: "", isRequired: true },
  ]);
  // form request add product
  const [AddProductRequest, AddProductResponce] = useRequest({
    path: EMPLOYEE,
    method: "post",
    Token: `Token ${Token}`,
  });
  function handleSubmit() {
    console.log("submit");
    validate().then((output) => {
      console.log(output);
      if (!output.isOk) return;
      EmployeePostRequest({
        body: controls,
        onSuccess: (res) => {
          console.log(res.data, controls);
        },
      }).then((res) => {
        let response = res?.response?.data;
        console.log(res);
        const responseBody = filter({
          obj: {
            name: response?.name?.join(""),
            quantity: response?.quantity?.join(" "),
            price: response?.price?.join(" "),
            sku: response?.sku?.join(" "),
            weight: response?.weight?.join(" "),
            channel: response?.channel?.join(" "),
            minimum_quantity: response?.minimum_quantity?.join(" "),
            minimum_quantity: response?.maximum_quantity?.join(" "),
            category: response?.category?.join(" "),
            description: response?.description?.join(" "),
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
    <Box pt={3} sx={{background: '#FFFFFF',borderRadius:'8px',height:'100%',pb:4
    }}>
      <AddProductTitle title={'Basic info'}/>
      <Container>
        <SoftBox py={3} display="flex" flexDirection="column" gap={2} sx={{width:'100%',height:'100%'}}>
          <InputField
          variant='outlined'
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
          variant='outlined'
            placeholder={"English Product"}
            value={controls.name}
            onChange={(e) => setControl("name", e.target.value)}
            required={required.includes("name")}
            error={Boolean(invalid.name)}
            helperText={invalid.name}
            sx={{width:'100%'}}
           
          />
           <NumberField
            variant='outlined'
              label='Quantity'
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
              value={controls.category}
              onChange={(e) => setControl("category", e.target.value)}
              required={required.includes("category")}
              textHelper={controls.category}
              error={Boolean(invalid.category)}
              helperText={invalid.category}
              sx={{width: "100%",fontSize:'14px'}}
          />
          
            <Box>
          <Typography sx={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight:' 20px',
            letterSpacing: '0em',
            textAlign: 'left'
            }}>Description</Typography>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Typing the description of product."
              onBlur={(e) => validate({ content: e.index })}
              modules={modules}
              style={{ height: "118px" }}
            />
            </Box>
            <Box mt={4}>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Typing the description of product."
              onBlur={(e) => validate({ content: e.index })}
              modules={modules}
              style={{ height: "118px",mt:4 }}
            />
            </Box>
         

          {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
        </SoftBox>
      </Container>
    </Box>
    <Box sx={{background: '#FFFFFF',borderRadius:'8px',height:'100%',mt:2.5}}>
    <AddProductTitle title={'Product Specifications'} switch/>
    

    </Box>
    <Box sx={{background: '#FFFFFF',borderRadius:'8px',height:'100%',mt:2.5,display:'flex',flexDirection:'column',gap:'20px',pb:2}}>
    <AddProductTitle title={'Product details'} />
    <Container sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
    <NumberField
        variant='outlined'
        label={"barcode"}
        placeholder={"barcode"}
        value={controls.mpn}
        onChange={(e) => setControl("barcode", e.target.value)}
        required={required.includes("barcode")}
        error={Boolean(invalid.mpn)}
        helperText={invalid.mpn}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
    <NumberField
        variant='outlined'
        label={"Gtn"}
        placeholder={"Gtn"}
        value={controls.gtn}
        onChange={(e) => setControl("gtn", e.target.value)}
        required={required.includes("gtn")}
        error={Boolean(invalid.gtn)}
        helperText={invalid.gtn}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
 <NumberField
 variant='outlined'
                label={"SKU"}
                placeholder={"SKU-123456"}
                value={controls.sku}
                onChange={(e) => setControl("sku", e.target.value)}
                required={required.includes("sku")}
                error={Boolean(invalid.sku)}
                helperText={invalid.sku}
                sx={input}
              />
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px'}}>
              <SelectValue
              variant='outlined'
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
              variant='outlined'
                label={"Dimensions (L*W*H)"}
                placeholder={"l*W..."}
                value={controls.weight}
                onChange={(e) => setControl("weight", e.target.value)}
                required={required.includes("weight")}
                error={Boolean(invalid.weight)}
                helperText={invalid.weight}
               
                sx={input}
              />
              </Box>
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px'}}>
              <NumberField
              variant='outlined'
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
            variant='outlined'
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
    <Box  pt={3} sx={{background: '#FFFFFF',borderRadius:'8px',height:'100%',pb:4,mt:2.5
    }}>
    <AddProductTitle title={'Additional info'}/>
    <Container sx={{display:'flex',flexDirection:'column',gap:'20px',mt:"20px"}}>
    <NumberField
        variant='outlined'
        label={"Purchase price"}
        placeholder={"Purchase price"}
        value={controls.purchase_price}
        onChange={(e) => setControl("purchase_price", e.target.value)}
        required={required.includes("purchase_price")}
        error={Boolean(invalid.purchase_price)}
        helperText={invalid.purchase_price}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        <NumberField
        variant='outlined'
                label={"Product price"}
                placeholder={"99 EGP"}
                value={controls.price}
                onChange={(e) => setControl("price", e.target.value)}
                required={required.includes("price")}
                error={Boolean(invalid.price)}
                helperText={invalid.price}
                
                sx={input}
              />
        <NumberField
        variant='outlined'
        label={"shipping price"}
        placeholder={"99 EGP"}
        value={controls.shipping_price}
        onChange={(e) => setControl("shipping_price", e.target.value)}
        required={required.includes("shipping_price")}
        error={Boolean(invalid.shipping_price)}
        helperText={invalid.shipping_price}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
    </Container>
    </Box>
    <Box pt={3} sx={{background: '#FFFFFF',borderRadius:'8px',height:'100%',pb:4,mt:2.5
    }}>
      <AddProductTitle title={'Discount details (Optional)'}/>
      <Container sx={{display:'flex',flexDirection:'column',gap:'20px',mt:"20px"}}>
      <NumberField
        variant='outlined'
        placeholder={"Discount"}
        value={controls.discount}
        onChange={(e) => setControl("discount", e.target.value)}
        required={required.includes("discount")}
        error={Boolean(invalid.discount)}
        helperText={invalid.discount}
         icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        <Box>
        <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight: '20px',
letterSpacing: '0em',
textAlign: 'left'
}}>Start date*</Typography>
        <DatePickerField/>
        </Box>
        <Box>
        <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight: '20px',
letterSpacing: '0em',
textAlign: 'left'
}}>End date*</Typography>
        <DatePickerField/>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default AddProduct;
