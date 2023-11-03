import { Box, Card, Typography } from "@mui/material";
import input from "assets/theme/components/form/input";
import NumberField from "components/common/NumberFeild";
import useControls from "hooks/useControls";
import React from "react";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import DatePickerField from "components/common/DatePicker";
import ImageBox from "components/common/imageBox";
import PictureField from "components/common/PictureField";
import ImagesAlbums from "components/common/ImagesAlbums";
import AddIcon from "@mui/icons-material/Add";
const AddProductFetures = () => {
  // add status of fields
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "image", value: "", isRequired: true },
    {
      control: "discount",
      value: "",
      isRequired: true,
    },
    {
      control: "purchase_price",
      value: "",
      isRequired: true,
    },
    {
      control: "shipping_price",
      value: "",
      isRequired: true,
    },
    {
      control: "gtn",
      value: "",
      isRequired: true,
    },
    { control: "mpn", value: "", isRequired: true },
    { control: "countries", value: [], isRequired: true },
    { control: "main_image", value: {}, isRequired: true },
    { control: "product_images", value: [], isRequired: true },
  ]);
  console.log(controls.product_images);
  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px, 24px, 12px, 24px",
          height: "50px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: 300,
            lineHeight: "20px",
            letterSpacing: "0em",
            textAlign: "left",
            color: "#626C70",
          }}
        >
          Note : Maximum 12 photo
        </Typography>
        <Box sx={{ borderRadius: "50%", background: "#F0F6FF" }}>
          <AddIcon />
        </Box>
      </Box>
      {/* <ImageBox main_image={controls.main_image} onChange={(e) => setControl("main_image", e)} />

      <ImagesAlbums
        value={controls.product_images}
        onChange={(e) => setControl("product_images", e)}
      /> */}
    </Box>
  );
};

export default AddProductFetures;
