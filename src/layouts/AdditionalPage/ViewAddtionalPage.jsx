/* eslint-disable react/prop-types */
import {  Button, CircularProgress, Container, Icon, IconButton, Stack, Switch, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import DataGridCustom from 'components/common/DateGridCustomer'
import { VIEWADDTIONPAGE } from 'data/api'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useTranslation } from 'react-i18next'
import useRequest from 'hooks/useRequest'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import Breadcrumbs from 'examples/Breadcrumbs'
import moment from 'moment'
import EditIcon from 'examples/Icons/EditIcon'
import DeleteIcon from 'examples/Icons/DeleteIcon'
import usePermission from 'utils/usePermission'
const ViewAddtionalPage = ({ absolute, light, isMini }) => {
    const navigate = useNavigate();
    let {isPermitted}=usePermission()
    const dispatch=useDispatch()
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem("sub_domain");
    let { t } = useTranslation("common");
    let permissionYour = useSelector((state) => state.permissionYour.value)
    let Token = localStorage.getItem("token");
    const banners = useSelector((state) => state.banners.value);
  const [AddtionPageGetRequest, AddtionPageGetResponce] = useRequest({
    path: VIEWADDTIONPAGE,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [AddtionPageDeleteRequest, AddtionPageDeleteResponce] = useRequest({
    path: VIEWADDTIONPAGE,
    method: "DELETE",
    Token: `Token ${Token}`,
  });
  const getAddtionPage = () => {
    AddtionPageGetRequest({
      onSuccess: (res) => {
       
        dispatch({ type: "banners/set", payload: res?.data });
      },
    });
  };
//   const [BannerDeleteRequest, BannerDeleteResponce] = useRequest({
//     path: BANNERS,
//     method: "DELETE",
//     Token: `Token ${Token}`,
//   });
//   function onDelete(row) {
  
//     BannerDeleteRequest({
//         id: row,
//         onSuccess: () => {
//             dispatch({ type: "banners/deleteItem", payload: { id: row } })
//         }
//     })
  //}

  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewAddtionPage = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/${sub_domain}/dashboard/additionalpage/addadditionalpage`);
    }, 1000);
  };

  function onEdit(row, newRow) {
    navigate(`/${sub_domain}/dashboard/additionalpage/addadditionalpage`, {
      state: { id: row.id, dataRow: row },
    });
  }

  function onDelete(row) {
  
    AddtionPageDeleteRequest({
        id: row,
        onSuccess: () => {
            dispatch({ type: "banners/deleteItem", payload: { id: row } })
        }
    })
  }

  const  columns = [
    {
      field: 'title',
      headerName: 'Page',
      type: 'text',
      width: 200,
      height:72,
      align: 'start',
      headerAlign: 'start',
      editable: true,
      filterable: false,
      sortable: false,disableColumnMenu: true
    }
   ,{
      field: 'offer_end_date',
      headerName: 'Expire date',
      type: 'text',
      width: 500,
      align: 'center',
      color:'#1B53C5',
      headerAlign: 'center',
      editable: true,
      filterable: true,
      sortable: false,disableColumnMenu: true,
      renderCell: (params) => {
        const { row } = params;
        return (<Stack direction={"row"} justifyContent={'flex-start'} alignItems={'center'}>
            <Typography sx={{color:'#1B53C5',fontSize:'14px',fontWeight:400}}>{moment(row?.offer_end_date).format("YYYY-MM-DD")}</Typography>
        </Stack>
        );
    },
    }, 
     {
      field: 'active',
      headerName: 'Active',
      type: 'text',
      width: 400,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      renderCell:(params)=><Switch
              checked={params?.row?.is_active}
              // onClick={()=>onDelete(params?.row?.id,params?.row)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
    
    },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     type: 'text',
  //     width: 200,
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: (params) => (
  //       <>
  //         {/* <Switch
  //           checked={params.row.is_public}
  //           onChange={() => patchStatus(params.row)}
  //         /> */}
  //         <IconButton checked={params.row.is_public}
  //           onClick={() => onEdit(params.row.id, params.row)}>
  //           <EditIcon fontSize="small" />
  //         </IconButton>
  //         <IconButton checked={params.row.is_public}
  //           onChange={() => patchStatus(params.row)}>
  //           <DeleteIcon fontSize="small" />
  //         </IconButton>
  //       </>
  //     ),
  // },
    //  {
    //   field: 'status',
    //   headerName: 'status',
    //   type: 'text',
    //   width: 186,
    //   align: 'center',
    //   headerAlign: 'center',
    //   // editable: true,
    //   renderCell:(params)=>{
    //     const { row } = params;
    //     row?.categories?.map((cat)=>(
    //       <span key={cat?.id}>{cat?.name}</span>
          
    //     ))
    //   }
    // },
    
  ]
  useEffect(() => {
    getAddtionPage();
}, []);
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <Container sx={{ p: 2 }}>
      <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
        <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
      </SoftBox>
      <SoftBox
        mb={{
          xs: 1,
          md: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        sx={{ textAlign: "right" }}
      >
        <Button
          onClick={() => window.print()}
          sx={{
            backgroundColor: "white !important",
            color: "black !important",
            marginX: "10px",
            p: 1.5,
          }}
        >
          <LocalPrintshopIcon /> Print
        </Button>
        <SoftButton
        variant="gradient"
        sx={{
          backgroundColor: (theme) => theme.palette.purple.middle,
          color: "white !important",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.purple.middle,
          },
          width: { md: "25%", xs: "50px" },
          textTransform: "none",
        }}
        onClick={handleAddNewAddtionPage}
      >
        {isLoading ? (
          <>
          <CircularProgress size={20} color="inherit" />
          جاري التحميل...
        </>
        ) : (
          <>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;{t("addnewpage")}
          </>
        )}
      </SoftButton>
        {/* <SoftButton
          variant="gradient"
          sx={{
            backgroundColor: (theme) => theme.palette.purple.middle,
            color: "white !important",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.purple.middle,
            },
          }}
          onClick={() => navigate(`/${sub_domain}/dashboard/additionalpage/addadditionalpage`)}
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;{t("addnewpage")}
        </SoftButton> */}
      </SoftBox>
      <DataGridCustom
                rows={banners?.results}
                columns={columns}
                loading={AddtionPageGetResponce.pinding}
                checkboxSelection={true}
                onRowClick={(e, row) => {
                    //  setClick({ ...e.id });
                }}
                // onDialog={isPermitted(onEdit,["change_banner"])}
                // onDelete={isPermitted(onDelete,["delete_banner"])}
                notProduct={false}
                rowHeight={72}
                getRowSpacing={4}
                sx={{
                    backgroundColor: "white !important",
                    " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
                }}
            />
    </Container>
    {/* {BannerDeleteResponce.failAlert}
    {BannerDeleteResponce.successAlert} */}
  </DashboardLayout>
  )
}

export default ViewAddtionalPage