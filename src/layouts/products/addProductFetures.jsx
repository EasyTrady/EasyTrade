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
        <NumberField
        variant='outlined'
        placeholder={"Purchase price"}
        value={controls.purchase_price}
        onChange={(e) => setControl("purchase_price", e.target.value)}
        required={required.includes("purchase_price")}
        error={Boolean(invalid.purchase_price)}
        helperText={invalid.purchase_price}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        <NumberField
        variant='outlined'
        placeholder={"mpn"}
        value={controls.mpn}
        onChange={(e) => setControl("mpn", e.target.value)}
        required={required.includes("mpn")}
        error={Boolean(invalid.mpn)}
        helperText={invalid.mpn}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        <NumberField
        variant='outlined'
        placeholder={"shipping_price"}
        value={controls.shipping_price}
        onChange={(e) => setControl("shipping_price", e.target.value)}
        required={required.includes("shipping_price")}
        error={Boolean(invalid.shipping_price)}
        helperText={invalid.shipping_price}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />
        <NumberField
        variant='outlined'
        placeholder={"Gtn"}
        value={controls.gtn}
        onChange={(e) => setControl("gtn", e.target.value)}
        required={required.includes("gtn")}
        error={Boolean(invalid.gtn)}
        helperText={invalid.gtn}
        // icon={{ component: <DnsOutlinedIcon />, direction: "left" }}
        sx={input}
        borderBottom='none'
        />

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