import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function DeleteIcon({ color, size,onClick }) {
    return (
        <SoftBox onClick={onClick}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M5.83325 17.5C5.37492 17.5 4.98242 17.3367 4.65575 17.01C4.32909 16.6833 4.16603 16.2911 4.16659 15.8333V5H3.33325V3.33333H7.49992V2.5H12.4999V3.33333H16.6666V5H15.8333V15.8333C15.8333 16.2917 15.6699 16.6842 15.3433 17.0108C15.0166 17.3375 14.6244 17.5006 14.1666 17.5H5.83325ZM7.49992 14.1667H9.16658V6.66667H7.49992V14.1667ZM10.8333 14.1667H12.4999V6.66667H10.8333V14.1667Z" fill="#E84646"/>
</svg></SoftBox>)}
DeleteIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
  
export default DeleteIcon;