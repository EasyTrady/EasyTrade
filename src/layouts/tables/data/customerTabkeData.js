import { Avatar, Box, Typography } from "@mui/material";
import SoftAvatar from "components/SoftAvatar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
export const CustomersTableData =() =>{
let customers = useSelector((state) => state?.customer?.value)

    useEffect(()=>{
        console.log( customers)
    },[customers])
    return{ columns : [
            {
              field: 'image',
              headerName: 'image',
              type: 'image',
              width: 100,
              align: 'left',
              headerAlign: 'left',
              renderCell: (params) => <Avatar src={params.row.image} />,
              editable: true,
              filterable: false,
              sortable: false,disableColumnMenu: true
            }
            , {
              field: 'full_name',
              headerName: 'full_name',
              type: 'text',
              width: 400,
              align: 'left',
              headerAlign: 'left',
              editable: true,
              renderCell:(params)=><Box sx={{display:"flex",flexDirection:"column"}}>
                <Typography component={"h3"} sx={{color:"#673ab7",}}>{params.row.full_name}</Typography>
                <Typography component={"p"}>{params.row.email} </Typography>
        
              </Box>,
              filterable: false,
              sortable: false,disableColumnMenu: true
            }, 
            //  {
            //   field: 'email',
            //   headerName: 'email',
            //   type: 'email',
            //   width: 150,
            //   align: 'left',
            //   headerAlign: 'left',
            //   editable: true,
        
            // },
            {
              field: 'phone',
              headerName: 'phone',
              type: 'text',
              width: 150,
              align: 'left',
              headerAlign: 'left',
              editable: true,
              filterable: false,
              sortable: false,disableColumnMenu: true
            },
        
          
          ],

    rows: customers?.results
}};