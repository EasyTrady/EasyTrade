import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
// import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item }) => {
  const theme = useTheme();

  const { pathname } = useLocation();
 let navigate= useNavigate()


  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: 8,
        height: 8
      }}
      fontSize={'inherit'}
    />
  );

 


  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={'_self'} />)
  };
  if (item?.external) {
    listItemProps = { component: Link, to: item.url, target: '_self' };
  }

  const itemHandler = (item) => {
  
    navigate({to:item.path})
    // dispatch({ type: MENU_OPEN, id });
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
//   useEffect(() => {
//     console.log(document.location.pathname
//       .toString()
//       .split('/')
//      )
//     const currentIndex = document.location.pathname
//       .toString()
//       .split('/')
//       .findIndex((id) => id === item.id);
//     if (currentIndex > -1) {
//     //   dispatch({ type: MENU_OPEN, id: item.id });
//     }
//     // eslint-disable-next-line
//   }, [pathname]);

  return (
    <ListItemButton
     
      sx={{
        borderRadius: `5px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor:'transparent !important',
        py:1,
        pl: `${24}px`
      }}
    
    
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        onClick={(e) => console.log(e.target)}
        primary={
          <Typography component={Link}  color={(theme)=>theme.palette.grey[600]} to={item.path} sx={{    fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 0,}}>
            {item.title}
          </Typography>
        }
        
      />
     
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,

};

export default NavItem;