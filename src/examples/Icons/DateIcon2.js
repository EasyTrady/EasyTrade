import React from 'react'
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'
function DateIcon2({ color, size,onClick}) {
  return (<SoftBox onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M16.25 3.125H3.75C3.40482 3.125 3.125 3.40482 3.125 3.75V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V3.75C16.875 3.40482 16.5952 3.125 16.25 3.125Z" stroke="#005CE8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.75 1.875V4.375" stroke="#005CE8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.25 1.875V4.375" stroke="#005CE8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.125 6.875H16.875" stroke="#005CE8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg></SoftBox>
  )
}
DateIcon2.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes?.func
};
  
export default DateIcon2