/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styled from "@emotion/styled";

const MultiSelect = ({
  variant = null,
  isPending = false,
  label,
  onOpen,
  onClose,
  renderValue = null,
  children,
  placeholder = "",
  SelectProps = {},
  multiple=true,
  ...rest
}) => {
  const MenuProps = {
    PaperProps: {
      sx: {
        maxHeight: "200px",
        overflowY: "auto",
       backgroundColor:"white !important"
      },
    }
  };
  return (
    <Box 
    // sx={{ width: "100%",
    
    //   '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select': {
    //     height:'40px !important',
    //     pl:2,
    //     py:0,
    //     display:'flex',
    //     alignItems:'center',
    //     width:'100%',
    //    background:'#F7F8FA',
    //   borderColor:'#C9CDD4',
    //     ':hover': {
    //       border: '0.5px solid #1B53C5 !important',
    //     },
    //     ':focus-within': { border: '0px solid #1B53C5 !important' ,background:'#fff'}
    //   },
    //   '& .MuiOutlinedInput-root.Mui-disabled': {
    //     ':hover': {
    //       border: '1px solid #1B53C5 !important',
    //       boxShadow: 'none'
    //     }
    //   },
    //   '& .MuiOutlinedInput-notchedOutline': {
    //     border: '1px solid #C9CDD4'
    //   },}}
     sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',}}
    >
      
    <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight:' 20px',
letterSpacing: '0em',
textAlign: 'left',
mb:'6px'
}}>{label}</Typography>
 <Select 
 multiple={multiple}
    defaultValue= ""
    displayEmpty= {true}
    onOpen={onOpen}
    onClose= {onClose}
    renderValue= {(selected) => {
      if (!Boolean(selected)) {
        return (
          <Typography sx={{ color: "currentColor", opacity: "0.42",fontSize:'14px',fontWeight:400 }}>
            {placeholder}
          </Typography>
        );
      } else {
        return Boolean(renderValue) && typeof renderValue === "function"
          ? renderValue(selected)
          : selected;
      }
    }}
    MenuProps={MenuProps}
    IconComponent={() => <KeyboardArrowDownIcon fontSize="32px" />}
    sx={{
        pl:1,
        fontFamily:'Cairo',
                boxShadow: "none",
                height:'40px !important',
               borderColor:'#C9CDD4',
               backgroundColor:"white !important",
               fontSize:'14px',
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },".MuiPaper-root":{
                    background:'#F7F8FA !important',

                  }
              }} 
            
              {...rest}
             
              >
                 {Boolean(isPending) ? (
        <Stack justifyContent="center" alignItems="center" sx={{ p: 1 }}>
          <CircularProgress size="30px" sx={{ color: "gray" }} />
          loading
        </Stack>
      ) : children?.length ? (
        children
      ) : (
        <MenuItem disabled>فارغ</MenuItem>
      )}
            </Select>
    {/* <Select
      variant={Boolean(variant) ? variant : "standard"}
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
    </Select> */}
    </Box>
  );
};

export default MultiSelect;