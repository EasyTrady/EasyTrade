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
import { useEffect } from 'react'

import { PRODUCTS } from "data/api";
import filter from "utils/ClearNull";
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
const ProductAttributes = ({idProduct}) => {
  let Token = localStorage.getItem('token')
  let attributes = useSelector((state) => state.attribute.value)
  const dispatch=useDispatch()
  let { t } = useTranslation("common")
  let [addvalue, setaddvalue] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [product, setproduct] = React.useState();

  let idproduct=localStorage.getItem('productId');
let products=useSelector((state)=>state.products.value)
  const [{ controls, invalid, required }, { setControl, resetControls, validate,setInvalid }] = useControls([
    {
      control: "id",
      value: "",
      isRequired: false,

  },
    { control: "attribute", value: [], isRequired: false },
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
    validations:[
        {
            test:/^(?:#[0-9A-Za-z]{6})$/,
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
}

  ]);
  let [counter,setCounter]=React.useState(controls.values.length>0?controls.values.length-1:controls.values.length);
  const handleCloseDialog = () => {
    setOpenDialog(false);
};
const [attributepostRequest, postattributeResponce] =
useRequest({
    path: ATTRIBUTES,
    method: "post",
    Token: `Token ${Token}`,
    successMessage:t("addnewattributemessage")
});
const [attributeEditRequest, editattributeResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "patch",
            Token: `Token ${Token}`,
            // contentType: "multipart/form-data",
            successMessage:t("editattributesuccessfull")
        });
const [attributeValueeditRequest, editValueattributeResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "patch",
            Token: `Token ${Token}`,
            // contentType: "multipart/form-data",
        });
function handleSubmit() {
  console.log("submit")
  validate().then((output) => {
      console.log(output)
      if (!output.isOk) return;
      if (openDialogEdit) {
          attributeEditRequest({
              id: controls.id,
              body: {
                  name: controls.name,
                  
              }, onSuccess: (res) => {
                  dispatch({ type: "attribute/patchItem", payload: { id: controls.id, item: res.data } })
                  attributeValueeditRequest({
                      id:controls.id+"/values/bulkupdate",
                      body:controls.values.filter((ele)=>Boolean(ele.id)==false),
                      onSuccess:(res)=>{
                          console.log(res.data)
                          dispatch({ type: "attribute/addValues", payload: { idattribute:controls.id, values: res.data } })
                          setControl("values",[...res.data])
                          setOpenDialog(false)

                      }
                  })
                 

              }
          })

      } else {
          attributepostRequest({
              body: {
                  name: controls.name,
                  values:controls.values
              },
              onSuccess: (res) => {
                  dispatch({ type: "attribute/addItem", payload: res.data })
                  setOpenDialog(false)

                
                  console.log(res.data, controls)
              }
          }).then((res) => {
              let response = res?.response?.data;
              console.log(res)

              setInvalid(response);

          });
      }

  })

}
function AddValue(){
 
      if(controls.iscolor){
          if(Boolean(controls.value_name)&&Boolean(controls.color_value)){
              let test=/^(?:#[0-9A-Za-z]{6})$/
             let match= test.test(controls.color_value)
             if(match){
              setControl("values",[...controls.values,{
                  value_name:controls.value_name,
                  color_value:controls.color_value,
                  iscolor:controls.iscolor
              }]).then(()=>{
                  setControl("value_name","")  
                  setControl("color_value","") 
              })
              setInvalid({color_value:""})

             }else{
              setInvalid({color_value:"not valid color value #000000"})
             }
          }
          }     
          else if(Boolean(controls.value_name)&&!controls.iscolor){
            console.log(Boolean(controls.iscolor))
              setControl("values",[...controls.values,{
                  value_name:controls.value_name,
                  color_value:controls.color_value,
                  iscolor:Boolean(controls.iscolor)
              }]).then(()=>{
                  setControl("value_name","")  
                  setControl("color_value","") 
              })
          }
           setCounter(++counter);
           setaddvalue(true);   
}
  const [attributeRequest, attributeResponse] =
        useRequest({
            path: ATTRIBUTES,
            method: "get",
            Token: `Token ${Token}`
        });
  const [GenerationAttributesRequest, GenerationAttributeResponse] =
        useRequest({
            path: PRODUCTS+8+'/variants/',
            method: "POST",
            Token: `Token ${Token}`
        });
 const [attributeDeleteRequest, DeleteattributerResponce] =
        useRequest({
            path: ATTRIBUTES,
            method: "delete",
            Token: `Token ${Token}`,
            successMessage:t("deleteattribute")
        });
        const getAttributies=()=>{
          attributeRequest({
            onSuccess: (res) => {
                dispatch({ type: "attribute/set", payload: res.data })
                // res.data.map((ele) => attributeValueRequest({
                //     id: ele.id + "/values",
                //     onSuccess: (res) => {

                //         dispatch({ type: "attribute/addValues", payload: { idattribute: ele.id, values: res.data } })

                //     }
                // }))

            }
        })

        }
      

        const postGenerationAttributes=()=>{
          // validate().then((output) => {
            let newArray=[]
            controls?.attribute.map((ele)=>ele.values.map((elem)=>newArray.push(elem.id)))
            console.log(newArray);
            // console.log(output);
            console.log(openDialogEdit)
            // if (!output.isOk) return;

            GenerationAttributesRequest({
              body: [{
                "attributes":newArray,        
                "title":product.name,
                "sku":product.sku,
                "mpn":product.mpn,
                "gtin":product.gtin,
                "price":product.price,
                "currency":"SAR",
                "quantity":product.quantity,
                'weight_unit':product.weight.unit
            }],
              // filter({
              //   obj: {
              //     // attribute: [...controls?.attribute],
                  
              //   },
              //   output: "object",
              // }),
              onSuccess: (res) => {
                console.log(res.data, controls);
              },
            }).then((res) => {
              let response = res?.response?.data;
              console.log(res);
              // const responseBody = filter({
              //   obj: {
              //     name: response?.name?.join(""),
              //     quantity: response?.quantity?.join(" "),
              //    
              //   },
              //   output: "object",
              // });
      
              // setInvalid(responseBody);
              resetControls("");
            });
          // });
        }
              
        function onDeleteValue(row, valueId) {
          attributeDeleteRequest({
              id: row + "/values/" + valueId,
              onSuccess: () => {
                  dispatch({ type: "attribute/deleteValueofAttribute", payload: { idattribute: row, idValue: valueId } })
                  setControl("values",controls.values.filter((ele)=>ele.id!==valueId))
              }
          })
      }
      function onEdit(id) {
        setOpenDialog(!openDialog);
        setOpenDialogEdit(true);
        const rowfind = attributes.find((row) => row.id === id)
        Object.keys(controls)?.map((ele) => rowfind[ele] ? setControl(ele, rowfind[ele]) : null)
        console.log(rowfind, controls)

    }
    useEffect(()=>{
      console.log(idproduct)
      setproduct(products.results.find((ele)=>ele.id==idproduct))
    },[idproduct])


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
          onChange={(e) => {setControl("attribute", [...controls?.attribute,e.target.value]);}}
          required={required.includes("attribute")}
          error={Boolean(invalid?.attribute)}
          helperText={invalid?.attribute}
          sx={{...input,".MuiPaper-root":{backgroundColor:"white !important",zIndex:1}}}
        >

          {attributes.map((attribute)=>(
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
         mb:'24px',
          background:
            "linear-gradient(0deg, #FFFFFF, #FFFFFF),linear-gradient(0deg, #EAECF0, #EAECF0)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} sx={{
fontFamily: 'Inter',
fontSize: '14px',
fontWeight: 600,
lineHeight: '17px',
letterSpacing: '0em',
color:'#6B7785'
}}>Attributes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controls.attribute.map((row) => (
              <TableRow key={row.id} sx={{
                
                // "&:last-child td, &:last-child th": { border: 0 }
               }}
                >

                <TableCell align="start">{row.name}</TableCell>
                <TableCell align="start">{row.values.length} values</TableCell>
                <TableCell align="end" gap={1}>
                  <img src={Edit} alt="edit" onClick={()=>{onEdit(row.id)}}/>
                  <img src={Delete} alt="delete" />
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
                onClick={()=>setOpenDialog(true)}
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
     <Box sx={{display:'flex',justifyContent:'center'}}>
        
          <Button 
          onClick={postGenerationAttributes}
          sx={{width: '354.67px',
height: '48px',
borderRadius: '12px',
textTransform:'none',
transition: 'ease-out',
animationDuration: '300ms',
fontFamily: 'Inter',
fontSize: '14px',
fontWeight: 600,
lineHeight: '24px',
letterSpacing: '0em',
color:'#344054',
border: '1px solid #D0D5DD',
boxShadow: '0px 1px 2px 0px #1018280D',
":hover":{
  color:'#344054',
}
}}>Generate (4 combinations)</Button>
       
       </Box>
       </Box>
       <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{ ".MuiPaper-root": { minWidth: "50%" }, }}
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
                            <SyncIcon />
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

                            {controls?.values?.map((ele) => <Typography key={ele.id} sx={{
                                fontSize: "14px",
                                display: "flex",
                                borderBottom: "1px solid #8080807d"
                            }}>

                                {/* <Divider orientation="vertical" sx={{width:'1px',height:"50px",color:"#8080807d"}}/> */}


                                <TableCell align="left" sx={{ width: "50%", borderRight: "1px solid #8080807d" }}>{ele.value_name}</TableCell>
                                <TableCell align="right" sx={{ width: "50%" }}>
                                    
                                    <DeleteIcon sx={{ color: (theme) => theme.palette.error.main,cursor:"pointer" }} onClick={() => onDeleteValue(controls.id, ele.id)} />
                                </TableCell>
                            </Typography>)}
                            {addvalue && !controls.iscolor ?  <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                                <SoftInput placeholder='value'
                                    sx={{ ".MuiInputBase-root": { border: `unset !important`, borderBottom: "1px solid gray" }, }}
                                    value={controls.value_name}
                                    onChange={(e) => setControl("value_name",e.target.value)}

                                    required={required.includes("value_name")}
                                    error={Boolean(invalid?.value_name)}
                                    helperText={invalid?.value_name} />
                                   

                            </SoftBox> : addvalue && controls.iscolor &&  <SoftBox  >
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                                    <SoftInput placeholder='value'
                                        sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
                                        value={controls.value_name}
                                        // onChange={(e) => setControl("value_name", e.target.value)}
                                        onChange={(e) => setControl("value_name",e.target.value)}
                                        required={required.includes("value_name")}
                                        error={Boolean(invalid?.value_name)}
                                        helperText={invalid?.value_name} />


                                </SoftBox>
                               
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                                    <SoftInput placeholder='color'
                                        sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
                                        value={controls.color_value}
                                        // onChange={(e) => setControl("color_value", [...controls.color_value,e.target.value])}
                                        onChange={(e) => setControl("color_value",
                                           e.target.value)}
                                        required={required.includes("color_value")}
                                        error={Boolean(invalid?.color_value)}
                                        helperText={invalid?.color_value} />


                                </SoftBox>
                            </SoftBox>
                                
                            }
                           
                            <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                                <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                                    component="a"
                                    onClick={AddValue}
                                >{t("Addvalue")}
                                </Typography>
                                {/* <Typography sx={{ fontSize: "14px", padding: "15px", height: "40px", color: (theme) => theme.palette.purple.middle, textDecoration: "underline !important" }}
                                    component="a"
                                    onClick={() => { }}
                                >{t("ClearAll")}
                                </Typography> */}
                            </SoftBox>


                        </SoftBox>
                        {/* <PictureField placeholder={"add image profile"}
                        error={Boolean(invalid.image)}
                        helperText={invalid.image}
                        required={required.includes("image")}
                        label={"profile"} accept={"image/*"} onChange={handleImageChange} value={selectedImage} /> */}
                    </Form>
                </Dialog>
    </Container>
  );
};

export default ProductAttributes;
ProductAttributes.propTypes = {
  idProduct:PropTypes.number
};