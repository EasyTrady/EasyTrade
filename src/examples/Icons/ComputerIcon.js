import React from 'react'
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'
function ComputerIcon({ color, size,onClick}) {
  return ( <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M5.625 22.5L24.375 22.5C25.4105 22.5 26.25 21.6605 26.25 20.625L26.25 7.5C26.25 6.46447 25.4105 5.625 24.375 5.625L5.625 5.625C4.58947 5.625 3.75 6.46447 3.75 7.5L3.75 20.625C3.75 21.6605 4.58947 22.5 5.625 22.5Z" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.75 26.25H11.25" stroke="#57399D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}
ComputerIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes?.func
};
  
export default ComputerIcon