import { Dialog, Icon, MenuItem, Select, TextField } from '@mui/material'
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


function AttributeValue() {
    const [open, setOpen] = React.useState(false);
    let {id}=useParams()
    let dispatch = useDispatch()
    let attributes = useSelector((state) => state.attribute.value)
    let [rows, setRows] = useState([])
    let Token = localStorage.getItem('token')
    const [attributeValueRequest, getattributeValueResponce] =
        useRequest({
            path: ATTRIBUTES+id+"/values/",
            method: "get",
            Token: `Token ${Token}`
        });
    const [attributeValuepostRequest, postValueattributeResponce] =
        useRequest({
            path:ATTRIBUTES+id+"/values/",
            method: "post",
            Token: `Token ${Token}`
        });
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([

            {
                control: "value",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            }

        ]);
    const [attributeDeleteRequest, DeleteattributerResponce] =
        useRequest({
            path: ATTRIBUTES+id+"/values/",
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
            attributeValuepostRequest({
                body: controls,
                onSuccess: (res) => {
                    
                    dispatch({ type: "attribute/addValue", payload:{idvalue:id ,value:res.data }})
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
                dispatch({ type: "attribute/deleteValueofAttribute", payload: { idattribute: id,idValue:row } })
            }
        })
    }
    const columns = [
        {
            field: 'value',
            headerName: 'Value',
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
        attributeValueRequest({
            onSuccess: (res) => {
                console.log(res.data,id,getattributeValueResponce.failAlert)
                dispatch({ type: "attribute/addValues", payload:{ idattribute: id , values: res.data }})
            }
        })
    }, [])
    useEffect(() => {
        if(attributes?.find((ele)=>ele.id==id)?.values?.length>0){
            setRows(attributes?.find((ele)=>ele.id==id)?.values)

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
                    <TextField

                        // id="filled-size-small"
                        placeholder='value'
                        variant="standard"
                        size="small"
                        value={controls.value}
                        onChange={(e) =>
                            setControl("value", e.target.value)
                        }
                        required={required.includes("value")}
                        error={Boolean(invalid?.value)}
                        helperText={invalid?.value}
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
                onRowClick={(e) => { console.log({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
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