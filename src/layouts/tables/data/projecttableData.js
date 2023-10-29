import { Avatar, Box, Typography } from "@mui/material";
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
              field: 'image',
              headerName: 'image',
              type: 'image',
              width: 200,
              height:100,
              align: 'center',
              headerAlign: 'center',
              renderCell: (params) => <img src={params.row.image}  alt='image' height={80} width={80}/>,
              editable: true,
              filterable: false,
              sortable: false,disableColumnMenu: true
            }
            , {
              field: 'name',
              headerName: 'name',
              type: 'text',
              width: 150,
              align: 'center',
              headerAlign: 'center',
              editable: true,
              filterable: false,
              sortable: false,disableColumnMenu: true
            },{
              field: 'sku',
              headerName: 'SKU',
              type: 'text',
              width: 200,
              align: 'center',
              headerAlign: 'center',
              editable: true,
              filterable: true,
              sortable: false,disableColumnMenu: true
            }, 
             {
              field: 'quantity',
              headerName: 'quantity',
              type: 'number',
              width: 150,
              align: 'center',
              headerAlign: 'center',
              editable: true,
        
            },

            {
              field: 'price',
              headerName: 'Price',
              type: 'number',
              width: 100,
              align: 'center',
              headerAlign: 'center',
              editable: true,
              filterable: true,
              sortable: false,disableColumnMenu: true
            },
            {
              field: 'status',
              headerName: 'Status',
              type: 'boolean',
              width: 100,
              align: 'center',
              headerAlign: 'center',
              renderCell: (params) => <SoftBadge variant="gradient" badgeContent={params.row.status?"active":"inactive"} color={params.row.status?"success":"error"} size="xs" container   />,
              editable: true,
              filterable: true,
              sortable: false,
              disableColumnMenu: true
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