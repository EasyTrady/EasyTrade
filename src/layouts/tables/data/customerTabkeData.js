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
import useRequest from 'hooks/useRequest';
import { CUSTOMER } from 'data/api';

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
//         field: 'is_active',
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
let Token=localStorage.getItem('token')

const [customerDeleteRequest, DeleteCustomerrResponce] =
useRequest({
  path: CUSTOMER,
  method: "patch",
  Token: `Token ${Token}`

});
function onDelete(row){
  console.log(row)
  customerDeleteRequest({
    id:row+"/activation",
    onSuccess:()=>{
      // dispatch({ type: "custom/deleteItem", payload: {id:row} })
    }
  })
}
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
              width: 150,
              align: 'left',
              headerAlign: 'left',
              editable: true,
              renderCell:(params)=>
                <Typography variant={"h5"} sx={{color:"#673ab7",}}>{params.row.full_name}</Typography>
              ,
              filterable: false,
              sortable: false,disableColumnMenu: true
            }, 
             {
              field: 'email',
              headerName: 'email',
              type: 'email',
              width: 150,
              align: 'left',
              headerAlign: 'left',
              editable: true,
              renderCell:(params)=> <Typography component={"p"}>{params.row.email} </Typography>
            },
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
            {
              field: 'is_active',
              headerName: 'is_active',
              type: 'text',
              width: 150,
              align: 'left',
              headerAlign: 'left',
              editable: true,
              filterable: false,
              sortable: false,disableColumnMenu: true,
              renderCell:(params)=> <Typography variant={"p"}
              sx={{
                backgroundColor:"#82d61675","p.MuiTypography-root":{color:"#fff"}
                ,borderRadius:"10px",cursor:"pointer",padding:"5px"
              }} onClick={()=>onDelete(params?.row?.id)}
              >{params?.row?.is_active?"active":"not active"} </Typography>

            },
            
          
          ],

    rows: customers?.results
}};