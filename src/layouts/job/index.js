import { Avatar, Container, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography } from '@mui/material';
import Breadcrumbs from 'examples/Breadcrumbs'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import { useTranslation } from 'react-i18next';
import DataGridCustom from 'components/common/DateGridCustomer'
import Form from 'components/common/Form'
import CustomPagination from 'components/common/Pagination'
import PasswordField from 'components/common/PasswordField'
import PhoneField from 'components/common/PhoneField'
import { JOBS } from 'data/api'
import usePermission from 'utils/usePermission';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import useControls from 'hooks/useControls'
import useRequest from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import { useLocation, } from 'react-router';
import PropTypes from "prop-types";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SoftInput from 'components/SoftInput';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

function Job({ absolute, light, isMini }) {
    const [open, setOpen] = React.useState(false);
    const sub_domain = localStorage.getItem('sub_domain')
    let { t } = useTranslation("common")
    const route = useLocation().pathname.split("/").slice(1);
    let dispatch = useDispatch()
    const navigate = useNavigate()
    let jobs = useSelector((state) => state.job.value)
    let [rows, setRows] = useState([])
    let permissionYour = useSelector((state) => state.permissionYour.value)
    let {isPermitted}=usePermission()
    let Token = localStorage.getItem('token')
    const [jobRequest, getjobResponce] =
        useRequest({
            path: JOBS,
            method: "get",
            Token: `Token ${Token}`
        });
    const [jobpostRequest, postjobResponce] =
        useRequest({
            path: JOBS,
            method: "post",
            Token: `Token ${Token}`
        });
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
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
       
        validate().then((output) => {
           
            if (!output.isOk) return;
            jobpostRequest({
                body: controls,
                onSuccess: (res) => {
                    dispatch({ type: "job/addItem", payload: res.data })
                    
                }
            }).then((res) => {
                let response = res?.response?.data;
              
                setInvalid(response);

            });
        })

    }
    function onDelete(row) {
        jobDeleteRequest({
            id: row,
            onSuccess: () => {
                dispatch({ type: "job/deleteItem", payload: { id: row } })
            }
        })
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            // type: 'text',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            // renderCell: renderImageCell,
            editable: false,
            // renderEditCell:renderEditImageCell
        }
        , {
            field: 'title',
            headerName: 'Job Name',
            // type: 'text',
            width: 300,
            align: 'left',
            headerAlign: 'left',
            // renderCell: renderImageCell,
            editable: false,
            renderEditCell: (params) => <SoftInput
                placeholder="Job Name"
                icon={{ component: <PersonIcon />, direction: "left" }}
                sx={{ ".MuiInputBase-root": { border: "unset" } }}
                value={params.row.full_name}
                onChange={(e) => params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: e.target.value,
                })
                } />
            // renderEditCell:renderEditImageCell
        },
        {
            field: 'created_at',
            headerName: 'created at',
            type: 'text',
            width: 500,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            filterable: false,
            sortable: false, disableColumnMenu: true,
            renderCell: (params) => <Typography variant={"p"}
                sx={{
                    fontSize: "14px"
                }}
            > {moment(params.row.created_at).format('MMMM Do YYYY, h:mm:ss a')} </Typography>
        },


    ]
    function onEdit(row, newRow) {
        navigate(`/${sub_domain}/dashboard/jobs/addNewJob`,{state:{id:row,dataRow:newRow}})
        
    }
    // function onEdit(row, newRow) {

    //     jobpatchRequest({
    //         id: row,
    //         body: newRow,
    //         onSuccess: (res) => {
    //             dispatch({ type: "job/patchItem", payload: { id: row, item: res.data } })

    //         }
    //     })
    // }
    const MyCustomNoRowsOverlay = () => (
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
    );
    useEffect(() => {
        jobRequest({
            onSuccess: (res) => {
                dispatch({ type: "job/set", payload: res.data })
            }
        })
    }, [])
    useEffect(() => {
        setRows(jobs?.results)
    }, [jobs])
    return (
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
                    {permissionYour.map((ele)=>ele.codename).includes("add_employeejob")&&<SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }
                        }}
                        onClick={() => navigate(`/${sub_domain}/dashboard/jobs/addNewJob`)}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;{t("addnewjob")}
                    </SoftButton>}
                    
                </SoftBox>
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
                    onDelete={isPermitted(onDelete,["delete_employeejob"])}
                    columns={columns}
                    checkboxSelection={true}
                    // onRowClick={(e) => { setClick({ ...e?.row });/* navigate(`/${shopName}/dashboard/employee/${e?.row?.id}`)*/ }}
                    sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
                    onDialog={isPermitted(onEdit,["change_employeejob"])}

                    slots={{
                        noRowsOverlay: MyCustomNoRowsOverlay
                    }}

                />

                {getjobResponce.failAlert}
                {postjobResponce.failAlert}
            </Container>
        </DashboardLayout>
    )
}

export default Job
Job.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Job
Job.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};