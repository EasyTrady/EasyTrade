


// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import SoftSelectRoot from "./SoftSelectRoot";
import { forwardRef } from "react";

// Custom styles for SoftButton


const SoftSelect = 
forwardRef( ({ color, variant, size, circular, iconOnly, children, ...rest },ref) => (
    <SoftSelectRoot
      {...rest}
     ref={ref}
      color="primary"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </SoftSelectRoot>
  )
)
SoftSelect.defaultProps = {
    size: "medium",
    variant: "contained",
    color: "white",
    circular: false,
    iconOnly: false,
  };
  
  // Typechecking props for the SoftSelect
  SoftSelect.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
    color: PropTypes.oneOf([
      "white",
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    circular: PropTypes.bool,
    iconOnly: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };
  
  export default SoftSelect;
  