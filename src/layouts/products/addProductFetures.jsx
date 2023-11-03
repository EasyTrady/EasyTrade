import { Card } from '@mui/material'
import input from 'assets/theme/components/form/input';
import NumberField from 'components/common/NumberFeild'
import useControls from 'hooks/useControls';
import React from 'react'
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined"
import DatePickerField from 'components/common/DatePicker';
import ImageBox from 'components/common/imageBox';
import PictureField from 'components/common/PictureField';
import ImagesAlbums from 'components/common/ImagesAlbums';
import SoftInput from 'components/SoftInput';
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
    <Card sx={{height:"100%",width:"70vw",p:3,display:'flex',flexDirection:"column",gap:3}}>
        <NumberField
        variant='outlined'
        placeholder={"Discount"}
        value={controls.discount}
        onChange={(e) => setControl("discount", e.target.value)}
        required={required.includes("discount")}
        error={Boolean(invalid.discount)}
        helperText={invalid.discount}
         icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        <DatePickerField/>
        <DatePickerField/>
        
           

          
             
          
         
            
        <ImageBox 
        main_image={controls.main_image}  
        onChange={(e) => setControl("main_image", e)}/>
        
        <ImagesAlbums 
        value={controls.product_images}
        onChange={(e)=>setControl('product_images',e)}
        />
    </Card>
  )
}

export default AddProductFetures