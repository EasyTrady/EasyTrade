/* eslint-disable react/prop-types */
import {  Button, Container, Icon, Stack, Typography,Switch } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import DataGridCustom from 'components/common/DateGridCustomer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import useRequest from 'hooks/useRequest'
import { BANNERS } from 'data/api'
import moment from 'moment'
import usePermission from 'utils/usePermission';

const ViewBanners = ({ absolute, light, isMini }) => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const route = useLocation().pathname.split("/").slice(1);
    const sub_domain = localStorage.getItem("sub_domain");
    let { t } = useTranslation("common");
    let {isPermitted}=usePermission()
    let permissionYour = useSelector((state) => state.permissionYour.value)
  
    let Token = localStorage.getItem("token");
    const banners = useSelector((state) => state.banners.value);
  const [BannersGetRequest, BannersGetResponce] = useRequest({
    path: BANNERS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [BannersPatchRequest, BannersPatchResponce] = useRequest({
    path: BANNERS,
    method: "patch",
    Token: `Token ${Token}`,
  });
  const getBanners = () => {
    BannersGetRequest({
      onSuccess: (res) => {
       
        dispatch({ type: "banners/set", payload: res?.data });
      },
    });
  };
  const [BannerDeleteRequest, BannerDeleteResponce] = useRequest({
    path: BANNERS,
    method: "DELETE",
    Token: `Token ${Token}`,
  });
  function onDelete(row) {
  
    BannerDeleteRequest({
        id: row,
        onSuccess: () => {
            dispatch({ type: "banners/deleteItem", payload: { id: row } })
        }
    })
  }
  function patchStatus(data) {
  
    BannersPatchRequest({
        id: data?.id,
        body:{is_public:!data?.is_public},
        onSuccess: (res) => {
            dispatch({ type: "banners/patchItem", payload: { id: data?.id,item:res.data } })
        }
    })
  }
  const  columns = [
    {
      field: 'image',
      headerName: 'Banner',
      type: 'image',
      width: 220,
      height:72,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { row } = params;
        return (<Stack direction={"row"} justifyContent={'flex-start'} alignItems={'center'}>
            <SoftBox sx={{width:"216px",height:"64px",borderRadius:"8px",display:'flex',alignItems:'centter'}}>
                
                <img src={row?.image} style={{width:"100%",height:'100%',borderRadius:"8px"}}/>
               
                </SoftBox>
            {/* <Typography component={"p"} sx={{ fontSize: "14px",fontWeight:400 ,marginX:"10px" }}>{row?.banner_type_name}</Typography> */}
            {/* <Typography component={"a"} sx={{ color: (theme) => theme.palette.grey[500], fontSize: "0.8rem", cursor: "pointer" }} onClick={() => navigate(`/${shop_name}/dashboard/attribute/${row?.id}`)}>view</Typography> */}
        </Stack>
        );
    },
      editable: false,
      filterable: false,
      sortable: false,disableColumnMenu: true
    }
   ,{
      field: 'offer_end_date',
      headerName: 'Expire date',
      type: 'text',
      width: 179.4,
      align: 'center',
      color:'#1B53C5',
      headerAlign: 'center',
      editable: false,
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
      field: 'banner_type_name',
      headerName: 'Type',
      type: 'text',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => {
        const { row } = params;
        return (<Stack direction={"row"} justifyContent={'flex-start'} alignItems={'center'}>
            <SoftBox sx={{width: '100%',
height: '30px',
padding: '5px 16px 5px 16px',borderRadius:"130px",display:'flex',alignItems:'centter',
color:row?.banner_type===1?'#027A48':row?.banner_type===2?"#7A0243":row?.banner_type===3?'#02157A':row?.banner_type===4?"#7A6702":row?.banner_type===5?"#37027A":""
,background:row.banner_type==1?'#ECFDF3':row?.banner_type==2?"#FDECF9":row?.banner_type==3?'#ECF0FD':row?.banner_type==4?"#FDFBEC":row?.banner_type==5?"#F2ECFD":""
,fontSize:'14px',fontWeight:500}}>{row.banner_type_name}</SoftBox>
                
            
        </Stack>
        );
    },
    },
     {
      field: 'status',
      headerName: 'status',
      type: 'text',
      width: 186,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      renderCell:(params)=>{
       return <><Switch checked={params.row.is_public} onChange={()=>patchStatus(params.row)}/> {params.row.is_public?<Typography sx={{color:(theme)=>theme.palette.success.main,mx:1,fontSize:"14px"}}>on</Typography>:<Typography sx={{color:(theme)=>theme.palette.grey[500],mx:1,fontSize:"14px"}}>paused</Typography>}</>
      }
    },
    
  ]
  useEffect(()=>{
    getBanners()
  },[])
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
          {permissionYour.map((ele)=>ele.codename).includes("add_banner")&&<SoftButton
            variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
            }}
            onClick={() => navigate(`/${sub_domain}/dashboard/banners/addnewbanner`)}
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;{t("addnewbanner")}
          </SoftButton>}
          
        </SoftBox>
        <DataGridCustom
          rows={banners?.results}
          columns={columns}
          onDialog={isPermitted((row,newRow)=>navigate(`/${sub_domain}/dashboard/banners/addnewbanner`,{state:{id:row,dataRow:newRow}}),["change_banner"])}
          onDelete={isPermitted(onDelete,["delete_banner"])}
          onCopy={() => {}}
          checkboxSelection={true}
          onRowClick={(e, row) => {
           
            //  setClick({ ...e.id });
          }}
          notProduct={false}
        //   rowsPerPageOptions={[5, 10, 15, 20]}
        //   onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}
          sx={{
            backgroundColor: "white !important",
            " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
          }}
        />
      </Container>
      {BannerDeleteResponce.failAlert}
      {BannerDeleteResponce.successAlert}
    </DashboardLayout>
  )
}

export default ViewBanners