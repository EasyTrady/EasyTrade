import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import React from 'react'

function StartIcon({color, size,onClick,sx}) {
  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
    <path d="M1.93177 0.969701C2.15741 0.320553 3.07546 0.320553 3.30111 0.969701C3.40065 1.25607 3.66789 1.45023 3.971 1.45641C4.65811 1.47041 4.9418 2.34353 4.39415 2.75873C4.15256 2.94189 4.05048 3.25605 4.13827 3.54624C4.33728 4.20404 3.59457 4.74366 3.03046 4.35111C2.78161 4.17795 2.45127 4.17795 2.20242 4.35111C1.63831 4.74366 0.895593 4.20404 1.0946 3.54624C1.18239 3.25605 1.08032 2.94189 0.838724 2.75873C0.291076 2.34353 0.574768 1.47041 1.26187 1.45641C1.56498 1.45023 1.83223 1.25607 1.93177 0.969701Z" fill="#F0C24D"/>
    </svg>
    
  )
}
StartIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func,
    sx:PropTypes.any
};
export default StartIcon