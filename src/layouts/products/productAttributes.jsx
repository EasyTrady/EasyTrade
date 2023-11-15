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
const ProductAttributes = () => {
  let Token = localStorage.getItem('token')
  let attributes = useSelector((state) => state.attribute.value)
  const dispatch=useDispatch()
  // let [addvalue, setaddvalue] = React.useState(false);

  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
  
    { control: "attribute", value: [], isRequired: false },
    { control: "values", value: [], isRequired: false },
    { control: "value_name", value: "", isRequired: false },


  ]);
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
          validate().then((output) => {
            console.log(output);
            if (!output.isOk) return;
            GenerationAttributesRequest({
              body: filter({
                obj: {
                  attribute: [...controls?.attribute],
                },
                output: "object",
              }),
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
          });
        }
              
      
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
          value={controls.attribute}
          onChange={(e) => {setControl("attribute", [...controls.attribute,e.target.value]);}}
          required={required.includes("attribute")}
          error={Boolean(invalid.attribute)}
          helperText={invalid.attribute}
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
                  <img src={Edit} alt="edit" />
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
                // onClick={AddValue}
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
    </Container>
  );
};

export default ProductAttributes;
