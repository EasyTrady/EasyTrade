import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { BpIcon } from 'styles/productStyle'
import { BpCheckedIcon } from 'styles/productStyle'


const RadioButton = (props) => {
  return (
    <Radio
    disableRipple
    color="default"
    checkedIcon={<BpCheckedIcon />}
    icon={<BpIcon />}
    {...props}
  />
  )
}

export default RadioButton