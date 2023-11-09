import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SoftAvatar from "components/SoftAvatar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import image from '../../../assets/images/20jan4.jpg'
import SoftBadge from "components/SoftBadge";
// const columnsTheme = [
//     {
//         field: 'image',
//         headerName: 'image',
//         type: 'image',
//         width: 50,
//         align: 'left',
//         headerAlign: 'left',
//         renderCell: (params) => <Avatar src={params.row.image} />,
//         editable: true,
//     }
//     , {
//         field: 'full_name',
//         headerName: 'full_name',
//         type: 'text',
//         width: 400,
//         align: 'left',
//         headerAlign: 'left',
//         editable: true,
//         renderCell: (params) => <Box sx={{ display: "flex", flexDirection: "column" }}>
//             <Typography component={"h3"} sx={{ color: "#673ab7", }}>{params.row.full_name}</Typography>
//             <Typography component={"p"}>{params.row.email} </Typography>

//         </Box>
//     },

//     {
//         field: 'phone',
//         headerName: 'phone',
//         type: 'text',
//         width: 150,
//         align: 'left',
//         headerAlign: 'left',
//         editable: true,
//     },


// ]
export const ProductTableData =() =>{
    return{ columns : [
            {
              field: 'main_image',
              headerName: 'product',
              type: 'image',
              width: 180,
              height:72,
              align: 'center',
              headerAlign: 'center',
              renderCell: (params) => {
                const { row } = params;
                return (<Stack direction={"row"} justifyContent={'flex-start'} alignItems={'center'}>
                    <SoftBox sx={{width:"64px",height:"64px",borderRadius:"8px",display:'flex',alignItems:'centter'}}><img src={row.main_image} style={{width:"100%",borderRadius:"8px"}}/></SoftBox>
                    <Typography component={"p"} sx={{ fontSize: "14px",marginX:"10px" }}>{row.name}</Typography>
                    {/* <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography> */}
                </Stack>
                );
            },
              editable: true,
              filterable: false,
              sortable: false,disableColumnMenu: true
            }
           ,{
              field: 'sku',
              headerName: 'SKU',
              type: 'text',
              width: 179.4,
              align: 'center',
              headerAlign: 'center',
              editable: true,
              filterable: true,
              sortable: false,disableColumnMenu: true
            }, 
             {
              field: 'quantity',
              headerName: 'QTY',
              type: 'number',
              width: 76,
              align: 'center',
              headerAlign: 'center',
              editable: true,
        
            },
             {
              field: 'category',
              headerName: 'Category',
              type: 'text',
              width: 186,
              align: 'center',
              headerAlign: 'center',
              editable: true,
        
            },
            {
              field: 'type',
              headerName: 'Type',
              type: 'text',
              width: 162.5,
              align: 'center',
              headerAlign: 'center',
              renderCell: (params) => <Box sx={{padding:'5px 16px 5px 16px',borderRadius:'130px',height:'30px',display:'flex',alignItems:'center',justifyContent:'center'}}  bgcolor={params.row.is_published?"#ECFDF3":"#FDECEC"} size="small" color={params.row.is_published?"#027A480":"#7A0202"}container >{params.row.is_published?"Published":"Draft"}</Box>,
              editable: true,
              filterable: true,
              sortable: false,
              disableColumnMenu: true
            },

            {
              field: 'price',
              headerName: 'Price',
              type: 'number',
              width: 162.5,
              align: 'center',
              headerAlign: 'center',
              editable: true,
              filterable: true,
              sortable: false,disableColumnMenu: true
            },
           
          
          ],

    rows:[
        {id:1,
            image: image,
            name: 'product1',
            quantity:5,
            sku:'XYZ12345',
            price:183,
            status:true
          },
        {id:2,
            image: image,
            name: 'product2',
            quantity:5,
            sku:'XYZ12345',
            price:183,
            status:false
          },
        {id:3,
            image: image,
            name: 'product3',
            quantity:5,
            sku: 'XYZ12345',
            price:183,
            status:true
          },
        {id:4,
            image: image,
            name: 'product4',
            quantity:5,
            sku:'XYZ12345',
            price:183,
            status:false
          },
    ]
}};