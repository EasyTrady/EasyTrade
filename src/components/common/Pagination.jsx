// const CustomPagination = ({ paginationProps }) => {
//     const { pageSize, setPageSize, rowCount } = paginationProps;
  
//     const handlePageSizeChange = (event) => {
//       setPageSize(parseInt(event.target.value, 10));
//     };
  
//     return (
//       <GridToolbar>
//         <FormControl size="small">
//           <InputLabel id="rows-per-page-label">Row per page:</InputLabel>
//           <Select
//             labelId="rows-per-page-label"
//             value={pageSize}
//             onChange={handlePageSizeChange}
//           >
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={20}>20</MenuItem>
//             {/* Add more options as needed */}
//           </Select>
//         </FormControl>
//         <div style={{ flex: '1 1 100%' }} />
//         <div>{`${rowCount} ${rowCount === 1 ? 'row' : 'rows'}`}</div>
//       </GridToolbar>
//     );
//   };
// export default CustomPagination
// CustomPagination.P