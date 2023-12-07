import React from 'react'
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'
function Rankinghome({ color, size,onClick }) {
  return (
    <SoftBox onClick={onClick}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clipPath="url(#clip0_1286_5123)">
    <path d="M17.8125 0.625H2.1875C1.7731 0.625 1.37567 0.78962 1.08265 1.08265C0.78962 1.37567 0.625 1.7731 0.625 2.1875V17.8125C0.625 18.2269 0.78962 18.6243 1.08265 18.9174C1.37567 19.2104 1.7731 19.375 2.1875 19.375H17.8125C18.2269 19.375 18.6243 19.2104 18.9174 18.9174C19.2104 18.6243 19.375 18.2269 19.375 17.8125V2.1875C19.375 1.7731 19.2104 1.37567 18.9174 1.08265C18.6243 0.78962 18.2269 0.625 17.8125 0.625ZM14.0625 2.5H17.1875C17.2704 2.5 17.3499 2.53292 17.4085 2.59153C17.4671 2.65013 17.5 2.72962 17.5 2.8125C17.5 2.89538 17.4671 2.97487 17.4085 3.03347C17.3499 3.09208 17.2704 3.125 17.1875 3.125H14.0625C13.9796 3.125 13.9001 3.09208 13.8415 3.03347C13.7829 2.97487 13.75 2.89538 13.75 2.8125C13.75 2.72962 13.7829 2.65013 13.8415 2.59153C13.9001 2.53292 13.9796 2.5 14.0625 2.5ZM5.9375 2.5C5.99931 2.5 6.05973 2.51833 6.11112 2.55267C6.16251 2.587 6.20256 2.63581 6.22621 2.69291C6.24986 2.75001 6.25605 2.81285 6.244 2.87347C6.23194 2.93408 6.20218 2.98977 6.15847 3.03347C6.11477 3.07717 6.05908 3.10694 5.99847 3.119C5.93785 3.13105 5.87501 3.12486 5.81791 3.10121C5.76081 3.07756 5.712 3.03751 5.67767 2.98612C5.64333 2.93473 5.625 2.87431 5.625 2.8125C5.625 2.72962 5.65792 2.65013 5.71653 2.59153C5.77513 2.53292 5.85462 2.5 5.9375 2.5ZM4.375 2.5C4.43681 2.5 4.49723 2.51833 4.54862 2.55267C4.60001 2.587 4.64006 2.63581 4.66371 2.69291C4.68736 2.75001 4.69355 2.81285 4.6815 2.87347C4.66944 2.93408 4.63967 2.98977 4.59597 3.03347C4.55227 3.07717 4.49658 3.10694 4.43597 3.119C4.37535 3.13105 4.31251 3.12486 4.25541 3.10121C4.19831 3.07756 4.1495 3.03751 4.11517 2.98612C4.08083 2.93473 4.0625 2.87431 4.0625 2.8125C4.0625 2.72962 4.09542 2.65013 4.15403 2.59153C4.21263 2.53292 4.29212 2.5 4.375 2.5ZM2.8125 2.5C2.87431 2.5 2.93473 2.51833 2.98612 2.55267C3.03751 2.587 3.07756 2.63581 3.10121 2.69291C3.12486 2.75001 3.13105 2.81285 3.119 2.87347C3.10694 2.93408 3.07717 2.98977 3.03347 3.03347C2.98977 3.07717 2.93408 3.10694 2.87347 3.119C2.81285 3.13105 2.75001 3.12486 2.69291 3.10121C2.63581 3.07756 2.587 3.03751 2.55267 2.98612C2.51833 2.93473 2.5 2.87431 2.5 2.8125C2.5 2.72962 2.53292 2.65013 2.59153 2.59153C2.65013 2.53292 2.72962 2.5 2.8125 2.5ZM18.75 17.8125C18.7493 18.0609 18.6502 18.2989 18.4746 18.4746C18.2989 18.6502 18.0609 18.7493 17.8125 18.75H2.1875C1.93909 18.7493 1.70106 18.6502 1.52541 18.4746C1.34975 18.2989 1.25074 18.0609 1.25 17.8125V5H18.75V17.8125Z" fill="#3A416F"/>
    <path d="M17.1875 12.8125H7.8125C7.56409 12.8132 7.32606 12.9123 7.15041 13.0879C6.97475 13.2636 6.87574 13.5016 6.875 13.75V16.875C6.87574 17.1234 6.97475 17.3614 7.15041 17.5371C7.32606 17.7127 7.56409 17.8118 7.8125 17.8125H17.1875C17.4359 17.8118 17.6739 17.7127 17.8496 17.5371C18.0252 17.3614 18.1243 17.1234 18.125 16.875V13.75C18.1243 13.5016 18.0252 13.2636 17.8496 13.0879C17.6739 12.9123 17.4359 12.8132 17.1875 12.8125ZM17.5 16.875C17.5 16.9579 17.4671 17.0374 17.4085 17.096C17.3499 17.1546 17.2704 17.1875 17.1875 17.1875H10.3125V13.4375H17.1875C17.2704 13.4375 17.3499 13.4704 17.4085 13.529C17.4671 13.5876 17.5 13.6671 17.5 13.75V16.875Z" fill="#3A416F"/>
    <path d="M14.4375 9.37577H14.6875V10.3133C14.6882 10.5617 14.7872 10.7997 14.9629 10.9754C15.1385 11.151 15.3766 11.25 15.625 11.2508H16.25C16.4984 11.25 16.7364 11.151 16.9121 10.9754C17.0877 10.7997 17.1867 10.5617 17.1875 10.3133V9.37577H17.4375C17.5569 9.37407 17.6734 9.33838 17.7733 9.27289C17.8732 9.2074 17.9523 9.11481 18.0015 9.00596C18.0507 8.89711 18.0679 8.7765 18.051 8.65826C18.0341 8.54001 17.9839 8.42902 17.9062 8.33827L16.4094 6.62577C16.3491 6.56141 16.2763 6.51011 16.1954 6.47504C16.1145 6.43997 16.0272 6.42188 15.9391 6.42188C15.8509 6.42188 15.7636 6.43997 15.6827 6.47504C15.6018 6.51011 15.529 6.56141 15.4687 6.62577L13.9687 8.33827C13.8911 8.42902 13.8409 8.54001 13.824 8.65826C13.8071 8.7765 13.8243 8.89711 13.8735 9.00596C13.9226 9.11481 14.0018 9.2074 14.1017 9.27289C14.2016 9.33838 14.3181 9.37407 14.4375 9.37577Z" fill="#3A416F" fillOpacity="0.5986"/>
    <path d="M5.56249 15H5.31249V13.75C5.31175 13.5016 5.21274 13.2636 5.03708 13.0879C4.86143 12.9123 4.6234 12.8132 4.37499 12.8125H3.74999C3.50158 12.8132 3.26355 12.9123 3.08789 13.0879C2.91224 13.2636 2.81323 13.5016 2.81249 13.75V15H2.56249C2.44306 15.0017 2.32658 15.0374 2.22669 15.1029C2.1268 15.1684 2.04764 15.261 1.99846 15.3698C1.94928 15.4787 1.93212 15.5993 1.94899 15.7175C1.96587 15.8358 2.01608 15.9468 2.09374 16.0375L3.59061 17.75C3.64969 17.8164 3.72213 17.8695 3.80319 17.9058C3.88425 17.9422 3.97208 17.961 4.06093 17.961C4.14977 17.961 4.2376 17.9422 4.31866 17.9058C4.39972 17.8695 4.47216 17.8164 4.53124 17.75L6.03124 16.0375C6.1089 15.9468 6.15911 15.8358 6.17598 15.7175C6.19286 15.5993 6.1757 15.4787 6.12652 15.3698C6.07734 15.261 5.99817 15.1684 5.89829 15.1029C5.7984 15.0374 5.68192 15.0017 5.56249 15Z" fill="#3A416F" fillOpacity="0.5986"/>
    <path d="M2.8125 11.25H12.1875C12.4359 11.2493 12.6739 11.1502 12.8496 10.9746C13.0252 10.7989 13.1243 10.5609 13.125 10.3125V7.1875C13.1243 6.93909 13.0252 6.70106 12.8496 6.52541C12.6739 6.34975 12.4359 6.25074 12.1875 6.25H2.8125C2.56409 6.25074 2.32606 6.34975 2.15041 6.52541C1.97475 6.70106 1.87574 6.93909 1.875 7.1875V10.3125C1.87574 10.5609 1.97475 10.7989 2.15041 10.9746C2.32606 11.1502 2.56409 11.2493 2.8125 11.25ZM5.3125 6.875H12.1875C12.2704 6.875 12.3499 6.90792 12.4085 6.96653C12.4671 7.02513 12.5 7.10462 12.5 7.1875V10.3125C12.5 10.3954 12.4671 10.4749 12.4085 10.5335C12.3499 10.5921 12.2704 10.625 12.1875 10.625H5.3125V6.875Z" fill="#3A416F"/>
    <path d="M11.25 7.65625H7.8125C7.72962 7.65625 7.65013 7.68917 7.59153 7.74778C7.53292 7.80638 7.5 7.88587 7.5 7.96875C7.5 8.05163 7.53292 8.13112 7.59153 8.18972C7.65013 8.24833 7.72962 8.28125 7.8125 8.28125H11.25C11.3329 8.28125 11.4124 8.24833 11.471 8.18972C11.5296 8.13112 11.5625 8.05163 11.5625 7.96875C11.5625 7.88587 11.5296 7.80638 11.471 7.74778C11.4124 7.68917 11.3329 7.65625 11.25 7.65625Z" fill="#3A416F"/>
    <path d="M11.25 9.21875H6.5625C6.47962 9.21875 6.40013 9.25167 6.34153 9.31028C6.28292 9.36888 6.25 9.44837 6.25 9.53125C6.25 9.61413 6.28292 9.69362 6.34153 9.75222C6.40013 9.81083 6.47962 9.84375 6.5625 9.84375H11.25C11.3329 9.84375 11.4124 9.81083 11.471 9.75222C11.5296 9.69362 11.5625 9.61413 11.5625 9.53125C11.5625 9.44837 11.5296 9.36888 11.471 9.31028C11.4124 9.25167 11.3329 9.21875 11.25 9.21875Z" fill="#3A416F"/>
    <path d="M16.25 14.2188H11.5625C11.4796 14.2188 11.4001 14.2517 11.3415 14.3103C11.2829 14.3689 11.25 14.4484 11.25 14.5312C11.25 14.6141 11.2829 14.6936 11.3415 14.7522C11.4001 14.8108 11.4796 14.8438 11.5625 14.8438H16.25C16.3329 14.8438 16.4124 14.8108 16.471 14.7522C16.5296 14.6936 16.5625 14.6141 16.5625 14.5312C16.5625 14.4484 16.5296 14.3689 16.471 14.3103C16.4124 14.2517 16.3329 14.2188 16.25 14.2188Z" fill="#3A416F"/>
    <path d="M16.25 15.7812H11.5625C11.4796 15.7812 11.4001 15.8142 11.3415 15.8728C11.2829 15.9314 11.25 16.0109 11.25 16.0938C11.25 16.1766 11.2829 16.2561 11.3415 16.3147C11.4001 16.3733 11.4796 16.4062 11.5625 16.4062H16.25C16.3329 16.4062 16.4124 16.3733 16.471 16.3147C16.5296 16.2561 16.5625 16.1766 16.5625 16.0938C16.5625 16.0109 16.5296 15.9314 16.471 15.8728C16.4124 15.8142 16.3329 15.7812 16.25 15.7812Z" fill="#3A416F"/>
    <path d="M6.5625 8.28125C6.73509 8.28125 6.875 8.14134 6.875 7.96875C6.875 7.79616 6.73509 7.65625 6.5625 7.65625C6.38991 7.65625 6.25 7.79616 6.25 7.96875C6.25 8.14134 6.38991 8.28125 6.5625 8.28125Z" fill="#3A416F"/>
  </g>
  <defs>
    <clipPath id="clip0_1286_5123">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
</SoftBox>
  )
}
Rankinghome.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default Rankinghome