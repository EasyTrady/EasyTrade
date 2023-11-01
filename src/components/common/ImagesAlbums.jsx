/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import SoftButton from 'components/SoftButton';
import React, { useRef, useState } from 'react'

const ImagesAlbums = ({product_images,onChange}) => {
    const [images,setImages]=useState([])
    const inputRef = useRef();
    const handlePaperClick = (e) => {
      inputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      console.log(e.target.files);
      const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    //   setImages(e.target.files)
    // console.log(e?.target?.files?.map((ele)=>ele.name))
    //   if(e?.target?.files){
    //  const path = URL?.createObjectURL(e?.target?.files);
    // const selectedFiles = e.target.files;
    
    // const imagesArray = Array.from(selectedFiles);
    // setImages(imagesArray);
     onChange(images);
    //   }
     
    };
  return (
    <>
    <Box>
    <input
    multiple
    id="images_product"
      type="file"
      accept="/*"
      ref={inputRef}
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
    <SoftButton  onClick={handlePaperClick}>اختيار الصوره</SoftButton>
  </Box>
  <Box sx={{height:'500px',display:'flex',flexWrap:'wrap'}}>
    {images?.map((image, index) => (
        <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} />
      ))}
  </Box>
  </>
  )
}

export default ImagesAlbums