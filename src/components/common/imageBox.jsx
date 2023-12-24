import { Box, Button, Typography } from "@mui/material";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import React,{useEffect} from "react";
import PropTypes from "prop-types";
import productImage from "../../assets/images/ivana-square.jpg";
import image from '../../assets/images/icons/image.svg'
import useRequest from "hooks/useRequest";
import { PRODUCTS } from "data/api";
import { Alert } from "@mui/material";
import usePermission from 'utils/usePermission';
// eslint-disable-next-line react/prop-types
const ImageBox = ({ main_image, onChange }) => {
  const [mainImages, setMainImages] = React.useState([]);
  const [alert, setAlert] = React.useState("");
  let {isPermitted}=usePermission()
  let idProduct= localStorage.getItem('productId');
  let Token = localStorage.getItem("token");
  const [deleteProductImagesRequest,deleteProductImagesResponce] = useRequest({
    path: PRODUCTS,
    method: "delete",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  const handleAvatarChange = (event) => {
    const files = event.target.files;
    const readers = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      

      reader.onload = (e) => {
      const img = new Image();

        const imageDataUrl = reader.result;
        img.src = imageDataUrl;
        img.onload = function () {
       
       
          setMainImages((prevImages) => [...prevImages, imageDataUrl]);
          setAlert("")
       
  
      }}

      readers.push(reader);
      readers[i].readAsDataURL(files[i]);
    }
    onChange(event.target.files)
  };
  const handelDeleteImage = (selectedImageIndex) => {
    // Delete the selected image from the images array
    const updatedImages = mainImages.filter((image, index) => index != selectedImageIndex);
    const newImage=mainImages.find((ele,index)=>index==selectedImageIndex)
    let idofimage=main_image.find((ele)=>ele.image==newImage)

    
    if(main_image.map((ele)=>ele.image).includes(newImage)){
      deleteProductImagesRequest({
        id:idProduct+"/images/"+idofimage?.id,
        onSuccess:(res)=>{
          onChange(main_image.filter((ele)=>ele.id!=idofimage?.id))
          
        }
      })
    }
  
    // Update the state with the new images array
    setMainImages(updatedImages);
  };
  useEffect(()=>{
    
    if(Array.isArray(main_image)){
      setMainImages(main_image?.map((ele)=>ele.image))

    }
  },[
    main_image
  ])
  return (
   <> <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflowX: "auto",
        overflowY:'hidden',
        gap: "20px",
      }}
    >
      {/* <Box sx={{ width: '100%',my:"24px"}}>
              
              <SoftButton
              sx={{backgroundColor:`#3C83C4 !important`}}
                variant="contained"
                onClick={() => {
                  document.getElementById('profile_image').click();
                }}
              >
                Choose your picture here
              </SoftButton>
            
          </Box> */}

      {mainImages.length > 0 ? (
        mainImages.map((img, index) => (
          <Box
            sx={{
              width: "251px",
              height: " 219px",
              borderRadius: "8px",
              // border: "0.2px solid #000000",
              border: '0.2px solid #E5E7E8'
            }}
            key={index}
          >
            {/* view image selected */}
            <Box sx={{ width: "251px", height: "167.03px" }}>
              <img
                src={img}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  borderRadius: `8px  8px 0px 0px `,
                }}
              />
            </Box>
            <input
              multiple
              id="profile_image"
              name="profile_image"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Button
                sx={{
                  width: "180px",

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
                  ":hover": {
                    color: "#E84646",
                    background: "#FDEDED",
                  },
                }}
                onClick={() => {
                  handelDeleteImage(index)
                }}
              >
                Remove image
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflowX: "auto",
          gap: "20px",
        }}>
          <input
            multiple
            id="profile_image"
            name="profile_image"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        {/* <Box
          sx={{
            width: "251px",
            height: " 222px",
            borderRadius: "8px",
            border: "0.2px solid #E5E7E8",
          }}
          
        >
         
          <Box sx={{ width: "251px", height: "167.03px" }}>
            <img
              src={productImage}
              alt={`Image`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                borderRadius: `8px  8px 0px 0px `,
              }}
            />
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button
              sx={{
                width: "180px",

                padding: "0px 24px 0px 24px",
                borderRadius: "12px",
                gap: "8px",
                background: "#FDEDED",
                textTransform: "none",
                my: "6.6px",

                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "40px",
                letterSpacing: "0em",
                color: "#E84646",
                ":hover": {
                  color: "#E84646 !important",
                  background: "#FDEDED !important",
                },
              }}
              onClick={() => {
                // document.getElementById("profile_image").click();
              }}
            >
              Remove image
            </Button>
          </Box>
        </Box> */}
        {Array.from({length:3},(_,index)=>(
           <Box 
           key={index}
           sx={{width: '251px',
           height: '219px',
           borderRadius: '8px',
           border: '2px',
           border: '2px solid #E5E7E8',
           background:  '#FFFFFF',
           display:'flex',
           alignItems:'center',
           justifyContent:'center',
           flexDirection:'column'
           }}>
             <Box sx={{width: '149px',
           height: '96px',
           display:'flex',
           alignItems:'center',
           justifyContent:'center',
           gap:'12px',
           flexDirection:'column'
           }}>
             <img src={image} alt='image'/>
               <Typography sx={{color: '#626C70',
           textAlign: 'center',
           fontFamily: 'Inter',
           fontSize: '14px',
           fontWeight: 400,
           lineHeight: '20px'}}>
               Drop your image here , or  
               <Typography
               component={'span'}
               sx={{color: ' #005CE8',
           fontFamily: 'Inter',
           fontSize: '14px',
           fontWeight: 500,
           lineHeight: '20px'}}
           onClick={() => {
            document.getElementById("profile_image").click()
          }}
           >select click to browse</Typography>
               </Typography>
           </Box>
                   </Box>  
        ))}   
        </Box>
      )}
      
     
    </Box>
    {Boolean(alert)&& <Alert
            severity="error"
            variant="filled"
            onClose={() =>  setAlert("")}
          >
            {alert}
          </Alert>}
    </>
  );
};

export default ImageBox;
ImageBox.propTypes={
  main_image:PropTypes.any,
    onChange: PropTypes.func
}