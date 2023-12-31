import { Avatar, Box, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SoftAvatar from "components/SoftAvatar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import useRequest from 'hooks/useRequest';
import { CUSTOMER } from 'data/api';
import moment from 'moment';
import imageFemale from "../../../assets/images/woman.png"
import imageMen from "../../../assets/images/mens.png"
import Switch from '@mui/material/Switch';
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
let dispatch=useDispatch()
const [customerDeleteRequest, DeleteCustomerrResponce] =
useRequest({
  path: CUSTOMER,
  method: "patch",
  Token: `Token ${Token}`

});
function onDelete(row,data){
  
    customerDeleteRequest({
      id:row+"/activation",
      onSuccess:(res)=>{
       
        dispatch({ type: "custom/patchItem", payload: {id:row,item:{...data,is_active:res.data.active}} })
      }
    })
  }
// function onDelete(row){
//   console.log(row)
//   customerDeleteRequest({
//     id:row,
//     onSuccess:()=>{
//       // dispatch({ type: "custom/deleteItem", payload: {id:row} })
//     }
//   })
// }
    useEffect(()=>{
        
    },[customers])
    return{ columns : [
      {
        field: 'id',
        headerName: 'id',
        type: 'id',
        width:100,
        align: 'left',
        headerAlign: 'left',
        editable: false,
        filterable: false,
        sortable: false,disableColumnMenu: true
      }
      ,{
              field: 'Customer',
              headerName: 'Customer',
              type: 'image',
              width:400,
              align: 'left',
              headerAlign: 'left',
              renderCell: (params) =><Box sx={{display:"flex",justifyContent: "space-evenly",
              }}>
                
                 <Avatar src={params.row.gender==="F"?imageFemale:imageMen} />
                 <Box sx={{marginX:"10px"}}>
                 <Typography variant={"h5"} sx={{fontSize:"14px"}}>{params.row.full_name}</Typography>
                 <Typography variant={"h5"} sx={{fontSize:"14px"}}>{params.row.email}</Typography>

                 </Box>
              </Box>,
              editable: false,
              filterable: false,
              sortable: false,disableColumnMenu: true,
              // renderHeader:()=>"Customer"
            }
            , 
            
            {
              field: 'phone',
              headerName: 'Phone number',
              type: 'text',
              width:222,
              align: 'left',
              headerAlign: 'left',
              editable: false,
              filterable: false,
              sortable: false,disableColumnMenu: true

            },
            {
              field: 'created_at',
              headerName: 'created at',
              type: 'text',
              width:300,
              align: 'left',
              headerAlign: 'left',
              editable: false,
              filterable: false,
              sortable: false,disableColumnMenu: true,
              renderCell:(params)=>{moment(params.row.created_at).format('MMMM Do YYYY, h:mm:ss ')}
            },
            {
              field: 'is_active',
              headerName: 'active',
              type: 'text',
              width:122,
              align: 'left',
              headerAlign: 'left',
              editable: false,
              filterable: false,
              sortable: false,disableColumnMenu: true,
              renderCell:(params)=><Switch
              checked={params?.row?.is_active}
              onClick={()=>onDelete(params?.row?.id,params?.row)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            //  <Typography variant={"p"}
            //   sx={{
            //     backgroundColor:params?.row?.is_active?(theme)=>theme.palette.success.hover:(theme)=>theme.palette.error.hover,"p.MuiTypography-root":{color:"#fff"}
            //     ,borderRadius:"10px",cursor:"pointer",padding:"5px",
            //     color:params?.row?.is_active?(theme)=>theme.palette.success.main:(theme)=>theme.palette.error.main,
            //     fontSize:"14px",
            //   }} 
            //   >{params?.row?.is_active?"active":"in active"} </Typography>

            },
            
          
          ],

    rows: customers?.results
}};