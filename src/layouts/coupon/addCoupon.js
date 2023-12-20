import React, { useRef } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import useRequest from 'hooks/useRequest'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'examples/Breadcrumbs'
import { Avatar, Container, InputLabel, FormControlLabel, RadioGroup, FormLabel, Paper, Box, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography, Autocomplete, ListItemText, Chip } from '@mui/material';
import Form from 'components/common/Form';
import { useTranslation } from 'react-i18next';
import SoftInput from "components/SoftInput";
import useControls from 'hooks/useControls';
import DatePickerField from "components/common/DatePicker";
import DateIcon2 from 'examples/Icons/DateIcon2';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
function AddCoupon({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let Token = localStorage.getItem('token')
    let dispatch = useDispatch()
    let { t } = useTranslation('common')
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            { control: "id", value: "", isRequired: false },
            { control: "image", value: "", isRequired: false },
           
            {
                control: "coupon_code",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z0-9\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            },
            {
                control: "coupon_end_date",
                value: "",
                isRequired: true,
                
            },
            {
                control: "amount",
                value: "",
                isRequired: true,
                
            },{
                control: "is_percentage_discount",
                value: "",
                isRequired: true,
                
            },

        ]);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Container sx={{ p: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={"Add new coupon "} route={route} light={light} />
                </SoftBox>

                <Form component="form"
                    childrenProps={{
                        title: t("Coupon details")
                    }} sx={{ width: "100%", borderRadius: "8px" }} hideFooter={true}>
                    <Box sx={{ display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                        <Box sx={{ marginY: "6px" }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Coupon code*")}</InputLabel>
                            <SoftInput
                                placeholder="Coupon code"
                                // icon={{ component: <PersonIcon />, direction: "left" }}

                                value={controls.coupon_code}
                                onChange={(e) =>
                                    setControl("coupon_code", e.target.value)
                                }
                                required={required.includes("coupon_code")}
                                error={Boolean(invalid?.coupon_code)}
                                helperText={invalid?.coupon_code}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    mb: '6px'
                                }}
                            >
                                end date*
                            </Typography>
                            <DatePickerField
                                value={controls?.coupon_end_date}
                                onChange={(newvalue) => { setControl("coupon_end_date", newvalue); console.log(newvalue) }}
                                icon={DateIcon2}
                            />
                        </Box>
                        <Box sx={{ marginY: "6px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("is_percentage_discount")}</InputLabel>
                                <SoftInput
        id="outlined-adornment-password"
        type={'text'}
        value={controls?.amount}
        sx={{".MuiInputBase-root":{ overflow: "hidden !important", padding: "0px !important"}}}
        onChange={(e) => { setControl("coupon_end_date", e.target.value)}}
                                InputProps={{
                                    endAdornment:
            (
                                <SoftInput
                                    select
                                    value={controls?.is_percentage_discount}
                                    icon={{ component: <KeyboardArrowDownIcon />, direction: "right" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" }}}
                                    onChange={(e) => setControl("is_percentage_discount", e.target.value)}
                                    required={required.includes("is_percentage_discount")}
                                    error={Boolean(invalid?.is_percentage_discount)}
                                    helperText={invalid?.is_percentage_discount}
                                    onOpen={() => { }}
                                    SelectProps={{
                                        defaultValue: "",
                                        displayEmpty: true,
                                        renderValue: (selected) => {
                                            if (!Boolean(selected)) {
                                                return (
                                                   
                                                        "%"
                                                  
                                                );
                                            } else {
                                                
                                                return selected;
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
                                    }}

                                >
                                    {["%","$"]?.map((ele,index) => <MenuItem value={ele} key={index}>{ele}</MenuItem>)}
                                </SoftInput>)}}/>
                            </Box>
                    </Box>
                </Form>
            </Container>
        </DashboardLayout>
    )
}
export default AddCoupon
AddCoupon.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the AddCoupon
AddCoupon.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};