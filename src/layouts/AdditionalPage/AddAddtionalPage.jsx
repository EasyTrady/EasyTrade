/* eslint-disable react/prop-types */
import { Box, CircularProgress, Container, MenuItem, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import AddProductTitle from "components/common/AddProductTitle";
import { VIEWADDTIONPAGE } from "data/api";
import Breadcrumbs from "examples/Breadcrumbs";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import useControls from "hooks/useControls";
import useRequest from "hooks/useRequest";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import filter from "utils/ClearNull";
import TwoArrow from "examples/Icons/TwoArrow";
import SelectField from "components/common/SelectField";
import ReactQuill from "react-quill";
const AddAddtionalPage = ({ absolute, light, isMini }) => {
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let Token = localStorage.getItem("token");
  let { t } = useTranslation("common");
  let navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "title", value: "", isRequired: false },
    { control: "english_title", value: "", isRequired: false },
    { control: "type", value: "", isRequired: false },
    { control: "size_guide", value: "", isRequired: false },
    { control: "description", value: "", isRequired: false },
  ]);
  const pageTypes = [
    { id: 1, title: "general" },
    { id: 2, title: "Privacy policy" },
    { id: 3, title: "About us" },
    { id: 4, title: "Size guide" },
  ];
  const [AddtionPageGetRequest, AddtionPageGetResponce] = useRequest({
    path: VIEWADDTIONPAGE,
    method: "POST",
    Token: `Token ${Token}`,
  });
  function handleSubmit() {
    validate().then((output) => {
      console.log(output);
      if (!output.isOk) return;
      AddtionPageGetRequest({
        body: filter({
          obj: {
            title: controls.title,
            type: controls.type,
            size_guide: controls.size_guide,
            description: controls.description,
          },
          output: "object",
        }),
        onSuccess: (res) => {
          resetControls("");
          navigate(`/${sub_domain}/dashboard/additionalpage`);
        },
      }).then((res) => {
        let response = res?.response?.data;
        console.log(res);
        // const responseBody = filter({
        //   obj: {
        //     name: response?.name?.join(""),
        //     quantity: response?.quantity?.join(" "),
        //
        //   },
        //   output: "object",
        // });

        // setInvalid(responseBody);
      });
    });
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container sx={{ p: 2 }}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <Box sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", pb: 4 }}>
          <AddProductTitle title={"Basic info"} />
          <Container>
  <SoftBox
    py={"20px"}
    display="flex"
    flexDirection="column"
    gap={"20px"}
    sx={{ width: "100%", height: "100%", position: "relative" }}
  >
    <SoftInput
      placeholder={
        controls.type === "general"
          ? "Arabic name..."
          : controls.type
          ? `${controls.type}`
          : "Choose page type first"
      }
      sx={{
        ".MuiInputBase-root": {
          border: `1px solid !important`,
          borderColor: (theme) =>
            theme.palette.grey[400] + "!important",
        },
      }}
      value={controls.title}
      onChange={(e) => setControl("title", e.target.value)}
      required={required.includes("title")}
      error={Boolean(invalid?.title)}
      helperText={invalid?.title}
      disabled={controls.type !== "general" ? true : false}
    />
    <SoftButton
      sx={{
        width: "max-content",
        padding: "5px",
        borderRadius: "50%",
        minWidth: "max-content",
        minHeight: "max-content",
        position: "absolute",
        left: "90%",
        top: "3.5rem",
        zIndex: 1,
      }}
      onClick={() => {
        let copyName = controls.english_title;
        setControl("english_title", controls.title);
        setControl("title", copyName);
      }}
    >
      <TwoArrow color={"#959FA3"} size={"16"} />
    </SoftButton>
    <SoftInput
      placeholder="English name"
      sx={{
        ".MuiInputBase-root": {
          border: `1px solid !important`,
          borderColor: (theme) =>
            theme.palette.grey[400] + "!important",
        },
      }}
      value={controls.english_title}
      onChange={(e) => setControl("english_title", e.target.value)}
      required={required.includes("english_title")}
      error={Boolean(invalid?.english_title)}
      helperText={invalid?.english_title}
    />

    <SelectField
      variant="outlined"
      placeholder="Choose page type"
      label="Choose page type*"
      value={controls.type}
      onChange={(e) => setControl("type", e.target.value)}
      required={required.includes("type")}
      textHelper={controls.type}
      error={Boolean(invalid.type)}
      helperText={invalid.type}
      sx={{ width: "100%", fontSize: "14px", background: "#fff" }}
    >
      {pageTypes?.map((type, index) => (
        <MenuItem key={`${type.id} ${index}`} value={type.title}>
          {type.title}
        </MenuItem>
      ))}
    </SelectField>
    <SoftBox sx={{ mb: "24px" }}>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: " 20px",
          letterSpacing: "0em",
          textAlign: "left",
        }}
      >
        Description
      </Typography>
      <ReactQuill
        theme="snow"
        value={controls.description}
        onChange={(e) => setControl("description", e)}
        placeholder="Typing the description of the page."
        onBlur={(e) => validate({ content: e.index })}
        modules={modules}
        style={{ height: "218px" }}
      />
    </SoftBox>
  </SoftBox>
</Container>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: "24px" }}>
          <SoftButton
            variant="contained"
            color="white"
            sx={{ mx: "20px", width: { md: "25%", xs: "50px" } }}
            onClick={() => {
              resetControls();
              navigate(`/${sub_domain}/dashboard/additionalpage`);
            }}
          >
            {"cancel"}
          </SoftButton>
          <SoftButton
            type="submit"
            variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
              width: { md: "25%", xs: "50px" },
              textTransform: "none",
            }}
            onClick={handleSubmit}
          >
            {AddtionPageGetResponce.isPending ? (
              <>
                <CircularProgress />
                loading
              </>
            ) : (
              "Add page"
            )}
          </SoftButton>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AddAddtionalPage;
