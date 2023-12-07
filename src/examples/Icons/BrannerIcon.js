import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
function BrannerIcon({color, size,onClick}) {
  return (
    <SoftBox onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.125 1.875H1.875V11.875H18.125V1.875Z" fill="#3A416F"/>
  <path d="M6.875 13.125H4.375V18.125H6.875V13.125Z" fill="#3A416F"/>
  <path d="M15.625 13.125H13.125V18.125H15.625V13.125Z" fill="#3A416F"/>
</svg>
    </SoftBox>
  )
}
BrannerIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default BrannerIcon