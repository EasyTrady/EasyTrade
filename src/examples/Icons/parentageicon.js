import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";
function ParentageIcon({ color, size,onClick }) {
    return (
        <SoftBox onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M15.8333 4.16536L4.16659 15.832M14.5833 16.6654C15.9724 16.6654 16.6666 15.9512 16.6666 14.1654C16.6666 12.3795 15.9724 11.6654 14.5833 11.6654C13.1941 11.6654 12.4999 12.3795 12.4999 14.1654C12.4999 15.9512 13.1941 16.6654 14.5833 16.6654ZM5.41659 8.33203C6.80575 8.33203 7.49992 7.61786 7.49992 5.83203C7.49992 4.0462 6.80575 3.33203 5.41659 3.33203C4.02742 3.33203 3.33325 4.0462 3.33325 5.83203C3.33325 7.61786 4.02742 8.33203 5.41659 8.33203Z" stroke="#191B1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg></SoftBox>)}
ParentageIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
  
export default ParentageIcon;