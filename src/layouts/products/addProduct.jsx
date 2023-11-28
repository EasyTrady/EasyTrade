/* eslint-disable react/prop-types */
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import borders from "assets/theme/base/borders";
import SoftBox from "components/SoftBox";
import TableFooter from '@mui/material/TableFooter';
import SoftInput from "components/SoftInput";
import DeleteIcon from 'examples/Icons/DeleteIcon';
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState ,useEffect} from "react";
import "./description.css";
import "react-quill/dist/quill.snow.css";
import { validate } from "uuid";
import useControls from "hooks/useControls";
import input from "assets/theme/components/form/input";
import TwoArrow from 'examples/Icons/TwoArrow';

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
import {  useNavigate } from 'react-router-dom';
import { CATEGORY } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import filter from "utils/ClearNull";
import PictureField from "components/common/PictureField";
import SelectValueWeight from "components/common/SelectValueWeight";
import MultiSelect from "components/common/MultiSelect";
import compare from "utils/compare";
import CircularProgress from '@mui/material/CircularProgress';
const ReactQuill = require("react-quill");


const AddProduct = ({ light, isMini,handleChange }) => {
  const navigate = useNavigate()
  const sub_domain = localStorage.getItem('sub_domain')
  const location = useLocation();
  const { state } = location;
  let productId=localStorage.getItem('productId');
  const category = useSelector((state) => state.category.value);
  const dispatch = useDispatch();
  const route = useLocation().pathname.split("/").slice(1);
  const { borderWidth, borderColor } = borders;
  const [Value, setValue] = useState("");
  const[key,setKey]=useState(false)
  // const [Switch, setSwitch] = useState(true);

  const [product, setProduct] = useState(null);

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
  const [{ controls, invalid, required }, { setControl, resetControls, validate ,setInvalid}] = useControls([
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
      control:"switchSpecifications",
      value: false,
      isRequired: false,
    }, {
      control:"specifications",
      value: [],
      isRequired: false,
    },
    {
      control: "quantity",
      value: "",
      isRequired: false,
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
    { control: "require_shipping", value: false, isRequired: false },
    // { control: "require_shipping", value: "", isRequired: false },
    { control: "maximum_order_quanitity", value: "", isRequired: false },
    // { control: "minimum_stock_quantity", value: "", isRequired: false },

    { control: "description", value: "", isRequired: false },
    { control: "categories", value: [], isRequired: false },
    // { control: "custom_shipping_price", value: "", isRequired: false },
    { control: "dimensions", value: "", isRequired: false },
    // { control: "weight", value: "", isRequired: false },
    { control: "in_taxes", value: false, isRequired: false },
    { control: "is_published", value: false ,isRequired: false },
    { control: "weight", value: "", isRequired: false },
    { control: "weight_unit", value: "", isRequired: false },
    { control: "key", value: "", isRequired: false },
    { control: "value", value: "", isRequired: false },

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
  const addKey = () => {
    setKey(true)
    if(Boolean(controls.key)&&Boolean(controls.value)){
      setControl("specifications",[...controls.specifications,{key:controls.key,value:controls.value}])
      setControl("key","")
      setControl("value","")

    }
  };
  
  // form request add product
  const [AddProductRequest, AddProductResponce] = useRequest({
    path: PRODUCTS,
    method: "post",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  const [specificationsRequest, specificationsResponce] = useRequest({
    path: PRODUCTS,
    method: "post",
    Token: `Token ${Token}`,
  });
  const [specificationsdeleteRequest, deletespecificationsResponce] = useRequest({
    path: PRODUCTS,
    method: "delete",
    Token: `Token ${Token}`,
  });
  const [patchProductRequest, patchProductResponce] = useRequest({
    path: PRODUCTS,
    method: "patch",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  const [getProductRequest, getProductResponce] = useRequest({
    path: PRODUCTS,
    method: "get",
    Token: `Token ${Token}`,
    // contentType: "multipart/form-data",
  });
  function handleSubmit() {
    validate()?.then((output) => {
 
      if (!output.isOk) return;
      if(Boolean(productId)){
        let  result= compare(
          [
          [controls?.name,product?.name,"name"],
          [controls?.main_image,product?.main_image,"main_image"],
          [controls?.require_shipping,product?.require_shipping,"require_shipping"],
         [controls?.quantity,product?.quantity,"quantity"],
         [controls?.price,product?.price,"price"],
         [controls?.sku,product?.sku,"sku"],
         [controls?.mpn,product?.mpn,"mpn"],
         [controls?.gtin,product?.gtin,"gtin"],
         [controls?.purchase_price,product?.purchase_price,"purchase_price"],
         [controls?.is_percentage_discount,product?.is_percentage_discount,"is_percentage_discount"],
         [controls?.discount,product?.discount,"discount"],
         [new Date(controls?.discount_start_date)?.toISOString(),product?.discount_start_date,"discount_start_date"],
         [new Date(controls?.discount_end_date)?.toISOString(),product?.discount_end_date,"discount_end_date"],
         [controls?.require_shipping,product?.require_shipping,"require_shipping"],
         [controls?.maximum_order_quanitity,product?.maximum_order_quanitity,"maximum_order_quanitity"],
        

        // // //  [controls.minimum_stock_quantity,product.minimum_stock_quantity,"minimum_stock_quantity"],
         [controls?.description,product?.description,"description"],
         [String(controls?.categories),String(product?.categories),"categories"],
        //  [controls.custom_shipping_price,product.custom_shipping_price,"custom_shipping_price"],
         [controls?.dimensions,product?.dimensions,"dimensions"],
         [controls?.weight,product?.weight,"weight"],
         [controls?.in_taxes,product?.in_taxes,"in_taxes"],
         [controls?.is_published,product?.is_published,"is_published"],
         [controls?.weight_unit,product?.weight_unit,"weight_unit"],
        ],false
      )
      // console.log(Object.entries(result.array).map(([key,value])=>key==="discount_start_date"||key==="discount_end_date"?{key:value.toISOString()}:{key:value}))
   
      if(result.nochange){ patchProductRequest({
        id:productId,
        body:result.array,
        onSuccess:(res)=>{
          dispatch({ type: "products/patchItem", payload:{ id:res?.data?.id,item:res?.data} });
          // handleChange(undefined,1,res.data.id)
        }
      })}
     
        let resultValue=compare([ [controls.specifications,product.specifications,"specifications"]],false)
        if(resultValue.nochange){
          specificationsRequest({
            id:productId+"/specifications",
            body:resultValue.array.specifications,
            onSuccess:(res)=>{
              // handleChange(undefined,1,productId)
            }
          }) 
        }
        handleChange(undefined,1,productId)
      
      }else{
        AddProductRequest({
          body: filter({
            obj: {
              product_categories: [...controls.categories] || "12",
              sku: controls.sku,
              mpn: controls.mpn,
              gtin: controls.gtin,
              name: controls.name,
              description: controls.description,
              price: controls.price,
              main_image: controls.main_image,
              discount: controls?.discount,
              discount_start_date: controls?.discount_start_date&&controls?.discount_start_date?.toISOString(),
              discount_end_date:controls?.discount_start_date&&controls?.discount_end_date?.toISOString(),
              is_percentage_discount: controls.is_percentage_discount,
              purchase_price: controls.purchase_price,
              //  custom_shipping_price: controls.custom_shipping_price,
              maximum_order_quanitity: controls.maximum_order_quanitity,
              is_published: controls.is_published,
              in_taxes: controls.in_taxes,
              require_shipping: controls.require_shipping,
              quantity: controls.quantity,
              weight: controls.weight,
              weight_unit: controls.weight_unit,
              dimensions: controls.dimensions
            },
            output: "formData",
          }),
          onSuccess: (res) => {
            localStorage.setItem('productId', res.data.id);
            dispatch({ type: "products/addItem", payload: res?.data });
            handleChange(undefined,1,res?.data?.id)
            resetControls("");
          },
        }).then((res) => {
       
          let response = res?.response?.data;
          
          const responseBody = filter({
            obj: {
              categories: response?.categories,
              sku: response?.sku,
              mpn: response?.mpn,
              gtin: response?.gtin,
              name: response?.name,
              description: response?.description,
              price: response?.price,
              main_image: response?.main_image,
              discount: response?.discount,
              discount_start_date: response?.discount_start_date,
              discount_end_date: response?.discount_end_date,
              is_percentage_discount: response?.is_percentage_discount,
              purchase_price: response?.purchase_price,
              //  custom_shipping_price: response?.custom_shipping_price,
              maximum_order_quanitity: response?.maximum_order_quanitity,
              is_published: response?.is_published,
              in_taxes: response?.in_taxes,
              require_shipping: response?.require_shipping,
              quantity: response?.quantity,
              weight: response?.weight,
              dimensions: response?.dimensions,
            },
            output: "object",
          });
 
           setInvalid(responseBody);
        
        });
        if(controls.specifications.length>0){
          specificationsRequest({
            id:productId+"/specifications",
            body:resultValue.array.specifications,
            onSuccess:(res)=>{
              // handleChange(undefined,1,productId)
            }
          }) 
        }
       
      }
      
      
    });
  }
  console.log(controls?.in_taxes)
  function DeleteSpecification(ele){
    if(ele.id){
      specificationsdeleteRequest({
        id:productId+"/specifications/"+ele.id,
        onSuccess:(res)=>{
          setControl("specifications",controls?.specifications.filter((elem,ind)=>elem!=ele))
           console.log(res.data)
        }
      })
    }else{
      setControl("specifications",controls?.specifications.filter((elem,ind)=>elem!=ele))
    }
  }
  // console.log(index,value);
  useEffect(() => {
    // jobRequest({
    //     onSuccess: (res) => {
    //         dispatch({ type: "job/set", payload: res.data })
    //     }
    // })
    if(Boolean(productId)){
      getProductRequest({
        id:productId,
        onSuccess:(res)=>{
          setProduct(res.data)
          Object.entries(res.data)?.forEach(([key,value])=> Object.keys(controls).includes(key)? setControl(key,value):null)
          console.log(controls)
        }
      })
    }
}, [productId])
useEffect(()=>{
  if(category.length==0){
    getCategory()
  }
},[category])
useEffect(()=>{
  if(controls.specifications.length>0){
    setControl("switchSpecifications",true)
  }
},[controls.specifications])

  return (
    <>
      <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
        <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
      </SoftBox>
      <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", pb: 4 }}>
        <AddProductTitle title={"Basic info"} />
        <Container>
          <SoftBox
            py={"20px"}
            display="flex"
            flexDirection="column"
            gap={"20px"}
            sx={{ width: "100%", height: "100%",position:"relative" }}
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
              {/* <SoftButton sx={{
                            width: "max-content",
                            padding: "5px",
                            borderRadius: "50%",
                            minWidth: "max-content",
                            minHeight: "max-content",
                            position: "absolute",
                            left: "70%",
                            top: "5rem",
                            zIndex: 1
                        }} onClick={() => {
                            let copyName = controls.english_name;
                            setControl("english_name", controls.name)
                            setControl("name", copyName)
                        }}>
                            <TwoArrow color={"#959FA3"} size={"16"}/>
                           
                        </SoftButton> */}
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
            <MultiSelect
            select
              variant="outlined"
              placeholder="category"
              label="Category"
              isPending={getcategoryResponce.isPending}
              onOpen={getCategory}
              renderValue={(selected) => {
                // selected.map((ele)=>category.map((elem)=>elem.id).includes(ele))
                
                let resultcategory=category?.filter((category) => selected.includes(category.id))
                return resultcategory.map((ele)=>ele.name).join(" , ")
              }}
              value={controls.categories.map((ele)=>ele.id?ele.id:ele)}
              onChange={(e) => {setControl("categories", e.target.value);console.log(e.target.value)}}
              required={required.includes("categories")}
              textHelper={controls.categories}
              error={Boolean(invalid.categories)}
              helperText={invalid.categories}
              sx={{ width: "100%", fontSize: "14px","& .MuiMenu-paper":{
                backgroundColor:"white !important"
              } }}
              SelectProps={{
                defaultValue: "",
                displayEmpty: true,
                // onOpen: onOpen,
                // onClose: onClose,
                renderValue: (selected) => {

                     let resultcategory=category?.filter((category) => selected.includes(category.id))
                return resultcategory.map((ele)=>ele.name).join(" , ")
                },
                MenuProps: {
                    PaperProps: {
                        sx: {
                            maxHeight: "200px",
                            overflowY: "auto",
                            backgroundColor: "white !important"
                        },
                    },
                },

                // IconComponent: <KeyboardArrowDownIcon></KeyboardArrowDownIcon>,

            }}
            >
              {category?.map((category, index) => (
                <MenuItem key={`${category.id} ${index}`} value={category.id}>
                  {category?.name}
                  
                </MenuItem>
              ))}
            </MultiSelect>

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
                onChange={(e) => setControl("description", e)}
                placeholder="Typing the description of product."
                onBlur={(e) => validate({ content: e.index })}
                modules={modules}
                style={{ height: "118px" }}
              />
            </Box>
            <Box my={4}>
              <ReactQuill
                theme="snow"
                value={Value}
                onChange={setValue}
                placeholder="Typing the description of product."
                onBlur={(e) => validate({ content: e.index })}
                modules={modules}
                style={{ height: "118px" }}
              />
            </Box>

            {/* <SoftButton variant="gradient" color="dark">Add product</SoftButton> */}
          </SoftBox>
        </Container>
      </Box>
      <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5 }}>
        <AddProductTitle title={"Product Specifications"}  switch={controls.switchSpecifications} func={()=>setControl("switchSpecifications",!controls.switchSpecifications)}/>
        {controls.switchSpecifications&& <TableContainer component={Paper} sx={{ boxSizing: "border-box" }}>
      <Table sx={{ margin:"20px 24px 24px 24px",width:"94%"   }} aria-label="simple table">
        <TableHead  sx={{display: "table-header-group"}}>
          <TableRow sx={{backgroundColor:"#E5E7E8"}}>
            <TableCell sx={{width:"50%"}}>key</TableCell>
            <TableCell sx={{width:"50%"}}>value</TableCell>
            <TableCell ></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {controls?.specifications&&controls?.specifications?.map((ele,index)=><TableRow key={index}>
            <TableCell >{ele?.key}</TableCell>
            <TableCell >{ele?.value}</TableCell>
            <TableCell ><DeleteIcon onClick={()=>DeleteSpecification(ele)}/></TableCell>

            </TableRow>)}
          {key&&<TableRow>
            <TableCell align="right"><SoftInput placeholder='key'
                                        sx={{ ".MuiInputBase-root": { border: `unset`, padding: "0px !important" }, }}
                                        value={controls.key}
                                        // onChange={(e) => setControl("key", [...controls.key,e.target.value])}
                                        onChange={(e) => setControl("key",
                                            e.target.value)}
                                        required={required.includes("key")}
                                        error={Boolean(invalid?.key)}
                                        helperText={invalid?.key} /></TableCell>
            <TableCell align="right"><SoftInput placeholder='value'
                                        sx={{ ".MuiInputBase-root": { border: `unset`, padding: "0px !important" }, }}
                                        value={controls.value}
                                        // onChange={(e) => setControl("value", [...controls.value,e.target.value])}
                                        onChange={(e) => setControl("value",
                                            e.target.value)}
                                        required={required.includes("value")}
                                        error={Boolean(invalid?.value)}
                                        helperText={invalid?.value}/></TableCell>
            <TableCell align="right"><DeleteIcon/></TableCell>

            </TableRow>}
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
        <TableFooter>
        <TableFooter>
                        <TableRow>
                            <TableCell align="right"><span style={{fontWeight: 'bold',textDecoration: "underline",color:(theme)=>theme.palette.purple.middle,cursor:'pointer'}} onClick={()=>addKey()}>Add key </span></TableCell>
                            <TableCell align="right"><span style={{fontWeight: 'bold'}}></span></TableCell>
                            {/* <TableCell /> */}
                        </TableRow>
                    </TableFooter>
          </TableFooter> 
      </Table>
    </TableContainer>}
       
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
          <InputField
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
          <InputField
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
          <InputField
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
              flexDirection:{lg:'row',md:"column",sm:"column",xs:"column"},
              alignItems: "center",
              gap: "20px",
            }}
          >
            <SelectValueWeight
              variant="outlined"
              label={"Weight*"}
              placeholder={"Weight"}
              type={typeof controls.weight === 'object'?String(controls.weight.unit):controls.weight_unit}
              value={typeof controls.weight === 'object'?String(controls.weight.value):String(controls.weight)}
              onChange={(e) => setControl("weight_unit", e.target.value)}
              handleValueChange={(e) => setControl("weight", e.target.value)}
              required={required.includes("weight")}
              error={Boolean(invalid.weight)}
              helperText={invalid.weight}
               sx={{...input,".MuiOutlinedInput-root":{width:"40vw !important"}}}
              
            /> 
            <InputField
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
              value={String(controls.maximum_order_quanitity)}
              onChange={(e) => setControl("maximum_order_quanitity", e.target.value)}
              required={required.includes("maximum_order_quanitity")}
              error={Boolean(invalid.maximum_order_quanitity)}
              helperText={invalid.maximum_order_quanitity}
              sx={input}
            />

            {/* <NumberField
              variant="outlined"
              label={"Minimum stock quantity*"}
              placeholder={"Minimum stock quantity"} 
              // value={String(controls.minimum_stock_quantity)}
              // onChange={(e) => setControl("minimum_stock_quantity", e.target.value)}
              // required={required.includes("minimum_stock_quantity")}
              // error={Boolean(invalid.minimum_stock_quantity)}
              // helperText={invalid.minimum_stock_quantity}
              sx={input}
           /> */}
          </Box>
        </Container>
      </Box>
      <Box sx={{display:'flex',flexDirection:{lg:'row',md:"column",sm:"column",xs:"column"},gap:'20px',width:'100%'}}>
      <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "338px",width:'100%', pb: 4, mt: 2.5, }}>
        <AddProductTitle title={"Additional info"} />
        <Container sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}>
          <NumberField
            variant="outlined"
            label={"Purchase price"}
            placeholder={"Purchase price"}
            value={String(controls?.purchase_price)}
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
            value={String(controls.price)}
            onChange={(e) => setControl("price", e.target.value)}
            required={required?.includes("price")}
            error={Boolean(invalid?.price)}
            helperText={invalid?.price}
            sx={input}
          />
           {/* <NumberField
            variant="outlined"
            label={"shipping price"}
            placeholder={"99 EGP"}
            value={String(controls.custom_shipping_price)}
            onChange={(e) => setControl("custom_shipping_price", e.target.value)}
            required={required?.includes("custom_shipping_price")}
            error={Boolean(invalid?.custom_shipping_price)}
            helperText={invalid?.custom_shipping_price}
            // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
            sx={input}
            borderBottom="none"
          />  */}
        </Container>
      </Box>
      <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "338px",width:'100%', pb: 4, mt: 2.5 }}>
        <AddProductTitle title={"Discount details (Optional)"} />
        <Container sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}>
           <SelectValue
            variant="outlined"
            label={"Discount"}
            handleValueChange={(e) => setControl("discount", e.target.value)}
            onChange={(e) => setControl("is_percentage_discount", e.target.value)}
            value={String(controls.discount)}
            type={controls.is_percentage_discount}
            required={required.includes("discount")}
            error={Boolean(invalid.discount)}
            helperText={invalid.discount}
            sx={input}
          /> 
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0em",
                textAlign: "left",
                mb:'6px'
              }}
            >
              Start date*
            </Typography>
             <DatePickerField
              value={controls.discount_start_date}
              onChange={(newvalue) => {setControl("discount_start_date", newvalue);console.log(newvalue)}}
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
                mb:'6px'
              }}
            >
              End date*
            </Typography>
           <DatePickerField
              value={controls.discount_end_date}
              onChange={(e) => setControl("discount_end_date", e)}
            /> 
          </Box>
        </Container>
      </Box>
      <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "338px",width:'100%', pb: 4, mt: 2.5 }}>
        <AddProductTitle title={"Toggles"} />
        <Container>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}>
            <Box >
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
                    
                  checked={controls?.in_taxes}
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
                  checked={controls?.is_published}
                    onChange={(e) => setControl("is_published", e.target.checked)}
                    
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
                  checked={controls?.require_shipping}
                    onChange={(e) => setControl("require_shipping", e.target.checked)}
                    
                    color="secondary"
                  />
                }
              />
            </Box>
           
          </Box>
        </Container>
      </Box>
      </Box>
      <Box mt={"20px"}>
      <PictureField
              value={controls.main_image}
              onChange={(e) => setControl("main_image",e)}
              productName={controls?.name}
              categories={controls?.categories}
              description={controls.description}
            />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: "24px" }}>
      <SoftButton variant="contained" color="white"sx={{mx:"20px"}} onClick={() =>{resetControls(); navigate(`/${sub_domain}/dashboard/products`)}}>
                        {"cancel"}
                    </SoftButton>
        <SoftButton
          type="submit"
          variant="gradient"
          disabled={Boolean(productId)?patchProductResponce.isPending:AddProductResponce.isPending}
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
           
          {Boolean(productId)?patchProductResponce.isPending?<CircularProgress />:"Next":AddProductResponce.isPending?<CircularProgress />:"Next"}
        </SoftButton>
        
      </Box>
      {AddProductResponce.failAlert}
      {AddProductResponce.successAlert}
    </>
  );
};

export default AddProduct;
