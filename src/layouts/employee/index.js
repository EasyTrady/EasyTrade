import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { EMPLOYEE } from 'data/api';
import useRequest from 'hooks/useRequest';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, } from 'react-router';
import SoftButton from "components/SoftButton";
import { useEffect } from 'react';
import DataGridCustom from 'components/common/DateGridCustomer';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import useControls from 'hooks/useControls';
import PhoneField from 'components/common/PhoneField';
import Form from 'components/common/Form';
import PasswordField from 'components/common/PasswordField';
import PictureField from 'components/common/PictureField';
import { GridActionsCellItem,GridPagination } from '@mui/x-data-grid';
import SoftBadge from 'components/SoftBadge';
import { JOBS } from 'data/api';
function Employee() {
    let { pathname } = useLocation()
    let [click, setClick] = useState({})
    let [openJob, setOpenJob] = useState(false)
   let {results}= useSelector((state)=>state.job.value)
    const [selectedImage, setSelectedImage] = useState(null);
    // let shopName=localStorage.getItem('shop_name')
    let Token = localStorage.getItem('token')
    let refImage = useRef(null)
    const [image,setImage]=useState("")
    const renderEditImageCell = (params) => {
        
        const { row } = params;
      
     
        return (<>
            <input key={params.row.id} type='file'
             onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]))
            }}  
            style={{display:"none"}}
            ref={refImage}
             />
            <Avatar src={image ? image : params.row.image} onClick={()=>refImage.current.click()} />
        </>
        );
    };
    const CustomPagination = (props) => {
     
        return (
            <GridPagination
            
            {...props}
          />
        );
      };
    const renderImageCell = (params) => {
        const { row } = params;
        return (<>
            <Avatar src={row.image}  />
        </>
        );
    };
    const columns = [
        {
            field: 'image',
            headerName: 'image',
            type: 'image',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            renderCell: renderImageCell,
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'full_name',
            headerName: 'full_name',
            type: 'text',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant={"h6"} sx={{ color: "#673ab7", marginTop: "10px" }}>{params.row.full_name}</Typography>
            </Box>
        },
        {
            field: 'email',
            headerName: 'email',
            type: 'text',
            width: 250,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography  variant={"h6"} sx={{ color: (theme) => theme.palette.primary, marginTop: "10px" }}>{params.row.email}</Typography>
            </Box>
        },
        {
            field: 'phone',
            headerName: 'phone',
            type: 'text',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            editable: true,
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

    let [rows, setRows] = useState([])
    const [{ controls, invalid, required }, { setControl, resetControls, validate,setInvalid }] =
        useControls([
            { control: "image", value: "", isRequired: false },
            {
                control: "email",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "not valid email"
                    },
                ],
            },
            {
                control: "full_name",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            },
            {
                control: "password",
                value: "",
                isRequired: true,
            }, {
                control: "confirm",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: (controls) => new RegExp(`^${controls.password}$`),
                        message: "الرقم السري لا يطابق",
                    },
                ],
            }, {
                control: "phone",
                value: "",
                isRequired: true,
            }, {
                control: "code",
                value: "+20",
                isRequired: true,
            },
            { control: "job",
            value: "",
            isRequired: true,}
        ]);
    let employees = useSelector((state) => state.employee.value)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const navigate = useNavigate()

    const [employeeRequest, getemployeeResponce] =
        useRequest({
            path: EMPLOYEE,
            method: "get",
            Token: `Token ${Token}`
        });
    const [EmployeeDeleteRequest, DeleteEmployeerResponce] =
        useRequest({
            path: EMPLOYEE,
            method: "delete",
            Token: `Token ${Token}`
        });
    const [EmployeePatchRequest, PatchEmployeerResponce] =
        useRequest({
            path: EMPLOYEE,
            method: "patch",
            Token: `Token ${Token}`
        });
    const [EmployeePostRequest, PostEmployeerResponce] =
        useRequest({
            path: EMPLOYEE,
            method: "post",
            Token: `Token ${Token}`
        });
        const [jobRequest, getjobResponce] =
        useRequest({
            path: JOBS,
            method: "get",
            Token: `Token ${Token}`
        });
        
    let dispatch = useDispatch()
    useEffect(() => {
        employeeRequest({
            onSuccess: (res) => {
                // console.log(res.data)
                dispatch({ type: "employee/set", payload: { ...res.data } })

            }
        })
    
    }, [])
    useEffect(() => {

        // console.log(Object.keys(employees?.results[0]?employees?.results[0]:))
        setRows(employees?.results);
    }, [employees])

    function onDelete(row) {
      
        EmployeeDeleteRequest({
            id: row,
            onSuccess: () => {
                dispatch({ type: "employee/deleteItem", payload: { id: row } })
            }
        })
    }
    function onEdit(row, newRow) {
      
        EmployeePatchRequest({
            id: row,
            body: newRow,
            onSuccess: (res) => {
                dispatch({ type: "employee/patchItem", payload: { id: row ,item:res.data} })
              
            }
        })
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setControl("image", event.target.files[0])
    };
    function handleSubmit() {
        
        validate().then((output) => {
          
            if (!output.isOk) return;
            EmployeePostRequest({
                body: controls,
                onSuccess: (res) => {
                    console.log(res.data, controls)
                }
            }).then((res) => {
                let response = res?.response?.data;
                
               
                setInvalid(response);

            });
        })

    }
    const handleOpenMenu = () => {
        setOpenJob(true)
        jobRequest({
            onSuccess:(res)=>{
                console.log(res)
                dispatch({type:"job/set",payload:res.data})
            }
        })
      };
    
      const handleCloseMenu = () => {
        setOpenJob(false)
        // Perform any necessary actions when the menu is closed
        console.log('Menu closed');
      };
    
    return (<>
        <DashboardLayout>
            <DashboardNavbar />
            <SoftButton variant="gradient" color="dark" onClick={handleClickOpen}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new employee
            </SoftButton>
            <Dialog open={open} onClose={handleClose}>
                <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            onClick: handleSubmit,
                            disabled: PostEmployeerResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                handleClose()
                                resetControls();
                            },
                            disabled: PostEmployeerResponce.isPending,
                        }, title: "add employee"
                    }}>
                    <TextField

                        // id="filled-size-small"
                        placeholder='name'
                        variant="standard"
                        size="small"
                        value={controls.full_name}
                        onChange={(e) =>
                            setControl("full_name", e.target.value)
                        }
                        required={required.includes("full_name")}
                        error={Boolean(invalid.full_name)}
                        helperText={invalid.full_name}
                    />
                    <TextField

                        // id="filled-size-small"
                        placeholder='email'
                        variant="standard"
                        size="small"
                        value={controls.email}
                        onChange={(e) =>
                            setControl("email", e.target.value)
                        }
                        required={required.includes("email")}
                        error={Boolean(invalid.email)}
                        helperText={invalid.email}
                    />
                    <Select
                        open={openJob}
                        value={controls.job?controls.job:"jobs"}
                        onChange={(e)=>setControl("job", e.target.value)}
                        onOpen={()=>handleOpenMenu()}
                        onClose={()=>handleCloseMenu()}
                        sx={{".MuiSelect-select":{minWidth:"100%"}}}
                        // MenuProps={{
                        //     anchorOrigin: {
                        //         vertical: 'bottom',
                        //         horizontal: 'left',
                        //     },
                        //     transformOrigin: {
                        //         vertical: 'top',
                        //         horizontal: 'left',
                        //     },
                        //     getContentAnchorEl: null,
                        // }}
                       
                    >
                        {results.map((ele)=><MenuItem key={ele.id}  value={ele.id}>{ele.title}</MenuItem>)}
                        
                    </Select>
                    <PhoneField
                        placeholder={"phone"}
                        required={required.includes("phone")}
                        requiredCode
                        selectProps={{
                            value: controls.code ? controls.code : "+20",
                            onChange: (e) => setControl("code", e.target.value),
                        }}
                        value={controls.phone}
                        onChange={(e) => setControl("phone", e.target.value)}
                        error={Boolean(invalid.phone)}
                        helperText={invalid.phone}
                        sx={{ ".MuiInputBase-root input": { minWidth: "75% !important" },"..MuiInputBase-root":{ justifyContent: "flex-end"} }}
                    />
                    <PasswordField
                        placeholder={"password"}
                        required={required.includes("password")}
                        value={controls.password}
                        onChange={(e) => setControl("password", e.target.value)}
                        error={Boolean(invalid.password)}
                        helperText={invalid.password}
                        sx={{ ".MuiInputBase-root input": { minWidth: "95% !important" } }}
                    />
                    <PasswordField

                        placeholder={"confirmPassword"}
                        required={required.includes("confirm")}
                        value={controls.confirm}
                        onChange={(e) => setControl("confirm", e.target.value)}
                        error={Boolean(invalid.confirm)}
                        helperText={invalid.confirm}
                        sx={{ ".MuiInputBase-root input": { minWidth: "95% !important" } }}
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
                onEdit={onEdit}
                style={{".MuiTablePagination-toolbar .MuiInputBase-root":{
                    width:"15% !important"
                }}}
            />

            {getemployeeResponce.failAlert}
            {DeleteEmployeerResponce.failAlert}
            {PatchEmployeerResponce.failAlert}
            {PostEmployeerResponce.failAlert}
        </DashboardLayout>
    </>
    )
}

export default Employee