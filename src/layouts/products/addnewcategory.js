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
import PersonIcon from '@mui/icons-material/Person';
import useControls from 'hooks/useControls'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {CATEGORY} from "data/api"
import useRequest from 'hooks/useRequest'
import { useDispatch, useSelector } from 'react-redux'
import {
    Collapse, Dialog, Icon, InputLabel, List, ListItemButton,
    ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField,
    Typography, Box,  Container, Divider, Avatar, Radio, FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
import compare from 'utils/compare'
function Addnewcategory({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let navigate=useNavigate()
    const location = useLocation();
    const { state } = location;
    const formDate=new FormData()
    let dispatch = useDispatch()
    let Token = localStorage.getItem('token');
    let { t } = useTranslation("common");
    let categories = useSelector((state) => state.category.value)
    let refimage = useRef(null)
    let [Avater, setavater] = useState(null)
  const sub_domain = localStorage.getItem('sub_domain')

    const [categoryRequest, getcategoryResponce] =
    useRequest({
        path: CATEGORY,
        method: "get",
        Token: `Token ${Token}`,
      
    });
    const [categoryPostRequest, postcategoryResponce] =
    useRequest({
        path: CATEGORY,
        method: "post",
        Token: `Token ${Token}`,
        successMessage:t("postCategoryresult"),
        contentType: "multipart/form-data",
    });
    const [categorypatchRequest, patchcategoryResponce] =
    useRequest({
        path: CATEGORY,
        method: "patch",
        Token: `Token ${Token}`,
        successMessage:t("postCategoryresult"),
        contentType: "multipart/form-data",
    });
   
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {
                control: "id",
                value: "",
                isRequired: false,

            },
            {
                control: "name",
                value: "",
                isRequired: false,

            },
            {
                control: "image",
                value: null,
                isRequired: false,

            },
            {
                control: "is_root_node",
                value: true,
                isRequired: false,

            },
            {
                control: "parent",
                value: null,
                isRequired: false,

            },
            {
                control: "numberChilds",
                value: 0,
                isRequired: false,

            },

        ]);
    const handleChangeImage = (e) => {
       console.log(Object.keys(e.target.files).map((key) => e.target.files[key]))
        formDate?.append("image", e.target.files[0]);
        setControl("image", e?.target?.files[0])
        setavater(URL?.createObjectURL(e.target.files[0]))
    }
    useEffect(()=>{
        categoryRequest({
            params:{
                parent:controls.parent
            },onSuccess:(res)=>{
                setControl("numberChilds",res.data.length)
                console.log(res.data)
            }
        })
    },[controls.parent])
    useEffect(() => {
      
        if(Boolean(state?.dataRow)){
            Object.entries(state?.dataRow)?.forEach(([key,value])=>setControl(key,value))

        }
        setavater(state?.dataRow?.image)
        setControl("parentName",state?.dataRow?.parent?.id)
      
   
       
    }, [state])
    function handleSubmit() {
        // e.preventDefault();
    if(Boolean(state?.dataRow)){
     
        let  result= compare(
                [
                [controls.name,state?.dataRow?.name,"name"],
                [controls.image,state?.dataRow?.image,"image"],
                [controls.is_root_node,state?.dataRow?.is_root_node,"is_root_node"],
               [controls?.parent,state?.dataRow?.parent,"parent"]
            ],false
            )

        
       Object.entries(result.array).map(([key,value])=>formDate.append(key, value))   
        
    if(controls.is_root_node=="true"||controls.is_root_node==true){
        formDate.append("parent", "")

        }
        categorypatchRequest({
            id:controls.id,
            body:formDate,
            onSuccess:(res)=>{
                dispatch({type:"category/patchItem",payload: { id: controls.id, item: res.data }})
                navigate(`/${sub_domain}/dashboard/products/category`)
            }
        })
    }else{
       Object.entries(controls).map(([key,value])=>formDate.append(key, value))     
        categoryPostRequest({
            body:formDate,
            onSuccess:(res)=>{
                dispatch({type:"category/addItem",payload: res.data})
                navigate(`/${sub_domain}/dashboard/products/category`)
            }
        })
    }
    }
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container maxWidth={false} sx={{p:4}}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
                </SoftBox>
                <SoftBox sx={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap",gap:{sm:"20px",xs:"20px"},marginY:"20px" }}>
                    <SoftBox sx={{
                        backgroundColor: (theme) => theme.palette.white.main,
                        display: {lg:"flex",md:"block",sm:"block",xs:"block"},
                        alignItems: "center",
                        
                        padding: "40px",
                        gap: "14px",
                        width: {
                            lg:"47%",
                            md:"47%",
                            sm:"100%",
                            xs:"100%"
                        },
                        borderRadius: "8px"
                    }}>
                        <SoftBox sx={{ width: {lg:"70%",md:"100%",sm:"100%",xs:"100%"}, height: "152px" }}>
                            <Avatar src={Avater} sx={{ width: "100%", height: "100%" }} />
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", flexDirection: "column" }}>
                            <input
                                type="file"
                                ref={refimage}
                                style={{ display: "none" }}
                               
                                onChange={handleChangeImage}
                                accept="image/*"
                                required={required.includes("image")}
                            // error={Boolean(invalid?.name)}
                            // helperText={invalid?.name}
                            />
                            <SoftButton variant={"outlined"} sx={{
                                borderColor: (theme) => theme.palette.purple.middle,
                                // width:"300px",
                                display: "flex",
                                justifyContent: "space-evenly"

                            }} onClick={() => refimage.current.click()}>
                                <UploadIcon sx={{ color: (theme) => theme.palette.purple.middle }} />
                                <Typography variant={"p"} sx={{ color: (theme) => theme.palette.purple.middle }}>{t("UploadcategoryPhoto")}</Typography>
                            </SoftButton>
                            <SoftBox>
                                <Typography variant={"span"} sx={{ fontWeight: "700", fontSize: "14px" }}>{t("Remember")}</Typography>
                                <Typography variant={"span"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "14px" }}>{t("alertaddnewcategory")}</Typography>

                            </SoftBox>
                        </SoftBox>
                    </SoftBox>
                    <SoftBox sx={{
                        backgroundColor: (theme) => theme.palette.white.main,
                        display: "flex",
                        alignItems: "center",
                        padding: "40px",
                        gap: "14px",
                        width: {
                            lg:"47%",
                            md:"47%",
                            sm:"100%",
                            xs:"100%"
                        },flexWrap:"wrap",
                        borderRadius: "8px",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <Box sx={{ marginY: "6px" }}>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("categoryname")}</InputLabel>
                            <SoftInput
                                placeholder={t("categoryname")}
                                // icon={{ component: <PersonIcon />, direction: "left" }}
                                sx={{  color: "#959FA3" }}
                                value={controls.name}
                                onChange={(e) =>{
                                    formDate?.append("name", e.target.value);
                                    setControl("name", e.target.value)
                                    }
                                }
                                required={required.includes("name")}
                                error={Boolean(invalid?.name)}
                                helperText={invalid?.name}
                            />
                        </Box>
                        <Box sx={{ marginY: "6px" }}>
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "14px" }}>{t("Type")}</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={controls.is_root_node}

                                onChange={(e) =>  {setControl("is_root_node", e.target.value);}}
                            >
                                <FormControlLabel value={true} control={<Radio />} label={t("parent")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" } }} />
                                <FormControlLabel value={false} control={<Radio />} label={t("child")} sx={{ ".MuiFormControlLabel-label": { fontWeight: "400", fontSize: "12px" } }} />

                            </RadioGroup>
                        </Box>
                    </SoftBox>
                </SoftBox>
             
                {controls.is_root_node=="false"||controls.is_root_node==false ?  <SoftBox sx={{ position: "relative" }}>
                    <SoftBox sx={{
                        width: "48px",
                        height: "102px",
                        borderTop: "2px solid #4A81CA",
                        borderLeft: "2px solid #4A81CA",
                        borderBottom: "2px solid #4A81CA",
                        position: "absolute",
                        right: "81%",
                        top: "2.5rem",
                        display:{
                            lg:"block",
                            md:"block",
                            sm:"block",
                            xs:"none"
                        }
                    }}>
                        <SoftBox sx={{
                            backgroundColor: (theme) => theme.palette.white.main, color: "#4A81CA",
                            padding: "10px", borderRadius: "8px", fontSize: "14px", right: "50%",
                            position: "relative",
                            top: "17%",
                          
                            display:{
                                lg:"block",
                                md:"block",
                                sm:"block",
                                xs:"none"
                            }
                        }}>
                            {t("Childfrom")}
                        </SoftBox>
                    </SoftBox>

                    <SoftBox sx={{
                        backgroundColor: (theme) => theme.palette.white.main, borderRadius: "8px", margin: {lg:"24px",md:"24px",sm:"24px",xs:"0px"}, display: "flex",
                        justifyContent: "space-between", p: 2, alignItems: "center",
                         position: "relative",
                        marginY:{lg:"0px",md:"0px",sm:"0px",xs:"24px"},
                        left:{ lg:"17%",md:"17%",sm:"17%",xs:"0"}, width: {
                            lg:"80%",
                            md:"80%",
                            sm:"80%",
                            xs:'100%'
                        }
                    }}>
                        <Typography sx={{ fonSize: {lg:"18px",md:"18px",sm:"14px",xs:"14px"} }} variant="p">{controls.name}</Typography>
                      

                    </SoftBox>
                    <SoftBox sx={{
                        backgroundColor: (theme) => theme.palette.white.main, borderRadius: "8px", margin: {lg:"24px",md:"24px",sm:"24px",xs:"0px"}, display:{
                            lg:"flex",
                            md:"flex",
                            sm:"block",
                            xs:"block"
                        },
                        justifyContent: "space-evenly", p: 2, alignItems: "center",  position: "relative",
                        left:{ lg:"17%",md:"17%",sm:"17%",xs:"0"},  width: {
                            lg:"80%",
                            md:"80%",
                            sm:"80%",
                            xs:'100%'
                        }, 
                    }}>
                        <Box >
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("Categoryparentname")}</InputLabel>
                            {console.log(controls.parent,controls?.parentName)}
                            <SoftInput
                                select
                                value={controls?.parent}
                                icon={{ component: <KeyboardArrowDownIcon />, direction: "right" }}
                                sx={{ ".MuiInputBase-root": { border: "unset" }, color: "#959FA3" }}
                                
                                onChange={(e) =>{setControl("parent", e.target.value);formDate?.append("parent", e.target.value); }}
                                required={required.includes("parent")}
                                error={Boolean(invalid?.parent)}
                                helperText={invalid?.parent}
                                onOpen={() => { }}
                                SelectProps={{
                                    defaultValue: "",
                                    displayEmpty: true,
                                    // onOpen: onOpen,
                                    // onClose: onClose,
                                    renderValue: (selected) => {
                                        if (!Boolean(selected)) {
                                            return (
                                                <Typography sx={{ opacity: "0.42", fontSize: "14px", color: "#959FA3" }} variant="p">
                                                    {t("Categoryparentname")}
                                                </Typography>
                                            );
                                        } else {
                                           
                                            if(selected.id){
                                                return categories?.find((ele) => ele.id === selected.id)?.name;

                                            }else{
                                            return categories?.find((ele) => ele.id === selected)?.name;

                                            }
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
                                {categories?.map((ele) => <MenuItem value={ele.id} key={ele.id}>{ele.name}</MenuItem>)}
                            </SoftInput>
                        </Box>
                        <Box>
                            <InputLabel htmlFor="outlined-adornment-email-register" sx={{ marginY: "6px", fontSize: "14px" }}>{t("categorynumber")}</InputLabel>

                            <SoftInput

                                value={controls.numberChilds}
                                // icon={{ component: <KeyboardArrowDownIcon />, direction: "right" }}
                                sx={{ color: "#959FA3" }}
                                onChange={(e) => setControl("numberChilds", e.target.value)}
                                required={required.includes("numberChilds")}
                                error={Boolean(invalid?.numberChilds)}
                                helperText={invalid?.numberChilds}
                                onOpen={() => { }}

                            >
                                {/* {jobs?.results?.map((ele) => <MenuItem value={ele.id} key={ele.id}>{ele.title}</MenuItem>)} */}
                            </SoftInput>
                        </Box>
                    </SoftBox>
                </SoftBox>:<></>}
                <Stack
                    direction="row"
                    justifyContent="flex-end"

                    spacing={1}
                    sx={{ margin: 6, }}
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
                        onClick={handleSubmit}
                    >
                        {"save"}
                    </SoftButton>
                    {postcategoryResponce.failAlert}
            {postcategoryResponce.successAlert}
            {patchcategoryResponce.failAlert}
                </Stack>
               
            </Container>
          
        </DashboardLayout>
    )
}

export default Addnewcategory
Addnewcategory.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the Addnewcategory
Addnewcategory.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};