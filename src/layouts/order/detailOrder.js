import React, { useRef, useState, useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import moment from 'moment';
import SoftInput from 'components/SoftInput'
import Accordion from '@mui/material/Accordion';
import useControls from "hooks/useControls";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useRequest from 'hooks/useRequest'
import { ORDERS,CUSTOMER } from "data/api"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box, Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabel, CardHeader
} from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
function DetailOrder({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let Token = localStorage.getItem('token');

    let { t } = useTranslation("common")
    let { id } = useParams();
    const createMarkup = (word) => {
        return { __html: word };
    };
    let orders = useSelector((state) => state.orders.value)
    let [order, setOrder] = useState({})
    let [Customer, setCustomer] = useState(null)
    const [{ controls, invalid, required }, { setControl, resetControls, validate ,setInvalid}] = useControls([
        {
            control: "status", value: "return", isRequired: false 
    }
])
    const [OrderByIdRequest, getOrderByIdResponce] =
        useRequest({
            path: ORDERS,
            method: "get",
            Token: `Token ${Token}`,

        });
        const [customerByIdRequest, getcustomerByIdResponce] =
        useRequest({
            path: CUSTOMER,
            method: "get",
            Token: `Token ${Token}`,

        });
        const [returnOrderRequest, patchreturnOrderResponce] =
        useRequest({
            path: ORDERS,
            method: "patch",
            Token: `Token ${Token}`,

        });
    useEffect(() => {
        if (Boolean(orders.results.find((ele) => ele.id == id))) {
            setOrder(orders.results.find((ele) => ele.id == id))
        } else {
            OrderByIdRequest({
                id: id,
                onSuccess: (res) => {
                    setOrder(res.data)
                }
            })
        }
        console.log(Boolean(orders.results.find((ele) => ele.id == id)))
    }, [orders])
    useEffect(() => {
        console.log(Boolean(Customer),order.customer,order)
        if (!Boolean(Customer)) {
            customerByIdRequest({
                id:order.customer,
                onSuccess: (res) => {
                    console.log(res.data)

                    setCustomer(res.data)
                }
            })
        }

    }, [order.customer])
    useEffect(() => {
        
        if (controls.status=="return") {
            returnOrderRequest({
                id:id+"/return_order",
                onSuccess: (res) => {
                    console.log(res.data)

                    setControl("status","return")
                }
            })
        }else if(controls.status=="cancel"){
            returnOrderRequest({
                id:id+"/cancel",
                onSuccess: (res) => {
                    console.log(res.data)

                    setControl("status","cancel")
                }
            })
        }

    }, [controls.status])
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container maxWidth={false} sx={{ p: 4 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
                </SoftBox>
                <Stack direction={"row"} sx={{ gap: "24px" ,flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"}}}>
                    <SoftBox sx={{ width: {lg:"70%",md:"70%",sm:"100%",xs:"100%"}, backgroundColor: (theme) => theme.palette.white.main, borderRadius: "8px" }}>
                        <SoftBox sx={{
                            display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 12px 24px",
                            borderBottom: "1px solid gray", borderColor: (theme) => theme.palette.grey[500]
                        }}>
                            <SoftBox>
                                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                                    {t("OrderId")}<Typography component={"span"} sx={{ padding: "20px", fontSize: "16px" }}>{id}</Typography>
                                </Typography>
                                <Typography sx={{ color: (theme) => theme.palette.grey[500], fontSize: "14px" }}>
                                    {moment(order?.created_at).format("YYYY/MM/DD")}
                                </Typography>
                            </SoftBox>
                            <SoftBox>
                                {order?.status === "pending" ? <Typography sx={{
                                    color: (theme) => theme.palette.blue.main,
                                    fontSize: "14px", borderRadius: "8px",
                                    backgroundColor: (theme) => theme.palette.blue.hover,
                                    padding: "5px 16px 5px 16px"
                                }}>{order?.status}</Typography> : order?.status === "canceled" ? <Typography sx={{
                                    color: (theme) => theme.palette.error.main,
                                    fontSize: "14px", borderRadius: "8px",
                                    backgroundColor: (theme) => theme.palette.error.hover,
                                    padding: "5px 16px 5px 16px"
                                }}>{order?.status}</Typography> : order?.status === "Delivered" ? <Typography sx={{
                                    color: (theme) => theme.palette.success.main,
                                    fontSize: "14px", borderRadius: "8px",
                                    backgroundColor: (theme) => theme.palette.success.hover,
                                    padding: "5px 16px 5px 16px"
                                }}>{order?.status}</Typography> : order?.status === "shipped" ? <Typography sx={{
                                    color: (theme) => theme.palette.warning.main,
                                    fontSize: "14px", borderRadius: "8px",
                                    backgroundColor: (theme) => theme.palette.warning.focus,
                                    padding: "5px 16px 5px 16px"
                                }}>{order?.status}</Typography> : <></>}
                            </SoftBox>
                        </SoftBox>
                        <SoftBox sx={{ padding: "12px 24px 12px 24px", borderBottom: "1px solid gray", borderColor: (theme) => theme.palette.grey[500] }}>
                            <Typography sx={{ color: (theme) => theme.palette.grey[500], fontSize: "14px" }}>
                                {t("Products")}
                            </Typography>
                            {order?.products?.map((ele) => <SoftBox sx={{ display: "flex", justifyContent: "space-between", marginY: "10px" }} key={ele?.id}>
                                <SoftBox sx={{ display: "flex", alignItems: "flex-start" }}>
                                    <Typography variant={"img"} component={"img"} src={ele?.main_image} sx={{ width: "78px", height: "78px", borderRadius: "8px", objectFit: "cover" }} />
                                    <Typography sx={{ marginX: "10px" }}>
                                        <div dangerouslySetInnerHTML={createMarkup(ele?.description)} style={{ fontSize: "14px" }} />
                                    </Typography>
                                </SoftBox>
                                <SoftBox>

                                    <Typography variant={"h6"} component={"h6"}>
                                        {ele?.price}EGP
                                    </Typography>
                                </SoftBox>
                            </SoftBox>)}
                        </SoftBox>
                        <SoftBox sx={{ padding: "12px 24px 12px 24px", borderBottom: "1px solid gray", borderColor: (theme) => theme.palette.grey[500] }}>
                            <SoftBox sx={{ display: "flex", justifyContent: "space-between", }}>

                                <Typography variant={"h6"} component={"h6"} sx={{ color: (theme) => theme.palette.grey[500] }}>
                                    {t("Subtotal")}
                                </Typography>
                                <Typography variant={"h6"} component={"h6"}>
                                    {order?.sub_total}
                                </Typography>
                            </SoftBox>
                            <SoftBox sx={{ display: "flex", justifyContent: "space-between", }}>

                                <Typography variant={"h6"} component={"h6"} sx={{ color: (theme) => theme.palette.grey[500] }}>
                                    {t("discount")}
                                </Typography>
                                <Typography variant={"h6"} component={"h6"}>
                                    {order?.discount}
                                </Typography>
                            </SoftBox>
                            <SoftBox sx={{ display: "flex", justifyContent: "space-between", }}>

                                <Typography variant={"h6"} component={"h6"} sx={{ color: (theme) => theme.palette.grey[500] }}>
                                    {t("Shoppingcost")}
                                </Typography>
                                <Typography variant={"h6"} component={"h6"}>
                                    {order?.shipping_cost}
                                </Typography>
                            </SoftBox>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", padding: "12px 24px 12px 24px" }}>

                            <Typography variant={"h6"} component={"h6"} >
                                {t("total")}
                            </Typography>
                            <Typography variant={"h6"} component={"h6"}>
                                {order?.total}
                            </Typography>
                        </SoftBox>
                    </SoftBox>

                    <SoftBox sx={{ width: {lg:"25%",md:"25%",sm:"100%",xs:"100%"}, backgroundColor: (theme) => theme.palette.white.main, borderRadius: "8px" }}>
                        <SoftBox sx={{
                            display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 12px 24px",
                            borderBottom: "1px solid gray", borderColor: (theme) => theme.palette.grey[500], fontSize: "16px"
                        }}>
                            {t("Activity")}
                        </SoftBox>
                        <Container>
                        <Stack alignItems="center"justifyContent="center">
                            <SoftBox>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="192" viewBox="0 0 11 192" fill="none">
  <circle cx="5.5" cy="5" r="5" fill="#F09343"/>
  <circle cx="5.5" cy="96" r="5" fill="#F2BD00"/>
  <circle cx="5.5" cy="187" r="5" fill="#F09343"/>
  <line x1="5.75" y1="17" x2="5.75" y2="84" stroke="#959595" strokeWidth="0.5"/>
  <line x1="5.75" y1="108" x2="5.75" y2="175" stroke="#959595" strokeWidth="0.5"/>
</svg>
                            </SoftBox>
                            <SoftBox>
                            </SoftBox>
                        </Stack>

</Container>
                    </SoftBox>
                </Stack>
                <Stack direction={"row"} sx={{ gap: "24px" ,mt:4,flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"},alignItems:"center"}}>
                <Accordion sx={{ marginY: "24px", width: {lg:"70%",md:"70%",sm:"100%",xs:"100%"}, boxShadow: "unset", borderRadius: "8px",alignSelf:"flex-start" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                       
                    >
                        <Typography sx={{ fontSize: "18px" }}>{t("Customerdetails")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Table sx={{display:"flex",overflow:"auto"}}>
                            <TableBody >
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("Name")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}}>{order?.customer?.full_name}</TableCell>
                                </TableRow>
                                {/* <TableRow sx={{border:"unset"}}>
                                    <TableCell >{t("Address")}</TableCell>
                                    <TableCell >{Customer?.phone}</TableCell>
                                </TableRow> */}
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("Phone")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}}>{order?.customer?.phone}</TableCell>
                                </TableRow>
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("Email")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}}>{order?.customer?.email}</TableCell>
                                </TableRow>
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("country")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}}>{order?.customer?.country}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody >
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("PaymentMethod")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}}>{order?.payment_method}</TableCell>
                                </TableRow>
                                {/* <TableRow sx={{border:"unset"}}>
                                    <TableCell >{t("Address")}</TableCell>
                                    <TableCell >{Customer?.phone}</TableCell>
                                </TableRow> */}
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500],borderBottom:"unset"}}>{t("status")}</TableCell>
                                    <TableCell sx={{borderBottom:"unset"}} >{order?.status}</TableCell>
                                </TableRow>
                                {/* <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500]}}>{t("Email")}</TableCell>
                                    <TableCell >{order?.customer?.email}</TableCell>
                                </TableRow>
                                <TableRow sx={{border:"unset"}}>
                                    <TableCell sx={{color:(theme)=>theme.palette.grey[500]}}>{t("country")}</TableCell>
                                    <TableCell >{order?.customer?.country}</TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
                <SoftBox sx={{ width: {lg:"25%",md:"25%",sm:"100%",xs:"100%"}, backgroundColor: (theme) => theme.palette.white.main, borderRadius: "8px",alignSelf:"flex-start" }}>
                        <SoftBox sx={{
                            display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 12px 24px",
                            borderBottom: "1px solid gray", borderColor: (theme) => theme.palette.grey[500], fontSize: "16px"
                        }}>
                            {t("status")}
                        </SoftBox>
                        <Container sx={{m:4}}>
                        <SoftInput 
      select
      onChange={(e)=>setControl("status",e.target.value)}
      value={controls.status}
      IconComponent={KeyboardArrowDownIcon}
      SelectProps={{
        defaultValue: "",
        displayEmpty: true,
        // onOpen: onOpen,
        // onClose: onClose,
        renderValue: (selected) => {
          if (!Boolean(selected)) {
            return (
              <Typography sx={{ color: "currentColor", opacity: "0.42",fontSize:"14px" }}>
                {t("status")}
              </Typography>
            );
          } else {
            return  selected
          }
        },
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: "200px",
              overflowY: "auto",
             backgroundColor:"white !important"
            },
          },
        },
       
        IconComponent:  ()=><KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        
      }} >
<MenuItem value={"return"}>Return</MenuItem>
<MenuItem value={"cancel"}>cancel</MenuItem>

      </SoftInput></Container>
                    </SoftBox>
      </Stack>

            </Container>

        </DashboardLayout>
    )
}

export default DetailOrder
DetailOrder.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Order
DetailOrder.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};