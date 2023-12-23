import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, Container, Divider
} from '@mui/material'
import SoftButton from 'components/SoftButton'
import { MainButton } from "styles/productStyle";
import { PrintButton } from "styles/productStyle";
import { useTranslation } from 'react-i18next';
import SyncIcon from '@mui/icons-material/Sync';
// import TwoArrow from ""
import Permissition from "components/common/Permissition";
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
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import TwoArrow from 'examples/Icons/TwoArrow';
import DeleteIcon from 'examples/Icons/DeleteIcon';
import EditIcon from 'examples/Icons/EditIcon';
import usePermission from 'utils/usePermission';
function Attribute({ absolute, light, isMini }) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
    let [addvalue, setaddvalue] = React.useState(false);
    let [Blurvalue, setblurvalue] = React.useState(false);
    let [indexedit, setindexedit] = React.useState(0);
    let permissionYour = useSelector((state) => state.permissionYour.value)
    let {isPermitted}=usePermission()
    let dispatch = useDispatch()
    let { t } = useTranslation("common")

    const route = useLocation().pathname.split("/").slice(1);
    let attributes = useSelector((state) => state?.attribute?.value)
    let [rows, setRows] = useState([])
    const [openValue, setOpenValue] = React.useState(true);
    const [columns, setColumns] = React.useState([
        {
            field: 'name',
            headerName: 'Attribute Name',
            type: 'text',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"column"} >
                    <Typography component={"p"} sx={{ fontSize: "14px" }}>{row.name}</Typography>
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
            width: 700,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => params?.row?.values?.map((ele) => ele.iscolor ? <Box key={ele.id} sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: (theme) => theme.palette.purple.hover,
                color: (theme) => theme.palette.purple.middle,
                borderRadius: "10px",
                fontSize: "12px",
                padding: "5px 16px 5px 16px",
                // width: "14%",
                margin: "10px",
            }}><Typography component={"span"} sx={{
                width: "10px", height: "10px",
                backgroundColor: ele.color_value, display: "inline-block", borderRadius: "50%", marginX: "10px"
            }}></Typography>{ele.value_name}</Box> : <>
                <Box key={ele.id} sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: (theme) => theme.palette.purple.hover,
                    color: (theme) => theme.palette.purple.middle,
                    fontSize: "12px",
                    padding: "5px 16px 5px 16px",
                    borderRadius: "10px",
                    // width: "14%",
                    margin: "10px",
                }}><Typography component={"span"} sx={{
                    width: "10px", height: "10px",
                    display: "inline-block", borderRadius: "50%"
                }}></Typography>{ele.value_name}</Box>
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
            Token: `Token ${Token}`,
            successMessage: t("addnewattributemessage")
        });
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {
                control: "id",
                value: "",
                isRequired: false,

            },
            {
                control: "values",
                value: [],
                isRequired: false,

            },
            {
                control: "value_name",
                value: "",
                isRequired: false,

            },
            {
                control: "color_value",
                value: "",
                isRequired: false,
                validations: [
                    {
                        test: /^(?:#[0-9]{6})*$/,
                        message: "not valid color value"
                    }
                ]
            },
            {
                control: "name",
                value: "",
                isRequired: openDialogEdit ? false : true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            }, {
                control: "english_name",
                value: "",
                isRequired: false,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            }, {
                control: "value_type",
                value: "value",
                isRequired: false,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid valuesType"
                    }
                ]
            }, {
                control: "iscolor",
                value: false,
                isRequired: false,
            }

        ]);
    let [counter, setCounter] = React.useState(controls?.values?.length > 0 ? controls?.values?.length - 1 : controls?.values?.length);

    const [attributeDeleteRequest, DeleteattributerResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "delete",
            Token: `Token ${Token}`,
            successMessage: t("deleteattribute")
        });
    const [attributevalueDeleteRequest, DeletevalueattributerResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "delete",
            Token: `Token ${Token}`
        });

    const [editattributeValueRequest, ValueattributeeditResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "patch",
            Token: `Token ${Token}`,
            // contentType: "multipart/form-data",
        });
    const [attributeEditRequest, editattributeResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "patch",
            Token: `Token ${Token}`,
            // contentType: "multipart/form-data",
            successMessage: t("editattributesuccessfull")
        });
    const [attributeValueeditRequest, editValueattributeResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "patch",
            Token: `Token ${Token}`,
            // contentType: "multipart/form-data",
        });
    const [attributeValuePatch, PatchattributeValueResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "patch",
            Token: `Token ${Token}`
        });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseDialog = () => {
        if (openDialogEdit) {
            setOpenDialogEdit(false)
        }
        setOpenDialog(false);
    };
    function handleSubmit() {
       
        validate().then((output) => {
           
            if (!output.isOk) return;
            if (openDialogEdit) {
                attributeEditRequest({
                    id: controls.id,
                    body: {
                        name: controls.name,
                    }, onSuccess: (res) => {
                        dispatch({ type: "attribute/patchItem", payload: { id: controls.id, item: res.data } })
                        attributeValueeditRequest({
                            id: controls.id + "/values/bulkupdate",
                            body: controls.values.filter((ele) => Boolean(ele.id) == false),
                            onSuccess: (res) => {
                                
                                dispatch({ type: "attribute/addValues", payload: { idattribute: controls.id, values: res.data } })
                                setControl("values", [...res.data])
                                setOpenDialog(false)

                            }
                        })


                    }
                })

            } else {
                
                attributepostRequest({
                    body: {
                        name: controls.name,
                        values: controls.values
                    },
                    onSuccess: (res) => {
                        dispatch({ type: "attribute/addItem", payload: res.data })
                        setOpenDialog(false)



                    }
                }).then((res) => {
                    let response = res?.response?.data;
                    
                    setInvalid(response);

                });
            }

        })

    }

    function onDelete(row) {
        attributevalueDeleteRequest({
            id: row,
            onSuccess: () => {
                dispatch({ type: "attribute/deleteItem", payload: { id: row } })
            }
        })
    }
    function onDeleteValue(row, valueId) {
        attributeDeleteRequest({
            id: row + "/values/" + valueId,
            onSuccess: () => {
                dispatch({ type: "attribute/deleteValueofAttribute", payload: { idattribute: row, idValue: valueId } })
                setControl("values", controls.values.filter((ele) => ele.id !== valueId))
            }
        })
    }
    function onDeleteNew(row) {
        
        setControl("values", controls.values.filter((ele,index) => index !== row))
        setEdit(null)
    }

    const MyCustomNoRowsOverlay = () => (
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
    );
    function onEdit(id, newRow) {
        setOpenDialog(!openDialog);
        setOpenDialogEdit(true);
        const rowfind = rows.find((row) => row.id === id)

        Object.keys(controls)?.map((ele) => rowfind[ele] ? setControl(ele, rowfind[ele]) : null)
       

    }
    useEffect(() => {
        attributeRequest({
            onSuccess: (res) => {
                dispatch({ type: "attribute/set", payload: res.data })
                // res.data.map((ele) => attributeValueRequest({
                //     id: ele.id + "/values",
                //     onSuccess: (res) => {

                //         dispatch({ type: "attribute/addValues", payload: { idattribute: ele.id, values: res.data } })

                //     }
                // }))

            }
        })
    }, [])
    useEffect(() => {
        setRows(attributes)
        if (controls.id) {
            setControl('values', attributes?.find((ele) => ele.id == controls.id)?.values)
        }
        // setColumns((prevs)=>console.log({...prevs,value:attributes.values}))
      
    }, [attributes])
    useEffect(() => {
        if (controls.values.length > 0) { setControl("iscolor", controls.values[0].iscolor) }
    }, [controls.values])
    function AddValue() {
        // if(!openDialogEdit){
        if (controls.iscolor) {

            if (Boolean(controls.value_name) && Boolean(controls.color_value)) {
                let test = /^(?:#([a-fA-F0-9]{6}|[a-fA-F0-9]{8}))$/
                let match = test.test(controls.color_value)
                if (match) {
                    setControl("values", [...controls.values, {
                        value_name: controls.value_name,
                        color_value: controls.color_value,
                        iscolor: controls.iscolor
                    }]).then(() => {
                        setControl("value_name", "")
                        setControl("color_value", "")
                    })
                    setInvalid({ color_value: "" })

                } else {
                    setInvalid({ color_value: "not valid color value #000000" })
                }



            }
        }
        else if (Boolean(controls.value_name) && !controls.iscolor) {
            setControl("values", [...controls.values, {
                value_name: controls.value_name,
                color_value: controls.color_value,
                iscolor: controls.iscolor
            }]).then(() => {

                setControl("value_name", "")
                setControl("color_value", "")
            })
        }
        setCounter(++counter);
        setaddvalue(true);
        setblurvalue(false)
    }
    function editValue(ele) {
 
    
       
        editattributeValueRequest({
            id: controls.id + "/values/" + ele.id,
            body: {
                value_name: controls.value_name?controls.value_name:ele.value_name,
                color_value: controls.color_value?controls.color_value: ele.color_value
            },
            onSuccess: (res) => {
                dispatch({ type: "attribute/editValue", payload: { id: controls.id, idvalue: ele.id, item: res.data } })
                setControl("value_name", "")
                setControl("color_value", "")
                setEdit(null)

               
            }
        })
    }
    function editNew(element,ind){
        setControl("values",controls.values.map((element,index)=>index==ind?{...element,color_value:Boolean(controls.color_value)?controls.color_value:element.color_value,value_name:Boolean(controls.value_name)?controls.value_name:element.value_name}:element))
        
        setControl("value_name", "")
                setControl("color_value", "")
                setEdit(null)
    }
    useEffect(() => {
      
    }, [controls?.values])

    useEffect(() => {
        
    }, [edit])

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
                    <Divider orientation="vertical" sx={{ width: '1px', height: "72px" }} />
                   {permissionYour.map((ele)=>ele.codename).includes("add_productattribute")&&<SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }, padding: "7px 16px 7px 16px"
                        }}
                        onClick={() => { setOpenDialog(true); setOpenDialogEdit(false); resetControls() }}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("addnewattribute")}
                    </SoftButton>} 
                    
                   
                </SoftBox>


                <DataGridCustom
                    rows={rows}
                    onDelete={isPermitted(onDelete,["delete_productattribute"])}
                    onDialog={isPermitted(onEdit,["change_productattribute"])}
                    columns={columns}
                    checkboxSelection={true}
                    loading={getattributeResponce.isPending}
                    // onRowClick={(e) => { console.log({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
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
                    sx={{ ".MuiPaper-root": { minWidth: "37%" }, }}
                >
                    <Form component="form"
                        childrenProps={{
                            saveBtn: {
                                onClick: handleSubmit,
                                // disabled: postjobResponce.isPending,
                            },
                            closeBtn: {
                                onClick: () => {
                                    // handleClose()
                                    resetControls();
                                    setOpenDialog(false)
                                },
                                // disabled: postjobResponce.isPending,
                            },
                            title: openDialogEdit ? t("editattribute") : t("addnewattribute")
                        }} sx={{
                            borderRadius: "8px", display: "flex",
                            flexDirection: "column"
                        }}>
                        <DialogTitle sx={{
                            padding: "0", fontWeight: 400,
                            fontSize: "14px",
                            color: "gray",
                        }}>
                            {t("descributionAttribute")}</DialogTitle>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", marginBottom: "5px" }}
                        >{t("Attributename")}

                        </Typography>
                        <SoftInput
                            placeholder='Attribute name'
                            sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
                            value={controls.name}
                            onChange={(e) => setControl("name", e.target.value)}
                            required={required.includes("name")}
                            error={Boolean(invalid?.name)}
                            helperText={invalid?.name}
                        // sx={input}
                        />
                        <SoftButton sx={{
                            width: "max-content",
                            padding: "5px",
                            borderRadius: "50%",
                            minWidth: "max-content",
                            minHeight: "max-content",
                            position: "absolute",
                            left: "70%",
                            top: "11.5rem",
                            zIndex: 1
                        }} onClick={() => {
                            let copyName = controls.english_name;
                            setControl("english_name", controls.name)
                            setControl("name", copyName)
                        }}>
                            <TwoArrow color={"#959FA3"} size={"16"}/>
                           
                        </SoftButton>
                        <SoftInput
                            placeholder='English name'
                            sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
                            value={controls.english_name}
                            onChange={(e) => setControl("english_name", e.target.value)}
                            required={required.includes("english_name")}
                            error={Boolean(invalid?.english_name)}
                            helperText={invalid?.english_name}
                        // sx={input}
                        />
                        <SoftBox sx={{ display: "flex" }}>
                            <Checkbox checked={controls.iscolor} onClick={() => setControl("iscolor", !controls.iscolor)} />
                            <Typography sx={{ fontSize: "14px" }} variant="span">
                                {t("colorHex")}
                            </Typography>
                        </SoftBox>
                        <SoftBox sx={{ border: "1px solid #8080807d", borderRadius: "8px", }}>

                            <Typography sx={{ borderBottom: "1px solid #8080807d", fontSize: "14px", padding: "15px", height: "40px" }}>{controls.name}</Typography>

                            {controls?.values?.map((ele,index) => <TableRow key={ele.id} sx={{
                                fontSize: "14px",
                                display: "flex",
                                borderBottom: "1px solid #8080807d"
                            }}>


                                {/* <Divider orientation="vertical" sx={{width:'1px',height:"50px",color:"#8080807d"}}/> */}


                                {Boolean(edit) && edit?.id == ele?.id &&index==indexedit? <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d"}}><SoftInput placeholder='value'
                                    sx={{ ".MuiInputBase-root": { border: `unset` }, }}
                                    value={controls.value_name ? controls.value_name : edit?.value_name}
                                    onChange={(e) => setControl("value_name", e.target.value)}
                                    required={required.includes("value_name")}
                                    error={Boolean(invalid?.value_name)}
                                    helperText={invalid?.value_name} /></TableCell> : <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d" }}>{ele.value_name}</TableCell>}

                                {ele.color_value ? Boolean(edit) && edit?.id == ele?.id &&index==indexedit? <TableCell sx={{ width: "14rem",display:"flex",justifyContent:"space-between" ,alignItems:"center",borderRight: "1px solid #8080807d"}}><SoftInput placeholder='color'
                                    sx={{ ".MuiInputBase-root": { border: `unset` }, }}
                                    type="color"
                                    value={controls.color_value ? controls.color_value : edit?.color_value}
                                    // onChange={(e) => setControl("color_value", [...controls.color_value,e.target.value])}
                                    onChange={(e) => setControl("color_value",
                                        e.target.value)}
                                    required={required.includes("color_value")}
                                    error={Boolean(invalid?.color_value)}
                                    helperText={invalid?.color_value} /> <Typography sx={{fontSize:"14px"}}>{controls.color_value ? controls.color_value : edit?.color_value}</Typography></TableCell > : <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d" }}>{ele.color_value}</TableCell> : <></>}
                                {attributes?.find((ele) => ele.id == controls.id)?.values.map((ele) => ele.value_name).includes(ele.value_name) ? <TableCell sx={{
                                    width: "50%", borderLeft: "1px solid #8080807d", display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}>
                                   
                                    {Boolean(edit) && edit?.id == ele?.id  &&index==indexedit? <SoftBox><SaveAsIcon onClick={() => editValue(ele)} /></SoftBox> : <EditIcon onClick={() => { setEdit(ele); setindexedit(index);setaddvalue(false) }} />}
                                    {Boolean(edit) && edit?.id == ele?.id  &&index==indexedit? <SoftBox> <CloseIcon onClick={() => setEdit(null)} /></SoftBox> : <DeleteIcon sx={{ color: (theme) => theme.palette.error.main, cursor: "pointer" }} onClick={() => onDeleteValue(controls.id, ele.id)} />}

                                </TableCell>: <TableCell sx={{
                                    width: "50%", borderLeft: "1px solid #8080807d", display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}>
                                   
                                    {Boolean(edit) && edit?.id == ele?.id  &&index==indexedit? <SaveAsIcon onClick={() => editNew(ele,index)} /> : <EditIcon onClick={() => { setEdit(ele);setindexedit(index) ;setaddvalue(false) }} />}
                                    {Boolean(edit) && edit?.id == ele?.id &&index==indexedit ? <CloseIcon onClick={() => setEdit(null)} /> : <DeleteIcon sx={{ color: (theme) => theme.palette.error.main, cursor: "pointer" }} onClick={() => onDeleteNew(index)} />}

                                </TableCell>}
                            </TableRow>)}
                            {addvalue && !controls.iscolor ?<TableRow> <TableCell sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "22rem" }} >
                                <SoftInput placeholder='value'
                                    sx={{ ".MuiInputBase-root": { border: `unset !important`, padding: "0px !important", borderBottom: "1px solid gray" }, }}
                                    value={controls.value_name}
                                    onChange={(e) => { setControl("value_name", e.target.value); setblurvalue(true) }}
                                    required={required.includes("value_name")}
                                    error={Boolean(invalid?.value_name)}
                                    helperText={invalid?.value_name} />


                            </TableCell>
                           
                            <TableCell sx={{width: "22rem" }}>
                                <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                                    component="a"
                                    onClick={AddValue}
                                >{Blurvalue ? t("Addvalue") : t("newValue")}
                                </Typography>
                               
                            </TableCell>
                            </TableRow> : addvalue && controls.iscolor && <TableRow onChange={() => setblurvalue(true)}>
                                <TableCell sx={{ borderRight: "1px solid #80808059", width: "10.3rem" }}>
                                    <SoftInput placeholder='value'
                                        sx={{ ".MuiInputBase-root": { border: `unset`, padding: "0px !important" }, }}
                                        value={controls.value_name}
                                        // onChange={(e) => setControl("value_name", e.target.value)}
                                        onChange={(e) => setControl("value_name", e.target.value)}
                                        required={required.includes("value_name")}
                                        error={Boolean(invalid?.value_name)}
                                        helperText={invalid?.value_name} />


                                </TableCell>

                                <TableCell sx={{ borderRight: "1px solid #80808059", width: "10.3rem",display:"flex",justifyContent:"space-between" }}>
                                    <SoftInput placeholder='color'
                                    type="color"
                                        sx={{ ".MuiInputBase-root": { border: `unset`, padding: "0px !important" }, }}
                                        value={controls.color_value}
                                        // onChange={(e) => setControl("color_value", [...controls.color_value,e.target.value])}
                                        onChange={(e) => setControl("color_value",
                                            e.target.value)}
                                        required={required.includes("color_value")}
                                        error={Boolean(invalid?.color_value)}
                                        helperText={invalid?.color_value} />
                                        <Typography sx={{fontSize:"14px"}}>{controls.color_value}</Typography>
                                </TableCell>
                                <TableCell>
                                <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                                    component="a"
                                    onClick={AddValue}
                                >{Blurvalue ? t("Addvalue") : t("newValue")}
                                </Typography>
                                </TableCell>
                            </TableRow>

                            }

                {addvalue==false&& <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                                <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                                    component="a"
                                    onClick={AddValue}
                                >{Blurvalue ? t("Addvalue") : t("newValue")}
                                </Typography>
                                
                            </SoftBox> }


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
                {postattributeResponce.successAlert}
                {DeleteattributerResponce.failAlert}
                {DeleteattributerResponce.successAlert}
                {editattributeResponce.failAlert}
                {editattributeResponce.successAlert}
                {editValueattributeResponce.failAlert}
                {editValueattributeResponce.successAlert}

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