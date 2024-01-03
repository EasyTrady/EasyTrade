import React from 'react'

import { useRef, useState, useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import PersonIcon from '@mui/icons-material/Person';

import { useLocation, useNavigate } from 'react-router-dom'
import SoftButton from "components/SoftButton";
import DataGridCustom from 'components/common/DateGridCustomer'
import moment from 'moment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SelectField from 'components/common/SelectField';

import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';
import SoftInput from "components/SoftInput";
import { useDispatch, useSelector } from 'react-redux'
import PhoneField from 'components/common/PhoneField'
import PasswordField from 'components/common/PasswordField';
// import Form from 'components/common/Form';

// import { useTranslation } from 'react-i18next';
import { VENDORPERMISSION ,CATEGORY,VENDER,VENDERCATEGORY} from "data/api"
import Form from 'components/common/Form';
import useControls from 'hooks/useControls';
import useRequest from 'hooks/useRequest'
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box, Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabe,Switch
} from '@mui/material'
import EmailIcon from 'examples/Icons/EmailIcon'
import ParentageIcon from 'examples/Icons/parentageicon'
import compare from 'utils/compare'
function AddVendor({ absolute, light, isMini }) {
    let refLogo = useRef(null)
    const location = useLocation();
    const { state } = location;
    let navigate=useNavigate()
    let dispatch=useDispatch()
const sub_domain = localStorage.getItem('sub_domain')

    
    const route = useLocation().pathname.split("/").slice(1);
    let [categories,setCategory] = useState([])
    let vendorPermissions = useSelector((state) => state.vendorPermission.value)

    let Token = localStorage.getItem("token");
    let newForm=new FormData()
    let { t } = useTranslation("common")
    const [categoryRequest, getcategoryResponce] =
        useRequest({
            path: VENDERCATEGORY,
            method: "get",
            Token: `Token ${Token}`
        });
        const [venderRequest, venderResponce] =
        useRequest({
          path: VENDER,
          method: "post",
          Token: `Token ${Token}`,
          contentType: "multipart/form-data",
    
        });
        const [vendorPermissionRequest, vendorpermissionResponce] =
        useRequest({
            path: VENDORPERMISSION,
            method: "get",
            Token: `Token ${Token}`
        });
        const [vendorupdateRequest, vendorupdateResponce] =
        useRequest({
            path: VENDER,
            method: "patch",
            Token: `Token ${Token}`,
          contentType: "multipart/form-data",

        });
        function getCategory(){
            categoryRequest({
                onSuccess: (res) => {
                    setCategory(res.data.map((ele)=>ele))
                    // dispatch({ type: "category/set", payload: res.data })
                   
    
                }
            })
        }
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {
                control: "id",
                value: "",
                isRequired: false,
                // validations: [
                //     {
                //         test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                //         message: "not valid name"
                //     }
                // ]
            }
            , {
                control: "logo",
                value: "",
                isRequired: Boolean(state?.dataRow)?false:true,

            },{
                control: "image",
                value: "",
                isRequired: false,

            }, {
                control: "permissions",
                value: [],
                isRequired: false,

            }, {
                control: "full_name",
                value: "",
                isRequired: Boolean(state?.dataRow)?false:true,

            }, {
                control: "phone",
                value: "",
                isRequired:Boolean(state?.dataRow)?false: true,

            }, {
                control: "code",
                value: "+20",
                isRequired: false,

            }, {
                control: "brand_name",
                value: "",
                isRequired:Boolean(state?.dataRow)?false:true,
            }, {
                control: "brand_website",
                value: "",
                isRequired: false,
            }, {
                control: "trading_type",
                value: "",
                isRequired: false,
            },{
                control: "email",
                value: "",
                isRequired: true,
            }, {
                control: "password",
                value: "",
                isRequired:Boolean(state?.dataRow)? false:true,
            }, {
                control: "confirm",
                value: "",
                isRequired: false,
                validations: [
                    {
                        customValidation: (controls) => controls?.confirm == controls?.password,
                        message: "confirm must equal password",
                    },
                ],

            }, {
                control: "percentage_amount",
                value: "",
                isRequired: false,
                validations: [
                    {
                        customValidation: (controls) => controls?.percentage_amount <= 1.4,
                        message: "percentage amount must not greater than 1.4",
                    },
                ],
            }

        ]);
    function logoadd(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        //   setImageFile(file);
        newForm.append("logo",e.target.files[0])
        setControl("logo", e.target.files[0]);

        reader.onload = () => {
            setControl("image", reader?.result);

        };
        reader.readAsDataURL(file);

    }
    
    useEffect(()=>{
        if(vendorPermissions?.results?.length==0){
            vendorPermissionRequest({
                params:{size:vendorPermissions?.count?vendorPermissions?.count:20},
                onSuccess:(res)=>{
                    dispatch({ type: "venderPermission/set", payload: res.data })
                   
                }
            })
        }
        
    },[vendorPermissions?.results?.length])
    useEffect(() => {
        // jobRequest({
        //     onSuccess: (res) => {
        //         dispatch({ type: "job/set", payload: res.data })
        //     }
        // })
        console.log(state?.dataRow)
        if (Boolean(state?.dataRow)) {

            Object.entries(state?.dataRow)?.forEach(([key, value]) =>{ key=="logo"?setControl("logo", value):setControl(key, value)})
            setControl("image",state?.dataRow?.logo)
        }
        // setControl()

    }, [state])
    function handleSubmit(){

        validate().then((output)=>{
            if (!output.isOk) return;
            if (Boolean(state?.dataRow)) {
                let  result= compare(
                    [
                    [controls.full_name,state?.dataRow?.full_name,"full_name"],
                    [controls.logo,state?.dataRow?.logo,"logo"],
                    [controls.phone,state?.dataRow?.phone,"phone"],
                    [controls.brand_name,state?.dataRow?.brand_name,"brand_name"],
                    [controls.brand_website,state?.dataRow?.brand_website,"brand_website"],
                    [controls.trading_type,state?.dataRow?.trading_type,"trading_type"],
                    [controls.email,state?.dataRow?.email,"email"],
                    [controls.percentage_amount,state?.dataRow?.percentage_amount,"percentage_amount"],

                    
                    [controls.permissions,String(state?.dataRow?.permissions),"permissions"],
                //     [controls.phone,state?.dataRow?.phone,"phone"],
                //    [controls.job,state?.dataRow?.job,"job"]
                ],false
                ) 
                Object.entries(result.array).map(([key,value])=>key!="permissions"?newForm.append(key,value):newForm.append("permissions[]", value))
                vendorupdateRequest({
                    id:controls.id,
                    body:newForm,
                    onSuccess:(res)=>{
                        dispatch({ type: "vender/patchItem", payload:{ id:res.data.id,item:res.data} })
                        navigate(`/${sub_domain}/dashboard/venders`)

                    }
                })
                console.log(result)
            }else{
                Object.entries(controls).map(([key, value])=>key!="image"&&key!="permissions"&&key!="logo"&&key!="phone"?newForm.append(key,String(value)):key!="image"&&key!="phone"&&key!="permissions"&&key!="logo"?newForm.append(key,value):null)
                controls?.permissions?.map((ele) => newForm.append("permissions[]", ele))
                newForm.append("logo", controls?.logo)
                newForm.append("phone", controls?.code+controls?.phone)
    
                venderRequest({
                    body:newForm,onSuccess:(res)=>{
                        dispatch({ type: "vender/addItem", payload: res.data })
                        navigate(`/${sub_domain}/dashboard/venders`)
                    }
                }).then((res) => {
                    let response = res?.response?.data;
                    
                    // const responseBody = filter({
                    //   obj: {
                    //     name: response?.name?.join(""),
                    //     quantity: response?.quantity?.join(" "),
                    //    
                    //   },
                    //   output: "object",
                    // });
              
                    setInvalid(response);
                  });
            }
           
        })
    }
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container maxWidth={false} sx={{ p: 4 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={"Add new vendor"} route={route} light={light} />
                </SoftBox>
                <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Form component="form"
                        childrenProps={{
                            title: t("Contact Info"),

                        }} hideFooter={true} sx={{ width: { lg: "49%", md: "49%", sm: "100%", xs: "100%" } }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                            <Avatar src={controls?.image} sx={{ width: "50px", height: "50px" }} />
                            <SoftBox sx={{ marginX: "8px" }}>
                                <SoftTypography component={"h3"}>
                                    Logo
                                </SoftTypography>
                                <input
                                    id="images_product"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={logoadd} ref={refLogo}
                                    style={{ display: "none" }}
                                />
                                {/* <SoftTypography component={SoftInput} type="file" sx={{display:"none",fontSize:"16px",color:(theme)=>theme.palette.purple.middle,textDecoration: "underline !important"}}/> */}
                                <SoftTypography component={"a"} onClick={() => refLogo.current.click()} sx={{ fontSize: "16px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}>
                                    Upload image
                                </SoftTypography>
                            </SoftBox>
                        </Box>
                        <Box sx={{ marginY: "6px", marginBottom: "10px" }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("full name")}</InputLabel>
                            <SoftInput
                                placeholder={t("full name")}
                                icon={{ component: <PersonIcon />, direction: "left" }}
                                sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                value={controls.full_name}
                                onChange={(e) =>{
                                    // newForm.append("full_name",e.target.value);
                                    setControl("full_name", e.target.value)}
                                }
                                required={required.includes("full_name")}
                                error={Boolean(invalid?.full_name)}
                                helperText={invalid?.full_name}
                            // error
                            />
                        </Box>
                        <Box sx={{}}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ fontSize: "14px" }}>{t("Phone")}</InputLabel>
                            <PhoneField
                                selectProps={{
                                    value: controls.code,
                                    onChange: (e) => {
                                        setControl("code", e.target.value);
                                    },
                                }}
                                requiredCode
                                required={required.includes("phone")}
                                value={controls.phone}
                                onChange={(e) => {
                                    // newForm.append("phone",e.target.value);
                                setControl("phone", e.target.value)}}
                                error={Boolean(invalid.phone)}
                                helperText={invalid.phone}
                                sx={{ width: "100%" }} />

                        </Box>
                        <Box sx={{   }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{  fontSize: "14px" }}>{t("vendor parentage")}</InputLabel>
                            <SoftInput

                                placeholder={t("percentage amount")}
                                icon={{ component: <ParentageIcon />, direction: "left" }}
                                sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                value={controls.percentage_amount}
                                onChange={(e) =>{
                                    // newForm.append("percentage_amount",e.target.value)
                                    ;setControl("percentage_amount", e.target.value)}
                                }
                                required={required.includes("percentage_amount")}
                                error={Boolean(invalid?.percentage_amount)}
                                helperText={invalid?.percentage_amount}
                            // error
                            />
                        </Box>
                        <Box sx={{}}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{  fontSize: "14px" }}>{t("brand name")}</InputLabel>
                            <SoftInput

                                placeholder={t("brand")}
                                icon={{ component: <PersonIcon />, direction: "left" }}
                                sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                value={controls.brand_name}
                                onChange={(e) =>{
                                    // newForm.append("brand_name_name",e.target.value)
                                    ;setControl("brand_name", e.target.value)}
                                }
                                required={required.includes("brand_name")}
                                error={Boolean(invalid?.brand_name)}
                                helperText={invalid?.brand_name}
                            // error
                            />
                        </Box>
                        <Box sx={{   }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{  fontSize: "14px" }}>{t("brand website")}</InputLabel>
                            <SoftInput

                                placeholder={t("brand website")}
                                icon={{ component: <PersonIcon />, direction: "left" }}
                                sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                value={controls.brand_website}
                                onChange={(e) =>{
                                    // newForm.append("brand_website",e.target.value)
                                    
                                    ;setControl("brand_website", e.target.value)}
                                }
                                required={required.includes("brand_website")}
                                error={Boolean(invalid?.brand_website)}
                                helperText={invalid?.brand_website}
                            // error
                            />
                        </Box>
                    </Form>
                    <Form component="form"
                        childrenProps={{
                            title: t("Account"),

                        }} hideFooter={true} sx={{ width: { lg: "49%", md: "49%", sm: "100%", xs: "100%" } }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box sx={{ marginY: "6px", marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{"email"}</InputLabel>
                                <SoftInput
                                    placeholder={"email"}
                                    icon={{ component: <EmailIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                    value={controls.email}
                                    onChange={(e) =>{
                                        // newForm.append("email",e.target.value)
                                        ;setControl("email", e.target.value)}
                                    }
                                    required={required.includes("email")}
                                    error={Boolean(invalid?.email)}
                                    helperText={invalid?.email}
                                // error
                                />
                            </Box>
                            {!Boolean(state?.dataRow) && <Box sx={{ marginY: "6px", marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{"password"}</InputLabel>
                                <PasswordField

                                    placeholder={"Password"}
                                    required={required.includes("password")}
                                    value={controls.password}
                                    onChange={(e) => {
                                        // newForm.append("password",e.target.value);
                                        setControl("password", e.target.value)}}
                                    error={Boolean(invalid?.password)}
                                    helperText={invalid?.password}
                                    sx={{ ".MuiInputBase-root input": { minWidth: "95% !important" }, ".MuiInputBase-root": { border: "unset" }, ".MuiInputBase-root::before": { content: "none" } }}
                                    icon={{ component: <LockOpenIcon />, direction: "left" }}
                                />
                            </Box>}
                           {!Boolean(state?.dataRow) && <Box sx={{ marginY: "6px" }}>
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
                                /></Box>}
                                <Box sx={{ marginY: "6px", marginBottom: "10px" }}>
                                {/* <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{"trading type"}</InputLabel> */}
                              
                                      <SelectField
            variant="outlined"
            placeholder={"Beauty"}
            label="trading type"
            isPending={getcategoryResponce.isPending}
            onOpen={getCategory}
            value={controls.trading_type}
            onChange={(e) => setControl("trading_type", e.target.value)}
            renderValue={(selected) => {
            
                if(categories?.length==0){
                    getCategory()
                }
              return categories?.find((category) => category.id === selected)?.category_name;
            }}
            sx={{ width: "100%" }}
          >
            {categories?.map((category) => (
              <MenuItem key={category?.id} value={category?.id}>
                {category?.category_name}
              </MenuItem>
            ))}
          </SelectField>
                            </Box>
                        </Box>

                    </Form>
                </SoftBox>
                <Form component="form"
                        childrenProps={{
                            title: t("AdvertisingCookies"),
                            subtitle:t("Alwaysactive")
                        }}hideFooter={true} sx={{my:2}}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {vendorPermissions?.results?.map((ele,index,array)=>
                             <Box key={index} sx={{ marginY: "6px",marginBottom:"20px",display:"flex",justifyContent:"space-between" }}>
                             <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{ele?.name}</InputLabel>
                             <SoftBox sx={{display:"flex" ,alignItems:"center"}}> 
                            
                                   <Divider sx={{ flexGrow: 1 }} orientation="vertical"/>
                                   <SoftTypography component="p" sx={{fontSize:"14px",color:(theme)=>controls?.permissions?.includes(ele?.codename)?theme.palette.success.main:theme.palette.error.main,mx:2}}>{controls?.permissions?.includes(ele?.codename)?"Turned On":"Turned Off"}</SoftTypography>
                                   <Switch  checked={controls?.permissions?.includes(ele?.codename)} color="default"onChange={()=>setControl("permissions",[...controls?.permissions,ele?.codename])} />
                                   </SoftBox>
                         </Box>
                            )}
                           
                        </Box>

                    </Form>
                    <Stack
                    direction="row"
                    justifyContent="flex-end"

                    spacing={1}
                    
                    className="container"
                >

                    <SoftButton variant="contained" color="white" onClick={() => { resetControls(); navigate(`/${sub_domain}/dashboard/venders`) }}>
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
            </Container>
        </DashboardLayout>
    )
}
export default AddVendor
AddVendor.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the AddVendor
AddVendor.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};