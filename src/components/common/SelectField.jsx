/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styled from "@emotion/styled";
const CustomTextField = styled(TextField)({
  "& .MuiSelect-root": {
    padding: "0 !important",
    height: "40px", // Adjust the height as needed
  },
  "& .MuiSelect-root:focus": {
    backgroundColor: "yellow", // Change the background color when focused
  },
  "& .MuiSelect-icon": {
    color: "red", // Change the color of the dropdown arrow icon
  },
});
const SelectField = ({
  variant = null,
  isPending = false,
  label,
  onOpen,
  onClose,
  renderValue = null,
  children,
  placeholder = "",
  SelectProps = {},
  ...rest
}) => {
  return (
    <Box 
    sx={{ width: "100%",
    
      '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select': {
        height:'32px !important',
        pl:2,
        py:0,
        display:'flex',
        alignItems:'center',
        width:'100%',
       background:'#F7F8FA',
      borderColor:'#C9CDD4',
        ':hover': {
          border: '1px solid #1B53C5 !important',
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
      },}}
    // sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',}}
    >
    <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight:' 20px',
letterSpacing: '0em',
textAlign: 'left'
}}>{label}</Typography>
    <TextField
      variant={Boolean(variant) ? variant : "standard"}
      select
      
      SelectProps={{
        defaultValue: "",
        displayEmpty: true,
        onOpen: onOpen,
        onClose: onClose,
        
        renderValue: (selected) => {
          if (!Boolean(selected)) {
            return (
              <Typography sx={{ color: "currentColor", opacity: "0.42" }}>
                {placeholder}
              </Typography>
            );
          } else {
            return Boolean(renderValue) && typeof renderValue === "function"
              ? renderValue(selected)
              : selected;
          }
        },
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: "200px",
              overflowY: "auto",
            },
          },
        },
        IconComponent: KeyboardArrowDownIcon,
        ...SelectProps,
      }}
      {...rest}
    >
      {Boolean(isPending) ? (
        <Stack justifyContent="center" alignItems="center" sx={{ p: 1 }}>
          <CircularProgress size="30px" sx={{ color: "gray" }} />
        </Stack>
      ) : children?.length ? (
        children
      ) : (
        <MenuItem disabled>فارغ</MenuItem>
      )}
    </TextField>
    </Box>
  );
};

export default SelectField;