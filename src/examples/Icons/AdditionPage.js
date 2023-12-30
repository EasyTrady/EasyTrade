import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
function AdditionIcon({ color, size,onClick }) {
  return (
    <SoftBox onClick={onClick}>
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M15.8813 5.625H11.875V1.61875L15.8813 5.625Z" fill="#3A416F" fillOpacity="0.5986"/>
</svg>
    </SoftBox>
  )
}
AdditionIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default AdditionIcon