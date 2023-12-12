import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
function VendorIcon({color, size,onClick}) {
return(<SoftBox onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clipPath="url(#clip0_962_21395)">
    <path d="M2.30627 0.829645C1.99221 0.984333 1.97346 1.0359 1.34065 3.35621C0.745335 5.53121 0.740647 5.55933 0.768772 5.92027C0.82971 6.62808 1.14377 7.35465 1.61721 7.86558L1.87502 8.14215L1.8844 14.1375C1.89846 20.6671 1.87971 20.1843 2.15627 20.9156C2.29221 21.2812 2.65315 21.825 2.97658 22.1484C3.30002 22.4718 3.84377 22.8328 4.2094 22.9687C4.9219 23.2359 4.73909 23.2265 8.65784 23.2265C12.2391 23.2265 12.2766 23.2265 12.4031 23.1281C12.6516 22.9453 12.7266 22.7953 12.7266 22.5C12.7266 22.2046 12.6516 22.0546 12.4031 21.8718C12.2766 21.7734 12.2203 21.7734 8.70471 21.75C5.1844 21.7265 5.12815 21.7265 4.88908 21.6234C4.12502 21.314 3.63752 20.775 3.44533 20.0296C3.3844 19.8 3.37502 18.9937 3.37502 14.339V8.92027L3.6469 8.96246C3.79221 8.99058 4.10627 8.99527 4.34065 8.98121C5.13283 8.93433 5.84534 8.62496 6.42659 8.07652L6.75002 7.77183L7.06877 8.06715C7.45784 8.43277 7.87502 8.68121 8.36721 8.84527C8.70002 8.95308 8.81721 8.96715 9.37502 8.96715C9.92815 8.97183 10.0547 8.95308 10.3688 8.84996C10.875 8.68121 11.3016 8.43277 11.6766 8.07652L12 7.77183L12.3188 8.06715C12.7078 8.43277 13.125 8.68121 13.6172 8.84527C13.95 8.95308 14.0672 8.96715 14.625 8.96715C15.1781 8.97183 15.3047 8.95308 15.6188 8.84996C16.125 8.68121 16.5516 8.43277 16.9266 8.07652L17.25 7.77183L17.5688 8.06715C17.9625 8.43746 18.3797 8.6859 18.8625 8.84058C19.2938 8.97652 19.9547 9.03277 20.3531 8.96715L20.6203 8.92027L20.6344 10.8796C20.6485 12.7734 20.6531 12.839 20.7469 12.9656C20.9297 13.214 21.0797 13.289 21.375 13.289C21.6703 13.289 21.8203 13.214 22.0031 12.9656C22.0969 12.839 22.1016 12.7781 22.1156 10.4906L22.1297 8.14215L22.3828 7.86558C22.8563 7.35465 23.1703 6.62808 23.2313 5.92027C23.2594 5.55933 23.2547 5.53121 22.6594 3.35621C22.0172 1.00777 21.9938 0.951521 21.6703 0.815582C21.5438 0.759333 19.9313 0.749958 11.9906 0.749958C3.31409 0.749958 2.4469 0.759333 2.30627 0.829645Z" fill="#3A416F"/>
    <path d="M17.7188 13.2C16.622 13.4344 15.6751 14.3906 15.4454 15.4922C15.2673 16.3359 15.4829 17.3109 15.9798 17.925C16.0595 18.0234 16.1251 18.1266 16.1251 18.1453C16.1251 18.1687 16.0454 18.225 15.9517 18.2766C15.4829 18.5109 14.7798 19.1484 14.4142 19.6594C13.9688 20.2828 13.6501 21.0984 13.547 21.8766C13.4485 22.5984 13.5142 22.8844 13.847 23.1281C13.9735 23.2266 14.0063 23.2266 18.3751 23.2266C22.7438 23.2266 22.7767 23.2266 22.9032 23.1281C23.236 22.8844 23.3017 22.5984 23.2032 21.8766C22.9923 20.3203 22.1204 19.05 20.6907 18.2062C20.6063 18.1547 20.611 18.1406 20.7563 17.9484C21.6657 16.7391 21.5532 15.0844 20.4845 14.0109C19.7579 13.2797 18.7313 12.9797 17.7188 13.2Z" fill="#3A416F" fillOpacity="0.598"/>
  </g>
  <defs>
    <clipPath id="clip0_962_21395">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg></SoftBox>)}

export default VendorIcon
VendorIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};