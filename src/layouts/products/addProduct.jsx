import { Box, Card, Container, Grid } from "@mui/material";
import borders from "assets/theme/base/borders";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import InputField from "components/common/inputField";
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
const ReactQuill = require("react-quill");
const AddProduct = () => {
  const { borderWidth, borderColor } = borders;
  const [value, setValue] = useState("");
  let Token = localStorage.getItem('token')

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
  ]);
// form request add product
  const [AddProductRequest, AddProductResponce] =
  useRequest({
      path: EMPLOYEE,
      method: "post",
      Token: `Token ${Token}`
  });
  function handleSubmit() {
    console.log("submit")
    validate().then((output) => {
        console.log(output)
        if (!output.isOk) return;
        EmployeePostRequest({
            body: controls,
            onSuccess: (res) => {
                console.log(res.data, controls)
            }
        }).then((res) => {
            let response = res?.response?.data;
            console.log(res)
            const responseBody = filter({
                obj: {
                    name:
                        response?.name?.join(""),
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
            resetControls("")
        });
    })

}
  return (
    
      <Card pt={3}>
        <Container>
          <SoftBox py={3} display="flex" flexDirection="column" gap={2}>
            <SoftInput
              placeholder={"Product name"}
              value={controls.name}
              onChange={(e) => setControl("name", e.target.value)}
              required={required.includes("name")}
              error={Boolean(invalid.name)}
              helperText={invalid.name}
              icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
              sx={input}
            />
            <Grid container spacing={4}>
              <Grid item md={4}>
                <SoftInput
                  placeholder={"Product code SKU"}
                  value={controls.sku}
                  onChange={(e) => setControl("sku", e.target.value)}
                  required={required.includes("sku")}
                  error={Boolean(invalid.sku)}
                  helperText={invalid.sku}
                  icon={{ component: <QrCodeScannerIcon />, direction: "left" }}
                  sx={input}
                />
              </Grid>
              <Grid item md={4}>
                <SoftInput
                  placeholder={"Weight"}
                  value={controls.weight}
                  onChange={(e) => setControl("weight", e.target.value)}
                  required={required.includes("weight")}
                  error={Boolean(invalid.weight)}
                  helperText={invalid.weight}
                  icon={{ component: <ScaleOutlinedIcon />, direction: "left" }}
                  sx={input}
                />
              </Grid>
              <Grid item md={4}>
                <SoftInput
                  placeholder={"Product price"}
                  value={controls.price}
                  onChange={(e) => setControl("price", e.target.value)}
                  required={required.includes("price")}
                  error={Boolean(invalid.price)}
                  helperText={invalid.price}
                  icon={{ component: <PriceChangeOutlinedIcon />, direction: "left" }}
                  sx={input}
                />
              </Grid>
            </Grid>

            <SoftBox>
              <SoftTypography variant="h6" fontWeight="medium">
                product quantity
              </SoftTypography>
              <SoftBox
                border={`${borderWidth[1]} solid ${borderColor}`}
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <SoftInput
                  placeholder="Quantity"
                  value={controls.quantity}
                  onChange={(e) => setControl("quantity", e.target.value)}
                  required={required.includes("quantity")}
                  error={Boolean(invalid.quantity)}
                  helperText={invalid.quantity}
                  icon={{ component: <ProductionQuantityLimitsIcon />, direction: "left" }}
                  sx={input}
                />
              </SoftBox>
            </SoftBox>
            <SoftBox display="flex" flexDirection="row" alignItems="center" gap={4}>
              <SoftInput
                placeholder={"Minimum quantity"}
                value={controls.minimum_quantity}
                onChange={(e) => setControl("minimum_quantity", e.target.value)}
                required={required.includes("minimum_quantity")}
                error={Boolean(invalid.minimum_quantity)}
                helperText={invalid.minimum_quantity}
                icon={{ component: <NotificationImportantOutlinedIcon />, direction: "left" }}
                sx={input}
              />

              <SoftInput
                placeholder={"Maximum quantity per order"}
                value={controls.maximum_quantity}
                onChange={(e) => setControl("maximum_quantity", e.target.value)}
                required={required.includes("maximum_quantity")}
                error={Boolean(invalid.maximum_quantity)}
                helperText={invalid.maximum_quantity}
                icon={{ component: <BookmarkAddedOutlinedIcon />, direction: "left" }}
                sx={input}
              />
            </SoftBox>
            <SoftInput
              placeholder={"Category"}
              value={controls.category}
              onChange={(e) => setControl("category", e.target.value)}
              required={required.includes("category")}
              error={Boolean(invalid.category)}
              helperText={invalid.category}
              icon={{ component: <CategoryIcon />, direction: "left" }}
              sx={input}
            />

            <Box height="200px" sx={{my:3}}>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Typing the description of product."
                onBlur={(e) => validate({ content: e.index })}
                modules={modules}
                style={{ height: "200px" }}
              />
            </Box>

            {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
          </SoftBox>
        </Container>
      </Card>
   
  );
};

export default AddProduct;
