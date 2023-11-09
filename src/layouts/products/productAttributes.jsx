import { Box, Checkbox, Container, Divider, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import input from "assets/theme/components/form/input";
import SelectField from "components/common/SelectField";
import InputField from "components/common/TextField";
import Table from "examples/Tables/Table";
import React from "react";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const ProductAttributes = () => {
  return (
    <Container maxWidth="xl" sx={{display:'flex',flexDirection:'column',borderRadius:'8px',background:'#fff',pt:'24px',height:'100%'}}>
      <Box sx={{display:'flex',flexDirection:'row',gap:1}}>
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
      <Box mt={'24px'}>
      <SelectField
          variant='outlined'
          label={"Select attribute"}
            placeholder={"Select..."}
            // value={controls.attribute}
            // onChange={(e) => setControl("attribute", e.target.value)}
            // required={required.includes("attribute")}
            // error={Boolean(invalid.attribute)}
            // helperText={invalid.attribute}
            sx={input}
           
          />
      </Box>
      <Divider/>
        
      <TableContainer component={Paper} sx={{height:'200px',
     borderRadius: "16px 16px 0px 0px",
     marginBlock: "1rem",
     border: " 0.5px solid #D9D9D9",
     boxShadow: "0px 3.5px 5.5px 0px #00000005",
     background:
       "linear-gradient(0deg, #FFFFFF, #FFFFFF),linear-gradient(0deg, #EAECF0, #EAECF0)",}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {['title','value'].map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">{row}</TableCell>
              <TableCell align="right">{row}</TableCell>
              <TableCell align="right">{row}</TableCell>
              <TableCell align="right">{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            
      
    </Container>
  );
};

export default ProductAttributes;
