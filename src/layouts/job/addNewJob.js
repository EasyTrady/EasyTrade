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
import { JOBS } from 'data/api';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SoftButton from 'components/SoftButton';
function AddNewJob({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let { t } = useTranslation('common')
    let dispatch = useDispatch()
    let jobs = useSelector((state) => state.job.value)

    let Token = localStorage.getItem('token')
    const [jobRequest, getjobResponce] =
        useRequest({
            path: JOBS,
            method: "get",
            Token: `Token ${Token}`
        });
    const [JobPostRequest, PostJobrResponce] =
        useRequest({
            path: JOBS,
            method: "post",
            Token: `Token ${Token}`
        });
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
    function handleSubmit() {

        validate().then((output) => {

            if (!output.isOk) return;
            JobPostRequest({
                body: controls,
                onSuccess: (res) => {
                    resetControls()
                    console.log(res.data, controls)
                }
            }).then((res) => {
                let response = res?.response?.data;


                setInvalid(response);

            });
        })

    }
    useEffect(() => {
        jobRequest({
            onSuccess: (res) => {
                dispatch({ type: "job/set", payload: res.data })
            }
        })
    }, [])
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Container>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                </Container>
                <Container sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Form component="form"
                        childrenProps={{
                            title: t("ContactInfo")
                        }} sx={{ width: "47%" }} hideFooter={true}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Fullname")}</InputLabel>
                                <SoftInput
                                    placeholder="Full Name"
                                    icon={{ component: <PersonIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" } }}
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
                                    value={controls.job}
                                    icon={{ component: <WorkOutlineIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" } }}
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
                                                    <Typography sx={{ color: "currentColor", opacity: "0.42", fontSize: "14px" }}>
                                                        {"job name"}
                                                    </Typography>
                                                );
                                            } else {
                                                console.log(selected)
                                                return jobs?.results?.find((ele)=>ele.id===selected).title;
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
                    <Form component="form"
                        childrenProps={{
                            title: t("Account")
                        }} sx={{ width: "47%" }} hideFooter={true}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
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

                    </Form>

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
                {PostJobrResponce.failAlert}
            </DashboardLayout>
        </>
    )
}

export default AddNewJob
AddNewJob.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the AddNewJob
AddNewJob.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};