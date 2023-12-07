import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
function BrandIcon({ color, size,onClick }) {
  return (
    <SoftBox onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g clipPath="url(#clip0_1125_11932)">
<path d="M6.21836 2.58291C8.39752 1.52624 11.4067 1.37791 13.7709 2.16374C15.9109 2.87458 17.4967 4.80958 17.5 7.00541C17.5034 9.55624 15.8817 11.5821 13.42 12.2079C12.0092 12.5662 11.4717 12.8329 10.9684 13.5262C10.77 13.7996 10.5934 14.1471 10.305 14.8037L10.1217 15.2204C9.16669 17.3879 8.32502 18.3554 6.59169 18.3329C4.73169 18.3079 3.58919 16.8812 2.99753 14.5996C2.61586 13.1262 2.48336 11.4262 2.50253 9.70291C2.53919 6.37541 3.68586 3.80958 6.21919 2.58208L6.21836 2.58291Z" fill="#3A416F"/>
</g>
<defs>
<clipPath id="clip0_1125_11932">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
    </SoftBox>
  )
}
BrandIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default BrandIcon