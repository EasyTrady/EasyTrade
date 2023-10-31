/* eslint-disable react/prop-types */
import React from "react";

import { Box, TextField, Typography } from "@mui/material";
import { BoxColumn } from "../../../style/main-box";
import { SubTitle } from "../../../style/buttom-style";
import input from "assets/theme/components/form/input";


const InputField = ({
	// eslint-disable-next-line react/prop-types
	variant = null,
	onChange,
	label = "",
	value,
	placeholder = "",
	...rest
}) => {

  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',}}>
    <SubTitle>{label}</SubTitle>
    <TextField
      variant={variant ? variant : "standard"}
      hiddenLabel
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      inputProps={{ inputMode: 'text', pattern: '[A-Za-z]+' }}
      error={!/^[A-Za-z]+$/.test(value)} 
      {...rest}
      sx={input}
    />
    </Box>
  );

};

export default InputField;