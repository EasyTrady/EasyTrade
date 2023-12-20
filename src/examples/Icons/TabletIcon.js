import React from 'react'
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'
function TabletIcon({ color, size,onClick}) {
  return(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M24.375 24.375V5.625C24.375 4.58947 23.5355 3.75 22.5 3.75L7.5 3.75C6.46447 3.75 5.625 4.58947 5.625 5.625V24.375C5.625 25.4105 6.46447 26.25 7.5 26.25H22.5C23.5355 26.25 24.375 25.4105 24.375 24.375Z" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.25 7.5H18.75" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
</svg>)}
TabletIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes?.func
};
  
export default TabletIcon