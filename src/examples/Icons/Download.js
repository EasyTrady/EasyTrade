import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Download({ color, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 21 20" fill={color}>
  <path d="M7.21875 6.40539L10.5 3.125L13.7812 6.40539" stroke="#5D449B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill={color}/>
  <path d="M10.5 11.8749V3.1272" stroke="#5D449B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill={color}/>
  <path d="M17.375 11.875V16.25C17.375 16.4158 17.3092 16.5747 17.1919 16.6919C17.0747 16.8092 16.9158 16.875 16.75 16.875H4.25C4.08424 16.875 3.92527 16.8092 3.80806 16.6919C3.69085 16.5747 3.625 16.4158 3.625 16.25V11.875" stroke="#5D449B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"fill={color}/>
</svg>
  );
}

// Setting default values for the props of Basket
Download.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Basket
Download.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Download;