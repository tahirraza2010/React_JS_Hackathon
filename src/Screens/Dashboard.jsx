import * as React from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, ExpandLess, ExpandMore } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import logo from "../assets/Logo2.webp";
import { toast } from "react-toastify";

const NAVIGATION = [
  {
    title: "Services",
    icon: <InboxIcon />,
    children: [
      { title: "Service", path: "/dashboard/service" },
    ],
  },
  {
    title: "Constumers",
    icon: <InboxIcon />,
    children: [
      { title: "Constumer Details", path: "/dashboard/costumers" },
    ],
  },
  {
    title: "Rooms",
    icon: <InboxIcon />,
    children: [
      { title: "Room", path: "/dashboard/rooms" },
    ],
  },
  {
    title: "Booked Rooms",
    icon: <InboxIcon />,
    children: [
      { title: "Booked", path: "/dashboard/booking" },
    ],
  },
  {
    title: "Pyment",
    icon: <InboxIcon />,
    children: [
      { title: "Pyment", path: "/dashboard/payment" },
    ],
  },
  // {
  //   title: "Class",
  //   icon: <InboxIcon />,
  //   children: [
  //     { title: "Class Add", path: "/dashboard/class/add" },
  //     { title: "Class List", path: "/dashboard/class/list" },
  //   ],
  // },
  // {
  //   title: "Admission",
  //   icon: <InboxIcon />,
  //   children: [
  //     { title: "AdmissionForm", path: "/dashboard/admission-form" },
  //   ],
  // },
  // {
  //   title: "Fees",
  //   icon: <InboxIcon />,
  //   children: [
  //     { title: "FeeSturcture", path: "/dashboard/fee-structure" },
  //     { title: "FeeVoucher", path: "/dashboard/fee-voucher" },
  //     { title: "FeeSubmission", path: "/dashboard/fee-submition" },
  //   ],
  // },
  // {
  //   title: "Exams",
  //   icon: <InboxIcon />,
  //   children: [
  //     { title: "Exam Schedule", path: "/dashboard/exam-shedule" },
  //     { title: "Exam Result", path: "/dashboard/exam-result" },
  //   ],
  // },
];

export default function ResponsiveDrawer() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenus, setOpenMenus] = useState({});

  const handleHistory=()=>{
    navigate("/dashboard/history");
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleMenuToggle = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    toast.success('Logout Successfully')
    navigate("/home");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Avatar alt="User" src={logo} sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Atlas Hotel
          </Typography>
          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar>H</Avatar>
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={handleHistory}>History</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: mobileOpen ? 240 : 0,
          flexShrink: 0,
          transition: "width 0.3s",
          [`& .MuiDrawer-paper`]: {
            width: mobileOpen ? 240 : 0,
            transition: "width 0.3s",
            overflowX: "hidden",
            zIndex: 1,
          },
        }}
      >
        <List sx={{ marginTop: "60px" }}>
          {NAVIGATION.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuToggle(item.title)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {mobileOpen && <ListItemText primary={item.title} />}
                  {item.children && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.children && (
                <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((subItem, subIndex) => (
                      <ListItemButton key={subIndex} sx={{ pl: 4 }} onClick={() => handleNavigation(subItem.path)}>
                        <ListItemText primary={subItem.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: `calc(100% - ${mobileOpen ? 240 : 0}px)`,
          transition: "width 0.3s",
          zIndex: 0,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
