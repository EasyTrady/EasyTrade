import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle
} from "@mui/material";
import input from "assets/theme/components/form/input";
import SelectField from "components/common/SelectField";
import InputField from "components/common/TextField";
import Edit from "../../assets/images/Edit.svg";
import Delete from "../../assets/images/Delete.svg";
import React from "react";
import useRequest from "hooks/useRequest";
import CircularProgress from '@mui/material/CircularProgress';
import { ATTRIBUTES } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import useControls from "hooks/useControls";
import SoftBox from 'components/SoftBox'
import SoftInput from 'components/SoftInput'
import Form from 'components/common/Form'
import SoftButton from 'components/SoftButton'
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
import PhotoIcon from '@mui/icons-material/Photo';
import { PRODUCTS } from "data/api";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import TwoArrow from 'examples/Icons/TwoArrow';
import compare from "utils/compare";
// import DeleteIcon from 'examples/Icons/DeleteIcon';
import EditIcon from 'examples/Icons/EditIcon';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const ProductAttributes = ({ idProduct }) => {
  let Token = localStorage.getItem('token')
  let attributes = useSelector((state) => state.attribute.value)
  const dispatch = useDispatch()
  const sub_domain = localStorage.getItem('sub_domain')
  let { t } = useTranslation("common")
  let [addvalue, setaddvalue] = React.useState(false);
  let [indexedit, setindexedit] = React.useState(0);
  let navigate = useNavigate()
  const [openDialog, setOpenDialog] = React.useState(false);
  const [generate, setgenerate] = React.useState(false);
  const [generateresult, setgenerateresult] = React.useState(false);
  const [popupvalue, setpopupvalue] = React.useState(null);
  const [edit, setEdit] = React.useState(null);
  let [Blurvalue, setblurvalue] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [product, setproduct] = React.useState();
  const MenuProps = {
    PaperProps: {
      sx: {
        maxHeight: "200px",
        overflowY: "auto",
        backgroundColor: "white !important"
      },
    }
  };
  let idproduct = localStorage.getItem('productId');
  let products = useSelector((state) => state.products.value)
  const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] = useControls([
    {
      control: "id",
      value: "",
      isRequired: false,

    },
    { control: "attribute", value: [], isRequired: false },
    { control: "attributevalues", value: [], isRequired: false },
    { control: "attributenewvalues", value: [], isRequired: false },

    { control: "values", value: [], isRequired: false },
    { control: "value_name", value: "", isRequired: false },
    {
      control: "iscolor",
      value: false,
      isRequired: false,
    }, {
      control: "color_value",
      value: "",
      isRequired: false,
      validations: [
        {
          test: /^(?:#[0-9A-Za-z]{6})$/,
          message: "not valid color value"
        }
      ]
    }, {
      control: "name",
      value: "",
      isRequired: openDialogEdit ? false : true,
      validations: [
        {
          test: /^(?:[A-Za-z\u0600-\u06ff\s]*)$/,
          message: "not valid name"
        }
      ]
    },
    {
      control: "quantity",
      value: "",
      isRequired: false,

    }, {
      control: "sku",
      value: "",
      isRequired: false,

    }, {
      control: "price",
      value: "",
      isRequired: false,

    }, {
      control: "gtin",
      value: "",
      isRequired: false,

    }, {
      control: "variants",
      value: [],
      isRequired: false,

    },

  ]);
  let [counter, setCounter] = React.useState(controls.values.length > 0 ? controls.values.length - 1 : controls.values.length);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [attributepostRequest, postattributeResponce] =
    useRequest({
      path: ATTRIBUTES,
      method: "post",
      Token: `Token ${Token}`,
      successMessage: t("addnewattributemessage")
    });
  const [attributeEditRequest, editattributeResponce] =
    useRequest({
      path: ATTRIBUTES,
      method: "patch",
      Token: `Token ${Token}`,
      // contentType: "multipart/form-data",
      successMessage: t("editattributesuccessfull")
    });
  const [attributeValueeditRequest, editValueattributeResponce] =
    useRequest({
      path: ATTRIBUTES,
      method: "patch",
      Token: `Token ${Token}`,
      // contentType: "multipart/form-data",
    });
    const [productvariantRequest, productvariantResponce] =
    useRequest({
      path: PRODUCTS,
      method: "get",
      Token: `Token ${Token}`,
      // contentType: "multipart/form-data",
    });
    const [productvariantupdate, productvariantupdateResponce] =
    useRequest({
      path: PRODUCTS,
      method: "patch",
      Token: `Token ${Token}`,
      // contentType: "multipart/form-data",
    });
  function handleSubmit() {
   
    validate().then((output) => {
     
      if (!output.isOk) return;
      if (openDialogEdit) {
        attributeEditRequest({
          id: controls.id,
          body: {
            name: controls.name,

          }, onSuccess: (res) => {
            dispatch({ type: "attribute/patchItem", payload: { id: controls.id, item: res.data } })
            attributeValueeditRequest({
              id: controls.id + "/values/bulkupdate",
              body: controls.values.filter((ele) => Boolean(ele.id) == false),
              onSuccess: (res) => {
              
                dispatch({ type: "attribute/addValues", payload: { idattribute: controls.id, values: res.data } })
                setControl("attribute", controls.attribute.map((elem) => elem.id == controls.id ? { ...elem, values: controls.values.map((ele) => Boolean(ele.id) ? ele : res.data.find((elem) => elem.value_name == ele.value_name)) } : elem))
                // setControl("values", controls.values.map((ele)=>Boolean(ele.id)?ele:res.data.find((elem)=>elem.value_name==ele.value_name)))
                setOpenDialog(false)

              }
            })


          }
        })

      } else {
        attributepostRequest({
          body: {
            name: controls.name,
            values: controls.attributenewvalues
          },
          onSuccess: (res) => {
            dispatch({ type: "attribute/addItem", payload: res.data })
            setOpenDialog(false)


          }
        }).then((res) => {
          let response = res?.response?.data;


          setInvalid(response);

        });
      }

    })

  }
  function AddValue() {

    if (controls.iscolor) {
      if (Boolean(controls.value_name) && Boolean(controls.color_value)) {
        let test = /^(?:#[0-9A-Za-z]{6})$/
        let match = test.test(controls.color_value)
        if (match) {
          setControl("values", [...controls.values, {
            value_name: controls.value_name,
            color_value: controls.color_value,
            iscolor: controls.iscolor
          }]).then(() => {
            setControl("value_name", "")
            setControl("color_value", "")
          })
          setInvalid({ color_value: "" })

        } else {
          setInvalid({ color_value: "not valid color value #000000" })
        }
      }
    }
    else if (Boolean(controls.value_name) && !controls.iscolor) {
      console.log(Boolean(controls.iscolor))
      setControl("values", [...controls.values, {
        value_name: controls.value_name,
        color_value: controls.color_value,
        iscolor: Boolean(controls.iscolor)
      }]).then(() => {
        setControl("value_name", "")
        setControl("color_value", "")
      })
    }
    setCounter(++counter);
    setaddvalue(true);
  }
  function AddnewValue() {

    if (controls.iscolor) {
      if (Boolean(controls.value_name) && Boolean(controls.color_value)) {
        let test = /^(?:#[0-9A-Za-z]{6})$/
        let match = test.test(controls.color_value)
        if (match) {
          setControl("attributenewvalues", [...controls.attributenewvalues, {
            value_name: controls.value_name,
            color_value: controls.color_value,
            iscolor: controls.iscolor
          }]).then(() => {
            setControl("value_name", "")
            setControl("color_value", "")
          })
          setInvalid({ color_value: "" })

        } else {
          setInvalid({ color_value: "not valid color value #000000" })
        }
      }
    }
    else if (Boolean(controls.value_name) && !controls.iscolor) {
      console.log(Boolean(controls.iscolor))
      setControl("attributenewvalues", [...controls.attributenewvalues, {
        value_name: controls.value_name,
        color_value: controls.color_value,
        iscolor: Boolean(controls.iscolor)
      }]).then(() => {
        setControl("value_name", "")
        setControl("color_value", "")
      })
    }
    setCounter(++counter);
    setaddvalue(true);
  }
  function onDeleteNew(row) {

    setControl("values", controls.values.filter((ele, index) => index !== row))
    setEdit(null)
  }
  const [attributeRequest, attributeResponse] =
    useRequest({
      path: ATTRIBUTES,
      method: "get",
      Token: `Token ${Token}`
    });
  const [getProductRequest, getProductResponce] = useRequest({
    path: PRODUCTS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [editattributeValueRequest, ValueattributeeditResponce] =
    useRequest({
      path: ATTRIBUTES,
      method: "patch",
      Token: `Token ${Token}`,
      // contentType: "multipart/form-data",
    });
  const [GenerationAttributesRequest, GenerationAttributeResponse] =
    useRequest({
      path: PRODUCTS + "/generate/attributes/",
      method: "POST",
      Token: `Token ${Token}`
    });
    const [deleteVariantRequest, deleteVariantResponse] =
    useRequest({
      path: PRODUCTS,
      method: "delete",
      Token: `Token ${Token}`
    });
   
  const [variantAttributesRequest, variantAttributeResponse] =
    useRequest({
      path: PRODUCTS,
      method: "POST",
      Token: `Token ${Token}`
    });
  const [attributeDeleteRequest, DeleteattributerResponce] =
    useRequest({
      path: ATTRIBUTES,
      method: "delete",
      Token: `Token ${Token}`,
      successMessage: t("deleteattribute")
    });
  const getAttributies = () => {
    attributeRequest({
      onSuccess: (res) => {
        dispatch({ type: "attribute/set", payload: res.data })


      }
    })

  }
  const handleClosepopup = () => {
    setControl("attribute", controls?.attribute?.map((ele) => ele.id == popupvalue.id ? { ...ele, values: controls.attributevalues.map((elem) => elem) } : ele)).then(() => {
      setControl("attributevalues", [])
      setpopupvalue(null)

    })
  }
  const postGenerationAttribute = () => {
    // validate().then((output) => {
    let newArray = []
    controls?.attribute.map((ele) => ele.values.map((elem) => newArray.push(elem.id)))
    // console.log(newArrayوcontrols?.attribute);
    // console.log(output);
    // console.log(openDialogEdit, product,)
    // if (!output.isOk) return;

    GenerationAttributesRequest({
      body: {
        "attributes": controls?.attribute.map((ele) => ({ attribute: ele.name, values: ele.values.map((elem) => elem.value_name) })),
      },
      onSuccess: (res) => {
        // localStorage.removeItem('productId');
        // dispatch({ type: "products/addNewProperty", payload: { id: idproduct, item: res?.data[0]?.variant_attributes } })
        setgenerate(!generate)
        setgenerateresult(res.data)
        let result = res.data.map((ele) => ({
          attributes: [ele],
          title: "",
          sku: "",
          gtin: "",
          price: "",
          currency: "SAR",
          quantity: ""
        }))
        setControl("variants", [...controls.variants,...result])
      },
    })

  }

  const postGenerationAttributes = () => {
    if(controls.variants.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&!Boolean(ele.id)).length>0){
      
      variantAttributesRequest({
        id: idproduct + '/variants/',
        body: controls.variants.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&!Boolean(ele.id)),
      
        onSuccess: (res) => {
         
          if (res?.data[0]) {
            dispatch({ type: "products/addVariantProperty", payload: { id: idproduct, item: res?.data[0] } })
            setInvalid({variants:[]});
            navigate(`/${sub_domain}/dashboard/products`)
          }
        },
      }).then((res) => {
        let response = res?.response?.data;
        if(response?.length>0){
          setInvalid({variants: [...controls.variants.filter((ele)=>ele.id).map((elem)=>{}),...response]});
        }
      });
    }
     if(controls.variants.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&Boolean(ele.id)).length>0){
     let variant=products.results.find((ele)=>ele.id==idproduct)?.variant_attributes
     let newvariant=controls.variants.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&Boolean(ele.id))
   
    let result=newvariant?.map((ele,index)=>(compare([[String(ele?.quantity),String(variant[index]?.quantity),"quantity"],
     [ele?.title,variant[index]?.title,"title"],
     [ele?.sku,variant[index]?.sku,"sku"],
     [String(ele?.gtin),String(variant[index]?.gtin),"gtin"],
     [ele?.price,variant[index]?.price,"price"],
    ],false))
     )
    
      productvariantupdate({
        id: idproduct + '/variants/bulk_update',
        body:result.map((ele,index)=>ele.nochange&&({variant_id:newvariant[index].id,...ele.array}))?.filter((ele)=>Boolean(ele)),
        onSuccess:(res)=>{
          res.data.map((elem)=>dispatch({ type: "products/updateVariantProperty", payload: { id: idproduct,idvariant:elem.id, item: elem } }))
          
          setInvalid({variants:[]});
          navigate(`/${sub_domain}/dashboard/products`)
        }
      }).then((res) => {
        let response = res?.response?.data;
       
        if(response){
          setInvalid({variants:result.map((ele,index)=>ele.nochange&&response)});
        }
      });
      
    }if(controls.variants.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&!Boolean(ele.id)).length==0){
      setInvalid({variants:[]});
    }
  }
  function deleteVariant(ele){
    if(ele.id){
      deleteVariantRequest({
        id:idproduct+"/variants/bulk_delete",
        body:[ele.id],
        onSuccess:(res)=>{
          dispatch({type:"products/deleteVariantProperty",payload:{id:idproduct,idVariant:ele.id}})
         
        }
      })
    }else{setControl("variants",controls.variants.filter((elem)=>elem!=ele))}
   
  }
  function onDeleteValue(row, valueId) {
    attributeDeleteRequest({
      id: row + "/values/" + valueId,
      onSuccess: () => {
        dispatch({ type: "attribute/deleteValueofAttribute", payload: { idattribute: row, idValue: valueId } })
        setControl("values", controls.values.filter((ele) => ele.id !== valueId))
      }
    })
  }
  function onEdit(id) {
    setOpenDialog(!openDialog);
    setOpenDialogEdit(true);
    const rowfind = controls.attribute.find((row) => row.id === id)
    Object.keys(controls)?.map((ele) => rowfind[ele] ? setControl(ele, rowfind[ele]) : null)
   
  }
  function onDelete(id) {
    const rowfind = controls.attribute.filter((row) => row.id != id)
    if(rowfind.length>0){
      setControl("attribute", rowfind)
    }else{
      setControl("attribute", rowfind)
      // setControl("variants", [])
    }
  }
  function editValue(ele) {

    if (!Boolean(controls.value_name)) {
      setControl("value_name", ele.value_name)
    }
    if (!Boolean(controls.color_value)) {
      setControl("color_value", ele.color_value)
    }
    editattributeValueRequest({
      id: controls.id + "/values/" + ele.id,
      body: {
        value_name: Boolean(controls.value_name) ? controls.value_name : ele.value_name,
        color_value: Boolean(controls.color_value) ? controls.color_value : ele.color_value
      },
      onSuccess: (res) => {
        dispatch({ type: "attribute/editValue", payload: { id: controls.id, idvalue: ele.id, item: res.data } })
        setControl("values", controls.values.map((elem) => elem.id == ele.id ? res.data : elem))

        setControl("value_name", "")
        setControl("color_value", "")
        setEdit(null)

      }
    })
  }

  function editNew(element, ind) {

    {
      openDialogEdit ? setControl("values", controls.values.map((element, index) => index == ind ? { ...element, color_value: Boolean(controls.color_value) ? controls.color_value : element.color_value, value_name: Boolean(controls.value_name) ? controls.value_name : element.value_name } : element)) :
        setControl("attributenewvalues", controls.attributenewvalues.map((element, index) => index == ind ? { ...element, color_value: Boolean(controls.color_value) ? controls.color_value : element.color_value, value_name: Boolean(controls.value_name) ? controls.value_name : element.value_name } : element))
    }
    setControl("value_name", "")
    setControl("color_value", "")
    setEdit(null)
  }
  function getblurrow(ele, index, e) {
    // console.log(controls.variants,e.target.value,ele)

    console.log(controls.variants, e.target, ele)


  }
  useEffect(() => {
    if (!Boolean(products.results.length > 0)) {
      getProductRequest({
        onSuccess: (res) => {
          dispatch({ type: "products/set", payload: res?.data });

        }
      })
    }

  }, [products])
  useEffect(() => {
    setproduct(products.results.find((ele) => ele.id == idproduct))
  }, [idproduct, products])
  useEffect(() => {
    if (controls.attribute.length > 0) {
      setpopupvalue(controls.attribute[controls.attribute.length - 1])
      setControl("values", controls.attribute[controls.attribute.length - 1].values.map((ele) => ele))
    }else{
      setInvalid("variants",[])
      setpopupvalue(null)
    }
  }, [controls.attribute])
  useEffect(() => {
    if(openDialogEdit&&controls.values.length>0){
      setControl("iscolor",controls.values[0].iscolor)
    }
  }, [controls.values.length])

  useEffect(()=>{
    productvariantRequest({
      id:idproduct+"/variants",
      onSuccess:(res)=>{
        setControl("variants",res.data.map((ele)=>ele))
        dispatch({ type: "products/addNewProperty", payload: { id: idproduct, item: res?.data } })
     
      }
    })
  },[])
  useEffect(()=>{
    setControl("variants",products?.results?.find((ele)=>ele.id==idproduct)?.variant_attributes)
  },[products])
  useEffect(() => {
    
     if(controls?.variants?.length==0){
    
       setgenerate(false)
     }else{
      setgenerate(true)
     }
   }, [controls?.variants])
  return (
    <Container
      maxWidth="xl"

    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        background: "#fff",
        p: "24px",

      }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Checkbox defaultChecked color="secondary" />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: "20px",
              letterSpacing: "0em",
              color: "#626C70",
            }}
          >
            If there is no attributes please check the box then the button will be clickable
          </Typography>
        </Box>
        <Box mt={"24px"}>
          <SelectField
            variant="outlined"
            label={"Select attribute"}
            placeholder={"Select..."}
            onOpen={getAttributies}
            renderValue={(selected) => {
              return attributes?.find(
                (attribute) => attribute?.id === selected
              )?.name
            }}
            isPending={attributeResponse.isPending}
            value={controls?.attribute}
            onChange={(e) => { setControl("attribute", [...controls?.attribute, e.target.value]); }}
            required={required.includes("attribute")}
            error={Boolean(invalid?.attribute)}
            helperText={invalid?.attribute}
            MenuProps={MenuProps}
          >

            {attributes.map((attribute) => (
              <MenuItem key={attribute.id} value={attribute}>{attribute.name}</MenuItem>
            ))}
          </SelectField>
        </Box>
        <Divider />

        <TableContainer
          component={Paper}
          sx={{
            height: "100%",
            borderRadius: "4px",
            marginBlock: "1rem",
            border: " 0.5px solid #D9D9D9",
            mb: '24px',
            background:
              "linear-gradient(0deg, #FFFFFF, #FFFFFF),linear-gradient(0deg, #EAECF0, #EAECF0)",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '17px',
                  letterSpacing: '0em',
                  color: '#6B7785'
                }}>Attributes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {controls.attribute.map((row) => (
                <TableRow key={row.id} sx={{

                  // "&:last-child td, &:last-child th": { border: 0 }
                }}
                >

                  <TableCell align="start" sx={{ border: "1px solid ", borderColor: "#d9d9d9" }}>{row.name}</TableCell>
                  <TableCell align="start" sx={{ border: "1px solid ", borderColor: "#d9d9d9" }}>{row?.values?.length > 0 ? row?.values?.length : 0} values</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid ", borderColor: "#d9d9d9" }} gap={1}>
                    <img src={Edit} alt="edit" onClick={() => { onEdit(row.id) }} />
                    <img src={Delete} alt="delete" onClick={() => { onDelete(row.id) }} />
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
            <TableFooter>
              <TableCell align="end">
                <Button
                  variant="standard"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17px",
                    letterSpacing: "0em",
                    textTransform: "none",
                    color: "#5D449B",
                  }}
                  onClick={() => { setOpenDialog(true); setOpenDialogEdit(false) }}
                >
                  Add Attribute
                </Button>
              </TableCell>
              <TableCell align="start"></TableCell>
              <TableCell align="right">
                <Button
                  variant="standard"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17px",
                    letterSpacing: "0em",
                    textTransform: "none",
                    color: "#5D449B",
                  }}
                >
                  Clear all
                </Button>
              </TableCell>
            </TableFooter>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={postGenerationAttribute}
            sx={{
              width: '354.67px',
              height: '48px',
              borderRadius: '12px',
              textTransform: 'none',
              transition: 'ease-out',
              animationDuration: '300ms',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '24px',
              letterSpacing: '0em',
              color: '#344054',
              border: '1px solid #D0D5DD',
              boxShadow: '0px 1px 2px 0px #1018280D',
              ":hover": {
                color: '#344054',
              }
            }}>Generate (4 combinations)</Button>

        </Box>
        {generate|| controls?.variants?.length>0? <Box>
          <Typography sx={{ color: (theme) => theme.palette.grey[600], marginY: "20px" }}>{t("note")}</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, color: (theme) => theme.palette.grey[300] }} aria-label="caption table">
              <TableBody>
                {/* {rows.map((row) => ( */}
                {controls?.variants?.map((ele, index) => <TableRow key={index} sx={{
                  display: "flex",
                  alignItems: "center"
                }} >
                  
                  <Checkbox  color="secondary" onChange={(e)=>console.log(e.target.checked)}/>
                  <TableCell align="right"sx={{width:"70%",height:"70px"}}>{`${Boolean(ele?.attributes)?ele?.attributes?.join(""):ele?.variant_attributes?.map((elem)=>elem?.value_name)?.join("")}`}</TableCell>
                  <TableCell align="right"> <SoftInput
                    placeholder='quantity'
                    sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important", width: "150px !important" }, }}
                    value={ele?.quantity}

                    onChange={(e) => setControl("variants", controls.variants.map((elem, ind) => ind == index ? {
                      ...ele, quantity: e.target.value
                    } : elem))}
                    required={required.includes("quantity")}
                    error={Boolean(invalid?.variants&&invalid?.variants[index]?invalid?.variants[index]?.quantity:"")}
                    helperText={invalid?.variants&&invalid?.variants[index]?invalid?.variants[index]?.quantity:""}

                  /></TableCell>
                  <TableCell align="right"> <SoftInput
                    placeholder='title'
                    sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important", width: "150px !important" }, }}
                    value={ele?.title}

                    onChange={(e) => setControl("variants", controls.variants.map((elem, ind) => ind == index ? {
                      ...ele, title: e.target.value
                    } : elem))}
                    required={required.includes("title")}
                    error={Boolean(invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].title:"")}
                    helperText={invalid?.variants&&invalid?.variants[index]?invalid?.variants[index]?.title:""}
                  /></TableCell>
                  <TableCell align="right"> <SoftInput
                    placeholder='sku'
                    sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important", width: "150px !important" }, }}
                    value={ele?.sku}
                    onChange={(e) => setControl("variants", controls.variants.map((elem, ind) => ind == index ? {
                      ...ele, sku: e.target.value
                    } : elem))}
                    required={required.includes("sku")}
                    error={Boolean(invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].sku:"")}
                    helperText={invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].sku:""}
                  /></TableCell>
                  <TableCell align="right"> <SoftInput
                    placeholder='price'
                    sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important", width: "150px !important" }, }}
                    value={ele?.price}
                    onChange={(e) => setControl("variants", controls.variants.map((elem, ind) => ind == index ? {
                      ...ele, price: e.target.value
                    } : elem))}
                    required={required.includes("price")}
                    error={Boolean(invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].price:"")}
                    helperText={invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].price:""}
                  // sx={input}
                  /></TableCell>
                  <TableCell align="right"> <SoftInput
                    placeholder='gtin'
                    sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important", width: "150px !important" }, }}
                    value={ele?.gtin}
                    onChange={(e) => setControl("variants", controls.variants.map((elem, ind) => ind == index ? {
                      ...ele, gtin: e.target.value
                    } : elem))}
                    required={required.includes("gtin")}
                    error={Boolean(invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].gtin:"")}
                    helperText={invalid?.variants&&invalid?.variants[index]?invalid?.variants[index].gtin:""}
                  // sx={input}
                  /></TableCell>
                  <TableCell align="right"><PhotoIcon /></TableCell>
                  <TableCell align="right" sx={{ color: (theme) => theme.palette.error.main }}><DeleteIcon onClick={()=>deleteVariant(ele)}/></TableCell>

                </TableRow>)}

                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box> : <></>}

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginY: "14px" }}>
        <SoftButton variant="gradient"
            disabled={controls?.variants?.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&!Boolean(ele.id)).length>0?
              variantAttributeResponse.isPending:productvariantupdateResponce.isPending}
          sx={{
            backgroundColor: (theme) => theme.palette.purple.middle,
            color: "white !important", "&:hover": {
              backgroundColor: (theme) => theme.palette.purple.middle
            }, width: '260px'
          }}
          onClick={postGenerationAttributes}
        >
         {controls?.variants?.filter((ele)=>(Boolean(ele.title) || Boolean(ele.sku) || Boolean(ele.quantity) || Boolean(ele.price)  || Boolean(ele.gtin))&&!Boolean(ele.id)).length>0?
         variantAttributeResponse.isPending?<><CircularProgress />loading</>:"Finish":productvariantupdateResponce.isPending?<><CircularProgress />loading</>:"Finish"}
        </SoftButton>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ ".MuiPaper-root": { minWidth: "37%" }, }}
      >
        <Form component="form"
          childrenProps={{
            saveBtn: {
              onClick: handleSubmit,
              // disabled: postjobResponce.isPending,
            },
            closeBtn: {
              onClick: () => {
                // handleClose()
                resetControls();
                setOpenDialog(false)
              },
              // disabled: postjobResponce.isPending,
            },
            title: openDialogEdit ? t("editattribute") : t("addnewattribute")
          }} sx={{
            borderRadius: "8px", display: "flex",
            flexDirection: "column"
          }}>
          <DialogTitle sx={{
            padding: "0", fontWeight: 400,
            fontSize: "14px",
            color: "gray",
          }}>
            {t("descributionAttribute")}</DialogTitle>
          <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", marginBottom: "5px" }}
          >{t("Attributename")}

          </Typography>
          <SoftInput
            placeholder='Attribute name'
            sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
            value={controls.name}
            onChange={(e) => setControl("name", e.target.value)}
            required={required.includes("name")}
            error={Boolean(invalid?.name)}
            helperText={invalid?.name}
          // sx={input}
          />
          <SoftButton sx={{
            width: "max-content",
            padding: "5px",
            borderRadius: "50%",
            minWidth: "max-content",
            minHeight: "max-content",
            position: "absolute",
            left: "70%",
            top: "11.5rem",
            zIndex: 1
          }} onClick={() => {
            let copyName = controls.english_name;
            setControl("english_name", controls.name)
            setControl("name", copyName)
          }}>
            <TwoArrow color={"#959FA3"} size={"16"} />

          </SoftButton>
          <SoftInput
            placeholder='English name'
            sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
            value={controls.english_name}
            onChange={(e) => setControl("english_name", e.target.value)}
            required={required.includes("english_name")}
            error={Boolean(invalid?.english_name)}
            helperText={invalid?.english_name}
          // sx={input}
          />
          <SoftBox sx={{ display: "flex" }}>
            <Checkbox checked={controls.iscolor} onClick={() => setControl("iscolor", !controls.iscolor)} />
            <Typography sx={{ fontSize: "14px" }} variant="span">
              {t("colorHex")}
            </Typography>
          </SoftBox>
          <SoftBox sx={{ border: "1px solid #8080807d", borderRadius: "8px", }}>

            <Typography sx={{ borderBottom: "1px solid #8080807d", fontSize: "14px", padding: "15px", height: "40px" }}>{controls.name}</Typography>
            {openDialogEdit ? controls?.values?.map((ele, index) => <TableRow key={ele.id} sx={{
              fontSize: "14px",
              display: "flex",
              borderBottom: "1px solid #8080807d"
            }}>


              {/* <Divider orientation="vertical" sx={{width:'1px',height:"50px",color:"#8080807d"}}/> */}

              
              {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <TableCell sx={{ width: "14rem", }}><SoftInput placeholder='value'
                sx={{ ".MuiInputBase-root": { border: `unset` }, }}
                value={controls.value_name ? controls.value_name : edit?.value_name}
                onChange={(e) => setControl("value_name", e.target.value)}
                required={required.includes("value_name")}
                error={Boolean(invalid?.value_name)}
                helperText={invalid?.value_name} /></TableCell> : <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d" }}>{ele.value_name}</TableCell>}

              {ele.color_value ? Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <TableCell sx={{ width: "14rem",display:"flex",justifyContent:"space-between" ,alignItems:"center",borderRight: "1px solid #8080807d"}}><SoftInput placeholder='color'
                                    sx={{ ".MuiInputBase-root": { border: `unset` }, }}
                                    type="color"
                                    value={controls.color_value ? controls.color_value : edit?.color_value}
                                    // onChange={(e) => setControl("color_value", [...controls.color_value,e.target.value])}
                                    onChange={(e) => setControl("color_value",
                                        e.target.value)}
                                    required={required.includes("color_value")}
                                    error={Boolean(invalid?.color_value)}
                                    helperText={invalid?.color_value} /> <Typography sx={{fontSize:"14px"}}>{controls.color_value ? controls.color_value : edit?.color_value}</Typography></TableCell >: <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d" }}>{ele.color_value}</TableCell> : <></>}
              {attributes?.find((ele) => ele.id == controls.id)?.values.map((ele) => ele.value_name).includes(ele.value_name) ? <TableCell sx={{
                width: "50%", borderLeft: "1px solid #8080807d", display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <SoftBox><SaveAsIcon onClick={() => editValue(ele)} /></SoftBox> : <EditIcon onClick={() => { setEdit(ele); setindexedit(index); setaddvalue(false) }} />}
                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <SoftBox> <CloseIcon onClick={() => setEdit(null)} /></SoftBox> : <DeleteIcon sx={{ color: (theme) => theme.palette.error.main, cursor: "pointer" }} onClick={() => onDeleteValue(controls.id, ele.id)} />}

              </TableCell> : <TableCell sx={{
                width: "50%", borderLeft: "1px solid #8080807d", display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <SaveAsIcon onClick={() => editNew(ele, index)} /> : <EditIcon onClick={() => { setEdit(ele); setindexedit(index); setaddvalue(false); console.log(ele) }} />}
                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <CloseIcon onClick={() => setEdit(null)} /> : <DeleteIcon sx={{ color: (theme) => theme.palette.error.main, cursor: "pointer" }} onClick={() => onDeleteNew(index)} />}

              </TableCell>}
            </TableRow>) : controls?.attributenewvalues?.map((ele, index) => <TableRow key={ele.id} sx={{
              fontSize: "14px",
              display: "flex",
              borderBottom: "1px solid #8080807d"
            }}>


              {/* <Divider orientation="vertical" sx={{width:'1px',height:"50px",color:"#8080807d"}}/> */}

             
              {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <TableCell sx={{ width: "14rem", }}><SoftInput placeholder='value'
                sx={{ ".MuiInputBase-root": { border: `unset` }, }}
                value={controls.value_name ? controls.value_name : edit?.value_name}
                onChange={(e) => setControl("value_name", e.target.value)}
                required={required.includes("value_name")}
                error={Boolean(invalid?.value_name)}
                helperText={invalid?.value_name} /></TableCell> : <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d" }}>{ele.value_name}</TableCell>}

              {ele.color_value ? Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <TableCell sx={{ width: "14rem",display:"flex",justifyContent:"space-between" ,alignItems:"center",borderRight: "1px solid #8080807d"}}><SoftInput placeholder='color'
                                    sx={{ ".MuiInputBase-root": { border: `unset` }, }}
                                    type="color"
                                    value={controls.color_value ? controls.color_value : edit?.color_value}
                                    // onChange={(e) => setControl("color_value", [...controls.color_value,e.target.value])}
                                    onChange={(e) => setControl("color_value",
                                        e.target.value)}
                                    required={required.includes("color_value")}
                                    error={Boolean(invalid?.color_value)}
                                    helperText={invalid?.color_value} /> <Typography sx={{fontSize:"14px"}}>{controls.color_value ? controls.color_value : edit?.color_value}</Typography></TableCell > : <TableCell sx={{ width: "14rem", borderRight: "1px solid #8080807d" }}>{ele.color_value}</TableCell> : <></>}
              {attributes?.find((ele) => ele.id == controls.id)?.values.map((ele) => ele.value_name).includes(ele.value_name) ? <TableCell sx={{
                width: "50%", borderLeft: "1px solid #8080807d", display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <SoftBox><SaveAsIcon onClick={() => editValue(ele)} /></SoftBox> : <EditIcon onClick={() => { setEdit(ele); setindexedit(index); setaddvalue(false) }} />}
                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <SoftBox> <CloseIcon onClick={() => setEdit(null)} /></SoftBox> : <DeleteIcon sx={{ color: (theme) => theme.palette.error.main, cursor: "pointer" }} onClick={() => onDeleteValue(controls.id, ele.id)} />}

              </TableCell> : <TableCell sx={{
                width: "50%", borderLeft: "1px solid #8080807d", display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <SaveAsIcon onClick={() => editNew(ele, index)} /> : <EditIcon onClick={() => { setEdit(ele); setindexedit(index); setaddvalue(false); console.log(ele) }} />}
                {Boolean(edit) && edit?.id == ele?.id && index == indexedit ? <CloseIcon onClick={() => setEdit(null)} /> : <DeleteIcon sx={{ color: (theme) => theme.palette.error.main, cursor: "pointer" }} onClick={() => onDeleteNew(index)} />}

              </TableCell>}
            </TableRow>)}

            {addvalue && !controls.iscolor ? <TableRow> <TableCell sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "22rem" }} >
              <SoftInput placeholder='value'
                sx={{ ".MuiInputBase-root": { border: `unset !important`, padding: "0px !important", borderBottom: "1px solid gray" }, }}
                value={controls.value_name}
                onChange={(e) => { setControl("value_name", e.target.value); setblurvalue(true) }}
                required={required.includes("value_name")}
                error={Boolean(invalid?.value_name)}
                helperText={invalid?.value_name} />


               </TableCell>

              <TableCell sx={{ width: "22rem" }}>
                <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                  component="a"
                  onClick={openDialogEdit ? AddValue : AddnewValue}
                >{Blurvalue ? t("Addvalue") : t("newValue")}
                </Typography>

              </TableCell>
            </TableRow> : addvalue && controls.iscolor && <TableRow onChange={() => setblurvalue(true)}>
              <TableCell sx={{ borderRight: "1px solid #80808059", width: "10.3rem" }}>
                <SoftInput placeholder='value'
                  sx={{ ".MuiInputBase-root": { border: `unset`, padding: "0px !important" }, }}
                  value={controls.value_name}
                  // onChange={(e) => setControl("value_name", e.target.value)}
                  onChange={(e) => setControl("value_name", e.target.value)}
                  required={required.includes("value_name")}
                  error={Boolean(invalid?.value_name)}
                  helperText={invalid?.value_name} />


              </TableCell>
              <TableCell sx={{ borderRight: "1px solid #80808059", width: "10.3rem",display:"flex",justifyContent:"space-between" }}>
                                    <SoftInput placeholder='color'
                                    type="color"
                                        sx={{ ".MuiInputBase-root": { border: `unset`, padding: "0px !important" }, }}
                                        value={controls.color_value}
                                        // onChange={(e) => setControl("color_value", [...controls.color_value,e.target.value])}
                                        onChange={(e) => setControl("color_value",
                                            e.target.value)}
                                        required={required.includes("color_value")}
                                        error={Boolean(invalid?.color_value)}
                                        helperText={invalid?.color_value} />
                                        <Typography sx={{fontSize:"14px"}}>{controls.color_value}</Typography>
                                </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                  component="a"
                  onClick={openDialogEdit ? AddValue : AddnewValue}
                >{Blurvalue ? t("Addvalue") : t("newValue")}
                </Typography>
              </TableCell>
            </TableRow>

            }

            {addvalue == false && <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
              <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                component="a"
                onClick={openDialogEdit ? AddValue : AddnewValue}
              >{Blurvalue ? t("Addvalue") : t("newValue")}
              </Typography>

            </SoftBox>}


          </SoftBox>
          {/* <PictureField placeholder={"add image profile"}
                        error={Boolean(invalid.image)}
                        helperText={invalid.image}
                        required={required.includes("image")}
                        label={"profile"} accept={"image/*"} onChange={handleImageChange} value={selectedImage} /> */}
        </Form>
      </Dialog>
      <Dialog
        open={Boolean(popupvalue)}
        onClose={handleClosepopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ ".MuiPaper-root": { minWidth: "50%" }, padding: "12px 24px" }}
      >
        <Container sx={{ my: "20px" }}>
          <SelectField
            multiple
            variant="outlined"
            label={"Select values"}
            placeholder={"Select..."}
            // onOpen={getAttributies}
            renderValue={(selected) => {
              let resultcategory = controls?.values?.filter((category) => selected.map((ele) => ele.id).includes(category.id))
              return resultcategory.map((ele) => ele.value_name).join(" , ")

            }}
            // isPending={attributeResponse.isPending}
            value={controls?.attributevalues}
            onChange={(e) => { setControl("attributevalues", e.target.value) }}
            required={required.includes("attributevalues")}
            error={Boolean(invalid?.attributevalues)}
            helperText={invalid?.attributevalues}
            MenuProps={MenuProps}
          >

            {controls.values.map((attribute) => (
              <MenuItem key={attribute.id} value={attribute}>{attribute.value_name}</MenuItem>
            ))}
          </SelectField>
        </Container>
      </Dialog>
      {editValueattributeResponce.failAlert}
      {variantAttributeResponse.failAlert}
      {GenerationAttributeResponse.failAlert}
      {ValueattributeeditResponce.failAlert}
      {DeleteattributerResponce.failAlert}
    </Container>
  );
};

export default ProductAttributes;
ProductAttributes.propTypes = {
  idProduct: PropTypes.number
};