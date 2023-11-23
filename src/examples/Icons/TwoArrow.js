import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function TwoArrow({ color, size }) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill={color} width={size}
      height={size}>
<g clipPath="url(#clip0_54_30033)">
<rect width={size} height={size} transform="translate(0 16) rotate(-90)" fill="white"/>
<path d="M7.94941 12.448C8.14749 12.256 8.23002 12.016 8.23002 11.776C8.23002 11.536 8.13098 11.28 7.94941 11.104C7.56976 10.736 6.94251 10.736 6.54635 11.104L5.25884 12.352L5.25884 1.376C5.25884 0.848004 4.81316 0.416005 4.26844 0.416005C3.72373 0.416005 3.27805 0.848004 3.27805 1.376L3.27805 12.336L1.99053 11.088C1.61088 10.72 0.983632 10.72 0.587474 11.088C0.207822 11.456 0.207822 12.064 0.587473 12.448L3.55866 15.328C3.93831 15.696 4.56556 15.696 4.96172 15.328L7.94941 12.448Z" fill={color}/>
<path d="M11.0858 0.687975L8.11457 3.56798C7.73492 3.93598 7.73492 4.54397 8.11457 4.92798C8.49423 5.29598 9.12148 5.29598 9.51763 4.92798L10.8051 3.67997L10.8051 14.64C10.8051 15.168 11.2508 15.6 11.7955 15.6C12.3403 15.6 12.7859 15.168 12.7859 14.64L12.7859 3.66398L14.0735 4.91197C14.4531 5.27997 15.0804 5.27997 15.4765 4.91197C15.6746 4.71998 15.7736 4.47998 15.7736 4.23998C15.7736 3.99998 15.6746 3.74398 15.4765 3.56798L12.5053 0.687975C12.0927 0.303976 11.4819 0.303976 11.0858 0.687975Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_54_30033">
<rect width={size} height={size} fill="white" transform="translate(0 16) rotate(-90)"/>
</clipPath>
</defs>
</svg>)}
TwoArrow.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
  
  export default TwoArrow;