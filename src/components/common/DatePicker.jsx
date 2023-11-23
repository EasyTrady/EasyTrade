/* eslint-disable react/prop-types */
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import {useEffect} from 'react';

export default function DatePickerField({value,onChange}) {
  const [date, setDate] = React.useState(dayjs(value));
useEffect(()=>{
  setDate(dayjs(value))
  // console.log(dayjs(value))
},[value])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
  inputFormat="YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
  value={date}
  onChange={onChange}
  renderInput={(params) => <TextField {...params} fullWidth  sx={{idth:'100%'}}/>}  
  sx={{width:'100%'}}
/>
    </LocalizationProvider>
  );
}