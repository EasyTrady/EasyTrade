/* eslint-disable react/prop-types */
import { Box, Card, Icon, Typography } from "@mui/material";
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
import SoftButton from "components/SoftButton";
import useRequest from "hooks/useRequest";
import { PRODUCTS } from "data/api";
import filter from "utils/ClearNull";
const AddProductFetures = ({id}) => {
  let Token = localStorage.getItem("token");
  const [AddProductImagesRequest, AddProductImagesResponce] = useRequest({
    path: PRODUCTS+8+'/images/',
    method: "post",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  // add status of fields
  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "image", value: [], isRequired: false },
  ]);
  function handleSubmit() {
    
    validate().then((output) => {
      console.log(output);
      if (!output.isOk) return;
      AddProductImagesRequest({
        body: filter({
          obj: {
            image: controls?.image,
          },
          output: "formData",
        }),
        onSuccess: (res) => {
          console.log(res.data, controls);
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
        resetControls("");
      });
    });
  }
  
  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',gap:2}}>
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 ,bgcolor:'#fff'}}>
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
        <Box sx={{ borderRadius: "100px", background: "#F0F6FF",padding: '5px',display:'flex',alignItem:'center',justifyContent:'center' }}
        onClick={() => {
          document.getElementById("profile_image").click();
        }}
        >
          <AddIcon />
        </Box>
      </Box>
      <ImageBox main_image={controls.image} onChange={(e) => setControl("image", e)} />

      {/* <ImagesAlbums
        value={controls.product_images}
        onChange={(e) => setControl("product_images", e)}
      /> */}
    </Box>
    <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
      <SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            },width: '260px'
                        }}
                        onClick={handleSubmit}
                    >
                        Next
                    </SoftButton>
    </Box>
    </Box>
  );
};

export default AddProductFetures;
