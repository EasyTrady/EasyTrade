import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
function CategoryIcon({color, size,onClick}) {
  return (
    <SoftBox onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M3.33333 9.16667H8.33333C8.55435 9.16667 8.76631 9.07887 8.92259 8.92259C9.07887 8.76631 9.16667 8.55435 9.16667 8.33333V3.33333C9.16667 3.11232 9.07887 2.90036 8.92259 2.74408C8.76631 2.5878 8.55435 2.5 8.33333 2.5H3.33333C3.11232 2.5 2.90036 2.5878 2.74408 2.74408C2.5878 2.90036 2.5 3.11232 2.5 3.33333V8.33333C2.5 8.55435 2.5878 8.76631 2.74408 8.92259C2.90036 9.07887 3.11232 9.16667 3.33333 9.16667ZM11.6667 9.16667H16.6667C16.8877 9.16667 17.0996 9.07887 17.2559 8.92259C17.4122 8.76631 17.5 8.55435 17.5 8.33333V3.33333C17.5 3.11232 17.4122 2.90036 17.2559 2.74408C17.0996 2.5878 16.8877 2.5 16.6667 2.5H11.6667C11.4457 2.5 11.2337 2.5878 11.0774 2.74408C10.9211 2.90036 10.8333 3.11232 10.8333 3.33333V8.33333C10.8333 8.55435 10.9211 8.76631 11.0774 8.92259C11.2337 9.07887 11.4457 9.16667 11.6667 9.16667ZM3.33333 17.5H8.33333C8.55435 17.5 8.76631 17.4122 8.92259 17.2559C9.07887 17.0996 9.16667 16.8877 9.16667 16.6667V11.6667C9.16667 11.4457 9.07887 11.2337 8.92259 11.0774C8.76631 10.9211 8.55435 10.8333 8.33333 10.8333H3.33333C3.11232 10.8333 2.90036 10.9211 2.74408 11.0774C2.5878 11.2337 2.5 11.4457 2.5 11.6667V16.6667C2.5 16.8877 2.5878 17.0996 2.74408 17.2559C2.90036 17.4122 3.11232 17.5 3.33333 17.5ZM14.1667 17.5C16.005 17.5 17.5 16.005 17.5 14.1667C17.5 12.3283 16.005 10.8333 14.1667 10.8333C12.3283 10.8333 10.8333 12.3283 10.8333 14.1667C10.8333 16.005 12.3283 17.5 14.1667 17.5Z" fill="#3A416F"/>
</svg>
    </SoftBox>
  )
}
CategoryIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default CategoryIcon