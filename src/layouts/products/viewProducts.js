import { Avatar, Box, Button, Chip, Divider, Icon, Stack, TextField, Typography,Dialog } from "@mui/material";
import DataGridCustom from "components/common/DateGridCustomer";
import { CUSTOMER } from "data/api";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useRequest from "hooks/useRequest";
import Tables from "layouts/tables";
import { CustomersTableData } from "layouts/tables/data/customerTabkeData";
import React, { useEffect, useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import "../tables/datagrid.css";
import Footer from "examples/Footer";
import Form from 'components/common/Form';

import ProjectsTableData from "layouts/tables/data/projectsTableData";
import { ProductTableData } from "layouts/tables/data/projecttableData";
import ProductImageDialog from "components/common/product/productImageDialog";
import SoftButton from "components/SoftButton";
import { useLocation, useNavigate } from "react-router-dom";
import SoftBox from 'components/SoftBox'
import Breadcrumbs from 'examples/Breadcrumbs'
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import PropTypes from "prop-types";
import useControls from "hooks/useControls";
import * as FileSaver from "file-saver"
import { PRODUCTS ,EXPORTPRODUCT} from "data/api";
import XLSX from "sheetjs-style"
import usePermission from 'utils/usePermission';
import SoftInput from "components/SoftInput";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { MainButton } from "styles/productStyle";
import { PrintButton } from "styles/productStyle";
function Products({ absolute, light, isMini }) {
  const { columns, rows } = ProductTableData();
  let permissionYour = useSelector((state) => state.permissionYour.value)
  let newForm=new FormData()
  const [openDialog,setOpenDialog]=useState(false)
  let refInput=useRef(null)
  const [open, setOpen] = React.useState(false);
  const products=useSelector((state)=>state.products.value)
  const navigate =useNavigate()
  const route = useLocation().pathname.split("/").slice(1);
  const sub_domain = localStorage.getItem('sub_domain')
  const handleClose = () => setOpen(false);
  let {isPermitted}=usePermission()

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 8,
  });
  let dispatch = useDispatch();
  let Token = localStorage.getItem("token");
  const [RequestGetProducts, ResponseGetProducts] = useRequest({
    path: PRODUCTS,
    method: "get",
    Token: `Token ${Token}`,
  });
  const [RequestDeleteProducts, ResponseDeleteProducts] = useRequest({
    path: PRODUCTS,
    method: "delete",
    Token: `Token ${Token}`,
  });
  const [exportProductsFile, exportProductsResponce] = useRequest({
    path: EXPORTPRODUCT,
    method: "post",
    Token: `Token ${Token}`,
    contentType: "multipart/form-data",
  });
  const [customerDeleteRequest, DeleteCustomerrResponce] = useRequest({
    path: CUSTOMER,
    method: "delete",
  });
  
  function onDelete(row) {

    RequestDeleteProducts({
      id: row,
      onSuccess: () => {
        dispatch({ type: "products/deleteItem", payload: {id:row} })
      },
    });
  }
  function onEdit(row,newRow) {
   
    localStorage.setItem('productId', row);

    navigate(`/${sub_domain}/dashboard/products/addnewproduct`,{state:{id:row}})
  }
  // let [rows, setRows] = useState([])

  // const columns = [
  //     {
  //       field: 'image',
  //       headerName: 'image',
  //       type: 'image',
  //       width: 50,
  //       align: 'left',
  //       headerAlign: 'left',
  //       renderCell: (params) => <Avatar src={params.row.image} />,
  //       editable: true,
  //     }
  //     , {
  //       field: 'full_name',
  //       headerName: 'full_name',
  //       type: 'text',
  //       width: 400,
  //       align: 'left',
  //       headerAlign: 'left',
  //       editable: true,
  //       renderCell:(params)=><Box sx={{display:"flex",flexDirection:"column"}}>
  //         <Typography component={"h3"} sx={{color:"#673ab7",}}>{params.row.full_name}</Typography>
  //         <Typography component={"p"}>{params.row.email} </Typography>

  //       </Box>
  //     },
  //     //  {
  //     //   field: 'email',
  //     //   headerName: 'email',
  //     //   type: 'email',
  //     //   width: 150,
  //     //   align: 'left',
  //     //   headerAlign: 'left',
  //     //   editable: true,

  //     // },
  //     {
  //       field: 'phone',
  //       headerName: 'phone',
  //       type: 'text',
  //       width: 150,
  //       align: 'left',
  //       headerAlign: 'left',
  //       editable: true,
  //     },

  //   ]
  function handleCloseDialog(){
    setOpenDialog(false)
  }
  function ExportResult(){
    const ws=XLSX.utils.json_to_sheet(rows)
    const wb={Sheets:{"data":ws},SheetNames:["data"]}
    const excelBuffer=XLSX.write(wb,{bookType:"xlsx",type:"array"})
    const data=new Blob([excelBuffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"})
    FileSaver.saveAs(data,"data.xlsx")
  }
  function handleDownloadModel(){
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["name","price","sku","quantity","mpn","gtin","description","main_image","brand","images"]
    ]);
    const headerStyle = {
      fill: {
        bgColor: "black", // Light blue background color
      },
      font: {
        color: { rgb: "000000" }, // Black font color
        bold: true,
      },
    };
    // XLSX.utils.sheet_set_range_style(ws, "A1:H1", headerStyle);
  // XLSX.utils.sheet_to_txt
    XLSX.utils.book_append_sheet(wb, ws, "productSheet");

    XLSX.writeFile(wb, "productSheet.xls");
  }
  function handleSubmit(){
    exportProductsFile({
      body:newForm,
      onSuccess:(res)=>{
        RequestGetProducts({
          params:{page:paginationModel?.page+1},
          onSuccess: (res) => {
            // console.log(res.data)
            dispatch({ type: "products/set", payload: { ...res.data } });
            handleCloseDialog()
          },
        });
        console.log(res.data)
      }
    })
    // refInput.current.click()
  }
  function exportProductfile(e){
    newForm.append("file",e.target.files[0])
   
  }
  useEffect(() => {
    RequestGetProducts({
      params:{page:paginationModel?.page+1},
      onSuccess: (res) => {
        // console.log(res.data)
        dispatch({ type: "products/set", payload: { ...res.data } });
      },
    });
  }, [paginationModel?.page]);
  // useEffect(() => {
  //     setRows(customers?.results);
  //   }, [customers])


  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <Box sx={{px:'24px'}}>
        <SoftBox mb={{
                    xs: 1, md: 0, display: "flex", justifyContent: "flex-end",
                    alignItems: "center"
                }} sx={{ textAlign: "right" }}>
                  {/*  */}
                
                    <Button onClick={()=>setOpenDialog(true)} 
                        sx={{
                            backgroundColor: "white !important",
                            color: "black !important", marginX: "10px", padding: "13px 16px"
                        }}>
                        {/* <LocalPrintshopIcon /> */}
                        Import
                    </Button>
                    <Box
          component="input"
          type="file"
          sx={{ display: "none" }}
          onChange={exportProductfile}
          ref={refInput}
          accept={".xlsx,.xls"}
        />
                    {/* <Box component={"input"} type="file"onChange={(e)=>exportProductfile(e)} sx={{display:"none"}} ref={refInput} /> */}
                    <Button onClick={ExportResult}
                        sx={{
                            backgroundColor: "white !important",
                            color: "black !important", marginX: "10px", padding: "13px 16px"
                        }}>
                        {/* <LocalPrintshopIcon /> */}
                        Export
                    </Button>
                  
                    <Divider orientation="vertical" sx={{ width: '1px', height: "72px" }} />
                   {permissionYour.map((ele)=>ele.codename).includes("add_product")&& <SoftButton variant="gradient"
                        sx={{
                            backgroundColor: (theme) => theme.palette.purple.middle,
                            color: "white !important", "&:hover": {
                                backgroundColor: (theme) => theme.palette.purple.middle
                            }, padding: "7px 16px 7px 16px"
                        }}
                        onClick={() => {navigate(`/${sub_domain}/dashboard/products/addnewproduct`); localStorage.removeItem('productId');}}
                    >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Add new product
                    </SoftButton>} 
                   
                </SoftBox>
            {/* <Box sx={{p:'16px',bgcolor:'#fff',mt:'24px'}}>
              <TextField sx={{height:'41px',borderRadius:'4px',width:'100%'}} placeholder="Search product name,SKU..."/>
              <Stack direction="row" spacing={1} mt={1}>
      <Chip
        label="Price between : 100 up to 200"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="out of stock"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </Stack>
            </Box> */}
        <DataGridCustom
          rows={products?.results}
          columns={columns}
          loading={ResponseGetProducts.isPending}
          rowCount={products?.count}
          onDialog={isPermitted(onEdit,["change_product"])}

          onDelete={isPermitted(onDelete,["delete_product"])}

          checkboxSelection={true}
          onRowClick={(e,row) => {
           
            // setClick({ ...e.id });
          }}
          // notProduct={false}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowHeight={72}
          getRowSpacing={4}
          sx={{ backgroundColor: "white !important", " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" } }}
        />
        </Box>
        <ProductImageDialog open={open} onClose={handleClose} />
        <Footer />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <Form component="form"
                        childrenProps={{
                            saveBtn: {
                                onClick: handleSubmit,
                                disabled: exportProductsResponce.isPending,
                            },
                            closeBtn: {
                                onClick: () => {
                                  handleCloseDialog();
                                    // resetControls();
                                },
                                disabled: exportProductsResponce.isPending,
                            }
                        }}>
                            <Button onClick={handleDownloadModel}
                        sx={{
                            backgroundColor: (theme)=>theme.palette.purple.middle,
                            color: "white !important", marginX: "10px", padding: "13px 16px",
                            ":hover":{color: "black !important",border:"1px solid gray"}
                        }}>
                        {/* <LocalPrintshopIcon /> */}
                        Export
                    </Button>
                    <input
                                    id="images_product"
                                    type="file"
                                    accept={".xlsx,.xls"}
                                    onChange={exportProductfile} 
                                    style={{border:"1px solid #E5E7E8",padding:"10px 16px"}}
                                />

                        {/* <TextField

                            // id="filled-size-small"
                            placeholder='title'
                            variant="standard"
                            size="small"
                            value={controls.title}
                            onChange={(e) =>
                                setControl("title", e.target.value)
                            }
                            required={required.includes("title")}
                            error={Boolean(invalid?.title)}
                            helperText={invalid?.title}
                        /> */}


                        {/* <PictureField placeholder={"add image profile"}
                        error={Boolean(invalid.image)}
                        helperText={invalid.image}
                        required={required.includes("image")}
                        label={"profile"} accept={"image/*"} onChange={handleImageChange} value={selectedImage} /> */}
                    </Form>


                </Dialog>
      </DashboardLayout>
      {ResponseGetProducts.successAlert}
      {ResponseGetProducts.failAlert}
      {ResponseDeleteProducts.failAlert}
      {exportProductsResponce.failAlert}
    </>
  );
}

export default Products;
Products.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Products
Products.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};