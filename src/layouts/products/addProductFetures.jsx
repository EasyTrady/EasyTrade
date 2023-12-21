/* eslint-disable react/prop-types */
import { Box, Card, Icon, Typography } from "@mui/material";
import input from "assets/theme/components/form/input";
import NumberField from "components/common/NumberFeild";
import useControls from "hooks/useControls";
import React,{useEffect} from "react";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import DatePickerField from "components/common/DatePicker";
import ImageBox from "components/common/imageBox";
import PictureField from "components/common/PictureField";
import ImagesAlbums from "components/common/ImagesAlbums";
import AddIcon from "@mui/icons-material/Add";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import useRequest from "hooks/useRequest";
import { PRODUCTS } from "data/api";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import filter from "utils/ClearNull";
const AddProductFetures = ({handleChange}) => {
  let Token = localStorage.getItem("token");
 let idProduct= localStorage.getItem('productId');
//  let productIdEdit= localStorage.getItem('productIdEdit');

 let products=useSelector((state)=>state.products.value)
  const [AddProductImagesRequest, AddProductImagesResponce] = useRequest({
    path: PRODUCTS,
    method: "post",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  // add status of fields

  const [{ controls, invalid, required }, { setControl, resetControls, validate }] = useControls([
    { control: "images", value: [], isRequired: false },
    { control: "reviewImages", value: [], isRequired: false },

  ]);
  function handleSubmit() {
    
    validate().then((output) => {

      if (!output.isOk) return;
      if(Boolean(controls?.images)){
        AddProductImagesRequest({
          id:idProduct+'/images',
          body: filter({
            obj: {
              image: [...controls?.reviewImages],
            },
            output: "formData",
          }),
          onSuccess: (res) => {
            handleChange(undefined,2,res.data.id)
            
            if(index===2){
              return value===index
            }
          }
        }).then((res) => {
          let response = res?.response?.data;
          
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
      }else{
        handleChange(undefined,2,idProduct)
      }
     
    });
  }
  const [getProductRequest, getProductResponce] = useRequest({
    path: PRODUCTS,
    method: "get",
    Token: `Token ${Token}`,
    // contentType: "multipart/form-data",
  });
  useEffect(() => {
    // jobRequest({
    //     onSuccess: (res) => {
    //         dispatch({ type: "job/set", payload: res.data })
    //     }
    // })
    if(Boolean(idProduct)){
      getProductRequest({
        id:idProduct,
        onSuccess:(res)=>{
          // setProduct(res.data)
          // setControl("images",[...res.data.images])
          Object.entries(res.data)?.forEach(([key,value])=> Object.keys(controls).includes(key)? setControl(key,value):null)

        }
      })
        // Object.entries(state?.dataRow)?.forEach(([key,value])=>setControl(key,value))

    }
    // setControl()
   
}, [idProduct])
useEffect(()=>{
 
},[controls.images])

  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',gap:2}}>
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 ,bgcolor:'#fff'}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px, 24px, 12px, 24px",
          height: "50px",
          alignItems:"center"
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
      <ImageBox main_image={controls?.images} onChange={(e) => Array.isArray(e)==false&&setControl("reviewImages",e)} />

      {/* <ImagesAlbums
        value={controls.product_images}
        onChange={(e) => setControl("product_images", e)}
      /> */}
    </Box>
    <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
    <SoftButton variant="contained" color="white"sx={{mx:"20px"}} onClick={() =>{resetControls(); handleChange(undefined,2,idProduct)}}>
                        {"skip"}
                    </SoftButton>
      <SoftButton variant="gradient"
        disabled={AddProductImagesResponce.isPending}
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            },width: '260px'
                        }}
                        onClick={handleSubmit}
                    >
                       {AddProductImagesResponce.isPending?<><CircularProgress />loading</>:"Next"}
                    </SoftButton>

    </Box>
    <Footer />

    </Box>
  );
};

export default AddProductFetures;
