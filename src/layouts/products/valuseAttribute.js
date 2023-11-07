import { Avatar, Box, Dialog, Icon, MenuItem, Select, TextField } from '@mui/material'
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
import { useParams } from 'react-router-dom'
import input from "assets/theme/components/form/input";
import SoftInput from 'components/SoftInput'


function AttributeValue() {
    const [open, setOpen] = React.useState(false);
    
    let { id } = useParams()
    let dispatch = useDispatch()
    let attributes = useSelector((state) => state.attribute.value)
    let [rows, setRows] = useState([])
    const formData = new FormData();

    let Token = localStorage.getItem('token')
    const [attributeValueRequest, getattributeValueResponce] =
        useRequest({
            path: ATTRIBUTES + id + "/values/",
            method: "get",
            Token: `Token ${Token}`
        });
    const [attributeValuepostRequest, postValueattributeResponce] =
        useRequest({
            path: ATTRIBUTES + id + "/values/",
            method: "post",
            Token: `Token ${Token}`,
            contentType:"multipart/form-data",
        });
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([

            {
                control: "text",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid text"
                    }
                ]
            }, {
                control: "color",
                value: "",
                isRequired: false,
                validations: [
                    {
                        test: /^#[0-9A-Fa-f]+$/,
                        message: "not valid color"
                    }
                ]
               
            }, {
                control: "image",
                value: null,
                isRequired: true,
            }
        ]



        );
    const [attributeDeleteRequest, DeleteattributerResponce] =
        useRequest({
            path: ATTRIBUTES + id + "/values/",
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
        validate().then((output) => {
            if (!output.isOk) return;
            console.log(controls)
            Object.entries(controls).map(([key, value])=>formData.append(key,value))
            
            attributeValuepostRequest({
                body: formData,
               
                onSuccess: (res) => {
                    dispatch({ type: "attribute/addValue", payload: { idvalue: id, value: res.data } })
                    resetControls()
                    handleClose()
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
                console.log(row)
                dispatch({ type: "attribute/deleteValueofAttribute", payload: { idattribute: id, idValue: row } })
            }
        })
    }
    const columns = [
        {
            field: 'color_value',
            headerName: 'color_value',
            type: 'text',
            flex:1,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) =>params?.row?.color_value? <Box sx={{ backgroundColor: params?.row?.color_value,boxShadow:"0px 4px 10px", borderRadius: "50%", height: "30px", width: "30px" }}></Box>:<></>,
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'value_name',
            headerName: 'value_name',
            type: 'value_name',
            flex:1,
            align: 'left',
            headerAlign: 'left',
            // renderCell: (params)=><Box sx={{backgroundColor:params.color,borderRadius:"50%",height:"30px"}}></Box>,
            editable: false,
            // renderEditCell:renderEditImageCell
        }, {
            field: 'image_value',
            headerName: 'image_value',
            type: 'text',
            flex:1,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) =>params.row.image_value? <Avatar src={params.row.image_value} />:<></>,
            editable: false,
           
            // renderEditCell:renderEditImageCell
        }


    ]
    const MyCustomNoRowsOverlay = () => (
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
    );
    useEffect(() => {
        attributeValueRequest({
            onSuccess: (res) => {
                console.log(res.data, id, getattributeValueResponce.failAlert)
                dispatch({ type: "attribute/addValues", payload: { idattribute: id, values: res.data } })
            }
        })
    }, [])
    useEffect(() => {
        if (attributes?.find((ele) => ele.id == id)?.values?.length > 0) {
            setRows(attributes?.find((ele) => ele.id == id)?.values)
            console.log(Object.keys(attributes?.find((ele) => ele.id == id)?.values[0]),columns.map((ele)=>ele.field))
        }
    }, [attributes])

    return (
        <DashboardLayout>
            <DashboardNavbar />
              
            <SoftButton variant="gradient" color="dark" onClick={handleClickOpen}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new value to attribute
            </SoftButton>
            
            <Dialog open={open} onClose={handleClose}>
                <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            onClick: handleSubmit,
                            disabled: postValueattributeResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                handleClose()
                                resetControls();
                            },
                            disabled: postValueattributeResponce.isPending,
                        }, title: "add value"
                    }}>

                    <SoftInput
                        placeholder='color'
                        value={controls.color}
                        onChange={(e) => setControl("color", e.target.value)}
                        required={required.includes("color")}
                        error={Boolean(invalid?.color)}
                        helperText={invalid?.color}
                        sx={input}
                    />

                    <SoftInput
                        placeholder='text'
                        value={controls.text}
                        onChange={(e) => setControl("text", e.target.value)}
                        required={required.includes("text")}
                        error={Boolean(invalid?.text)}
                        helperText={invalid?.text}
                        sx={input}
                    />

                    <SoftInput
                        placeholder={"image"}
                        // value={controls.image}
                        onChange={(e) => {
                           console.log(e.target.files[0])
                            setControl("image",e.target.files[0])
                        }}
                        required={required.includes("image")}
                        error={Boolean(invalid?.image)}
                        helperText={invalid?.image}
                        //   icon={{ component: <imageIcon />, direction: "left" }}
                        sx={input}
                        type="file"
                        inputProps={{
                            accept: "image/*"
                        }}
                    />
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
                onRowClick={(e) => { console.log({ ...e?.row });/* navigate(`/${shoptext}/dashboard/employee/${e?.row?.id}`)*/ }}
                sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                // onEdit={onEdit}

                slots={{
                    noRowsOverlay: MyCustomNoRowsOverlay
                }}

            />
            {getattributeValueResponce.failAlert}
            {postValueattributeResponce.failAlert}
        </DashboardLayout>
    )
}

export default AttributeValue