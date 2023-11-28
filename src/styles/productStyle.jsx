import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";

export const ProductInput = styled(TextField)({
  border: "none",
  width: "100%",
  ".MuiInputBase-input": {
    background: "transparent",
  },
});
export const ButtonSave = styled(Button)({
  border: "none",
  width: "100%",
  height: "50px",
  // color:'#fff',
  bgcolor: "#5D449B",
});
export const ButtonImage = styled(Button)({
  border: "none",
  width: "100%",
  height: "60px",
  // color:'#fff',
  backgroundColor: "gray",
});
export const MainButton = styled(Button)({
  border: "none",
  background: "#5D449B",

  color: "#fff",
  width: "217px",
  height: "48px",
  padding: "7px 16px 7px 16px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 400,
  gap: "8px",
  ":hover": {
    background: "#5D449B",
  },
});
export const PrintButton = styled(Button)({
  width: "113px",
  height: "48px",
  // padding: '4px 12px 4px 16px',
  borderRadius: "12px",
  border: "1px",
  gap: "6px",
  fontSize: "14px",
  fontWeight: 400,
  background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
  color: "#121212",
  fontSize: "14px",
  ":hover": {
    background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
    color: "#121212",
  },
});
export const UploadButton = styled(Button)({
  width: "100%",
  height: "40px",
  padding: "0px 24px 0px 24px",
  borderRadius: "12px",
  gap: " 8px",
  border: "1.5px solid #5D449B",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",
  color: "#5D449B",
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  ":hover":{
    color:"#5D449B",
  }
});
export const CircleBanner = styled(Box)({
  boxShadow:
    "rgb(85, 91, 255) 0px 0px 0px 3px,rgb(31, 193, 27) 0px 0px 0px 6px,rgb(255, 217, 19) 0px 0px 0px 9px,rgb(255, 156, 85) 0px 0px 0px 12px,rgb(255, 85, 85) 0px 0px 0px 15px",
  width: "75px",
  height: "75px",
  borderRadius: "8px",
  border: "3px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: "0em",
  textAlign: "center",
});
export const RectangleBanner = styled(Box)({
  boxShadow:
    "rgb(85, 91, 255) 0px 0px 0px 3px,rgb(31, 193, 27) 0px 0px 0px 6px,rgb(255, 217, 19) 0px 0px 0px 9px,rgb(255, 156, 85) 0px 0px 0px 12px,rgb(255, 85, 85) 0px 0px 0px 15px",
  height:"74px",
  width:'324px',
    // padding: '38px 102px 38px 102px',
    borderRadius: '8px',
    border: '3px',
    gap: '10px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: "0em",
  textAlign: "center",
});
export const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
  },
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#5D449B",
  backgroundImage: "#5D449B",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#5D449B",
  },
});
