/* eslint-disable react/prop-types */
import { Box, Divider, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import SoftBox from 'components/SoftBox'
import { NumericFormat } from 'react-number-format'
import NumberField from "components/common/NumberFeild";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const SelectValuePrecentage = ({variant,label,handleValueChange,type,onChange,...rest}) => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',  }}>
   <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight:' 20px',
letterSpacing: '0em',
textAlign: 'left'
}}>{label}</Typography>
    <SoftBox 
    sx={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%', border: '1px solid #C9CDD4 !important', borderRadius:'4px', }}>
    <NumberField
      customInput={TextField}
      variant={Boolean(variant) ? variant : "standard"}
      onChange={handleValueChange}
      {...rest}
      sx={{ width: "100%",
      '& .MuiOutlinedInput-root': {
        height:'40px !important',
       
       background:'#F7F8FA',
      border:'transparent',
        ':hover': {
        //   border: '1px solid #1B53C5 !important',
        },
        ':focus-within': {background:'#fff'}
      },
      '& .MuiOutlinedInput-root.Mui-disabled': {
        ':hover': {
        //   border: '1px solid #1B53C5 !important',
          boxShadow: 'none'
        }
      },
      '& .MuiOutlinedInput-notchedOutline': {
         border: 'none'
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
    {/* <Divider style={{ backgroundColor:'red',width:'100%',height:'100%',alignSelf: "stretch" }} variant="middle" orientation="vertical" flexItem   /> */}
    <Select 
  value={type}
  onChange={onChange}
    sx={{
        '&.MuiSelect-outlined':{width:'20% !important'},
        border:"none",
        // width:'20% !important',
        fontFamily:'Cairo',
                boxShadow: "none",
                height:'40px !important',
                background:'#F7F8FA',
               borderColor:'#C9CDD4',
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
              }} 
              size="small"
              IconComponent={() => <KeyboardArrowDownIcon />}
              
              displayEmpty
              >
                <MenuItem value='true'>%</MenuItem>
                <MenuItem value='false'>$</MenuItem>
                
              </Select>
    </SoftBox>
    </Box>
  )
}

export default SelectValuePrecentage