/* eslint-disable react/prop-types */
import { Button, Container, Icon, Stack, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Breadcrumbs from "examples/Breadcrumbs";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navbarRow } from "examples/Navbars/DashboardNavbar/styles";
import { useTranslation } from "react-i18next";
import useRequest from "hooks/useRequest";
import { OFFERS } from "data/api";
import DataGridCustom from "components/common/DateGridCustomer";
import moment from "moment";
import usePermission from 'utils/usePermission';
const Offers = ({ absolute, light, isMini }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  let {isPermitted}=usePermission()
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem("sub_domain");
  let { t } = useTranslation("common");
  let permissionYour = useSelector((state) => state.permissionYour.value)
  let Token = localStorage.getItem("token");
  const offers = useSelector((state) => state.offers.value);
  const [OffersGetRequest, OffersGetResponce] = useRequest({
    path: OFFERS,
    method: "get",
    Token: `Token ${Token}`,
  });

  const getOffers = () => {
    OffersGetRequest({
      onSuccess: (res) => {
      
        dispatch({ type: "offers/set", payload: res?.data });
      },
    });
  };
  const [OffersDeleyeRequest, OffersDeleteResponce] = useRequest({
    path: OFFERS,
    method: "DELETE",
    Token: `Token ${Token}`,
  });
  function onDelete(row) {
   
    OffersDeleyeRequest({
        id: row,
        onSuccess: () => {
            dispatch({ type: "offers/deleteItem", payload: { id: row } })
        }
    })
}
 const  columns = [
    {
      field: 'main_image',
      headerName: 'Offer',
      type: 'image',
      width: 180,
      height:72,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { row } = params;
        return (<Stack direction={"row"} justifyContent={'flex-start'} alignItems={'center'}>
            <SoftBox sx={{width:"64px",height:"64px",borderRadius:"8px",display:'flex',alignItems:'centter'}}>
                {row?.offer_banners?.map((banner)=>(
                <img key={banner}src={banner?.image} style={{width:"100%",height:'100%',borderRadius:"8px"}}/>
                ))}
                </SoftBox>
            <Typography component={"p"} sx={{ fontSize: "14px",fontWeight:400 ,marginX:"10px" }}>{row?.offer_title}</Typography>
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
      field: 'offer_type',
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
color:row.offer_type_id===1?'#027A48':row.offer_type_id===2?"#7A0243":row.offer_type_id===3?'#02157A':row.offer_type_id===4?"#7A6702":row.offer_type_id===5?"#37027A":row.offer_type_id===6?"#7A4A02":""
,background:row.offer_type_id==1?'#ECFDF3':row.offer_type_id==2?"#FDECF9":row.offer_type_id==3?'#ECF0FD':row.offer_type_id==4?"#FDFBEC":row.offer_type_id==5?"#F2ECFD":row.offer_type_id==6?"#FDF2EC":""
,fontSize:'14px',fontWeight:500}}>{row.offer_type}</SoftBox>
                
            
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
      // editable: true,
      renderCell:(params)=>{
        const { row } = params;
        row?.categories?.map((cat)=>(
          <span key={cat?.id}>{cat?.name}</span>
          
        ))
      }
    },
    
  ]
  useEffect(()=>{
    getOffers()
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
         { permissionYour.map((ele)=>ele.codename).includes("add_productoffer")&&<SoftButton
            variant="gradient"
            sx={{
              backgroundColor: (theme) => theme.palette.purple.middle,
              color: "white !important",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.purple.middle,
              },
            }}
            onClick={() => navigate(`/${sub_domain}/dashboard/offers/addnewoffer`)}
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;{t("addnewoffer")}
          </SoftButton>}
          
        </SoftBox>
        <DataGridCustom
          rows={offers?.results}
          columns={columns}
          // onEdit={()=>{}}
          onDelete={isPermitted(onDelete,["delete_productoffer"])}
          onCopy={() => {}}
          checkboxSelection={true}
          loading={OffersGetResponce.isPending}
          // onRowClick={(e, row) => {
          //   console.log(e, row);
          //    setClick({ ...e.id });
          // }}
          // notProduct={false}
          // rowsPerPageOptions={[5, 10, 15, 20]}
          // onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}
          sx={{
            backgroundColor: "white !important",
            " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
          }}
        />
      </Container>
    </DashboardLayout>
  );
};

export default Offers;
