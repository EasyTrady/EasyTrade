import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import {Box,Stack} from "@mui/material"
import PropTypes from "prop-types";

function CardDevice({icon,title,range,user}) {
  return ( <Box sx={{display:"flex",gap:"20px",alignItems:"center"}}>
    <SoftBox sx={{backgroundColor:(theme)=>theme.palette.purple.hover,padding:"24px",borderRadius:"50%",display:"flex"}}>
                  {icon}
                  </SoftBox>
                  <SoftBox >
                  <SoftTypography component={"p"} sx={{fontSize:"16px"}}>
                  {title}
                  </SoftTypography>
                  <SoftBox sx={{display:"flex",justifyContent:"space-arround"}}>
                  <SoftTypography component={"span"} sx={{color:(theme)=>theme.palette.grey[500],fontSize:"14px",mx:1}}>
                  {range}
                  </SoftTypography>
                  <SoftTypography component={"span"} sx={{color:(theme)=>theme.palette.grey[500],fontSize:"14px"}}>
                  {user}
                  </SoftTypography>
                  </SoftBox>
                  </SoftBox></Box>
  )
}
export default CardDevice

  
  // Typechecking props for the CardDevice
  CardDevice.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    range: PropTypes.string,
    user: PropTypes.string,

  };