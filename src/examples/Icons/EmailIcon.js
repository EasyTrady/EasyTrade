import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import SoftBox from "components/SoftBox";

function EmailIcon({ color, size,onClick }) {
    return (
        <SoftBox onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M17.5 4.375L10 11.25L2.5 4.375" stroke="#191B1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.5 4.375H17.5V15C17.5 15.1658 17.4342 15.3247 17.3169 15.4419C17.1997 15.5592 17.0408 15.625 16.875 15.625H3.125C2.95924 15.625 2.80027 15.5592 2.68306 15.4419C2.56585 15.3247 2.5 15.1658 2.5 15V4.375Z" stroke="#191B1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.63627 10L2.69263 15.4484" stroke="#191B1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.3073 15.4484L11.3635 10" stroke="#191B1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg></SoftBox>)}
EmailIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
  
export default EmailIcon;