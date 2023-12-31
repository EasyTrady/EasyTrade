import React from "react";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SoftButton from "components/SoftButton";

import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const Form = ({
  title = "مرحباً بك!",
  subtitle = "قم بملئ الحقول للحصول على النتائج المطلوبة",
  hideHeader = false,
  hideFooter = false,
  maxChildWidth = null,
  minChildWidth = null,
  childrenProps = {
    title: {},
    subtitle: {},
    saveBtn: {},
    closeBtn: {},
  },
  children,
  sx = {},
  onSubmit = () => {},
  ...props
}) => {
  // Ghange lang
  

  ///////////////////
  const sm = useMediaQuery("(max-width: 768px)");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Paper sx={{ ...sx }} onSubmit={handleSubmit} noValidate {...props}>
      {!Boolean(hideHeader) && (
        <>
          <Stack sx={{padding: 2, bgcolor:(theme)=>theme.palette.white.main,borderRadius:"8px",borderBottom:"2px solid #E5E7E8",display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
            <Typography sx={{ fontWeight: "bold" ,fontSize:"16px"}} {...childrenProps.title}>
              {childrenProps.title}
            </Typography>
            <Typography sx={{fontSize:"14px"}}{...childrenProps.subtitle}>
              {childrenProps.subtitle}
            </Typography>
          </Stack>
       
        </>
      )}
      <Box
        sx={{
          display: sm ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: `repeat(auto-fit, minmax("1fr"}))`,
          rowGap: "10px",
          columnGap: "10%",
          p: 2,
        }}
      >
        {children}
      </Box>
      {!Boolean(hideFooter) && (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ padding: 2, bgcolor: "#fffaff" }}
        >
    
          <SoftButton variant="contained" color="white" {...childrenProps.closeBtn}sx={{width:"50%"}}>
            {Boolean(childrenProps.closeBtn?.children)
              ? childrenProps.closeBtn.children
              : "cancel"}
          </SoftButton>
          <SoftButton
            variant="contained"
            type="submit"
            color="dark"
            sx={{backgroundColor:(theme)=>theme.palette.purple.middle,":hover":{backgroundColor:(theme)=>theme.palette.purple.middle},width:"50%"}}
            {...childrenProps.saveBtn}
          >
            {Boolean(childrenProps.saveBtn?.children)
              ? childrenProps.saveBtn.children
              : "save"}
          </SoftButton>
        </Stack>
      )}
    </Paper>
  );
};

export default Form;
Form.propTypes={
  title :PropTypes.string,
  subtitle :PropTypes.string,
  hideHeader :PropTypes.bool,
  hideFooter :PropTypes.bool,
  maxChildWidth :PropTypes.object,
  minChildWidth :PropTypes.object,
  childrenProps : {
    title :PropTypes.string,
    subtitle :PropTypes.string,
    saveBtn: PropTypes.object,
    closeBtn: PropTypes.object,
  },
  children:PropTypes.object,
  sx :PropTypes.object,
  onSubmit :PropTypes.func,
  

}