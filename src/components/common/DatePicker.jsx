/* eslint-disable react/prop-types */
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import {useEffect} from 'react';
import SoftTypography from "components/SoftTypography";

export default function DatePickerField({value,onChange,icon,sx}) {
  const [date, setDate] = React.useState(dayjs(value));
useEffect(()=>{
  setDate(dayjs(value))
  // console.log(dayjs(value))
},[value])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {typeof icon=="string"&&<SoftTypography component="div" variant="button" color="text" fontWeight="regular"sx={{backgroundColor: "#ffffff",
    padding: "0.5rem"}}>
              {icon}
            </SoftTypography>}
        <DatePicker
  inputFormat="YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
  value={date}
  slots={{openPickerIcon:icon}}
  slotProps={{ inputAdornment: {
    position: 'start',
  },}}
  onChange={onChange}
  renderInput={(params) => <TextField {...params} fullWidth  sx={{width:'100%'}}/>}  
  sx={{...sx,width:'100%',".openPickerIcon": {
   
    order: 1
  }
  }}
/>
    </LocalizationProvider>
  );
}