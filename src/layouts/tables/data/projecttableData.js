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
let customers = useSelector((state) => state?.customer?.value)

    useEffect(()=>{
        console.log( customers)
    },[customers])
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
              field: 'description',
              headerName: 'description',
              type: 'text',
              width: 200,
              align: 'center',
              headerAlign: 'center',
              editable: true,
              filterable: true,
              sortable: false,disableColumnMenu: true
            },
            {
              field: 'category',
              headerName: 'category',
              type: 'text',
              width: 100,
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
            description: 'new product for our shop ,welcome to your dashboard ,and control of all what you need.',
            category:'clothes'
          },
        {id:2,
            image: image,
            name: 'product2',
            quantity:5,
            description: 'new product for our shop ,welcome to your dashboard ,and control of all what you need.',
            category:'clothes'
          },
        {id:3,
            image: image,
            name: 'product3',
            quantity:5,
            description: 'new product for our shop ,welcome to your dashboard ,and control of all what you need.',
            category:'clothes'
          },
        {id:4,
            image: image,
            name: 'product4',
            quantity:5,
            description:'new product for our shop ,welcome to your dashboard ,and control of all what you need.',
            category:'clothes'
          },
    ]
}};