
import React, { useRef, useState ,useEffect} from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import { useLocation, useNavigate } from 'react-router-dom'
import SoftButton from "components/SoftButton";
import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';
import SoftInput from "components/SoftInput";
import { useDispatch, useSelector } from 'react-redux'

import {ORDERS} from "data/api"
import useRequest from 'hooks/useRequest'
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box,  Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
function Order({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let Token = localStorage.getItem('token');

    let dispatch=useDispatch()
    const [OrderRequest, getOrderResponce] =
    useRequest({
        path: ORDERS,
        method: "get",
        Token: `Token ${Token}`,
      
    });
    useEffect(()=>{
        OrderRequest({
            onSuccess:(res)=>{
                console.log(res.data)
                dispatch({type:"orders/set",payload:res.datad})
            }
        })
    },[])
  return (
    <DashboardLayout >
            <DashboardNavbar />
            <Container maxWidth={false} sx={{p:4}}>
            <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
                </SoftBox>
                </Container>
    </DashboardLayout>
  )
}

export default Order

Order.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Order
Order.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};