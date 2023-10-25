import { Avatar, Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";
function PictureField({
    accept,
    label,
    placeholder,
    onChange,value,
    ...rest
}) {
  const ref = useRef(null);
    useEffect(()=>{
        console.log(value)
    },[value])
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <input
        type="file"
        accept={accept}
        multiple={true}
        ref={ref}
        onChange={(e) => {
        //   setValue(e.target.files);
          onChange(e);
        }}
        style={{ display: "none" }}
      
      />
      <label>
        Add image
      </label>
       {value?<Box sx={{width:"50%"}} onClick={()=>ref.current.click()}>
        <img src={value} style={{width:"100%"}}/>
        </Box>: <TextField
        variant="standard"
        
        sx={{
          "& .MuiInputBase-input": {
            padding: "10px 12px",
            border: "0",
            cursor: "pointer",
          },"& .MuiInputBase-root":{
            border:0
          },"& .MuiInputBase-root::before":{
            borderBottom:0
          },"& .MuiInputBase-root::before:hover":{
            borderBottom:0
          },"& .MuiInputBase-root::after":{
            borderBottom:0
          },"& .MuiInputBase-root:hover":{
            borderBottom:0
          }
        }}
        {...rest}
       
        value={value}
        InputProps={{
          readOnly: true,
          endAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={() => ref.current.click()}>
              <AddPhotoAlternateIcon
                color="primary"
                sx={{ width: "50px", height: "50px" }}
              />
            </IconButton>
          </InputAdornment>
            
          ),
        }}
       
      /> }
     
    </Box>
  )
}

export default PictureField
PictureField.propTypes={
    accept:PropTypes.string,
    label:PropTypes.string,
    placeholder:PropTypes.string,
    onChange:PropTypes.func,value:PropTypes.string,required:PropTypes.string,helperText:PropTypes.string,error:PropTypes.string
}