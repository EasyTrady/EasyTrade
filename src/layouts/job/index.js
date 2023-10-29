import { Dialog, Icon, MenuItem, Select, TextField } from '@mui/material'
import SoftButton from 'components/SoftButton'
import DataGridCustom from 'components/common/DateGridCustomer'
import Form from 'components/common/Form'
import PasswordField from 'components/common/PasswordField'
import PhoneField from 'components/common/PhoneField'
import { JOBS } from 'data/api'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import useControls from 'hooks/useControls'
import useRequest from 'hooks/useRequest'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'


function Job() {
    const [open, setOpen] = React.useState(false);
    let dispatch = useDispatch()
    let jobs = useSelector((state) => state.job.value)
    let [rows, setRows] = useState([])
    let Token = localStorage.getItem('token')
    const [jobRequest, getjobResponce] =
        useRequest({
            path: JOBS,
            method: "get",
            Token: `Token ${Token}`
        });
        const [jobpostRequest,postjobResponce] =
        useRequest({
            path: JOBS,
            method: "post",
            Token: `Token ${Token}`
        });
    const [{ controls, invalid, required }, { setControl, resetControls, validate,setInvalid }] =
        useControls([
           
            {
                control: "title",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            },
            
        ]);
        const [jobDeleteRequest, DeletejobrResponce] =
        useRequest({
            path: JOBS,
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
            jobpostRequest({
                body: controls,
                onSuccess: (res) => {
                    dispatch({type:"job/addItem",payload:res.data})
                    console.log(res.data, controls)
                }
            }).then((res) => {
                let response = res?.response?.data;
                console.log(res)
               
                setInvalid(response);

            });
        })

    }
    function onDelete(row){
        jobDeleteRequest({
            id:row,
            onSuccess:()=>{
                dispatch({ type: "job/deleteItem", payload: { id: row } })
            }
        })
    }
    const columns = [
        {
            field: 'title',
            headerName: 'title',
            // type: 'text',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            // renderCell: renderImageCell,
            editable: false,
            // renderEditCell:renderEditImageCell
        }
       
    
       
    ]
    useEffect(()=>{
        jobRequest({
            onSuccess:(res)=>{
                dispatch({type:"job/set",payload:res.data})
            }
        })
    },[])
    useEffect(()=>{
        setRows(jobs?.results)
    },[jobs])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftButton variant="gradient" color="dark" onClick={handleClickOpen}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new job
            </SoftButton>
            <Dialog open={open} onClose={handleClose}>
                <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            onClick: handleSubmit,
                            disabled: postjobResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                handleClose()
                                resetControls();
                            },
                            disabled: postjobResponce.isPending,
                        }, title: "add job"
                    }}>
                    <TextField

                        // id="filled-size-small"
                        placeholder='title'
                        variant="standard"
                        size="small"
                        value={controls.title}
                        onChange={(e) =>
                            setControl("title", e.target.value)
                        }
                        required={required.includes("title")}
                        error={Boolean(invalid?.title)}
                        helperText={invalid?.title}
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
                onRowClick={(e) => { setClick({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
                sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                // onEdit={onEdit}
                style={{".MuiTablePagination-toolbar .MuiInputBase-root":{
                    width:"15% !important"
                }}}
            />
            {getjobResponce.failAlert}
            {postjobResponce.failAlert}
        </DashboardLayout>
    )
}

export default Job