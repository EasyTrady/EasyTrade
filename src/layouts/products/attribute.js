import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, Dialog, Icon, InputLabel, List, ListItemButton, 
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
     Typography,Box,DialogTitle ,DialogContentText ,DialogContent ,DialogActions ,Button,Container,Divider  } from '@mui/material'
import SoftButton from 'components/SoftButton'
import { MainButton } from "styles/productStyle";
import { PrintButton } from "styles/productStyle";
import { useTranslation } from 'react-i18next';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DataGridCustom from 'components/common/DateGridCustomer'
import Form from 'components/common/Form'
import CustomPagination from 'components/common/Pagination'
import PasswordField from 'components/common/PasswordField'
import PhoneField from 'components/common/PhoneField'
import Checkbox from '@mui/material/Checkbox';
import { ATTRIBUTES } from 'data/api'
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { JOBS } from 'data/api'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import useControls from 'hooks/useControls'
import useRequest from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import input from "assets/theme/components/form/input";
import SoftInput from 'components/SoftInput'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// import SoftInput from "components/SoftInput";
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
function Attribute({ absolute, light, isMini }) {
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogEdit, setOpenDialogEdit] = React.useState(false);

    const sub_domain = localStorage.getItem('sub_domain')
    let dispatch = useDispatch()
   let {t}= useTranslation("common")
    const route = useLocation().pathname.split("/").slice(1);
    let attributes = useSelector((state) => state.attribute.value)
    let [rows, setRows] = useState([])
    const [openValue, setOpenValue] = React.useState(true);
    const [columns,setColumns]=React.useState([
        {
            field: 'name',
            headerName: 'Attribute Name',
            type: 'text',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"column"} >
                    <Typography component={"p"} sx={{fontSize:"14px"}}>{row.name}</Typography>
                    {/* <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography> */}
                </Stack>
                );
            },
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'values',
            headerName: 'values',
            type: 'text',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params)=>params?.row?.values?.map((ele)=>ele.iscolor?<Box key={ele.id}sx={{
                display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor:(theme)=>theme.palette.purple.hover,
    color:(theme)=>theme.palette.purple.middle,
    borderRadius: "10px",
   fontSize:"12px",
    width: "14%",
    margin: "10px",
            }}><Typography component={"span"} sx={{width:"10px",height:"10px",
            backgroundColor:ele.color_value,display:"inline-block",borderRadius:"50%"}}></Typography>{ele.value_name}</Box>:<>
            <Box key={ele.id}sx={{
                display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:(theme)=>theme.palette.purple.hover,
    color:(theme)=>theme.palette.purple.middle,
   fontSize:"12px",

    borderRadius: "10px",
    width: "14%",
    margin: "10px",
            }}><Typography component={"span"} sx={{width:"10px",height:"10px",
            display:"inline-block",borderRadius:"50%"}}></Typography>{ele.value_name}</Box>
            </>),
            editable: false,
            // renderEditCell:renderEditImageCell
        }


    ])
    const handleClick = () => {
        setOpenValue(!openValue);
    };
    let Token = localStorage.getItem('token')
    const shop_name = localStorage.getItem('shop_name')
    let navigate = useNavigate()
    const [attributeRequest, getattributeResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "get",
            Token: `Token ${Token}`
        });
    const [attributepostRequest, postattributeResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "post",
            Token: `Token ${Token}`
        });
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {
                control: "name",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            },  {
                control: "english_name",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            },{
                control: "value_type",
                value: "value",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid valuesType"
                    }
                ]
            },{
                control: "values",
                value:[],
                isRequired: false,
               
            }

        ]);
    const [attributeDeleteRequest, DeleteattributerResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "delete",
            Token: `Token ${Token}`
        });
        const [attributeValueRequest, getattributeValueResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "get",
            Token: `Token ${Token}`
        });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseDialog = () => {
        if(openDialogEdit){
            setOpenDialogEdit(false)
        }
        setOpenDialog(false);
    };
    function handleSubmit() {
        console.log("submit")
        validate().then((output) => {
            console.log(output)
            if (!output.isOk) return;
            attributepostRequest({
                body: controls,
                onSuccess: (res) => {
                    dispatch({ type: "attribute/addItem", payload: res.data })
                    console.log(res.data, controls)
                }
            }).then((res) => {
                let response = res?.response?.data;
                console.log(res)

                setInvalid(response);

            });
        })

    }
  
    function onDelete(row) {
        attributeDeleteRequest({
            id: row,
            onSuccess: () => {
                dispatch({ type: "attribute/deleteItem", payload: { id: row } })
            }
        })
    }
    // const columns = [
    //     {
    //         field: 'name',
    //         headerName: 'Name',
    //         type: 'text',
    //         width: 500,
    //         align: 'left',
    //         headerAlign: 'left',
    //         renderCell: (params) => {
    //             const { row } = params;
    //             return (<Stack direction={"column"} >
    //                 <Typography component={"p"}>{row.name}</Typography>
    //                 {/* <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography> */}
    //             </Stack>
    //             );
    //         },
    //         editable: false,
    //         // renderEditCell:renderEditImageCell
    //     }
    //     , {
    //         field: 'value',
    //         headerName: 'value',
    //         type: 'text',
    //         width: 500,
    //         align: 'left',
    //         headerAlign: 'left',
    //         // renderCell: renderImageCell,
    //         editable: false,
    //         // renderEditCell:renderEditImageCell
    //     }


    // ]
    const MyCustomNoRowsOverlay = () => (
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
    );
    function onEdit(id,newRow){
        setOpenDialog(!openDialog);
        setOpenDialogEdit(true);
      const rowfind=rows.find((row) => row.id === id)
        Object.keys(controls)?.map((ele)=>rowfind[ele]?setControl(ele,rowfind[ele]):null)
      console.log(rowfind,controls)

    }
    useEffect(() => {
        attributeRequest({
            onSuccess: (res) => {
                dispatch({ type: "attribute/set", payload: res.data })
                res.data.map((ele)=> attributeValueRequest({
                    id:ele.id +"/values",
                    onSuccess: (res) => {

                        dispatch({ type: "attribute/addValues", payload: { idattribute: ele.id, values: res.data } })
                        
                    }
                }))
                
            }
        })
    }, [])
    useEffect(() => {
        setRows(attributes)
        // setColumns((prevs)=>console.log({...prevs,value:attributes.values}))
        console.log(attributes)
    }, [attributes])
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container sx={{ p: 2 }}>
             <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                 <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
             </SoftBox>
        
             <SoftBox mb={{
                    xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
                    alignItems: "center"
                   }} sx={{ textAlign: "right" }}>
                    <Button onClick={() => window.print()}
                     sx={{
                        backgroundColor: "white !important",
                        color: "black !important", marginX: "10px", padding: "13px 16px"
                    }}>
                        <LocalPrintshopIcon />
                         Print
                    </Button>
                     <Divider orientation="vertical" sx={{width:'1px',height:"72px"}}/>

                    <SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            },padding:"7px 16px 7px 16px"
                        }}
                        onClick={() => {setOpenDialog(true);setOpenDialogEdit(false)}}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("addnewattribute")}
                    </SoftButton>
                </SoftBox>
                <Dialog open={open} onClose={handleClose}>
                  <Form component="form"
                     childrenProps={{
                        saveBtn: {
                            // onClick: handleSubmit,
                            // disabled: postattributeResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                // handleClose()
                                // resetControls();
                            },
                            // disabled: postattributeResponce.isPending,
                        }, title: "add attribute"
                       }}>
                    {/* <TextField

                        // id="filled-size-small"
                        placeholder='name'
                        variant="standard"
                        size="small"
                        value={controls.name}
                        onChange={(e) =>
                            setControl("name", e.target.value)
                        }
                        required={required.includes("name")}
                        error={Boolean(invalid?.name)}
                        helperText={invalid?.name}
                    /> */}
                    
                    {/* <TextField

                        // id="filled-size-small"
                        placeholder='valuesType'
                        variant="standard"
                        size="small"
                        value={controls.value_type}
                        onChange={(e) =>
                            setControl("value_type", e.target.value)
                        }
                        required={required.includes("value_type")}
                        error={Boolean(invalid?.value_type)}
                        helperText={invalid?.value_type}
                    /> */}

                     <InputLabel sx={{ fontSize: "16px" }}>value</InputLabel>
                    <Select label='value'
                        value={controls.value_type}
                        sx={{ ".MuiSelect-select": { width: "100% !important" } }}
                        onChange={(e) =>
                            setControl("value_type", e.target.value)
                        }
                        required={required.includes("value_type")}
                        error={Boolean(invalid?.value_type)}
                        helperText={invalid?.value_type}
                    >
                        <MenuItem value={"text"} >
                            text
                        </MenuItem >
                        <MenuItem value={"image"} >
                            image
                        </MenuItem >
                        <MenuItem value={"color"} >
                            color
                        </MenuItem >
                    </Select>

                    {/* <PictureField placeholder={"add image profile"}
                        error={Boolean(invalid.image)}
                        helperText={invalid.image}
                        required={required.includes("image")}
                        label={"profile"} accept={"image/*"} onChange={handleImageChange} value={selectedImage} /> */}
                </Form>


            </Dialog>
            
            <DataGridCustom
                rows={rows}
                onDelete={onDelete}
                onEdit={onEdit}
                columns={columns}
                checkboxSelection={true}
                onRowClick={(e) => { console.log({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
                // sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                // onEdit={onEdit}
                rowHeight={100}
                // slots={{
                //     noRowsOverlay: MyCustomNoRowsOverlay
                // }}

            />
            
             <Dialog
             open={openDialog}
               onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
             >
             <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            // onClick: handleSubmit,
                            // disabled: postjobResponce.isPending,
                            

                        },
                        closeBtn: {
                            onClick: () => {
                                // handleClose()
                                // resetControls();
                            },
                            // disabled: postjobResponce.isPending,
                        }, 
                        title:openDialogEdit? t("editattribute"):t("addnewattribute")
                    }}>
                          <DialogTitle sx={{
                    padding: "0", fontWeight: 400,
                   fontSize: "14px",
                    color: "gray",
                  }}>
                   {t("descributionAttribute")}</DialogTitle>
                   <Typography variant={"label"} sx={{ display: "block",fontSize: "14px",marginBottom:"5px" }}
                      >{t("Attributename")}
                      </Typography>
                      <SoftInput
                      placeholder='Attribute name'
                  sx={{ ".MuiInputBase-root": { border: `1px solid !important`,borderColor:(theme)=>theme.palette.grey[400]+"!important" },}}
                      value={controls.name}
                   onChange={(e) => setControl("name", e.target.value)}
                 required={required.includes("name")}
                 error={Boolean(invalid.name)}
                     helperText={invalid.name}
            // sx={input}
            />
            <SoftButton sx={{    width: "max-content",
    padding: "5px",
    borderRadius: "50%",
    minWidth: "max-content",
    minHeight: "max-content",
    position: "absolute",
    left: "70%",
    top: "50%",
    zIndex: 1}} onClick={()=>{
        let copyName=controls.english_name;
        setControl("english_name", controls.name)
        setControl("name", copyName)
    }}>
            <SyncIcon/>
            </SoftButton>
            <SoftInput
              placeholder='English name'
              sx={{ ".MuiInputBase-root": { border: `1px solid !important`,borderColor:(theme)=>theme.palette.grey[400]+"!important" },}}
              value={controls.english_name}
              onChange={(e) => setControl("english_name", e.target.value)}
              required={required.includes("english_name")}
              error={Boolean(invalid.english_name)}
              helperText={invalid.english_name}
            // sx={input}
            />
            <SoftBox sx={{display:"flex"}}>
                   <Checkbox  />
        <Typography sx={{ fontSize: "14px" }} variant="span">
          {t("colorHex")}
        </Typography> 
                 </SoftBox>
                   <SoftBox sx={{border:"1px solid #8080807d",borderRadius:"8px",}}>
                  
            <Typography sx={{borderBottom:"1px solid #8080807d",fontSize:"14px",padding:"15px",height:"40px"}}>{controls.name}</Typography>
           
                {controls?.values?.map((ele)=><Typography key={ele.id}sx={{fontSize:"14px",
                display:"flex",
                borderBottom:"1px solid #8080807d"}}>
                    
                    {/* <Divider orientation="vertical" sx={{width:'1px',height:"50px",color:"#8080807d"}}/> */}
                 
                    
                    <TableCell align="left"sx={{width:"50%",borderRight:"1px solid #8080807d"}}>{ele.value_name}</TableCell>
                    <TableCell align="right" sx={{width:"50%"}}><DeleteIcon sx={{ color: (theme) => theme.palette.error.main }} /></TableCell>
             </Typography>)}
                 <SoftBox sx={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                    <Typography sx={{fontSize:"14px",padding:"15px",height:"40px",color:(theme) => theme.palette.purple.middle,textDecoration: "underline !important"}} 
                    component="a"
                    >{t("Addvalue")}
                    </Typography>
                    <Typography sx={{fontSize:"14px",padding:"15px",height:"40px",color:(theme) => theme.palette.purple.middle,textDecoration: "underline !important"}} 
                    component="a"
                    >{t("ClearAll")}
                    </Typography>
                    </SoftBox>

          
                   </SoftBox>
                    {/* <PictureField placeholder={"add image profile"}
                        error={Boolean(invalid.image)}
                        helperText={invalid.image}
                        required={required.includes("image")}
                        label={"profile"} accept={"image/*"} onChange={handleImageChange} value={selectedImage} /> */}
                </Form>
      </Dialog>
            {getattributeResponce.failAlert}
            {postattributeResponce.failAlert}
            {DeleteattributerResponce.failAlert}
            </Container>
        </DashboardLayout>
    )
}

export default Attribute
Attribute.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
  };
  
  // Typechecking props for the Attribute
  Attribute.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
  };