import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LockIcon from "@material-ui/icons/Lock";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FolderIcon from "@material-ui/icons/Folder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import firebase from "firebase";

import { selectCart } from "./../../../redux/reducers/CartSlice";
import { selectAuth } from "./../../../redux/reducers/AuthSlice";
import useStyles from "./../../../css/style";
import "./../../../css/App.css";
import Fire from "../../../lib/firebaseConfig";

function ProminentAppBar(props) {
  const { history, pageName, location } = props;
  const cart = useSelector(selectCart);
  const { currentUser, isLoggedIn } = useSelector(selectAuth);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuEl, setMenuEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({ left: false });
  const anchor = "";
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const drawerLinks = [
    { text: "Home", icon: <HomeIcon />, onClick: () => history.push("/") },
    {
      text: "Explore",
      icon: <DashboardIcon />,
      onClick: () => history.push("/explore"),
    },
    {
      text: "Reserved",
      icon: <LockIcon />,
      onClick: () => history.push("/reserved_products"),
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    console.log("isLoggedIn? ", isLoggedIn);
    return () => {};
  }, []);

  // Web
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn &&
        currentUser.map((item) => {
          const { displayName } = item;
          return (
            <MenuItem
              onClick={() => {
                history.push("/profile");
                handleMenuClose();
              }}
            >
              {displayName}
            </MenuItem>
          );
        })}
      <MenuItem
        onClick={() => {
          history.push("/cart");
          handleMenuClose();
        }}
      >
        My account
      </MenuItem>
    </Menu>
  );

  // Mobile
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/cart");
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      {isLoggedIn &&
        currentUser.map((item) => {
          const { key, displayName, avatar } = item;
          return (
            <MenuItem
              key={key}
              onClick={() => {
                history.push("/profile");
                handleMobileMenuClose();
              }}
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                {avatar !== null ? (
                  <AccountCircle />
                ) : (
                  <Avatar
                    className={classes.smallAvatar}
                    alt="My Avatar"
                    src={avatar}
                  />
                )}
              </IconButton>
              <p>{displayName}</p>
            </MenuItem>
          );
        })}
      {firebase.auth().currentUser !== null ? (
        <MenuItem>
          <IconButton
            aria-label="logout"
            color="inherit"
            onClick={() => {
              Fire.shared.signOut();
              history.push("/");
            }}
          >
            <ExitToAppIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <div></div>
      )}
    </Menu>
  );

  // Drawer
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerLinks.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              <ListItemIcon className={classes.listItem}>{icon}</ListItemIcon>
              <ListItemText className={classes.listItem} primary={text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "#00675b" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
            {anchor}
          </IconButton>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => history.push("/cart")}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isLoggedIn && (
              <IconButton
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => history.push("/profile")}
                color="inherit"
              >
                {currentUser && <AccountCircle />}
              </IconButton>
            )}
            {firebase.auth().currentUser !== null && (
              <Button
                color="inherit"
                onClick={() => {
                  Fire.shared.signOut();
                  history.push("/");
                }}
              >
                Logout
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default withRouter(ProminentAppBar);
