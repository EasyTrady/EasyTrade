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
import { Avatar, Switch,Divider,Stack, Container, InputLabel, Radio, FormControlLabel, RadioGroup, FormLabel, Paper, Box, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Icon, MenuItem, Select, TextField, Typography, Autocomplete, ListItemText, Chip } from '@mui/material';
import SoftInput from "components/SoftInput";
import PersonIcon from '@mui/icons-material/Person';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhoneField from 'components/common/PhoneField';
import compare from 'utils/compare'
import PasswordField from 'components/common/PasswordField';
import { JOBS,PERMISSIONS } from 'data/api';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SoftButton from 'components/SoftButton';
function AddNewJob({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let { t } = useTranslation('common')
    const sub_domain = localStorage.getItem('sub_domain')

    let dispatch = useDispatch()
    let jobs = useSelector((state) => state.job.value)
    let permissions = useSelector((state) => state.permission.value)

    let navigate=useNavigate()
    const location = useLocation();
    const { state } = location;
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
        const [jobpatchRequest, patchjobrResponce] =
        useRequest({
            path: JOBS,
            method: "patch",
            Token: `Token ${Token}`
        });
        const [permissionGetRequest, permissionGetResponce] =
        useRequest({
            path: PERMISSIONS,
            method: "get",
            Token: `Token ${Token}`
        });
        
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
            ,{
                control: "title",
                value: "",
                isRequired: true,
                validations: [
                    {
                        test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
                        message: "not valid name"
                    }
                ]
            },{
                control: "job_permissions",
                value: [],
                isRequired: false,
               
            },

        ]);
    function handleSubmit() {

        validate().then((output) => {

            if (!output.isOk) return;
            if(Boolean(state?.dataRow)){
                let  result= compare(
                    [
                    [controls.title,state?.dataRow?.title,"title"],
                    [controls.job_permissions,String(state?.dataRow?.job_permissions),"job_permissions"],
                //     [controls.phone,state?.dataRow?.phone,"phone"],
                //    [controls.job,state?.dataRow?.job,"job"]
                ],false
                )
               
                jobpatchRequest({
                            id: controls.id,
                            body: result.array,
                            onSuccess: (res) => {
                                dispatch({ type: "job/patchItem", payload: { id: row, item: res.data } })
                                navigate(`/${sub_domain}/dashboard/jobs`)
                            }
                        })
            }else{
                JobPostRequest({
                    body: {
                        title:controls.title,
                        job_permissions:controls?.job_permissions
                    },
                    onSuccess: (res) => {
                        dispatch({ type: "job/addItem", payload: res.data })

                        resetControls()
                        navigate(`/${sub_domain}/dashboard/jobs`)
                        
                    }
                }).then((res) => {
                    let response = res?.response?.data;
    
    
                    setInvalid(response);
    
                });
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
            Object.entries(state?.dataRow)?.forEach(([key,value])=>key=="permissions"?setControl("job_permissions",value?.map((ele)=>ele?.codename)):setControl(key,value))
        }
        // setControl()
       
    }, [state])
    useEffect(()=>{
        permissionGetRequest({
            onSuccess:(res)=>{
                dispatch({ type: "permission/set", payload:  res.data  })
              
            }
        })
    },[])
    useEffect(()=>{
        console.log(controls.job_permissions)
    },[controls?.job_permissions])
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Container>
                    <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                        <Breadcrumbs icon="home" title={Boolean(state?.dataRow)?t("Edit Job"):"Add New Job"} route={route} light={light} />
                    </SoftBox>
                </Container>
                <Container sx={{ p: 2,gap:"6px" }}>
                <Box sx={{ marginY: "6px" ,marginBottom:"20px"}}>
                                <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("JobName")}</InputLabel>
                                <SoftInput
                                    placeholder={t("JobName")}
                                    icon={{ component: <MailOutlineIcon />, direction: "left" }}
                                    sx={{ ".MuiInputBase-root": { border: "unset" } }}
                                    value={controls.title}
                                    onChange={(e) =>
                                        setControl("title", e.target.value)
                                    }
                                    required={required.includes("title")}
                                    error={Boolean(invalid?.title)}
                                    helperText={invalid?.title}
                                    // error
                                />
                            </Box>
                            <SoftBox sx={{display:"flex",justifyContent:"space-between"}}>
                    <SoftBox sx={{width:"47%"}}>
                  
                    <Form component="form"
                        childrenProps={{
                            title: t("AdvertisingCookies"),
                            subtitle:t("Alwaysactive")
                        }}hideFooter={true}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {permissions?.results?.map((ele,index)=>index<=6&&
                             <Box key={index} sx={{ marginY: "6px",marginBottom:"20px",display:"flex",justifyContent:"space-between" }}>
                             <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{ele?.name}</InputLabel>
                             <SoftBox sx={{display:"flex" ,alignItems:"center"}}> 
                                   <Divider sx={{ flexGrow: 1 }} orientation="vertical"/>
                                   <Switch  checked={controls?.job_permissions?.includes(ele?.codename)} color="default"onChange={()=>setControl("job_permissions",controls?.job_permissions?.includes(ele?.codename)?controls?.job_permissions.filter((elem)=>elem!=ele?.codename):[...controls?.job_permissions,ele?.codename])} />
                                   </SoftBox>
                         </Box>
                            )}
                        </Box>

                    </Form>
                    </SoftBox>
                    <SoftBox sx={{width:"47%",display:"flex",flexDirection:"column", alignSelf: "flex-start"}}>
                 
                            <Form component="form"
                        childrenProps={{
                            title: t("AdvertisingCookies"),
                            subtitle:t("Alwaysactive")
                        }}hideFooter={true}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {permissions?.results?.map((ele,index)=>index>6&&
                             <Box key={index} sx={{ marginY: "6px",marginBottom:"20px",display:"flex",justifyContent:"space-between" }}>
                             <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{ele?.name}</InputLabel>
                             <SoftBox sx={{display:"flex" ,alignItems:"center"}}> 
                                   <Divider sx={{ flexGrow: 1 }} orientation="vertical"/>
                                   <Switch  checked={controls?.job_permissions?.includes(ele?.codename)} color="default"onChange={()=>setControl("job_permissions",[...controls?.job_permissions,ele?.codename])} />
                                   </SoftBox>
                         </Box>
                            )}
                           
                        </Box>

                    </Form> 
                    </SoftBox>
                    </SoftBox>

                </Container>
                <Stack
                    direction="row"
                    justifyContent="flex-end"

                    spacing={1}
                    sx={{ marginX: 6, }}
                    className="container"
                >

                    <SoftButton variant="contained" color="white" onClick={() =>{resetControls(); navigate(`/${sub_domain}/dashboard/jobs`)}}>
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