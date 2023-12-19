import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
function CouponIcon({ color, size,onClick }) {
  return (    <SoftBox onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M11.8809 12.7676C12.3706 12.7676 12.7676 12.3706 12.7676 11.8809C12.7676 11.3912 12.3706 10.9942 11.8809 10.9942C11.3911 10.9942 10.9941 11.3912 10.9941 11.8809C10.9941 12.3706 11.3911 12.7676 11.8809 12.7676Z" fill="#3A416F" fillOpacity="0.5986"/>
  <path d="M8.11914 9.00592C8.60886 9.00592 9.00586 8.60892 9.00586 8.1192C9.00586 7.62948 8.60886 7.23248 8.11914 7.23248C7.62942 7.23248 7.23242 7.62948 7.23242 8.1192C7.23242 8.60892 7.62942 9.00592 8.11914 9.00592Z" fill="#3A416F" fillOpacity="0.5986"/>
  <path d="M19.0234 7.27386C19.1835 7.21266 19.3213 7.10454 19.4189 6.96368C19.5165 6.82282 19.5693 6.65577 19.5703 6.48441V5.33636C19.5703 5.03592 19.451 4.74779 19.2385 4.53535C19.0261 4.3229 18.7379 4.20355 18.4375 4.20355H15.9902C16.0172 4.24272 16.0317 4.28918 16.0316 4.33676V4.92269C16.0316 4.98485 16.0069 5.04447 15.963 5.08842C15.919 5.13237 15.8594 5.15707 15.7973 5.15707C15.7351 5.15707 15.6755 5.13237 15.6315 5.08842C15.5876 5.04447 15.5629 4.98485 15.5629 4.92269V4.33676C15.563 4.28914 15.5775 4.24268 15.6047 4.20355H4.39375C4.42089 4.24268 4.43547 4.28914 4.43555 4.33676V4.92269C4.43555 4.98485 4.41085 5.04447 4.3669 5.08842C4.32295 5.13237 4.26333 5.15707 4.20117 5.15707C4.13901 5.15707 4.0794 5.13237 4.03544 5.08842C3.99149 5.04447 3.9668 4.98485 3.9668 4.92269V4.33676C3.96676 4.28918 3.9812 4.24272 4.0082 4.20355H1.5625C1.26206 4.20355 0.973924 4.3229 0.761481 4.53535C0.549037 4.74779 0.429688 5.03592 0.429688 5.33636V6.48441C0.430421 6.65604 0.483044 6.82343 0.580644 6.9646C0.678245 7.10577 0.816259 7.21412 0.976562 7.27543C1.50729 7.48253 1.96314 7.84503 2.28444 8.31549C2.60575 8.78594 2.77754 9.34244 2.77734 9.91215C2.77717 10.4816 2.60521 11.0377 2.28394 11.5078C1.96266 11.978 1.50701 12.3403 0.976562 12.5473C0.816228 12.6084 0.678166 12.7167 0.58055 12.8578C0.482933 12.999 0.430338 13.1663 0.429688 13.3379V14.4844C0.429688 14.7849 0.549037 15.073 0.761481 15.2854C0.973924 15.4979 1.26206 15.6172 1.5625 15.6172H4.01992C3.98756 15.576 3.96996 15.5251 3.96992 15.4727V14.8868C3.96992 14.8246 3.99461 14.765 4.03857 14.721C4.08252 14.6771 4.14214 14.6524 4.2043 14.6524C4.26646 14.6524 4.32607 14.6771 4.37003 14.721C4.41398 14.765 4.43867 14.8246 4.43867 14.8868V15.4727C4.43852 15.5252 4.42078 15.576 4.38828 15.6172H15.6133C15.5808 15.576 15.563 15.5252 15.5629 15.4727V14.8868C15.5629 14.8246 15.5876 14.765 15.6315 14.721C15.6755 14.6771 15.7351 14.6524 15.7973 14.6524C15.8594 14.6524 15.919 14.6771 15.963 14.721C16.0069 14.765 16.0316 14.8246 16.0316 14.8868V15.4727C16.0316 15.5251 16.014 15.576 15.9816 15.6172H18.4375C18.7379 15.6172 19.0261 15.4979 19.2385 15.2854C19.451 15.073 19.5703 14.7849 19.5703 14.4844V13.3379C19.5697 13.1663 19.5171 12.999 19.4195 12.8578C19.3218 12.7167 19.1838 12.6084 19.0234 12.5473C18.4929 12.34 18.0372 11.9774 17.7159 11.507C17.3947 11.0366 17.2229 10.4802 17.2229 9.91058C17.2229 9.34095 17.3947 8.78457 17.7159 8.31415C18.0372 7.84374 18.4929 7.48118 19.0234 7.27386ZM4.43711 14.2993C4.43711 14.3614 4.41242 14.421 4.36846 14.465C4.32451 14.5089 4.26489 14.5336 4.20273 14.5336C4.14057 14.5336 4.08096 14.5089 4.03701 14.465C3.99305 14.421 3.96836 14.3614 3.96836 14.2993V13.7133C3.96836 13.6512 3.99305 13.5915 4.03701 13.5476C4.08096 13.5036 4.14057 13.4789 4.20273 13.4789C4.26489 13.4789 4.32451 13.5036 4.36846 13.5476C4.41242 13.5915 4.43711 13.6512 4.43711 13.7133V14.2993ZM4.43711 13.1274C4.43711 13.1895 4.41242 13.2492 4.36846 13.2931C4.32451 13.3371 4.26489 13.3618 4.20273 13.3618C4.14057 13.3618 4.08096 13.3371 4.03701 13.2931C3.99305 13.2492 3.96836 13.1895 3.96836 13.1274V12.5414C3.96836 12.4793 3.99305 12.4197 4.03701 12.3757C4.08096 12.3318 4.14057 12.3071 4.20273 12.3071C4.26489 12.3071 4.32451 12.3318 4.36846 12.3757C4.41242 12.4197 4.43711 12.4793 4.43711 12.5414V13.1274ZM4.43711 11.9555C4.43711 12.0177 4.41242 12.0773 4.36846 12.1212C4.32451 12.1652 4.26489 12.1899 4.20273 12.1899C4.14057 12.1899 4.08096 12.1652 4.03701 12.1212C3.99305 12.0773 3.96836 12.0177 3.96836 11.9555V11.3696C3.96836 11.3074 3.99305 11.2478 4.03701 11.2038C4.08096 11.1599 4.14057 11.1352 4.20273 11.1352C4.26489 11.1352 4.32451 11.1599 4.36846 11.2038C4.41242 11.2478 4.43711 11.3074 4.43711 11.3696V11.9555ZM4.43711 10.7836C4.43711 10.8458 4.41242 10.9054 4.36846 10.9494C4.32451 10.9933 4.26489 11.018 4.20273 11.018C4.14057 11.018 4.08096 10.9933 4.03701 10.9494C3.99305 10.9054 3.96836 10.8458 3.96836 10.7836V10.1977C3.96836 10.1355 3.99305 10.0759 4.03701 10.032C4.08096 9.98801 4.14057 9.96332 4.20273 9.96332C4.26489 9.96332 4.32451 9.98801 4.36846 10.032C4.41242 10.0759 4.43711 10.1355 4.43711 10.1977V10.7836ZM4.43711 9.61176C4.43711 9.67392 4.41242 9.73353 4.36846 9.77748C4.32451 9.82144 4.26489 9.84613 4.20273 9.84613C4.14057 9.84613 4.08096 9.82144 4.03701 9.77748C3.99305 9.73353 3.96836 9.67392 3.96836 9.61176V9.02582C3.96836 8.96366 3.99305 8.90404 4.03701 8.86009C4.08096 8.81614 4.14057 8.79144 4.20273 8.79144C4.26489 8.79144 4.32451 8.81614 4.36846 8.86009C4.41242 8.90404 4.43711 8.96366 4.43711 9.02582V9.61176ZM4.43711 8.43988C4.43711 8.50204 4.41242 8.56165 4.36846 8.60561C4.32451 8.64956 4.26489 8.67426 4.20273 8.67426C4.14057 8.67426 4.08096 8.64956 4.03701 8.60561C3.99305 8.56165 3.96836 8.50204 3.96836 8.43988V7.85394C3.96836 7.79178 3.99305 7.73217 4.03701 7.68821C4.08096 7.64426 4.14057 7.61957 4.20273 7.61957C4.26489 7.61957 4.32451 7.64426 4.36846 7.68821C4.41242 7.73217 4.43711 7.79178 4.43711 7.85394V8.43988ZM4.43711 7.26801C4.43711 7.33017 4.41242 7.38978 4.36846 7.43373C4.32451 7.47769 4.26489 7.50238 4.20273 7.50238C4.14057 7.50238 4.08096 7.47769 4.03701 7.43373C3.99305 7.38978 3.96836 7.33017 3.96836 7.26801V6.68207C3.96836 6.61991 3.99305 6.56029 4.03701 6.51634C4.08096 6.47239 4.14057 6.44769 4.20273 6.44769C4.26489 6.44769 4.32451 6.47239 4.36846 6.51634C4.41242 6.56029 4.43711 6.61991 4.43711 6.68207V7.26801ZM4.43711 6.09613C4.43711 6.15829 4.41242 6.2179 4.36846 6.26186C4.32451 6.30581 4.26489 6.33051 4.20273 6.33051C4.14057 6.33051 4.08096 6.30581 4.03701 6.26186C3.99305 6.2179 3.96836 6.15829 3.96836 6.09613V5.51019C3.96836 5.44803 3.99305 5.38842 4.03701 5.34446C4.08096 5.30051 4.14057 5.27582 4.20273 5.27582C4.26489 5.27582 4.32451 5.30051 4.36846 5.34446C4.41242 5.38842 4.43711 5.44803 4.43711 5.51019V6.09613ZM6.99219 6.99222C7.21535 6.76906 7.49968 6.61708 7.80921 6.55551C8.11875 6.49393 8.4396 6.52553 8.73117 6.6463C9.02275 6.76708 9.27197 6.9716 9.44731 7.23402C9.62265 7.49643 9.71624 7.80494 9.71624 8.12054C9.71624 8.43615 9.62265 8.74466 9.44731 9.00707C9.27197 9.26949 9.02275 9.47401 8.73117 9.59479C8.4396 9.71556 8.11875 9.74716 7.80921 9.68558C7.49968 9.62401 7.21535 9.47203 6.99219 9.24887C6.84397 9.10072 6.72639 8.92482 6.64617 8.73122C6.56596 8.53762 6.52467 8.33011 6.52467 8.12054C6.52467 7.91098 6.56596 7.70347 6.64617 7.50987C6.72639 7.31627 6.84397 7.14037 6.99219 6.99222ZM7.10938 12.8938C7.07574 12.8603 7.04905 12.8205 7.03084 12.7766C7.01262 12.7328 7.00325 12.6858 7.00325 12.6383C7.00325 12.5908 7.01262 12.5438 7.03084 12.5C7.04905 12.4562 7.07574 12.4163 7.10938 12.3828L12.3828 7.10941C12.4515 7.04895 12.5407 7.01688 12.6321 7.01971C12.7236 7.02255 12.8106 7.06006 12.8754 7.12466C12.9403 7.18925 12.9781 7.27608 12.9813 7.36755C12.9845 7.45902 12.9528 7.54828 12.8926 7.61722L7.61719 12.8926C7.54966 12.9596 7.4584 12.9972 7.36328 12.9972C7.26817 12.9972 7.1769 12.9596 7.10938 12.8926V12.8938ZM13.0078 13.0078C12.7847 13.231 12.5003 13.383 12.1908 13.4446C11.8812 13.5061 11.5604 13.4745 11.2688 13.3538C10.9772 13.233 10.728 13.0285 10.5527 12.7661C10.3774 12.5036 10.2838 12.1951 10.2838 11.8795C10.2838 11.5639 10.3774 11.2554 10.5527 10.993C10.728 10.7306 10.9772 10.5261 11.2688 10.4053C11.5604 10.2845 11.8812 10.2529 12.1908 10.3145C12.5003 10.3761 12.7847 10.528 13.0078 10.7512C13.156 10.8994 13.2736 11.0753 13.3538 11.2689C13.434 11.4625 13.4753 11.67 13.4753 11.8795C13.4753 12.0891 13.434 12.2966 13.3538 12.4902C13.2736 12.6838 13.156 12.8597 13.0078 13.0078ZM16.0305 14.2969C16.0305 14.3591 16.0058 14.4187 15.9618 14.4626C15.9179 14.5066 15.8583 14.5313 15.7961 14.5313C15.7339 14.5313 15.6743 14.5066 15.6304 14.4626C15.5864 14.4187 15.5617 14.3591 15.5617 14.2969V13.711C15.5617 13.6488 15.5864 13.5892 15.6304 13.5452C15.6743 13.5013 15.7339 13.4766 15.7961 13.4766C15.8583 13.4766 15.9179 13.5013 15.9618 13.5452C16.0058 13.5892 16.0305 13.6488 16.0305 13.711V14.2969ZM16.0305 13.125C16.0305 13.1872 16.0058 13.2468 15.9618 13.2908C15.9179 13.3347 15.8583 13.3594 15.7961 13.3594C15.7339 13.3594 15.6743 13.3347 15.6304 13.2908C15.5864 13.2468 15.5617 13.1872 15.5617 13.125V12.5391C15.5617 12.4769 15.5864 12.4173 15.6304 12.3734C15.6743 12.3294 15.7339 12.3047 15.7961 12.3047C15.8583 12.3047 15.9179 12.3294 15.9618 12.3734C16.0058 12.4173 16.0305 12.4769 16.0305 12.5391V13.125ZM16.0305 11.9532C16.0305 12.0153 16.0058 12.0749 15.9618 12.1189C15.9179 12.1628 15.8583 12.1875 15.7961 12.1875C15.7339 12.1875 15.6743 12.1628 15.6304 12.1189C15.5864 12.0749 15.5617 12.0153 15.5617 11.9532V11.3672C15.5617 11.3051 15.5864 11.2454 15.6304 11.2015C15.6743 11.1575 15.7339 11.1328 15.7961 11.1328C15.8583 11.1328 15.9179 11.1575 15.9618 11.2015C16.0058 11.2454 16.0305 11.3051 16.0305 11.3672V11.9532ZM16.0305 10.7813C16.0305 10.8434 16.0058 10.9031 15.9618 10.947C15.9179 10.991 15.8583 11.0157 15.7961 11.0157C15.7339 11.0157 15.6743 10.991 15.6304 10.947C15.5864 10.9031 15.5617 10.8434 15.5617 10.7813V10.1953C15.5617 10.1332 15.5864 10.0736 15.6304 10.0296C15.6743 9.98567 15.7339 9.96097 15.7961 9.96097C15.8583 9.96097 15.9179 9.98567 15.9618 10.0296C16.0058 10.0736 16.0305 10.1332 16.0305 10.1953V10.7813ZM16.0305 9.60941C16.0305 9.67157 16.0058 9.73119 15.9618 9.77514C15.9179 9.81909 15.8583 9.84379 15.7961 9.84379C15.7339 9.84379 15.6743 9.81909 15.6304 9.77514C15.5864 9.73119 15.5617 9.67157 15.5617 9.60941V9.02347C15.5617 8.96131 15.5864 8.9017 15.6304 8.85775C15.6743 8.81379 15.7339 8.7891 15.7961 8.7891C15.8583 8.7891 15.9179 8.81379 15.9618 8.85775C16.0058 8.9017 16.0305 8.96131 16.0305 9.02347V9.60941ZM16.0305 8.43754C16.0305 8.4997 16.0058 8.55931 15.9618 8.60326C15.9179 8.64722 15.8583 8.67191 15.7961 8.67191C15.7339 8.67191 15.6743 8.64722 15.6304 8.60326C15.5864 8.55931 15.5617 8.4997 15.5617 8.43754V7.8516C15.5617 7.78944 15.5864 7.72982 15.6304 7.68587C15.6743 7.64192 15.7339 7.61722 15.7961 7.61722C15.8583 7.61722 15.9179 7.64192 15.9618 7.68587C16.0058 7.72982 16.0305 7.78944 16.0305 7.8516V8.43754ZM16.0305 7.26566C16.0305 7.32782 16.0058 7.38744 15.9618 7.43139C15.9179 7.47534 15.8583 7.50004 15.7961 7.50004C15.7339 7.50004 15.6743 7.47534 15.6304 7.43139C15.5864 7.38744 15.5617 7.32782 15.5617 7.26566V6.67972C15.5617 6.61756 15.5864 6.55795 15.6304 6.514C15.6743 6.47004 15.7339 6.44535 15.7961 6.44535C15.8583 6.44535 15.9179 6.47004 15.9618 6.514C16.0058 6.55795 16.0305 6.61756 16.0305 6.67972V7.26566ZM16.0305 6.09379C16.0305 6.15595 16.0058 6.21556 15.9618 6.25951C15.9179 6.30347 15.8583 6.32816 15.7961 6.32816C15.7339 6.32816 15.6743 6.30347 15.6304 6.25951C15.5864 6.21556 15.5617 6.15595 15.5617 6.09379V5.50785C15.5617 5.44569 15.5864 5.38607 15.6304 5.34212C15.6743 5.29817 15.7339 5.27347 15.7961 5.27347C15.8583 5.27347 15.9179 5.29817 15.9618 5.34212C16.0058 5.38607 16.0305 5.44569 16.0305 5.50785V6.09379Z" fill="#3A416F"/>
</svg></SoftBox >)}

CouponIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
};
export default CouponIcon