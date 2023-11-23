/* eslint-disable react/prop-types */
import { Box, Divider, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import NumberField from "components/common/NumberFeild";
import SoftInput from 'components/SoftInput'
import { NumericFormat } from 'react-number-format'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const SelectValue = ({variant,label,handleValueChange,type,onChange,...rest}) => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',  }}>
   <Typography sx={{
fontSize: '14px',
fontWeight: 400,
lineHeight:' 20px',
letterSpacing: '0em',
textAlign: 'left',
mb:'6px'
}}>{label}</Typography>
    <NumberField
        customInput={TextField}
        // id="outlined-adornment-password"
        type={'text'}
       
        // sx={{"& .MuiInputBase-root.MuiOutlinedInput-root":{ overflow: "hidden !important",minWidth:"40vw !important"},".MuiOutlinedInput-root":{width:"40vw !important"}}}
        onChange={handleValueChange}
        {...rest}
        InputProps={{
          endAdornment:
            (<InputAdornment sx={{ position: "absolute", right: "0" }}>
              <SoftInput
              sx={{".MuiOutlinedInput-root":{width:"100%!important"}}}
      select
      onChange={onChange}
      value={type}
      IconComponent={KeyboardArrowDownIcon}
      SelectProps={{
        defaultValue: "",
        displayEmpty: true,
        // onOpen: onOpen,
        // onClose: onClose,
        renderValue: (selected) => {
          if (!Boolean(selected)) {
            return (
              <Typography sx={{ color: "currentColor", opacity: "0.42",fontSize:"14px" }}>
                {"unit"}
              </Typography>
            );
          } else {
            return  selected
          }
        },
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: "200px",
              overflowY: "auto",
             backgroundColor:"white !important"
            },
          },
        },
       
        IconComponent:  ()=><KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        
      }}
    
    >
        <MenuItem value='true'>Precentage</MenuItem>
                <MenuItem value='false'>g</MenuItem>
              
             </SoftInput>
            </InputAdornment>)
        }}

      />
    {/* <Box 
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
   
      }}
    />
    <Select 
  value={type}
  onChange={onChange}
    sx={{
        '&.MuiSelect-outlined':{width:'20% !important'},
        border:"none",
        width:'20% !important',
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
              IconComponent={KeyboardArrowDownIcon}
              defaultValue={'true'}
              displayEmpty
              >
                <MenuItem value='true'>Precentage</MenuItem>
                <MenuItem value='false'>g</MenuItem>
                
              </Select>
    </Box> */}
    </Box>
  )
}

export default SelectValue