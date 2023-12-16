import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";
// Data


function Customer({title,data}) {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Customer</MenuItem>
      <MenuItem onClick={closeMenu}>Cart items</MenuItem>
     
    </Menu>
  );

  return (
    <Card sx={{height:"276px",overflow:"auto"}}
    >
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
          {title}
          </SoftTypography>
          {/* <SoftBox display="flex" alignItems="center" lineHeight={0}>
            
            <SoftTypography variant="button" fontWeight="regular" color="text">
            5.987,34
            </SoftTypography>
          </SoftBox> */}
        </SoftBox>
        {/* <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </SoftBox> */}
        {renderMenu}
      </SoftBox>
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />

      </SoftBox>
    </Card>
  );
}

export default Customer;
Customer.defaultProps = {
  title:"",
  data:{}
};

// Typechecking props for the Customer
Customer.propTypes = {
  title: PropTypes?.string,
  data:PropTypes?.any
};