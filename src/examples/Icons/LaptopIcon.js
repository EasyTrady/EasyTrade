import React from 'react'
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'
function LaptopIcon({ color, size,onClick}) {
  return(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M4.6875 20.625V8.4375C4.6875 7.94022 4.88504 7.46331 5.23667 7.11167C5.58831 6.76004 6.06522 6.5625 6.5625 6.5625H23.4375C23.9348 6.5625 24.4117 6.76004 24.7633 7.11167C25.115 7.46331 25.3125 7.94022 25.3125 8.4375V20.625" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.8125 20.625H27.1875V22.5C27.1875 22.9973 26.99 23.4742 26.6383 23.8258C26.2867 24.1775 25.8098 24.375 25.3125 24.375H4.6875C4.19022 24.375 3.71331 24.1775 3.36167 23.8258C3.01004 23.4742 2.8125 22.9973 2.8125 22.5V20.625Z" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.875 10.3125H13.125" stroke="#57399D" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg>)}
LaptopIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes?.func
};
  
export default LaptopIcon