import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import SoftBox from "components/SoftBox";

function EditIcon({ color, size,onClick }) {
    return (
        <SoftBox onClick={onClick}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.3356 5.78957 17.3969 5.698 17.4387 5.59719C17.4805 5.49638 17.502 5.38831 17.502 5.27917C17.502 5.17003 17.4805 5.06196 17.4387 4.96115C17.3969 4.86033 17.3356 4.76876 17.2583 4.69167L15.3083 2.74167C15.2312 2.66441 15.1397 2.60312 15.0389 2.56131C14.938 2.51949 14.83 2.49796 14.7208 2.49796C14.6117 2.49796 14.5036 2.51949 14.4028 2.56131C14.302 2.60312 14.2104 2.66441 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z" fill="#667085"/>
</svg></SoftBox>)}
EditIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
  
export default EditIcon;