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
import usePermission from 'utils/usePermission';
import { useEffect } from 'react';
import DataGridCustom from 'components/common/DateGridCustomer';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import useControls from 'hooks/useControls';
import PhoneField from 'components/common/PhoneField';
import Form from 'components/common/Form';
import PasswordField from 'components/common/PasswordField';
import PictureField from 'components/common/PictureField';
import { GridActionsCellItem, GridPagination } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import SoftBadge from 'components/SoftBadge';
import SoftInput from 'components/SoftInput';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { Container } from '@mui/material';
import moment from 'moment';
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { JOBS } from 'data/api';
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Employee({ absolute, light, isMini }) {
    let { pathname } = useLocation()
    let {t}= useTranslation("common")
    const sub_domain = localStorage.getItem('sub_domain')
    const navigate = useNavigate()
    let [click, setClick] = useState({})
    let [openJob, setOpenJob] = useState(false)
    let jobs = useSelector((state) => state.job.value)
  let permissionYour = useSelector((state) => state.permissionYour.value)
  let {isPermitted}=usePermission()

    const route = useLocation().pathname.split("/").slice(1);
    let { results } = useSelector((state) => state.job.value)
    const [selectedImage, setSelectedImage] = useState(null);
    // let shopName=localStorage.getItem('shop_name')
    let Token = localStorage.getItem('token')
    let refImage = useRef(null)
    const [image, setImage] = useState("")

    const renderEditImageCell = (params) => {

        const { row } = params;


        return (<>
            <input key={params.row.id} type='file'
                onChange={(e) => {
                    setImage(URL.createObjectURL(e.target.files[0]))
                }}
                style={{ display: "none" }}
                ref={refImage}
            />
            <Avatar src={image ? image : params.row.image} onClick={() => refImage.current.click()} />
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
            <Avatar src={row.image} />
        </>
        );
    };
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
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
        {
            control: "job",
            value: "",
            isRequired: true,
        }
    ]);
    const columns = [
        {
            field: 'id',
            headerName: 'id',
            type: 'text',
            width:100,
            align: 'left',
            headerAlign: 'left',
            // renderCell: renderImageCell,
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'full_name',
            headerName: 'Employee name',
            type: 'text',
            width:170,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant={"p"} sx={{fontSize:"14px" }}>{params.row.full_name}</Typography>
            </Box>,
            renderEditCell:(params)=><SoftInput
            placeholder="Full Name"
            icon={{ component: <PersonIcon />, direction: "left" }}
            sx={{ ".MuiInputBase-root": { border: "unset" } }}
            value={params.row.full_name}
            onChange={(e) =>params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: e.target.value,
                  })
            }
          
        />
        },
        {
            field: 'job',
            headerName: 'job',
            type: 'text',
            width:170,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant={"p"} sx={{ color: (theme) => theme.palette.primary, fontSize: "14px" }}>{jobs?.results?.find((ele) => ele.id === params.row.job)?.title}</Typography>
            </Box>,
            renderEditCell:(params)=><SoftInput
            select
            value={params.row.job}
            icon={{ component: <WorkOutlineIcon />, direction: "left" }}
            sx={{ ".MuiInputBase-root": { border: "unset" } }}
            onChange={(e) =>  params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              })}
            SelectProps={{
                defaultValue: "",
                displayEmpty: true,
                // onOpen: onOpen,
                // onClose: onClose,
                renderValue: (selected) => {
                    if (!Boolean(selected)) {
                        return (
                            <Typography sx={{ color: "currentColor", opacity: "0.42", fontSize: "14px" }}>
                                {"job name"}
                            </Typography>
                        );
                    } else {
                
                        return jobs?.results?.find((ele)=>ele.id===selected)?.title;
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
            
            {jobs?.results?.map((ele) => <MenuItem value={ele.id} key={ele.id}>{ele.title}</MenuItem>)}
        </SoftInput>
        },
        {
            field: 'phone',
            headerName: 'phone',
            type: 'text',
            width:200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            renderEditCell:(params)=><SoftInput

            placeholder="Phone"
            icon={{ component: <PhoneInTalkIcon />, direction: "left" }}
            sx={{ ".MuiInputBase-root": { border: "unset" } }}
            value={params.row.phone}
            onChange={(e) => params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              })}
            
        >
        </SoftInput>
        },
        {
            field: 'email',
            headerName: 'email',
            type: 'text',
            width:300,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            // renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
            //     <Typography variant={"h6"} sx={{ fontSize:"14px",fontWeight:"400"  }}>{params.row.email}</Typography>
            // </Box>,
            renderEditCell:(params)=><SoftInput
            placeholder="email"
            icon={{ component: <MailOutlineIcon />, direction: "left" }}
            sx={{ ".MuiInputBase-root": { border: "unset" } }}
            value={params.row.email}
            onChange={(e) => params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              })
            }
            required={required.includes("email")}
            error={Boolean(invalid?.email)}
            helperText={invalid?.email}
        />
        },
        {
            field: 'created_at',
            headerName: 'created at',
            type: 'text',
            width:300,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            filterable: false,
            sortable: false, disableColumnMenu: true,
            renderCell: (params) => {moment(params.row.created_at).format('MMMM Do YYYY')}
        },

    ]

    let [rows, setRows] = useState([])
   
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
        navigate(`/${sub_domain}/dashboard/employee/addNewEmployee`,{state:{id:row,dataRow:newRow}})
        
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
            onSuccess: (res) => {
               
                dispatch({ type: "job/set", payload: res.data })
            }
        })
    };

    const handleCloseMenu = () => {
        setOpenJob(false)
        // Perform any necessary actions when the menu is closed
        
    };
    useEffect(() => {
        jobRequest({
            onSuccess: (res) => {
                dispatch({ type: "job/set", payload: res.data })
            }
        })
    }, [])
    return (<>
        <DashboardLayout>
            <DashboardNavbar />

            
            <Container sx={{ p: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                <SoftBox mb={{
                    xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
                    alignItems: "center"
                }} sx={{ textAlign: "right" }}>
                    <Button onClick={() => window.print()} sx={{
                        backgroundColor: "white !important",
                        color: "black !important", marginX: "10px", p: 1.5
                    }}><LocalPrintshopIcon /> Print</Button>
                    {permissionYour.map((ele)=>ele.codename).includes("add_employee")&&<SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }
                        }}
                        onClick={() => navigate(`/${sub_domain}/dashboard/employee/addNewEmployee`)}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("addnewemployee")}
                    </SoftButton>}
                    
                </SoftBox>
                <DataGridCustom
                    rows={rows}
                    onDelete={isPermitted(onDelete,["delete_employee"])}
                    columns={columns}
                    checkboxSelection={true}
                    loading={getemployeeResponce.isPending}
                    // onRowClic/k={(e) => { setClick({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
                    sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                    onDialog={isPermitted(onEdit,["change_employee"])}
                    style={{
                        ".MuiTablePagination-toolbar .MuiInputBase-root": {
                            width: "15% !important"
                        }
                    }}
                />
            </Container>
            {getemployeeResponce.failAlert}
            {DeleteEmployeerResponce.failAlert}
            {PatchEmployeerResponce.failAlert}
            {PostEmployeerResponce.failAlert}
        </DashboardLayout>
    </>
    )
}

export default Employee

Employee.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Employee
Employee.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};