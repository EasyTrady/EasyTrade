import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NumericFormat } from "react-number-format";
import countriesCodes from "../../data/countryCodes";
import { useSelector } from "react-redux";
import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";
import SoftInput from "components/SoftInput";
import input from "assets/theme/components/form/input";

const PhoneField = ({
  selectProps = {},
  requiredCode = false,
  onChange,
  ...rest
}) => {
  // Ghange lang


  ////////////////////
  const [country, setCountry] = useState("");

  useEffect(() => {
    setCountry(selectProps?.value);

  }, [selectProps?.value]);
 
  return (
    <SoftInput
      // customInput={TextField}
      // variant="standard"
      disabled={requiredCode && !Boolean(country)}
    sx={input}
      onChange={(e) =>
       
        Number(e.target.value)&&onChange({ target: { value: e.target.value, valueAsNumber: e.target.floatValue } })
      }
      {...rest}
      inputProps={{ min: 0 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ margin: 0 }}>
            <SoftInput
              variant="standard"
              select
              sx={{
                "& .MuiInputBase-root": {
                 justifyContent: "flex-end",paddingX:"0px !important",
                  borderRadius: 0,
                  borderLeft: "none",
                  padding:"0px !important",
                  border:"unset !important"
                },
                "& .MuiInputBase-root:hover": {borderBottom:"unset !important"},
                "& .MuiInputBase-root::before":{borderBottom:"unset !important"},
                "& .MuiInputBase-root::after":{borderBottom:"unset !important"},
                "& .MuiSelect-standard": {
                  // width: 60,
                },
              }}
              {...selectProps}
              SelectProps={{
                defaultValue: "",
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                  
                    return (
                      <Typography
                        sx={{
                          color: "currentColor",
                          opacity: "0.42",
                        }}
                      >
                        {selectProps.value
                          ? selectProps.value
                          : "+20"}
                        
                      </Typography>
                    );
                  } else {
                    
                    const selectedCountry = countriesCodes.find(
                      (item) => item.dial === selected
                    );
                 
                    return (
                      <Stack direction="row" spacing={1} sx={{justifyContent:"center",alignItems:"center"}}>
                         <ReactCountryFlag
                countryCode={selectedCountry?.code}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="US"
            />
                        <Typography>{selectedCountry?.dial}</Typography>
                      </Stack>
                    );
                  }
                },
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 200, overflowY: "auto" },
                  },
                },
                onChange: (e) => {
                  setCountry(e.target.value);
                  selectProps.onChange(e);
                },
                IconComponent: KeyboardArrowDownIcon,
              }}
            >
              {countriesCodes?.map((item, index) => (
                <MenuItem key={index} value={item.dial}>
                  <ListItemIcon
                    sx={{
                      minWidth: "max-content",
                     
                    }}
                  >
                     <ReactCountryFlag
                countryCode={item.code}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="US"
            />
                  
                  </ListItemIcon>
                  <ListItemText primary={item.code} />
                </MenuItem>
              ))}
              
            </SoftInput>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PhoneField;

PhoneField.propTypes={
  selectProps:PropTypes.object,
  requiredCode:PropTypes.bool,
  onChange:PropTypes.func,

}