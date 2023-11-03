/* eslint-disable react/prop-types */
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, Dialog, Icon, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import SoftButton from 'components/SoftButton'
import DataGridCustom from 'components/common/DateGridCustomer'
import Form from 'components/common/Form'
import CustomPagination from 'components/common/Pagination'
import PasswordField from 'components/common/PasswordField'
import PhoneField from 'components/common/PhoneField'
import { ATTRIBUTES } from 'data/api'
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
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
function Attribute({ absolute, light, isMini }) {
    const [open, setOpen] = React.useState(false);
    let dispatch = useDispatch()
    const route = useLocation().pathname.split("/").slice(1);
    let attributes = useSelector((state) => state.attribute.value)
    let [rows, setRows] = useState([])
    const [openValue, setOpenValue] = React.useState(true);

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
            }, {
                control: "value_type",
                value: "value",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid valuesType"
                    }
                ]
            },

        ]);
    const [attributeDeleteRequest, DeleteattributerResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "delete",
            Token: `Token ${Token}`
        });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            type: 'text',
            width: 500,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"column"} >
                    <Typography component={"p"}>{row.name}</Typography>
                    <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography>
                </Stack>
                );
            },
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'value_type',
            headerName: 'value_type',
            type: 'text',
            width: 500,
            align: 'left',
            headerAlign: 'left',
            // renderCell: renderImageCell,
            editable: false,
            // renderEditCell:renderEditImageCell
        }


    ]
    const MyCustomNoRowsOverlay = () => (
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
    );
    useEffect(() => {
        attributeRequest({
            onSuccess: (res) => {
                dispatch({ type: "attribute/set", payload: res.data })
            }
        })
    }, [])
    useEffect(() => {
        setRows(attributes)
    }, [attributes])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftButton variant="gradient" color="dark" onClick={handleClickOpen}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new attribute
            </SoftButton>
            <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
            <Dialog open={open} onClose={handleClose}>
                <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            onClick: handleSubmit,
                            disabled: postattributeResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                handleClose()
                                resetControls();
                            },
                            disabled: postattributeResponce.isPending,
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
                    <SoftInput
                        placeholder='name'
                        value={controls.name}
                        onChange={(e) => setControl("name", e.target.value)}
                        required={required.includes("name")}
                        error={Boolean(invalid.name)}
                        helperText={invalid.name}
                        sx={input}
                    />
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
                columns={columns}
                checkboxSelection={true}
                onRowClick={(e) => { console.log({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
                sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                // onEdit={onEdit}
                rowHeight={100}
                slots={{
                    noRowsOverlay: MyCustomNoRowsOverlay
                }}

            />
            {getattributeResponce.failAlert}
            {postattributeResponce.failAlert}
            {DeleteattributerResponce.failAlert}
        </DashboardLayout>
    )
}

export default Attribute
// Attribute.defaultProps = {
//     absolute: false,
//     light: false,
//     isMini: false,
//   };
  
//   // Typechecking props for the Attribute
//   Attribute.propTypes = {
//     absolute: propTypes?.bool,
//     light: propTypes?.bool,
//     isMini: propTypes?.bool,
//   };