/* eslint-disable react/prop-types */
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DatePickerField({value,onChange}) {
  const [date, setDate] = React.useState(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
  inputFormat="MM/dd/yyyy"
  value={value}
  onChange={onChange}
  renderInput={(params) => <TextField {...params} fullWidth  sx={{idth:'100%'}}/>}  
  sx={{width:'100%'}}
/>
    </LocalizationProvider>
  );
}