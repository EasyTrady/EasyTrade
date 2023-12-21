import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";


// eslint-disable-next-line react/prop-types
const NumberField = ({ variant, onChange,label, ...rest }) => {
  const handleValueChange = (values,sourceInfo) => {
    
    onChange({ target: { ...values } });
  };

  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%' }}>
     <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight:' 20px',
letterSpacing: '0em',
textAlign: 'left',
mb:'6px'
}}>{label}</Typography>
   
    <NumericFormat
      customInput={TextField}
      variant={Boolean(variant) ? variant : "standard"}
      onValueChange={handleValueChange}
      {...rest}
      sx={{ width: "100%",
      '& .MuiOutlinedInput-root': {
        height:'40px !important',
        borderRadius:'4px',
       background:'#F7F8FA',
      borderColor:'#C9CDD4',
        ':hover': {
          border: '0.5px solid #005CE8 !important',
        },
        ':focus-within': { border: '0px solid #1B53C5 !important' ,background:'#fff'}
      },
      '& .MuiOutlinedInput-root.Mui-disabled': {
        ':hover': {
          border: '0.5px solid #1B53C5 !important',
          boxShadow: 'none'
        }
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '0px solid #C9CDD4'
      },
      // "& .MuiOutlinedInput-root": {
      //   "&.Mui-focused fieldset": {
      //     color:'#272E3B',
      //     background:'#fff'
      //   },
        
      // },
      
      // '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
      //   height:'32px !important',p:'0 8px !important',background:'#F7F8FA',borderColor:'#C9CDD4',
      // } 
      }}
    />
    </Box>
  );
};

export default NumberField;