import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import Breadcrumbs from "examples/Breadcrumbs";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "components/common/Form";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Container,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Paper,
  Box,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
  ListItemText,
  Chip,
} from "@mui/material";
import SoftInput from "components/SoftInput";
function AddNewCustomer({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  let { t } = useTranslation("common");
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <Container sx={{ p: 2 }}>
          <Form
            component="form"
            childrenProps={{
              saveBtn: {
                //   onClick: handleSubmit,
                //   disabled: getsendemailproductResponce.isPending,
                children: "send Email",
              },
              closeBtn: {
                onClick: () => {
                  // setOpenDialog(null)
                  // handleClose()
                  // resetControls();
                },
                //   disabled: getsendemailproductResponce.isPending,
              },
              title: t("CustomerInfo"),
            }}
          >
            <SoftInput
              placeholder="Type here..."
              icon={{ component: "search", direction: "left" }}
            />
          </Form>
        </Container>
      </DashboardLayout>
    </>
  );
}

export default AddNewCustomer;
AddNewCustomer.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the AddNewCustomer
AddNewCustomer.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
