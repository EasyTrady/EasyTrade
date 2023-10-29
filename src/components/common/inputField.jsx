/* eslint-disable react/prop-types */
import SoftBox from 'components/SoftBox'
import SoftInput from 'components/SoftInput'
import SoftTypography from 'components/SoftTypography'
import React from 'react'

const InputField = ({label}) => {
  return (
    <SoftBox  display="flex" flexDirection="column" px={2}>
    <SoftTypography variant="h6" fontWeight="medium">
     {label}
    </SoftTypography>
    <SoftInput />
  </SoftBox>
  )
}

export default InputField