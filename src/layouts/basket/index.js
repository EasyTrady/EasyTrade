import React, { useRef } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataGridCustom from 'components/common/DateGridCustomer';
import useRequest from 'hooks/useRequest';
import { CARTLEFT, PRODUCTS, SENDEMAILPRODUCT } from 'data/api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Container, Radio, FormControlLabel, RadioGroup, FormLabel, Paper, Box, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography, Autocomplete, ListItemText, Chip } from '@mui/material';
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
function Basket({ absolute, light, isMini }) {
  let Token = localStorage.getItem('token')
  let carts = useSelector((state) => state.cart.value)
  let products = useSelector((state) => state.products.value)
  const route = useLocation().pathname.split("/").slice(1);
  const formDate = new FormData()
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
        control: "title",
        value: "",
        isRequired: true,
        
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
            customValidation: (controls) => controls.Products.length <= 2,
            message: "Maximum three products.",
          }
        ]
      }, {
        control: "banner",
        value: "",
        isRequired: false,
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
        position: "relative"
      }}
      >
        {row.products.map((ele,index) =>
          // ele.images.map((elem, index) =>
            <> <Tooltip arrow title={ele?.name ? ele?.name : ""} className="">
              <Paper key={index} elevation={3} sx={{
                backgroundImage: `url(${ele?.main_image})`,
                backgroundColor: "unset !important", width: "64px", height: "64px",
                position: "absolute",
                left: `${index === 0 ? 0 : 20 * (index)}px`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }} >
                {console.log(ele?.name)}
              </Paper>
            </Tooltip>
            </>

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
      width: 300,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => <Box>
        <Typography variant={"h6"} sx={{ color: (theme) => theme.palette.black.main, marginTop: "10px" }}>{params.row.customer_name}</Typography>
        <Typography variant={"p"} sx={{ color: (theme) => theme.palette.grey[500], marginTop: "10px" }}>{params.row.customer_phone}</Typography>
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
      width: 300,
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
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h6"} sx={{
          fontSize: "14px",
          backgroundColor: (theme) => params.row.is_notified_before ? theme.palette.success.hover : theme.palette.error.hover,
          marginTop: "10px", borderRadius: "5px", padding: "10px", color: (theme) => params.row.is_notified_before ? theme.palette.success.main : theme.palette.error.main
        }}>
          {params.row.is_notified_before ? <Typography variant={"p"}>Notified</Typography> : <Typography variant={"p"}>Not notified</Typography>}
        </Typography>
      </Box>,
      filterable: false,
      disableColumnMenu: true
    }
    ,
    {
      field: 'total',
      headerName: 'total price',
      type: 'text',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h6"} sx={{ color: (theme) => theme.palette.primary, marginTop: "10px" }}>{params.row.total}EGP</Typography>
      </Box>,
      filterable: false,
      disableColumnMenu: true
    },
    {
      field: 'sub_total',
      headerName: 'sub total',
      type: 'text',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h6"} sx={{ color: (theme) => theme.palette.primary, marginTop: "10px" }}>{params.row.sub_total}EGP</Typography>
      </Box>,
      filterable: false,
      disableColumnMenu: true
    },
    // {
    //   field: 'total_shipping_price',
    //   headerName: 'total shipping price',
    //   type: 'text',
    //   flex:1,
    //   align: 'left',
    //   headerAlign: 'left',
    //   editable: true,
    //   filterable: false,
    //  disableColumnMenu: true
    // },
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
    formDate?.append("banner", e.target.files[0])
    setControl("banner", JSON.stringify(e.dataTransfer.files[0]))
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
    formDate?.append("banner", e.target.files[0])

    setControl("banner", e.target.files[0])
    console.log(e.target.files[0])
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
  const handleSubmit = (e) => {
    e.preventDefault();
    validate().then((isOk) => {
      console.log(controls.banner)
      if (!isOk) return;

      controls?.Products?.map((ele) => formDate.append("products[]", ele.id))
      formDate.append('customers[]', openDialog?.row?.customer_id)
      //   for (var i = 0; i < .length; i++) {
      //     formDate.append('customers[]', [openDialog.row.customer_id][i]);
      // }
      // formDate.append("customers",JSON.stringify([openDialog.row.customer_id]))
      formDate?.append("body", controls?.describution)
      formDate?.append("title", controls?.title)

      SendEmailProductRequest({
        body: formDate
        , onSuccess: (res) => {
          console.log(res.data)
          resetControls()
          setOpenDialog(null)
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
  useEffect(() => { }, [imageData])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox mb={{ xs: 1, md: 0 }} sx={{ textAlign: "right" }}>
          <Button onClick={() => window.print()} sx={{
            backgroundColor: "white !important",
            color: "black !important", marginX: "10px", padding: "13px 16px"
          }}><LocalPrintshopIcon /> Print</Button>
        </SoftBox>
        <DataGridCustom
          rows={rows}
          columns={columns} checkboxSelection={true}
          // onDelete={() => { }}
          sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
          onNotify={(ele) => { setOpenDialog(ele); console.log(ele, "row") }}
          rowsPerPageOptions={[5, 10, 15, 20]}
          loading={getCartResponce.isPending}
          //  onState={onDelete}
          onPaginationModelChange={setPaginationModel}
        />
        <Dialog
          open={Boolean(openDialog)}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ "div.MuiPaper-root": { minWidth:  "37%"} }}
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
              padding: "0", fontWeight: 400,
              fontSize: "14px",
              color: "gray",
            }}>
              {t("descributionEmail")}</DialogTitle>


            <DialogContent sx={{ padding: 0 }}>
              <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", marginBottom: "10px", }}
              >{t("emailTitle")}</Typography>
              <SoftInput
                placeholder='title'
                value={controls.title}
                onChange={(e) => setControl("title", e.target.value)}
                required={required.includes("title")}
                error={Boolean(invalid.title)}
                helperText={invalid.title}
                sx={{ border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important", borderRadius: "8px" }}
              // sx={input}
              />

              <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", marginBottom: "10px" }}

              >{t("describe")}</Typography>

              <Typography component="textarea" sx={{ backgroundColor: "black", padding: "10px", border: "1px solid #80808054", width: "100%", fontSize: "14px", borderRadius: "8px" }}
                required={required.includes("describution")}
                onChange={(e) => setControl("describution", e.target.value)}
                error={Boolean(invalid.describution)}
                helperText={invalid.describution}
              >

              </Typography>



              <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "14px" }}>{t("contentType")}</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={controls.content_type}
                sx={{ marginX: "20px" }}
                onChange={(e) => { setControl("content_type", e.target.value); }}
              >
                <FormControlLabel value={t("Banner")} control={<Radio />} label={t("Banner")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" } }} />
                <FormControlLabel value={t("Multipleproducts")} control={<Radio />} label={t("Multipleproducts")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" } }} />

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
                  overflow: "hidden"
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
                        onChange={handleChange}
                        accept="image/*"
                        sx={{ display: "none" }}
                        ref={imageRef}
                      /> <Typography onClick={() => imageRef.current.click()} component={"a"}
                        sx={{ cursor: "pointer", color: (theme) => theme.palette.blue.light, fontSize: "14px" }}> select  click to browse </Typography>

                    </>
                  )}
                </Typography> : controls.content_type === "Multiple products" ? <>
                  <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "14px", }}>{t("SelectProducts")}</FormLabel>

                  {/* <Autocomplete
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
                    <Typography sx={{ color: "gray", fontSize: "14px !important",marginX:"14px" }} variant={"p"}>{option?.name}</Typography>
                  </li>)}
                  multiple
                  renderInput={(params) => {
                    return <TextField
                      variant={"standard"}
                      {...params}
                     
                    />
                  }}
                  helperText={invalid.Products}
                  sx={{".MuiInputBase-root::before": { content: "none" }}}
                /> */}
                  <SoftInput
                    select
                    value={controls.Products}
                    icon={{ component: <ExpandMoreIcon />, direction: "right" }}
                    sx={{ ".MuiInputBase-root": { border: "unset" }, color: "#959FA3" }}
                    onChange={(e) => { setControl("Products", [...controls?.Products?.map((elem) => elem.id), e.target.value].map((ele) => products?.results.find((elem) => elem.id === ele))); validate() }}
                    required={required.includes("Products")}
                    error={Boolean(invalid?.Products)}
                    helperText={invalid?.Products}
                    // onOpen={()=>requestProduct()}
                    SelectProps={{
                      defaultValue: "",
                      displayEmpty: true,
                      // onOpen: onOpen,
                      // onClose: onClose,
                      renderValue: (selected) => {
                        if (!Boolean(selected)) {
                          return (
                            <Typography sx={{ opacity: "0.42", fontSize: "14px", color: "#959FA3" }} variant="p">
                              {"Vendor"}
                            </Typography>
                          );
                        } else {
                          console.log(selected)
                          return products?.results?.find((ele) => ele.id === selected)?.name;
                        }
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
                    {console.log(controls.Products)}
                    {/* {controls.Products.map((ele)=>products?.results.find((elem)=>elem.id===ele))} */}
                    {products?.results?.map((ele) => <MenuItem value={ele.id} key={ele.id}>{ele.name}</MenuItem>)}
                  </SoftInput>
                  {controls.Products.map((ele, index) => index <= 2 ? <SoftBox key={ele} sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginY: "10px"
                  }}>
                    <SoftBox sx={{ display: "flex", alignItem: "center" }}>
                      <Avatar src={ele?.main_image} />
                      <Typography sx={{ color: "gray", fontSize: "14px !important", marginX: "10px" }} variant={"span"}>{ele?.name}</Typography>
                    </SoftBox>
                    <Button key={ele} onClick={() => setControl("Products", controls.Products.filter((elem) => elem?.id != ele?.id))}> <DeleteIcon sx={{ color: (theme) => theme.palette.error.main }} /></Button>
                  </SoftBox> : <></>
                  )}

                </> : <></>}

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