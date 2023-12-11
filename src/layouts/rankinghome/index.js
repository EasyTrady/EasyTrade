import React, { useState,useEffect} from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Form from 'components/common/Form'
import SoftInput from 'components/SoftInput'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container, InputAdornment, Avatar, Icon, Stack, Typography, Dialog, MenuItem
} from '@mui/material'
import Breadcrumbs from 'examples/Breadcrumbs'
import SelectField from "components/common/SelectField";
import SoftBox from 'components/SoftBox'
import { useLocation } from 'react-router-dom'
import useControls from 'hooks/useControls'
import PropTypes from "prop-types";
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import SoftButton from "components/SoftButton";
import { useTranslation } from 'react-i18next';
import SwitchIcon from 'examples/Icons/SwitchIcon'
import BrandIcon from 'examples/Icons/BrandIcon'
import SoftTypography from "components/SoftTypography";
import ViewIcon from 'examples/Icons/ViewIcon'
import DeleteIcon from 'examples/Icons/DeleteIcon'
import SpecialCategoryIcon from 'examples/Icons/SpecialCategoryIcon'
import BrannerIcon from 'examples/Icons/BrannerIcon'
import useRequest from 'hooks/useRequest'
import CategoryIcon from 'examples/Icons/CategoryIcon'
import StartIcon from 'examples/Icons/StartIcon'
import HeartIcon from 'examples/Icons/heartIcon'
import imageProduct from "assets/images/female.png"
import imageGrid from "assets/images/grid.png"
import imageScroll from "assets/images/scroll.png"
import { useDrop,useDrag } from 'react-dnd'
import { CONTENTTYPES,CREATEHOMECOMPONENTS,SPECIALCATEGORIES,BANNERS,BRAND,CATEGORY ,SWAP,SWAPCOMPONENT} from 'data/api'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { styled } from '@mui/system';
import Slider from "react-slick";
import compare from 'utils/compare'
import DragerItem from './DragerItem'

function index({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
   const contentTypes= useSelector((state)=>state.content.value)
   const specialCategorys= useSelector((state)=>state.specialCategory.value)
   const Brands= useSelector((state)=>state.brand.value)
   
   const homeComponent= useSelector((state)=>state.homeComponent.value)
    let shop_id=localStorage.getItem("shop_id")
    let dispatch=useDispatch()
    let categories = useSelector((state) => state.category.value)
    let { t } = useTranslation("common")
    const banners = useSelector((state) => state.banners.value);
    const [settings,setSetting] = useState({
        dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      style:{overflow:"hidden"}
      });
    let [open, setOpen] = useState(false)
    let [Edit, setEdit] = useState(null)
    let [drap, setDrap] = useState(0)
    let [dropele, setDrop] = useState(0)

    const handleCloseDialog = () => {
        setOpen(false)
    }
    const [TypeItem,setTypeItem] = useState([{ icon: <BrandIcon />, title: "brand" }, { icon: <SpecialCategoryIcon />, title: "specialcategory" }, { icon: <CategoryIcon />, title: "category" }, { icon: <BrannerIcon />, title: "banner" }])
    const [brandfrom ,setItems]= useState([...specialCategorys])
    let Token = localStorage.getItem('token')
    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {
                control: "id",
                value: "",
                isRequired: false,

            },
            {
                control: "title",
                value: "",
                isRequired: true,

            },
            {
                control: "content_type",
                value: "",
                isRequired: false,

            },
            {
                control: "max_number",
                value: 0,
                isRequired: false,
                validations: [
                    {
                        customValidation: (controls) => controls.max_number<=6,
                        message:"Note: if the banners exceed 6 will wrap automatic",
                      },
                ]
            },
            {
                control: "items",
                value: [],
                isRequired: false,

            },
            {
                control: "display",
                value: "",
                isRequired: false,

            },
            {
                control: "overflow_type",
                value: "",
                isRequired: false,

            }, 
           
            {
                control: "position",
                value: "",
                isRequired: false,

            },
            {
                control: "frame",
                value: "",
                isRequired: false,

            },
            { control:"category_level",
            value: "",
            isRequired: false,}
        ]);
        const StyleSoftBox=styled(SoftBox)((props) => ({
            borderRadius: props.frame=="square"?"unset":"50%", border: "1.5px solid #D3D3D3", width: "80px", height: "80px"
        }))
        const [contentRequest, getcontentResponce] =
        useRequest({
            path: CONTENTTYPES,
            method: "get",
            Token: `Token ${Token}`
        });
        const [swapRequest, getswapResponce] =
        useRequest({
            path: SWAPCOMPONENT,
            method: "post",
            Token: `Token ${Token}`
        });
        const [deletecontentRequest, deletecontentResponce] =
        useRequest({
            path: CREATEHOMECOMPONENTS,
            method: "delete",
            Token: `Token ${Token}`
        });
        const [patchcontentRequest, patchcontentResponce] =
        useRequest({
            path: CREATEHOMECOMPONENTS,
            method: "patch",
            Token: `Token ${Token}`
        });
        const [contentpostRequest, postcontentResponce] =
        useRequest({
            path: CREATEHOMECOMPONENTS,
            method: "post",
            Token: `Token ${Token}`
        });
        const [BrandgetRequest, getBrandResponce] =
        useRequest({
            path: BRAND,
            method: "get",
            Token: `Token ${Token}`
        });
        const [categorygetRequest, getcategoryResponce] =
        useRequest({
            path:  CATEGORY,
            method: "get",
            Token: `Token ${Token}`
        });
        const [componentgetRequest, getcomponentResponce] =
        useRequest({
            path: CREATEHOMECOMPONENTS,
            method: "get",
            Token: `Token ${Token}`
        });
        const [getSpecialCategoryRequest, getSpecialCategoryResponce] =
        useRequest({
            path: SPECIALCATEGORIES,
            method: "get",
            Token: `Token ${Token}`
        });
        const [getBannerdRequest, getBannerdResponce] =
        useRequest({
            path: BANNERS,
            method: "get",
            Token: `Token ${Token}`
        });
        const [swaperRequest, swaperResponce] =
        useRequest({
            path: SWAP,
            method: "post",
            Token: `Token ${Token}`
        });
        const getBanners=()=>{
            getBannerdRequest({
                onSuccess:(res)=>{
                    dispatch({ type: "banners/set", payload: res?.data });
                    console.log(res.data)
                }
            })
        }
        const [hasDropped, setHasDropped] = useState(false)
        const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
     
        const handleDrop = (item) => {
        let indexDrop= homeComponent.find((ele,index)=>ele?.title==item?.nativeEvent?.toElement?.innerText)
        let indexDrag= homeComponent.find((ele,index)=>ele?.id==drap?.id)

        swapRequest({
            body:{
                
                    "object_one":drap,
                    "object_two":indexDrop?.id
                
            },onSuccess:(res)=>{
                dispatch({type:"home-component/set",payload:res?.data?.data})
                console.log(res.data)
            }
        })
        console.log(drap,index)
            // console.log('Item dropped:', item.nativeEvent.layerY,       item?.nativeEvent);
          };
         
        const [{ isOver }, drop] = useDrop({
            accept: 'box',
            // drop: (item) => handleDrop(item),
            collect: (monitor) => ({
              isOver: !!monitor.isOver(),
            }),
          });
        
    const getContentTypes=()=>{
        contentRequest({
            onSuccess:(res)=>{
                
                setTypeItem(TypeItem.map((ele)=>{
                    let findContent=res?.data?.find((elem)=>elem?.type==ele?.title);
                    
                  return  Boolean(findContent)?{...ele,id:findContent?.id}:ele
                   }))
                  
                dispatch({type:"content-type/set",payload:res.data.map((ele)=>ele)})
               
            }
        })
    }
    const getSpecialCategorys=()=>{
        getSpecialCategoryRequest({
            onSuccess:(res)=>{
                
                dispatch({type:"special-category/set",payload:res.data.map((ele)=>ele)})
               
            }
        })
    }
    const DeleteComponenet=(component)=>{
        deletecontentRequest({
            id:component.id,
            onSuccess:(res)=>{
                dispatch({type:"home-component/deleteItem",payload:{id:component.id}})
            }
        })
    }
    const getBrandItems=()=>{
        BrandgetRequest({
            id:shop_id+"/brands/",
            onSuccess:(res)=>{
                dispatch({type:"brand/set",payload:res.data})
                console.log(res.data)
            }
        })
    }
    const getCategory=()=>{
        categorygetRequest({
            
            onSuccess:(res)=>{
                dispatch({ type: "category/set", payload: res.data })

            }
        })
    }
    const handlleSubmit=()=>{
        if(!Edit){
            validate().then((output) => {
                console.log(output)
                if(!output.isOk) return;
            contentpostRequest({
                body:controls?.content_type?.title == "brand"?{
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,
                    max_number:controls?.max_number,
                    position:controls?.position?controls?.position:"fixed",
                }:controls?.content_type?.title=="banner"?{
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,

                    
                    max_number:controls?.number|controls?.brannernumber,
                    display:controls?.display,
                    overflow_type:controls?.overflow_type,
                    position:controls?.position?controls?.position:"fixed",
                  
                }:controls?.content_type?.title=="category"?{
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,

                    max_number:controls?.max_number,
                   
                    position:controls?.position?controls?.position:"fixed",
                    category_level:controls?.category_level,
                    frame:controls?.frame
                }:{
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,

                   
                   
                    position:controls?.position?controls?.position:"fixed",
                    
                },onSuccess:(res)=>{
                    dispatch({type:"home-component/addItem",payload:res.data})
                    resetControls();
                    handleCloseDialog()
                    console.log(res.data)
                }
            })})
        }else{
           
          
            let result=compare(Object?.entries(Edit)?.map(([key,value])=>(key=="content_type"?
            [controls[key]?.id,value,key]:key=="items"?[controls[key],value,key]:[controls[key],String(value),key])),false)
            // console.log(controls.items.filter((ele)=>!Boolean(controls.items.find((elem)=>elem.id==ele.id))))
            // console.log(compare(Object.entries(Edit).map(([key,value])=>key=="content_type"?[controls[key].id,value,key]:key=="items"?[controls[key],value,key]:[controls[key],String(value),key])),"sort_number")
            if(result.nochange){
                delete result.array.sort_number
                patchcontentRequest({
                    id:Edit.id,
                    body:{...result.array,items:result?.array?.items?.map((ele)=>ele?.id?ele.id:ele)},
                    onSuccess:(res)=>{
                    dispatch({type:"home-component/patchItem",payload:{id:res.data.id,item:res.data}})
                    resetControls();
                    handleCloseDialog()
                        console.log(res.data)
                    }
                })
            }
            
        }
      
    }
    const Swapcomponent=(first,second)=>{
        if(first&&second){
            swaperRequest({
                onSuccess:()=>{
    
                }
            })
        }
  
    }
    useEffect(()=>{
        getContentTypes()
        getSpecialCategorys()
        componentgetRequest({
            onSuccess:(res)=>{
                
                dispatch({type:"home-component/set",payload:res.data})
                console.log(res.data)
            }
        })
    },[])
    useEffect(()=>{
        setItems([...specialCategorys])
    },[specialCategorys])
    useEffect(()=>{
        
            if (controls?.content_type?.title == "brand"){
                setEdit({ title:controls?.title,
                        content_type:controls?.content_type?.id,
                        items:controls?.items,
                        max_number:controls?.max_number,
                        position:controls?.position})
               }
               if(controls?.content_type?.title=="banner"){
                setEdit({
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,
    
                    
                    max_number:controls?.number,
                    display:controls?.display,
                    overflow_type:controls?.overflow_type,
                    position:controls?.position?controls?.position:"fixed",
                  
                })
               }
               if(controls?.content_type?.title=="category"){
                setEdit({
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,

                    max_number:controls?.max_number,
                   
                    position:controls?.position?controls?.position:"fixed",
                    category_level:controls?.category_level,
                    frame:controls?.frame
                })}
                if(controls?.content_type?.title=="specialcategory"){setEdit({
                    title:controls?.title,
                    content_type:controls?.content_type?.id,
                    items:controls?.items,

                   
                   
                    position:controls?.position?controls?.position:"fixed",
                    
                })}
        
    },[Edit])
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container sx={{ marginY: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                <Stack direction={{ lg: "row", md: "column", sm: "column", xs: "column" }} justifyContent={"space-between"}>
                    <SoftBox sx={{ backgroundColor: "#fff", width: { lg: "44%", md: "100%", sm: "100%", xs: "100%" }, borderRadius: "8px", height: "100vh" }}>
                        <SoftBox sx={{ width: "100%", borderBottom: "1px solid ", padding: "16px" }}>
                            <SoftButton variant={"outlined"} onClick={() => {setOpen(true);setEdit(null);resetControls()}}
                                sx={{ borderColor: ({ palette: { purple } }) => purple.middle, color: ({ palette: { purple } }) => purple.middle }}>
                                <Icon fontSize="small" on sx={{ color: ({ palette: { purple } }) => purple.middle }}>
                                    add
                                </Icon>
                                {t("Additem")}
                            </SoftButton>


                        </SoftBox>
                        <SoftBox refence={drop} onDrop={handleDrop} >
                        {homeComponent.map((ele,index,array)=>
                        <DragerItem ele={ele} key={index} setDrap={()=>setDrap(ele?.id)}>
                        {/* <SoftBox refence={drag}onDrag={()=>handleDrag(ele)} key={index} sx={{ width: "100%", backgroundColor: "#fff", padding: "16px", display: "flex", justifyContent: "space-around", alignItems: "center" }}> */}
                            <SoftBox sx={{ backgroundColor: "#F0F6FF", display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: "24px", paddingY: "10px", borderRadius: "8px", width: "75%" }}>
                                <SoftBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "60%" }}>
                                    <SwitchIcon />
                                    {TypeItem.find((elem)=>elem.id==ele.content_type)?.icon} 
                                    <Typography component="p" sx={{ fontSize: "14px", width: "100%" }}>{ele.title}</Typography>
                                </SoftBox>
                                
                                <ViewIcon sx={{ width: "20%" }} onClick={()=>{Object.entries(ele).map(([key,value])=>key=="content_type"?setControl(key,TypeItem.find((elem)=>elem.id==value)):key=="items"?setControl(key,value):setControl(key,value));setOpen(true);setEdit(ele)}}/>
                            </SoftBox>
                            <DeleteIcon sx={{ width: "20%" }} onClick={()=>DeleteComponenet(ele)}/>
                        {/* </SoftBox> */}
                        </DragerItem>)}
                            </SoftBox>
                    </SoftBox>
                    <SoftBox sx={{ backgroundColor: "#fff", width: { lg: "55%", md: "100%", sm: "100%", xs: "100%" } , borderRadius: "8px", overflow: "auto", height: "436px" }}>
                        <SoftBox sx={{ backgroundColor: "#e7eced8f", width: "100%", borderBottom: "1px solid ", display: "flex", padding: "10px" }}>
                            <SoftTypography component="div" sx={{ backgroundColor: (theme) => theme.palette.error.main, width: "12px", height: "12px", borderRadius: "50%", marginX: "5px" }}></SoftTypography>
                            <SoftTypography component="div" sx={{ backgroundColor: (theme) => theme.palette.warning.main, width: "12px", height: "12px", borderRadius: "50%", marginX: "5px" }}></SoftTypography>
                            <SoftTypography component="div" sx={{ backgroundColor: (theme) => theme.palette.success.main, width: "12px", height: "12px", borderRadius: "50%", marginX: "5px" }}></SoftTypography>

                        </SoftBox>
                        {homeComponent.map((ele)=>{
                             let component=TypeItem.find((elem)=>elem.id==ele.content_type)
                            console.log(component,ele)
                             if(component?.title=="category"){
                             
                                return(
                                    <SoftBox key={component.id} sx={{ padding: "10px" ,width:"100%"}}>
                            <SoftTypography component="div">{t("Categories")}</SoftTypography>
                            <Slider {...settings} slidesToShow={ele?.max_number} >
                                {ele?.items?.map((elem)=><div key={elem.id}>
                            <SoftBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <StyleSoftBox frame={ele.frame}>
                                    <img src={elem?.image} style={{width:"100%"}}/>
                                </StyleSoftBox>
                                <SoftTypography component="div" sx={{ fontSize: "12px" }}>{elem?.name}</SoftTypography>

                            </SoftBox>
                            </div>)}
                                
                                
                           
                            </Slider>
                        </SoftBox>
                                )
                             }else if(component?.title=="brand"){
                                return ( ele.items.map((elem)=><SoftBox key={elem.id} sx={{ padding: "10px" }}>
                                <SoftTypography component="div">{t("Brands")}</SoftTypography>
                                <Slider {...settings}>
                                    <SoftBox sx={{
                                        borderRadius: "8px", border: "1px solid #D3D3D3",
                                        width: "20%", backgroundColor: "#fff", display: "flex", flexDirection: "column"
                                    }}>
    
    
                                        <SoftBox sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}>
                                            <SoftTypography component={"img"} src={elem?.image} sx={{ width: "100%", height: "30px" }} />
                                        </SoftBox>
                                        <SoftBox sx={{
                                            display: "flex",
                                            justifyContent: "flex-start", flexDirection: "column", padding: "10px"
                                        }}>
                                            <SoftTypography sx={{ fontSize: "8px", color: "gray" }}> Makeup</SoftTypography>
                                            <SoftTypography sx={{ fontSize: "8px" }}> {ele?.name}</SoftTypography>
                                            <SoftTypography sx={{ fontSize: "8px", color: "gray" }}> 244+ items</SoftTypography>
    
                                        </SoftBox>
    
                                    </SoftBox>
                                    <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                        ...
                                    </SoftBox>
    
                                </Slider>
                            </SoftBox>

                                )
                                )
                             }else if(component?.title=="banner"){
                                
                                return (<SoftBox key={component.id}  sx={{ padding: "10px" }}>
                                <SoftTypography component="div">{t("Banner")}</SoftTypography>
                                <SoftBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                        ...
                                    </SoftBox>
                                    <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                        ...
                                    </SoftBox>
    
                                </SoftBox>
                            </SoftBox>)
                             }else if (component?.title=="specialcategory"){
                                return (<SoftBox key={component.id}  sx={{ padding: "10px" }}>
                                <SoftTypography component="div">{t("Products")}</SoftTypography>
                                <SoftBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <SoftBox sx={{
                                        borderRadius: "8px", border: "1px solid #D3D3D3",
                                        width: "20%", backgroundColor: "#fff", display: "flex", flexDirection: "column"
                                    }}>
    
                                        <SoftBox sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                            <SoftBox sx={{ border: "1px solid #8150A0", borderRadius: "24px", display: "Flex", alignItems: "center", justifyContent: "space-evenly", width: "40px", height: "10px" }}>
                                                <StartIcon />
                                                <SoftTypography sx={{ fontSize: "8px" }}>4.6</SoftTypography>
                                                <SoftTypography sx={{ fontSize: "8px", color: "gray" }}>(23)</SoftTypography>
    
                                            </SoftBox>
                                            <SoftBox>
                                                <HeartIcon />
                                            </SoftBox>
    
                                        </SoftBox>
                                        <SoftBox sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}>
                                            <SoftTypography component={"img"} src={imageProduct} sx={{ width: "50%", height: "50%" }} />
                                        </SoftBox>
                                        <SoftBox sx={{
                                            display: "flex",
                                            justifyContent: "flex-start", flexDirection: "column", padding: "10px"
                                        }}>
                                            <SoftTypography sx={{ fontSize: "8px", color: "gray" }}> Sports shoes</SoftTypography>
                                            <SoftTypography sx={{ fontSize: "8px" }}> Adidas running sn..</SoftTypography>
                                            <SoftTypography sx={{ fontSize: "8px", color: (theme) => theme.palette.error.main }}> 7,000 SAR</SoftTypography>
    
                                        </SoftBox>
    
                                    </SoftBox>
                                    <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                        ...
                                    </SoftBox>
    
                                </SoftBox>
                            </SoftBox>)
                             }
                            })}
                        
                       
                        
                        

                    </SoftBox>
                </Stack>
            </Container>
            <Dialog open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ ".MuiPaper-root": { minWidth: "37%" }, }}>
                <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            onClick: handlleSubmit,
                            disabled: postcontentResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                // handleClose()
                                resetControls();
                                setOpen(false)
                            },
                            // disabled: postjobResponce.isPending,
                        },
                        title: t("Chooseitemtype")
                    }} sx={{
                        borderRadius: "8px", display: "flex",
                        flexDirection: "column"
                    }}>
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                    >{t("title")}

                    </Typography>
                    <SoftInput
                        placeholder='title'
                        sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
                        value={controls?.title}
                        onChange={(e) => setControl("title", e.target.value)}
                        required={required.includes("title")}
                        error={Boolean(invalid?.title)}
                        helperText={invalid?.title}
                    // sx={input}
                    />
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                    >{t("Type")}

                    </Typography>
                    <SelectField
                        variant="outlined"
                        placeholder={"Export"}

                        onOpen={getContentTypes}
                        value={controls?.content_type}
                        onChange={(e) => setControl("content_type", e.target.value)}
                        renderValue={(selected) => {
                            return <SoftBox sx={{ display: "flex" }}>{selected.icon} {selected?.title}</SoftBox>
                        }}
                        sx={{ width: "100% !important" }}
                    >
                       
                        {
                            TypeItem?.map((product, index) => (
                                <MenuItem key={index} value={product}>{product.icon}{product?.title}</MenuItem>
                            ))
                        }
                    </SelectField>
                    {controls?.content_type?.title == "brand" && <>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Postion")}

                        </Typography>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                            <SoftButton variant={"outlined"} onClick={(e)=>setControl("position","fixed")}sx={{ width: "49%", borderColor: ({ palette: { purple } }) => purple.middle, color: ({ palette: { purple } }) => purple.middle }}   >
                                {t("fixed")}
                            </SoftButton>
                            <SoftButton variant={"outlined"} onClick={(e)=>setControl("position","scroll")}sx={{ width: "49%", borderColor: ({ palette: { purple } }) => purple.middle, color: ({ palette: { purple } }) => purple.middle }}>
                                {t("Scroll")}
                            </SoftButton>
                        </SoftBox>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("brandsnumber")}

                        </Typography>
                        <SoftInput

                            value={controls?.max_number}
                            //   disabled={max_number && !Boolean(max_number)}

                            onChange={(e) =>

                                Number(e.target.value) && setControl("max_number", e.target.value)
                            }
                            required={required.includes("max_number")}
                            error={Boolean(invalid?.max_number)}
                            helperText={invalid?.max_number}
                        />
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Choosebrandsfrom")}

                        </Typography>
                        <SelectField
                            variant="outlined"
                            onOpen={getBrandItems}
                            placeholder={"Export"}
                            value={controls?.items}
                            multiple
                            onChange={(e) => setControl("items", e.target.value)}
                            renderValue={(selected) => {
                                if(Brands?.results?.length==0){
                                    getBrandItems()
                                }
                            
                                return <SoftBox sx={{ display: "flex" }}>{Brands?.results?.filter((ele)=>selected.map((ele)=>ele?.id?ele.id:ele)?.includes(ele?.id))?.map((elem)=>elem?.name)?.join(",")}</SoftBox>
                            }}
                            sx={{ width: "100% !important" }}
                        >
                            {
                                Brands?.results?.map((product, index) => (
                                    <MenuItem key={index} value={product?.id}>{product?.name}</MenuItem>
                                ))
                            }
                        </SelectField>
                    </>}
                    {controls?.content_type?.title == "banner" && <> <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                    >{t("Section")}

                    </Typography>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                            <SoftButton value={t("single")} variant={"outlined"} onClick={(e) => setControl("display", e.target.value)} sx={{ width: "49%",
                             borderColor: controls?.display=="single"?({ palette: { purple } }) => purple.middle :({ palette: { grey } }) => grey[500], 
                             color:controls?.display=="single"?({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500] }}   >
                                <SoftTypography component="div" sx={{ border: ({ palette: { grey } }) => "1px solid" + grey[500], width: "20px", height: "12px", marginX: "5px" }}></SoftTypography>
                                {t("Single")}
                            </SoftButton>
                            <SoftButton value={t("multiple")} variant={"outlined"} onClick={(e) => setControl("display", e.target.value)} sx={{ width: "49%",
                             borderColor:controls?.display=="multiple"?({ palette: { purple } }) => purple.middle :({ palette: { grey } }) => grey[500],
                              color:controls?.display=="multiple"?({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500] }}>
                                <SoftBox sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                                    <SoftTypography component="div" sx={{ border: ({ palette: { grey } }) => "1px solid" + grey[500], width: "20px", height: "5px", marginX: "5px" }}></SoftTypography>
                                    <SoftTypography component="div" sx={{ border: ({ palette: { grey } }) => "1px solid" + grey[500], width: "20px", height: "5px", marginX: "5px" }}></SoftTypography>

                                </SoftBox>
                                {t("multiple")}
                            </SoftButton>
                        </SoftBox>

                        {controls?.display == "multiple" && <><Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Presentation")}

                        </Typography><SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                                <SoftButton variant={"outlined"} value={"scroll"} onClick={(e) => setControl("overflow_type", e.target.value)} sx={{ width: "49%", 
                                borderColor:controls?.overflow_type=="scroll"? ({ palette: { purple } }) => purple.middle:({ palette: { grey } }) => grey[500], 
                                color:controls?.overflow_type=="scroll"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500] }}   >
                                    <SoftTypography component="img" src={imageScroll} sx={{ width: "20px", height: "10px", marginX: "5px" }}></SoftTypography>

                                    {t("Scroll")}
                                </SoftButton>
                                <SoftButton variant={"outlined"} value={"wrap"} onClick={(e) => setControl("overflow_type", e.target.value)} sx={{ width: "49%",
                                 borderColor:controls?.overflow_type=="wrap"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500], 
                                 color:controls?.overflow_type=="wrap"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500] }}>

                                    <SoftTypography component="img" src={imageGrid} sx={{ width: "20px", height: "10px", marginX: "5px" }}></SoftTypography>


                                    {t("Grid")}
                                </SoftButton>
                            </SoftBox></>}
                        {controls?.overflow_type == "scroll" ? <>
                            <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                            >{t("brannernumber")}

                            </Typography>
                            <SoftInput

                                value={controls?.max_number}
                                //   disabled={number && !Boolean(number)}

                                onChange={(e) =>

                                    Number(e.target.value) && setControl("max_number", e.target.value)
                                }
                                required={required.includes("max_number")}
                                error={Boolean(invalid?.max_number)}
                                helperText={invalid?.max_number}
                            />
                            <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                            >{t("ChooseBanners")}

                            </Typography>
                            <SelectField
                                variant="outlined"
                                placeholder={"Export"}
                                multiple
                                onOpen={getBanners}
                                value={controls?.items}
                            onChange={(e) => setControl("items",e.target.value)}
                          
                                renderValue={(selected) => {
                                   console.log(selected)
                                   if(banners?.results?.length==0){
                                    getBanners()  
                                }
                                    return <SoftBox sx={{ display: "flex" }}>{banners?.results?.filter((ele)=>selected?.map((ele)=>ele?.id?ele?.id:ele)?.includes(ele?.id)).map((elem)=>elem?.banner_object?.name)?.join(",")}</SoftBox>
                                }}
                                sx={{ width: "100% !important" }}
                            >
                                {
                                    banners?.results?.map((product, index) => (
                                        <MenuItem key={index} value={product?.id}>{product?.banner_object?.name}</MenuItem>
                                    ))
                                }
                            </SelectField>
                        </> :controls?.overflow_type == "wrap"?<>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                            >{t("brannernumber")}

                            </Typography>
                            <SoftInput

                                value={controls?.max_number}
                                //   disabled={number && !Boolean(number)}

                                onChange={(e) =>

                                    Number(e.target.value) && setControl("max_number", e.target.value)
                                }
                                required={required?.includes("max_number")}
                                error={Boolean(invalid?.max_number)}
                                helperText={invalid?.max_number}
                            />
                            <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                            >{t("ChooseBanners")}

                            </Typography>
                            <SelectField
                                variant="outlined"
                                placeholder={"Export"}
                                onOpen={getBanners}
                                multiple
                                // onOpen={getProducts}
                                value={controls?.items}
                                onChange={(e) => setControl("items", e.target.value)}
                                renderValue={(selected) => {
                                console.log(selected)
                                    if(banners?.results?.length==0){
                                        getBanners()  
                                    }
                                    return <SoftBox sx={{ display: "flex" }}>{banners?.results?.filter((ele)=>selected?.map((ele)=>ele?.id?ele?.id:ele)?.includes(ele?.id)).map((elem)=>elem?.banner_object?.name)?.join(",")}</SoftBox>
                                }}
                                sx={{ width: "100% !important" }}
                            >
                                {
                                    banners?.results?.map((product, index) => (
                                        <MenuItem key={index} value={product?.id}>{product?.banner_object?.name}</MenuItem>
                                    ))
                                }
                            </SelectField>
                        </>:<></>}
                    </>}
                    {controls?.content_type?.title == "specialcategory" && <>
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("AS")}

                        </Typography>
                        <SelectField
                            variant="outlined"
                            placeholder={"Export"}
                            
                            multiple
                            value={controls?.items}
                            onChange={(e) => {setControl("items",e.target.value);}}
                            renderValue={(selected) => {
                                console.log(selected,"selected")
                                return <SoftBox sx={{ display: "flex" }}>{brandfrom?.filter((ele)=>selected?.map((ele)=>ele?.id?ele.id:ele).includes(ele?.id)).map((elem)=>elem?.name)?.join(",")}</SoftBox>
                            }}
                            sx={{ width: "100% !important" }}
                        >
                            {
                                brandfrom?.map((product, index) => (
                                   
                                    <MenuItem key={index} value={product?.id}>{product?.name}</MenuItem>
                                ))
                            }
                        </SelectField>
                    </>}
                    {controls?.content_type?.title == "category" &&<>
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("type")}

                        </Typography>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                            <SoftButton variant={"outlined"}
                            onClick={()=>setControl("category_level","1")} sx={{ width: "49%",
                             borderColor:controls?.category_level=="1"? ({ palette: { purple } }) => purple.middle:  ({ palette: { grey } }) => grey[500],
                              color:controls?.category_level=="1"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500]  }}   >
                                {t("Secondary")}
                            </SoftButton>
                            <SoftButton variant={"outlined"}onClick={()=>setControl("category_level","2")} sx={{ width: "49%",
                              borderColor:controls.category_level=="2"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500], 
                              color: controls.category_level=="2"? ({ palette: { purple } }) => purple.middle:({ palette: { grey } }) => grey[500]  }}>

                                {t("Third")}
                            </SoftButton>
                        </SoftBox>
                        
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Frame")}

                        </Typography>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                            <SoftButton variant={"outlined"}onClick={()=>setControl("frame","square")} sx={{ width: "49%",  
                            borderColor:controls?.frame=="square"? ({ palette: { purple } }) => purple.middle:({ palette: { grey } }) => grey[500], 
                            color:controls?.frame=="square"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500] }}   >
                                {t("Square")}
                            </SoftButton>
                            <SoftButton variant={"outlined"}onClick={()=>setControl("frame","circle")} sx={{ width: "49%", 
                             borderColor:controls?.frame=="circle"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500],
                              color:controls?.frame=="circle"? ({ palette: { purple } }) => purple.middle: ({ palette: { grey } }) => grey[500] }}>
                                {t("Circle")}
                            </SoftButton>
                        </SoftBox>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("choose category")}

                        </Typography>
                        <SelectField
                            variant="outlined"
                            placeholder={"Export"}
                            onOpen={getCategory}
                            multiple
                            value={controls?.items}
                            onChange={(e) => {setControl("items",e.target.value);}}
                            renderValue={(selected) => {
                                if(categories.length==0){
                                    getCategory() 
                                }
                                console.log(selected,"selected",categories)
                                return <SoftBox sx={{ display: "flex" }}>{categories?.filter((ele)=>selected.map((ele)=>ele?.id?ele?.id:ele)?.includes(ele?.id))?.map((elem)=>elem?.name)?.join(",")}</SoftBox>
                            }}
                            sx={{ width: "100% !important" }}
                        >
                            {
                                categories?.map((product, index) => (
                                   
                                    <MenuItem key={index} value={product?.id}>{product?.name}</MenuItem>
                                ))
                            }
                        </SelectField>
                    </>}
                </Form>
                {postcontentResponce.failAlert}
            </Dialog>
        </DashboardLayout>
    )
}
export default index
index.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the index
index.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};