import { Box } from "@mui/material";

import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import input from "assets/theme/components/form/input";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  GridRowModes,
  DataGrid,
  // GridToolbarContainer,
  // GridActionsCellItem,
  GridRowEditStopReasons,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import SoftBadge from "components/SoftBadge";
import compare from "../../utils/compare";
import CustomPagination from "./Pagination";
import SoftSelect from "components/SoftSelect";
function DataGridCustom({ rows, columns, onRowClick, isRowSelectable,
  checkboxSelection, onEdit, onDelete, sx, rowsPerPageOptions, notProduct = true, onState, onCopy, onPaginationModelChange, ...rest }) {
  const [, setRows] = React.useState(rows);
  let refSelect = React.useRef()
  const [status, setStatus] = React.useState(false)
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

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
    let isThereChange = compare(rows.filter((ele) => ele.id == newRow.id).map((elem) => Object.keys(elem).map((eleme) => ([newRow[eleme], elem[eleme], eleme]))))

    // if(isThereChange.nochange){
    //   console.log(isThereChange.array)
    // }
    onEdit(newRow.id, isThereChange.array)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columnsResult = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (row) => {
        const isInEditMode = rowModesModel[row?.id]?.mode === GridRowModes.Edit;

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
          onEdit && notProduct ? <GridActionsCellItem
            key={row.id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row?.id, row)}
            color="inherit"
          /> : <></>,
          onDelete && notProduct ? <GridActionsCellItem
            key={row.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row?.id)}
            color="inherit"
          /> : <></>, onState ? <><SoftBadge variant="gradient" badgeContent="online" color={status ? "secondary" : "success"} size="xs" container /></> : <></>,
          onCopy && notProduct ? <><GridActionsCellItem
            key={row.id}
            icon={<ContentCopyIcon />}
            label="copy"
            className="textPrimary"
            onClick={onCopy}
            color="inherit"
          /></> : !notProduct ? <>
            <SoftSelect ref={refSelect} sx={{...input,width:"100%"}}
              >
              <option> <GridActionsCellItem
                key={row.id}
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(row?.id)}
                color="inherit"
              /></option>
              <option> <GridActionsCellItem
                key={row.id}
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(row?.id, row)}
                color="inherit"
              /></option>
              <option><GridActionsCellItem
                key={row.id}
                icon={<ContentCopyIcon />}
                label="copy"
                className="textPrimary"
                onClick={onCopy}
                color="inherit"
              /></option>
            </SoftSelect>
          </> : <></>,
        ];
      },
    },
  ];

  return (
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
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 15]}
        sx={{
          ...sx, "& .css-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": {
            width: "15% !important"
          }, "& .MuiTablePagination-select div.MuiInputBase-root": { maxWidth: "10%" }
        }}
        onPaginationModelChange={onPaginationModelChange}
        {...rest}
        onProcessRowUpdateError={(error) => console.log(error)}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel },
        // }}
        // rowHeight={rowHeight}

        rowSpacingType='margin'
        getRowSpacing={(params) => params === 4}
      />
    </Box>
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
  notProduct: PropTypes.bool
};