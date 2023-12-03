import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function ReportIcon({ color, size,onClick }) {
    return (
        <SoftBox onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
<path d="M3.83333 2H8.83333V5.66667H13.1667V14H3.83333V2Z" fill="#3A416F" fillOpacity="0.53"/>
<path d="M9.16666 2L13.1667 6V14H3.83333V2H9.16666Z" stroke="#3A416F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.83333 2V5.66667H13.1667" stroke="#3A416F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.5 11.333V9.33301" stroke="#3A416F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.5 11.3337V8.66699" stroke="#3A416F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.5 11.3333V8" stroke="#3A416F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg></SoftBox>)
}
ReportIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
  
export default ReportIcon;