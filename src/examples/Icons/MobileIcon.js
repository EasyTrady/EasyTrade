import React from 'react'
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'
function MobileIcon({ color, size,onClick}) {
  return(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M22.5 25.3125V4.6875C22.5 3.65197 21.6605 2.8125 20.625 2.8125L9.375 2.8125C8.33947 2.8125 7.5 3.65197 7.5 4.6875L7.5 25.3125C7.5 26.348 8.33947 27.1875 9.375 27.1875H20.625C21.6605 27.1875 22.5 26.348 22.5 25.3125Z" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.25 6.5625H18.75" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
</svg>)}
MobileIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes?.func
};
  
export default MobileIcon;
