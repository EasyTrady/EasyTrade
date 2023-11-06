import React, { useRef } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataGridCustom from 'components/common/DateGridCustomer';
import useRequest from 'hooks/useRequest';
import { CARTLEFT, PRODUCTS,SENDEMAILPRODUCT } from 'data/api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { Avatar, Container,Radio, FormControlLabel, RadioGroup, FormLabel, Paper, Box, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography, Autocomplete, ListItemText, Chip } from '@mui/material';
import SoftInput from 'components/SoftInput'
import useControls from 'hooks/useControls'
import input from "assets/theme/components/form/input";
import { useTranslation } from 'react-i18next';
import CollectionsIcon from '@mui/icons-material/Collections';
import SoftBox from "components/SoftBox";
import Form from 'components/common/Form';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Breadcrumbs from 'examples/Breadcrumbs'
import { useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
function Basket({absolute, light, isMini}) {
  let Token = localStorage.getItem('token')
  let carts = useSelector((state) => state.cart.value)
  let products = useSelector((state) => state.products.value)
  const route = useLocation().pathname.split("/").slice(1);

  let dispatch = useDispatch()
  let { t } = useTranslation('common')
  const [openDialog, setOpenDialog] = React.useState(null);
  const [Products, setProducts] = React.useState([]);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [isHovered, setIsHovered] = useState(false);
  let imageRef = useRef()
  let [rows, setRows] = useState([])
  const [imageData, setImageData] = useState("");
  const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
    useControls([
      {
        control: "email",
        value: "",
        isRequired: true,
        validations: [
          {
            test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: t("notvalidemail")
          },
        ]
      }, {
        control: "describution",
        value: "",
        isRequired: true,
        validations: [
          {
            test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
            message: "not valid valuesType"
          }
        ]
      }, {
        control: "content_type",
        value: "",
        isRequired: true,
      }, {
        control: "Products",
        value: [],
        isRequired: false,
        validations: [
          {
            customValidation: (controls) => controls.Products<=3,
            message:"Maximum three products.",
          }
        ]
      }

    ]);
  const handleMouseEnter = () => {
    console.log(isHovered)
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const renderImageCell = (params) => {
    const { row } = params;
    return (<>


      <Box sx={{
        display: "flex",
        alignItems: "center",
        position:"relative"
      }}
      >
        {row.products.map((ele) =>
          ele.images.map((elem, index) =>
            <> <Tooltip arrow title={ele?.name ? ele?.name : ""} className="">
              <Paper key={index} elevation={3} sx={{
                backgroundImage: `url(${elem?.image})`,
                backgroundColor: "unset !important", width: "40px", height: "40px",
                position: "absolute",
                left: `${index === 0 ? 0 : 20 * (index)}px`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }} >
                {console.log(ele?.name)}
              </Paper>
            </Tooltip>
            </>)

        )}
      </Box>


      {/* {row?.images?.map((ele)=>)} */}

    </>
    );
  };
  const columns = [
    {
      field: 'id',
      headerName: 'Order Id',
      type: 'image',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      // renderCell: renderImageCell,
      editable: false,
      filterable: false,
     disableColumnMenu: true
      // renderEditCell:renderEditImageCell
    },
    {
      field: 'Client',
      headerName: 'Client',
      type: 'image',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params)=><Box>
         <Typography variant={"h6"} sx={{ color: (theme)=>theme.palette.black.main, marginTop: "10px" }}>{params.row.customer_name}</Typography>
         <Typography variant={"p"} sx={{ color: (theme)=>theme.palette.grey[500], marginTop: "10px" }}>{params.row.customer_phone}</Typography>
      </Box>,
      editable: false,
      filterable: false,
     disableColumnMenu: true
      // renderEditCell:renderEditImageCell
    },
    {
      field: 'Products',
      headerName: 'Products',
      type: 'image',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      renderCell: renderImageCell,
      editable: false,
      filterable: false,
     disableColumnMenu: true
      // renderEditCell:renderEditImageCell
    }
    , {
      field: 'Type',
      headerName: 'Type',
      type: 'text',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h6"} sx={{ fontSize:"14px",
        backgroundColor:(theme) =>params.row.is_notified_before? theme.palette.success.hover:theme.palette.error.hover,
         marginTop: "10px",borderRadius:"5px",padding:"10px",color:(theme) =>params.row.is_notified_before? theme.palette.success.main:theme.palette.error.main }}>
          {params.row.is_notified_before? <Typography variant={"p"}>active</Typography>:<Typography variant={"p"}>in active</Typography>}
          </Typography>
      </Box>,
       filterable: false,
      disableColumnMenu: true
    }
    ,
    {
      field: 'total_price',
      headerName: 'total price',
      type: 'text',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h6"} sx={{ color: (theme) => theme.palette.primary, marginTop: "10px" }}>{params.row.total_price}EGP</Typography>
      </Box>,
       filterable: false,
      disableColumnMenu: true
    },
    {
      field: 'total_shipping_price',
      headerName: 'total shipping price',
      type: 'text',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      filterable: false,
     disableColumnMenu: true
    },
    // {
    //     field: 'job',
    //     headerName: 'job',
    //     type: 'text',
    //     width: 200,
    //     align: 'left',
    //     headerAlign: 'left',
    //     editable: true,
    // },
  ]


  const [cartRequest, getCartResponce] =
    useRequest({
      path: CARTLEFT,
      method: "get",
      Token: `Token ${Token}`
    });
  const [productRequest, getproductResponce] =
    useRequest({
      path: PRODUCTS,
      method: "get",
      Token: `Token ${Token}`
    });
    const [SendEmailProductRequest, getsendemailproductResponce] =
    useRequest({
      path: SENDEMAILPRODUCT,
      method: "post",
      Token: `Token ${Token}`
    });
    
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const  handleSubmit=(e)=>{
    e.preventDefault();
    validate().then(( isOk ) => {
      console.log(openDialog)
      if (!isOk) return;
      SendEmailProductRequest({
        body:{
          "products":controls?.Products.map((ele)=>ele.id),
          "customers":[openDialog.row.customer_id],
          "body":controls?.describution,
          "title":controls?.email
        }
      })
    })
    
  }

  useEffect(() => {
    cartRequest({
      onSuccess: (res) => {
        // console.log(res.data)
        dispatch({ type: "cart/set", payload: { ...res.data } })

      }
    })
    productRequest({
      onSuccess: (res) => {
        console.log(res.data)
        dispatch({ type: "products/set", payload: res.data })
      }
    })
  }, [])
  useEffect(() => {
    setRows(carts?.results)
    console.log(products)
    setProducts(products?.results)
  }, [carts, products])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{p:2}}>
      <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
            </SoftBox>
            <SoftBox  mb={{ xs: 1, md: 0 }} sx={{textAlign:"right"}}>
            <Button onClick={()=>window.print()} sx={{backgroundColor:"white !important",color:"black !important",}}><LocalPrintshopIcon/> Print</Button>
      </SoftBox>
      <DataGridCustom
        rows={rows}
        columns={columns} checkboxSelection={true}
        // onDelete={() => { }}
        sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
        onNotify={(ele) => { setOpenDialog(ele); console.log(ele, "row") }}
        rowsPerPageOptions={[5, 10, 15, 20]}
       
        //  onState={onDelete}
        onPaginationModelChange={setPaginationModel}
      />
      <Dialog
        open={Boolean(openDialog)}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Form component="form"
          childrenProps={{
            saveBtn: {
              onClick: handleSubmit,
              disabled: getsendemailproductResponce.isPending,
              children: "send Email"
            },
            closeBtn: {
              onClick: () => {
                setOpenDialog(null)
                // handleClose()
                // resetControls();
              },
              disabled: getsendemailproductResponce.isPending,
            }, title: t("emailBasket")
          }}>

          <DialogTitle sx={{
            paddingY: "0", fontWeight: 400,
            fontSize: "14px",
            color: "gray",
          }}>
            {t("descributionEmail")}</DialogTitle>


          <DialogContent>
            <Typography variant={"label"} sx={{ display: "block" }}
            >{t("emailTitle")}</Typography>
            <SoftInput
              placeholder='email'
              value={controls.email}
              onChange={(e) => setControl("email", e.target.value)}
              required={required.includes("email")}
              error={Boolean(invalid.email)}
              helperText={invalid.email}
            // sx={input}
            />

            <Typography variant={"label"} sx={{ display: "block" }} 
            
            >{t("describe")}</Typography>

            <Typography component="textarea" sx={{ backgroundColor: "black",padding:"10px", border: "1px solid #80808054", width: "100%" ,fontSize:"14px"}}
              required={required.includes("describution")}
              onChange={(e) => setControl("describution", e.target.value)}
              error={Boolean(invalid.describution)}
              helperText={invalid.describution}
            >

            </Typography>



            <FormLabel id="demo-row-radio-buttons-group-label">{t("contentType")}</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={controls.content_type}
              onChange={(e) => { setControl("content_type", e.target.value); setImageData("") }}
            >
              <FormControlLabel value={t("Banner")} control={<Radio />} label={t("Banner")} sx={{ fontWeight: "400" }} />
              <FormControlLabel value={t("Multipleproducts")} control={<Radio />} label={t("Multipleproducts")} sx={{ fontWeight: "400" }} />

            </RadioGroup>
            {controls.content_type === "Banner" ?
              <Typography component={"div"} sx={{
                width: "100%",
                height: "20vh",
                border: "1px dashed gray",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }} onDrop={handleDrop} onDragOver={handleDragOver} >
                {imageData ? (
                  <><Typography component={"input"} type="file"
                    onChange={handleChange}
                    accept="image/*"
                    sx={{ display: "none" }}
                    ref={imageRef}
                  />
                    <img src={imageData} alt="Dropped" onClick={() => imageRef?.current?.click()} />
                  </>
                ) : (
                  <><CollectionsIcon sx={{ color: "gray" }} />
                    <Typography sx={{ color: "gray", fontSize: "14px" }}>Drop your image here , or </Typography>
                    <Typography component={"input"} type="file"

                      accept="image/*"
                      sx={{ display: "none" }}
                      ref={imageRef}
                    /> <Typography onClick={() => imageRef.current.click()} component={"a"}
                      sx={{ cursor: "pointer", color: (theme) => theme.palette.blue.light, fontSize: "14px" }}> select  click to browse </Typography>

                  </>
                )}
              </Typography> :controls.content_type === "Multiple products"? <>
              <FormLabel id="demo-row-radio-buttons-group-label"sx={{fontSize:"14px"}}>{t("SelectProducts")}</FormLabel>
              
                <Autocomplete
                  loading={getproductResponce.isPending}
                  loadingText="..."
                  options={Products}
                  onChange={(e,options,reason) => {
                    switch (reason) {
                      case "selectOption":
                        setControl("Products", options.map((ele)=>ele))
                        break;
                        case "removeOption":
                          setControl("Products", options.map((ele)=>ele))
                          break;
                      case "clear":
                        setControl("Products", [])
                    }
                    // setControl("amenities_ids", options.map((ele)=>ele.value));
                  }}
                 
                  getOptionLabel={(option) => option.name}
                  getLimitTagsText={(more)=>`Maximum three products.`}
                  limitTags={3}
                  renderOption={(props, option) => (<li {...props}>
                   
                    <Avatar alt={option.name} src={option.main_image} sx={{ width: "20px", height: "20px" }} />
                    <ListItemText primary={option.name} />
                  </li>)}
                  multiple
                  renderInput={(params) => {
                    return <TextField
                      variant={"standard"}
                      {...params}
                     
                    />
                  }}
                  helperText={invalid.Products}
                />
            
                {controls.Products.map((ele,index)=>index<=2?<SoftBox key={ele} sx={{display:"flex",    justifyContent: "space-evenly",
    alignItems: "center",marginY:"10px"}}>
                  <Avatar src={ele?.main_image}/>
                  <Typography sx={{ color: "gray", fontSize: "14px" }}>{ele?.name}</Typography>
                 <Button  key={ele} onClick={()=> setControl("Products",controls.Products.filter((elem)=>elem?.id!=ele?.id))}> <DeleteIcon sx={{color:(theme)=>theme.palette.error.main}}/></Button>
                </SoftBox>:<></>
                )}
              
              </>:<></>}

          </DialogContent>
        </Form>
      </Dialog>
      </Container>
    </DashboardLayout>
  )
}

export default Basket
Basket.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Basket
Basket.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};