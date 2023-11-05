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
          <Stack sx={{ padding: 2, bgcolor: "#f8f8f9" }}>
            <Typography sx={{ fontWeight: "bold" }} {...childrenProps.title}>
              {childrenProps.title}
            </Typography>
            <Typography {...childrenProps.subtitle}>
              {childrenProps.subtitle}
            </Typography>
          </Stack>
       
        </>
      )}
      <Box
        sx={{
          display: sm ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            Boolean(minChildWidth) ? minChildWidth : sm ? "210px" : "310px"
          }, ${Boolean(maxChildWidth) ? maxChildWidth : "1fr"}))`,
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
            sx={{backgroundColor:"#510ab3",":hover":{backgroundColor:(theme)=>theme.palette.purple.middle},width:"50%"}}
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