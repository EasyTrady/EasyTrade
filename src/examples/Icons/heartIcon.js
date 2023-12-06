import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
function HeartIcon({ color, size,onClick }) {
  return ( 
    <SoftBox onClick={onClick}>
<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
<path d="M1.47887 0.339844C1.10505 0.386719 0.792155 0.540234 0.527311 0.807422C0.289421 1.04648 0.146452 1.29961 0.0644205 1.62891C-0.080892 2.19961 0.0245768 2.76211 0.373796 3.29062C0.597624 3.6293 0.887077 3.93984 1.41794 4.41328C1.75544 4.71445 2.78551 5.59336 2.83591 5.62266C2.88278 5.65078 2.90036 5.6543 2.99997 5.6543C3.09958 5.6543 3.11716 5.65078 3.16403 5.62266C3.21442 5.59336 4.24684 4.71328 4.582 4.41328C5.1152 3.9375 5.40231 3.62812 5.62614 3.29062C5.97536 2.76211 6.08083 2.19961 5.93551 1.62891C5.85348 1.29961 5.71051 1.04648 5.47262 0.807422C5.23591 0.569531 4.98278 0.432422 4.65114 0.362109C4.48473 0.326953 4.1777 0.323437 4.03239 0.35625C3.62692 0.44414 3.31637 0.646875 3.03278 1.00781L2.99997 1.04883L2.96833 1.00781C2.68825 0.653906 2.38239 0.451172 1.99215 0.362109C1.87614 0.335156 1.60895 0.323437 1.47887 0.339844ZM1.87028 0.697266C2.20309 0.755859 2.4902 0.948047 2.71755 1.26562C2.75622 1.3207 2.80426 1.38633 2.82301 1.41328C2.90973 1.53516 3.0902 1.53516 3.17692 1.41328C3.19567 1.38633 3.24372 1.3207 3.28239 1.26562C3.59294 0.832031 4.02536 0.628125 4.49645 0.692578C5.01911 0.764062 5.42692 1.12969 5.58278 1.66758C5.70583 2.09297 5.65192 2.53945 5.42809 2.94141C5.24059 3.27773 4.9277 3.63047 4.38278 4.11914C4.11911 4.35469 3.01051 5.30859 2.99997 5.30859C2.98825 5.30859 1.88434 4.3582 1.61715 4.11914C0.779264 3.36797 0.448796 2.89922 0.369108 2.34961C0.317546 1.99453 0.391374 1.6125 0.570671 1.31133C0.840202 0.857812 1.3652 0.609375 1.87028 0.697266Z" fill="#7F7F7F"/>
</svg>
</SoftBox>
  )
}
HeartIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default HeartIcon