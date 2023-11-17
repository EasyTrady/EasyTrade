/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";
import AddProductTitle from "./AddProductTitle";
import Image from "../../assets/images/Image.png";
function PictureField({ accept, label, placeholder, onChange, value,productName,categories,description, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {}, [value]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: "8px" }}>
      <AddProductTitle title={"Product main image*"} />
      <Container sx={{ mt: "24px", mb: "18px" }}>
        <Grid item>
          <Grid container >
            <Grid item md={4}>
              {value > 0? (
                <Box style={{ width: "286px", height: "186px" }} onClick={() => ref.current.click()}>
                  <img src={value} style={{ width: "100%" }} />
                </Box>
              ) : (
                <Box sx={{position:'relative'}}>
                  <img src={Image} alt="image" style={{ width: "286px", height: "186px" }} />
                  <Button
                sx={{
                  width: "180px",
                  position:'absolute',
                  bottom:'8px',
                  left:"15%",
                  padding: "0px 24px 0px 24px",
                  borderRadius: "12px",
                  gap: "8px",
                  background: "#FDEDED",
                  textTransform: "none",
                  my: "5px",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "40px",
                  letterSpacing: "0em",
                  color: "#E84646",
                  opacity:0.5,
                  ":hover": {
                    color: "#E84646 !important",
                    background: "#FDEDED",
                    opacity:0.9
                  },
                }}
                onClick={() => ref.current.click()}
              >
                Remove Main image
              </Button>
                  <input
                    type="file"
                    accept={accept}
                    multiple={true}
                    ref={ref}
                    onChange={(e) => {
                      //   setValue(e.target.files);
                      onChange(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item md={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  gap: "10px",
                }}
              >
                <Box sx={{display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "row",gap:'10px'}}>
                {categories.map((cat)=>(
                <Box key={cat}  sx={{width: 'fit-content',p:1,
                borderRadius:'8px',
                  height: '24px',background:'#FFE5D3',fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 400,
                  lineHeight: '15px',
                  letterSpacing: '0px',
                  textAlign: 'center',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                  
                  }}>{cat}</Box>
              ))}
              </Box>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    color:'#191B1C'
                  }}
                >
                  {productName}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0px",
                    color:'#191B1C',
                    opacity:0.3
                  }}
                  dangerouslySetInnerHTML={{__html:description}}
                >
                 
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PictureField;
PictureField.propTypes = {
  accept: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
};
