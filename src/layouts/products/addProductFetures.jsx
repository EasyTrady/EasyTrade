import { Card } from '@mui/material'
import input from 'assets/theme/components/form/input';
import NumberField from 'components/common/NumberFeild'
import useControls from 'hooks/useControls';
import React from 'react'
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined"
import DatePickerField from 'components/common/DatePicker';
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
          control: "price",
          value: "",
          isRequired: true,
        },
        {
          control: "sku",
          value: "",
          isRequired: true,
        },
        { control: "weight", value: "", isRequired: true },
        { control: "minimum_quantity", value: "", isRequired: true },
        { control: "maximum_quantity", value: "", isRequired: true },
        { control: "description", value: "", isRequired: true },
      ]);
  return (
    <Card sx={{height:"70vh",width:"70vw",p:3,display:'flex',flexDirection:"column",gap:3}}>
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
    </Card>
  )
}

export default AddProductFetures