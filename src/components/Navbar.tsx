import { Logout, PersonAdd } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/auth/authSlice";
import { RootState } from "../redux/store";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <React.Fragment>
      <Box
        bgcolor="violet"
        marginBottom={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          flexGrow: 1,
        }}
      >
        <AppBar position="static" color="transparent">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              color="darkviolet"
              marginTop={1}
              component="div"
              variant="h6"
            >
              My Notes
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                size="small"
                sx={{ ml: 2 }}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Avatar
                  sx={{ width: 32, height: 32, backgroundColor: "darkviolet" }}
                >
                  {currentUser.name[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        id="account-menu"
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>{`${currentUser.name.toUpperCase()} ${currentUser.surname.toUpperCase()}`}</MenuItem>

        <MenuItem>
          <Link to="/reg">
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </Link>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Navbar;
