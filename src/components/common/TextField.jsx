/* eslint-disable react/prop-types */
import React from "react";

import { Box, TextField, Typography } from "@mui/material";
import input from "assets/theme/components/form/input";
const InputField = ({
	variant = null,
	onChange,
	label = "",
	value,
	placeholder = "",
	...rest
}) => {

  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',}}>
    <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight:' 20px',
letterSpacing: '0em',
textAlign: 'left'
}}>{label}</Typography>
    <TextField
      variant={variant ? variant : "standard"}
      hiddenLabel
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      inputProps={{ inputMode: 'text', pattern: '[A-Za-z]+' }}
      error={!/^[A-Za-z]+$/.test(value)} 
      {...rest}
      // sx={input}
      sx={{ width: "100%",
      '& .MuiOutlinedInput-root': {
        height:'40px !important',
        borderRadius:'4px',
       background:'#F7F8FA',
      borderColor:'#C9CDD4',
        ':hover': {
          border: '1px solid #005CE8 !important',
        },
        ':focus-within': { border: '1px solid #1B53C5 !important' ,background:'#fff'}
      },
      '& .MuiOutlinedInput-root.Mui-disabled': {
        ':hover': {
          border: '1px solid #1B53C5 !important',
          boxShadow: 'none'
        }
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #C9CDD4'
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

export default InputField;