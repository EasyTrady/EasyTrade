import { Box, Icon, IconButton, OutlinedInput, Input, InputAdornment, FormControl, Menu, MenuItem, Typography, InputLabel, TextField, Button } from "@mui/material";

import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';

import input from "assets/theme/components/form/input";
import PropTypes from "prop-types";

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BlockIcon from '@mui/icons-material/Block';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  GridRowModes,
  DataGrid,
  // GridToolbarContainer,
  // GridActionsCellItem,
  GridRowEditStopReasons,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";
import compare from "../../utils/compare";
import CustomPagination from "./Pagination";
import Select from '@mui/material/Select';
import SoftButton from "components/SoftButton";
import MenuCustom from "assets/theme/components/menu";
import SoftInput from "components/SoftInput";
import DeleteIcon from "examples/Icons/DeleteIcon";
import EditIcon from "examples/Icons/EditIcon";
import { Chip,  Stack } from "@mui/material";

function DataGridCustom({ rows, columns, onRowClick, isRowSelectable,
  checkboxSelection, onEdit,onDialog, onDelete, onBlock,sx, rowsPerPageOptions, notProduct = true, onState,
  onNotify,onFilter,
  onCopy, onPaginationModelChange, ...rest }) {
  const [, setRows] = React.useState(rows);
  let { t } = useTranslation("common")

  let refSelect = React.useRef()
  const [status, setStatus] = React.useState(false)
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    onEdit(id)
  };
  const handleDialogClick = (id,row) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log(id,row.row)
    onDialog(id,row?.row)
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    onDelete(id)
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    // console.log(rows.filter((ele) => ele.id == newRow.id).map((elem) => Object.keys(elem).map((eleme) => ([newRow[eleme], elem[eleme], eleme]))))

    // let isThereChange = compare(rows.filter((ele) => ele.id == newRow.id).map((elem) => Object.keys(elem).map((eleme) => ([newRow[eleme], elem[eleme], eleme]))))

    // if(isThereChange.nochange){
    //   console.log(isThereChange.array)
    // }
    onEdit(newRow.id,updatedRow?updatedRow:newRow)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columnsResult =Boolean(onEdit||onNotify||onBlock||onDelete)?[
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName:"Action",
      width: 200,
      cellClassName: 'actions',
      getActions: (row) => {
        const isInEditMode = rowModesModel[row?.id]?.mode === GridRowModes.Edit;
        const [open, setOpen] = React.useState()
        // console.log( Boolean(onEdit||onNotify||onBlock||onDelete))
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={row.id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(row?.id, row)}
            />,
            <GridActionsCellItem
              key={row.id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row?.id)}
              color="inherit"
            />,
          ];
        }

        return [
          // onEdit && notProduct ? <GridActionsCellItem
          //   key={row.id}
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(row?.id, row)}
          //   color="inherit"
          // /> : <></>,
          // onDelete && notProduct ? <GridActionsCellItem
          //   key={row.id}
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(row?.id)}
          //   color="inherit"
          // /> : <></>, onState ? <><SoftBadge variant="gradient" badgeContent="online" color={status ? "secondary" : "success"} size="xs" container /></> : <></>,
          // onCopy && notProduct ? <><GridActionsCellItem
          //   key={row.id}
          //   icon={<ContentCopyIcon />}
          //   label="copy"
          //   className="textPrimary"
          //   onClick={onCopy}
          //   color="inherit"
          // /></> : !notProduct ? <>
          //   <SoftSelect ref={refSelect} sx={{...input,width:"100%"}}
          //     >
          //     <option> <GridActionsCellItem
          //       key={row.id}
          //       icon={<DeleteIcon />}
          //       label="Delete"
          //       onClick={handleDeleteClick(row?.id)}
          //       color="inherit"
          //     /></option>
          //     <option> <GridActionsCellItem
          //       key={row.id}
          //       icon={<EditIcon />}
          //       label="Edit"
          //       className="textPrimary"
          //       onClick={handleEditClick(row?.id, row)}
          //       color="inherit"
          //     /></option>
          //     <option><GridActionsCellItem
          //       key={row.id}
          //       icon={<ContentCopyIcon />}
          //       label="copy"
          //       className="textPrimary"
          //       onClick={onCopy}
          //       color="inherit"
          //     /></option>
          //   </SoftSelect>
          // </> : <></>,
          <>
            <SoftButton variant="outlined" key={0} color="dark" onClick={(event) => Boolean(open) ? setOpen(null) : setOpen(event.currentTarget)}
              sx={{
                border: "unset", borderRadius: "50%",
                padding: "0", backgroundColor: Boolean(open) ? "#4A81CA" : "#ECF4FA", minWidth: "40px", height: "40px",
                "&:hover": {
                  backgroundColor: `${ Boolean(open) ? "#4A81CA" : "#ECF4FA"} !important`,
                  border:"unset"
                },"&:focus":{
                  backgroundColor: "unset !important",
                  border:"unset",
                  boxShadow:"unset !important"
                }
              }}>
              <MoreVertIcon sx={{ color: Boolean(open) ? "#ffff" : "#4A81CA" }} />

            </SoftButton>
            
            <MenuCustom anchor={open} open={Boolean(open)}>
              {onEdit && notProduct && <MenuItem onClick={() => setOpen(null)}>
                <GridActionsCellItem
                  key={row.id}
                  icon={<Box><EditIcon /> <span>edit</span></Box>}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(row?.id, row)}
                  color="inherit"
                />
              </MenuItem>}
              {onDialog && notProduct && <MenuItem onClick={() => setOpen(null)}>
                <GridActionsCellItem
                  key={row.id}
                  icon={<Box sx={{display:"flex",alignItems:"center" }}><EditIcon /> <span>edit</span></Box>}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleDialogClick(row?.id, row)}
                  color="inherit"
                />
              </MenuItem>}
              {onNotify && notProduct && <MenuItem onClick={() => setOpen(null)}>
                <GridActionsCellItem
                  key={row.id}
                  icon={<Box><NotificationsIcon /> <span>Notify client</span></Box>}
                  label="Notify client"
                  className="textPrimary"
                  onClick={() => onNotify(row)}
                  color="inherit"
                />
              </MenuItem>}
              {onBlock&& notProduct && <MenuItem onClick={() => setOpen(null)}>
                <GridActionsCellItem
                  key={row.id}
                  icon={<Box><BlockIcon /> <span>{t("Block")}</span></Box>}
                  label={t("Block")}
                  className="textPrimary"
                  onClick={() => onBlock(row.id,row)}
                  color="inherit"
                />
              </MenuItem>}
              {onDelete && notProduct && <MenuItem onClick={() => setOpen(null)} >
                <GridActionsCellItem
              
                  key={row.id}
                  icon={<Box sx={{ color: (theme) => theme.palette.error.main,display:"flex",alignItems:"center" }}><DeleteIcon sx={{ color: (theme) => theme.palette.error.main }} /><span>Delete</span></Box>}
                  label="Delete"
                  onClick={handleDeleteClick(row?.id)}
                  color="inherit"
                ></GridActionsCellItem>
              </MenuItem>}
             

            </MenuCustom>
          </>
        ];
      },
    },
  ]:[...columns];
  const CustomRow = (props) => {
    const { className, selected, ...other } = props;
  console.log(className, selected,props)
    // Add your custom styles for selected rows
    const customStyles = selected ? { backgroundColor: 'lightblue', fontWeight: 'bold' } : {};
  
    return <div className={className} style={customStyles} {...other} />;
  };
  return (
    <>
              
    {/* <Box sx={{backgroundColor: "white !important",
    padding: "10px !important",marginY:"10px", ".MuiInputBase-root": { border: `1px solid !important`,borderColor:(theme)=>theme.palette.grey[400]+"!important" }, }}>
      <SoftInput
        id="outlined-adornment-password"
        type={'text'}
        value={""}
        sx={{".MuiInputBase-root":{ overflow: "hidden !important"}}}
        onChange={() => { }}
        InputProps={{
          startAdornment:
            (<InputAdornment sx={{ position: "absolute", left: "0" }}>
              <SoftInput
      select
      SelectProps={{
        defaultValue: "",
        displayEmpty: true,
        // onOpen: onOpen,
        // onClose: onClose,
        renderValue: (selected) => {
          if (!Boolean(selected)) {
            return (
              <Typography sx={{ color: "currentColor", opacity: "0.42",fontSize:"14px" }}>
                {"Filter By"}
              </Typography>
            );
          } else {
            return Boolean(renderValue) && typeof renderValue === "function"
              ? renderValue(selected)
              : selected;
          }
        },
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: "200px",
              overflowY: "auto",
             
            },
          },
        },
       
        // IconComponent: <KeyboardArrowDownIcon></KeyboardArrowDownIcon>,
        
      }}
    
    />
     
              
             
            </InputAdornment>)
        }}

      />
      </Box> */}
   {onFilter&&   <Box sx={{p:'16px',bgcolor:'#fff',mt:'24px'}}>
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
            </Box>}
      <Box>
        <Checkbox checked />
        <Typography sx={{ fontSize: "14px" }} variant="span">
          {t("Selected")}
        </Typography>
        {onDelete && <Typography sx={{ color: (theme) => theme.palette.error.main, fontSize: "14px", marginX: "10px" }} variant="span">
          {t("Deleted")}
        </Typography>}
        {onNotify && <Typography sx={{ color: (theme) => theme.palette.purple.middle, fontSize: "14px", marginX: "10px" }} variant="span">
          {t("Notifyclient")}
        </Typography>}
        {onEdit && <Typography sx={{ color: (theme) => theme.palette.purple.middle, fontSize: "14px", marginX: "10px" }} variant="span">
          {t("Edit")}
        </Typography>}
        {onBlock && <Typography sx={{ color: (theme) => theme.palette.purple.middle, fontSize: "14px", marginX: "10px" }} variant="span">
          {t("Block")}
        </Typography>}
      </Box>
      <Box
        sx={{
          height: rows?.length > 0 ? "auto" : 200,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          }, ...sx, marginY: "20px", borderRadius: "20px"
        }}
      >

        {/* {console.log(isRowSelectable, onRowClick, checkboxSelection)} */}
        <DataGrid
          rows={rows}

          columns={columnsResult}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          checkboxSelection={checkboxSelection}
          onRowClick={onRowClick}
          isRowSelectable={isRowSelectable}
          setPagination={true}

          // autoHeight={true}
        
          // initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10, 15]}
          sx={{
            ...sx, "& .css-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": {
              width: "15% !important"
            }, ".rtl-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": { maxWidth: "15% !important" }, ".MuiDataGrid-cell:focus": {
              outline: "unset !important"
            }, 
              backgroundColor: "white !important",
          
              borderRadius:"8px !important", '&.Mui-selected':{
                backgroundColor: "white !important",
              },overflowX: 'scroll', "& .MuiDataGrid-virtualScroller": {
                overflow: "auto"
              },"& .MuiDataGrid-row.Mui-selected":{
              backgroundColor: "#ECF4FA !important",

              }
            
          }}
         
  onPaginationModelChange={onPaginationModelChange}
          // onPaginationModelChange={onPaginationModelChange}
          {...rest}
          
          onProcessRowUpdateError={(error) => console.log(error)}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          // slotProps={{
          //   toolbar: { setRows, setRowModesModel },
          // }}
          rowHeight={72}
          // components={{
          //   Row: CustomRow,
          // }}
          rowSpacingType='margin'
          getRowSpacing={(params) => params === 4}

        />
      </Box></>
  );
}
export default DataGridCustom
DataGridCustom.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  isRowSelectable: PropTypes.bool,
  checkboxSelection: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  sx: PropTypes.object,
  rowHeight: PropTypes.number,
  rowsPerPageOptions: PropTypes.array, onPaginationModelChange: PropTypes.func,
  onState: PropTypes.func,
  onCopy: PropTypes.func,
  notProduct: PropTypes.bool,
  onNotify: PropTypes.func,
  onBlock:PropTypes.func,
  onDialog:PropTypes.func,
  className:PropTypes.string,
  selected:PropTypes.bool,onFilter: PropTypes?.func
};