/* eslint-disable react/prop-types */
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker,DateField } from "@mui/x-date-pickers-pro";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import {useEffect} from 'react';



import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro';



import SoftTypography from "components/SoftTypography";

export default function DatePickerRange({value,onChange,icon,sx}) {
  const [date, setDate] = React.useState([dayjs(value),dayjs(value)]);
useEffect(()=>{
  setDate([dayjs(value),dayjs(value)])
  // console.log(dayjs(value))
},[value])
  return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//        {/* <DemoContainer components={['DateField', 'DateField', 'DateField']}>
//       <DateField value={date1} onChange={handleDateChange1} />
//       <DateField value={date2} onChange={handleDateChange2} formatDensity="dense" />
//       <DateField value={date3} onChange={handleDateChange3} formatDensity="spacious" />
//     </DemoContainer> */}
//         <DateRangePicker 
//  format="YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
//   value={date}
// //   slots={{openPickerIcon:icon}}
// //   slotProps={{ inputAdornment: {
// //     position: 'start',
// //   },}}
//   onChange={onChange}
//   renderInput={(startProps,endProps) => <> <TextField placeholder="Start Date" />
//   <TextField  placeholder="End Date" /></>}  
//   sx={{...sx,width:'100%',".openPickerIcon": {
   
//     order: 1
//   }
//   }}
// />
    // </LocalizationProvider>
  );
}