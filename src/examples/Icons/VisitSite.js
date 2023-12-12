import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
function VisitSite({ color, size,onClick }) {
    return (<SoftBox onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
  <path d="M2.06974 0.705082C1.33392 0.705082 0.72728 1.30462 0.72728 2.03076V10.8991C0.72728 11.6253 1.33392 12.2239 2.06974 12.2239H6.23279L6.23993 12.7401C6.24071 12.8188 6.26236 12.8959 6.3027 12.9638C6.34305 13.0317 6.4007 13.088 6.46992 13.1271C6.53913 13.1662 6.61752 13.1868 6.69727 13.1867C6.77703 13.1866 6.85538 13.166 6.92455 13.1268L8.28753 12.3578L9.04624 13.6491C9.10721 13.7523 9.20712 13.8273 9.32407 13.8579C9.44103 13.8884 9.56548 13.872 9.67016 13.8121L10.9832 13.0695C11.0883 13.01 11.1651 12.9116 11.1967 12.7962C11.2284 12.6807 11.2122 12.5576 11.1519 12.4538L11.0162 12.2239H14.9231C15.6589 12.2239 16.2655 11.6253 16.2655 10.8991V2.03075C16.2655 1.30462 15.6589 0.705078 14.9231 0.705078L2.06974 0.705082ZM2.06974 1.60795H14.9231C15.1683 1.60795 15.3515 1.78872 15.3515 2.03076V3.37581H1.64129V2.03076C1.64129 1.78872 1.82448 1.60795 2.06974 1.60795ZM2.64278 2.00609C2.51285 2.00669 2.38843 2.05796 2.29664 2.14871C2.20484 2.23946 2.15312 2.36234 2.15275 2.49056C2.15242 2.61924 2.20382 2.7428 2.29569 2.83412C2.38756 2.92544 2.51239 2.97707 2.64278 2.97767C2.70773 2.97795 2.77208 2.96555 2.83215 2.94118C2.89221 2.91681 2.9468 2.88095 2.99276 2.83568C3.03873 2.7904 3.07516 2.7366 3.09996 2.67737C3.12476 2.61814 3.13745 2.55465 3.13728 2.49056C3.1371 2.42669 3.12415 2.36349 3.09919 2.30456C3.07423 2.24564 3.03774 2.19215 2.99182 2.14715C2.94589 2.10215 2.89142 2.06654 2.83153 2.04233C2.77164 2.01813 2.7075 2.00581 2.64278 2.00609ZM3.98881 2.00609C3.85888 2.00669 3.73446 2.05796 3.64267 2.14871C3.55087 2.23946 3.49915 2.36234 3.49878 2.49056C3.49845 2.61924 3.54985 2.7428 3.64172 2.83412C3.73359 2.92544 3.85842 2.97707 3.98881 2.97767C4.05376 2.97795 4.11811 2.96555 4.17818 2.94118C4.23824 2.91681 4.29283 2.88095 4.33879 2.83568C4.38476 2.7904 4.42119 2.7366 4.44599 2.67737C4.47079 2.61814 4.48348 2.55465 4.48331 2.49056C4.48313 2.42669 4.47018 2.36349 4.44522 2.30456C4.42026 2.24564 4.38377 2.19215 4.33785 2.14715C4.29192 2.10215 4.23745 2.06654 4.17756 2.04233C4.11767 2.01813 4.05353 2.00581 3.98881 2.00609ZM5.33484 2.00609C5.20491 2.00669 5.08049 2.05796 4.9887 2.14871C4.8969 2.23946 4.84518 2.36234 4.84481 2.49056C4.84448 2.61924 4.89588 2.7428 4.98775 2.83412C5.07962 2.92544 5.20445 2.97707 5.33484 2.97767C5.39979 2.97795 5.46414 2.96555 5.52421 2.94118C5.58427 2.91681 5.63886 2.88095 5.68482 2.83568C5.73079 2.7904 5.76722 2.7366 5.79202 2.67737C5.81683 2.61814 5.82951 2.55465 5.82934 2.49056C5.82916 2.42669 5.81621 2.36349 5.79125 2.30456C5.76629 2.24564 5.7298 2.19215 5.68388 2.14715C5.63795 2.10215 5.58348 2.06654 5.52359 2.04233C5.4637 2.01813 5.39956 2.00581 5.33484 2.00609ZM1.64129 4.2778H15.3515V10.8991C15.3515 11.1412 15.1683 11.3219 14.9231 11.3219H10.4842L10.3923 11.166L11.9748 10.2702C12.0442 10.2311 12.102 10.1746 12.1424 10.1065C12.1828 10.0384 12.2044 9.9611 12.205 9.88221C12.2057 9.80332 12.1853 9.72564 12.146 9.65693C12.1067 9.58823 12.0499 9.53089 11.9811 9.49066L6.85047 6.50106C6.7806 6.46008 6.70093 6.43823 6.61966 6.43775C6.53839 6.43727 6.45846 6.45818 6.3881 6.49834C6.31839 6.53867 6.26077 6.59653 6.22109 6.66601C6.18142 6.73548 6.16113 6.8141 6.16228 6.89384L6.22119 11.3219H2.06974C1.82448 11.3219 1.6413 11.1411 1.6413 10.8991L1.64129 4.2778ZM7.08611 7.68669L10.8412 9.87383L9.53896 10.6093C9.4868 10.6388 9.44105 10.6782 9.40433 10.7252C9.36761 10.7722 9.34064 10.8258 9.32497 10.8831C9.3093 10.9404 9.30524 11.0001 9.31301 11.059C9.32078 11.1178 9.34023 11.1745 9.37026 11.2259L10.129 12.5137L9.60947 12.8071L8.8472 11.5149C8.78625 11.4127 8.68699 11.3383 8.57089 11.3078C8.45479 11.2773 8.3312 11.2932 8.22685 11.3519L7.14413 11.965L7.08611 7.68669Z" fill="#252F40"/>
</svg></SoftBox>)
}
VisitSite.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
  
export default VisitSite;