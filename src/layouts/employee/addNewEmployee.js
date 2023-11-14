import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import useControls from 'hooks/useControls';
import Form from 'components/common/Form';
import { useTranslation } from 'react-i18next';
import { Avatar, Stack, Container, InputLabel, Radio, FormControlLabel, RadioGroup, FormLabel, Paper, Box, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography, Autocomplete, ListItemText, Chip } from '@mui/material';
import SoftInput from "components/SoftInput";
import PersonIcon from '@mui/icons-material/Person';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhoneField from 'components/common/PhoneField';

import PasswordField from 'components/common/PasswordField';
import { JOBS, EMPLOYEE } from 'data/api';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SoftButton from 'components/SoftButton';
function AddNewEmployee({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem('sub_domain')
    let { t } = useTranslation('common')
    let dispatch = useDispatch()
    let jobs = useSelector((state) => state.job.value)
    const navigate = useNavigate()

    const location = useLocation();
    const { state } = location;
    let Token = localStorage.getItem('token')
    const [jobRequest, getjobResponce] =
        useRequest({
            path: JOBS,
            method: "get",
            Token: `Token ${Token}`
        });
    const [EmployeePostRequest, PostEmployeerResponce] =
        useRequest({
            path: EMPLOYEE,
            method: "post",
            Token: `Token ${Token}`
        });
        
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {control: "id", value: "", isRequired: false},
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
                isRequired:Boolean(state?.dataRow)?false:true,
            }, {
                control: "confirm",
                value: "",
                isRequired: Boolean(state?.dataRow)?false:true,
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
        const [EmployeePatchRequest, PatchEmployeerResponce] =
        useRequest({
            path: EMPLOYEE,
            method: "patch",
            Token: `Token ${Token}`
        });
    function handleSubmit() {

        validate().then((output) => {

            if (!output.isOk) return;
            console.log(controls.id,Boolean(state?.dataRow))

            if(Boolean(state?.dataRow)){
                let  result= compare(
                    [
                    [controls.email,state?.dataRow?.email,"email"],
                    [controls.full_name,state?.dataRow?.full_name,"full_name"],
                    [controls.phone,state?.dataRow?.phone,"phone"],
                   [controls.job,state?.dataRow?.job,"job"]
                ],false
                )
                console.log(result)
                EmployeePatchRequest({
                    id:controls.id,
                    body: {email:controls.email,full_name:controls.full_name,phone:controls.phone,job:controls.job},
                    onSuccess: (res) => {
                        console.log(res.data, controls.id)

                        dispatch({ type: "employee/patchItem", payload: { id: controls.id, item: res.data } })
                        resetControls()
                    }
                })
                navigate(`/${sub_domain}/dashboard/employee`)
            }else{
                EmployeePostRequest({
                    body: controls,
                    onSuccess: (res) => {
                        dispatch({ type: "employee/addItem", payload:  res.data  })

                        resetControls()
                        console.log(res.data, controls)
                    }
                }).then((res) => {
                    let response = res?.response?.data;
    
    
                    setInvalid(response);
    
                });
                navigate(`/${sub_domain}/dashboard/employee`)
            }
            
        })

    }
    useEffect(() => {
        jobRequest({
            onSuccess: (res) => {
                dispatch({ type: "job/set", payload: res.data })
            }
        })
    }, [])
    useEffect(() => {
        // jobRequest({
        //     onSuccess: (res) => {
        //         dispatch({ type: "job/set", payload: res.data })
        //     }
        // })
        if(Boolean(state?.dataRow)){
            Object.entries(state?.dataRow)?.forEach(([key,value])=>setControl(key,value))

        }
        // setControl()
       
    }, [state])
    useEffect(()=>{
        console.log(jobs,controls.job)

    },[jobs,controls.job])
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Container>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={Boolean(state?.dataRow)?t("EditEmployee"):route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                </Container>
                <Container sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Form component="form"
                        childrenProps={{
                            title: t("ContactInfo")
                        }} sx={{ width:Boolean(state?.dataRow)?"100%":"47%" ,borderRadius:"8px",}} hideFooter={true}>
                        <Box sx={{ display: "flex", flexDirection: "column" ,boxSizing: "border-box"}}>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Fullname")}</InputLabel>
                                <SoftInput
                                    placeholder="Full Name"
                                    icon={{ component: <PersonIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset", }, }}
                                    value={controls.full_name}
                                    onChange={(e) =>
                                        setControl("full_name", e.target.value)
                                    }
                                    required={required.includes("full_name")}
                                    error={Boolean(invalid?.full_name)}
                                    helperText={invalid?.full_name}
                                />
                            </Box>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Phone")}</InputLabel>
                                <SoftInput

                                    placeholder="Phone"
                                    icon={{ component: <PhoneInTalkIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                    value={controls.phone}
                                    onChange={(e) => setControl("phone", e.target.value)}
                                    error={Boolean(invalid?.phone)}
                                    helperText={invalid?.phone}
                                >
                                </SoftInput>
                            </Box>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Email")}</InputLabel>
                                <SoftInput
                                    placeholder="email"
                                    icon={{ component: <MailOutlineIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                    value={controls.email}
                                    onChange={(e) =>
                                        setControl("email", e.target.value)
                                    }
                                    required={required.includes("email")}
                                    error={Boolean(invalid?.email)}
                                    helperText={invalid?.email}
                                />
                            </Box>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("job")}</InputLabel>
                                <SoftInput
                                    select
                                    value={controls?.job}
                                    icon={{ component: <WorkOutlineIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" }}}
                                    onChange={(e) => setControl("job", e.target.value)}
                                    required={required.includes("job")}
                                    error={Boolean(invalid?.job)}
                                    helperText={invalid?.job}
                                    onOpen={() => { }}
                                    SelectProps={{
                                        defaultValue: "",
                                        displayEmpty: true,
                                        // onOpen: onOpen,
                                        // onClose: onClose,
                                        renderValue: (selected) => {
                                            if (!Boolean(selected)) {
                                                return (
                                                    <Typography sx={{  opacity: "0.42", fontSize: "14px" }} variant="p">
                                                        {"Vendor"}
                                                    </Typography>
                                                );
                                            } else {
                                                console.log(selected)
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
                            </Box>

                        </Box>

                    </Form>
                    {Boolean(state?.dataRow)===false&& <Form component="form"
                        childrenProps={{
                            title: t("Account")
                        }} sx={{ width: "47%" }} hideFooter={true}>
                        <Box sx={{ display: "flex", flexDirection: "column",boxSizing: "border-box" }}>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("password")}</InputLabel>

                                <PasswordField

                                    placeholder={"Password"}
                                    required={required.includes("password")}
                                    value={controls.password}
                                    onChange={(e) => setControl("password", e.target.value)}
                                    error={Boolean(invalid?.password)}
                                    helperText={invalid?.password}
                                    sx={{ ".MuiInputBase-root input": { minWidth: "95% !important" }, ".MuiInputBase-root": { border: "unset" }, ".MuiInputBase-root::before": { content: "none" } }}
                                    icon={{ component: <LockOpenIcon />, direction: "left" }}
                                />
                            </Box>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("ConfirmPassword")}</InputLabel>
                                <PasswordField

                                    placeholder={"Password"}
                                    required={required.includes("confirm")}
                                    value={controls.confirm}
                                    onChange={(e) => setControl("confirm", e.target.value)}
                                    error={Boolean(invalid?.confirm)}
                                    helperText={invalid?.confirm}
                                    sx={{ ".MuiInputBase-root input": { minWidth: "95% !important" }, ".MuiInputBase-root": { border: "unset" }, ".MuiInputBase-root::before": { content: "none" } }}
                                    icon={{ component: <LockOpenIcon />, direction: "left" }}
                                /></Box>

                        </Box>

                    </Form>}
                   

                </Container>
                <Stack
                    direction="row"
                    justifyContent="flex-end"

                    spacing={1}
                    sx={{ marginX: 6, }}
                    className="container"
                >

                    <SoftButton variant="contained" color="white" onClick={() => resetControls()}>
                        {"cancel"}
                    </SoftButton>
                    <SoftButton
                        variant="contained"
                        type="submit"
                        color="dark"
                        sx={{ backgroundColor: "#510ab3", ":hover": { backgroundColor: (theme) => theme.palette.purple.middle } }}
                        onClick={() => handleSubmit()}
                    >
                        {"save"}
                    </SoftButton>
                </Stack>
                {PostEmployeerResponce.failAlert}
                {PatchEmployeerResponce.failAlert}
            </DashboardLayout>
        </>
    )
}

export default AddNewEmployee
AddNewEmployee.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the AddNewEmployee
AddNewEmployee.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};