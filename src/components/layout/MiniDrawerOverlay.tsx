import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { PontoLocalLogo } from "../ui/PontoLocalLogo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeSwitch from "../ui/ButtonSwitch";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { LogoutModal } from "../modal/LogoutModal";
import { NotificationModal } from "../../components/modal/NotificationModal";
import type { Notification } from "../../types/notifications";
import notificationsData from "../../data/notifications.json";

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<{ open?: boolean; isMobile?: boolean }>(({ theme, open, isMobile }) => ({
  // width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(isMobile
    ? {
        "& .MuiDrawer-paper": {
          zIndex: 9999,

          boxSizing: "border-box",
        },
      }
    : {
        ...(open
          ? {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme),
            }
          : {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme),
            }),
      }),
}));

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Favoritos", icon: <FavoriteBorderIcon />, path: "/favorites" },
  { text: "Anunciar", icon: <AddIcon />, path: "/register-product" },
  { text: "Meu dashboard", icon: <ShoppingBagIcon />, path: "/dashboard" },
  { text: "Explorar produtos", icon: <SearchIcon />, path: "/explore" },
];

export default function MiniDrawer() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const theme = useTheme();
  const container = React.useRef<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenuPerfil = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("Ação: Usuário deslogado!");
    setLogoutModalOpen(false);
    setAnchorEl(null);
    navigate("/");
  };

  const [notificationModalOpen, setNotificationModalOpen] =
    React.useState(false);

  const [notifications, setNotifications] =
    React.useState<Notification[]>(notificationsData);

  const handleNotificationAction = (id: string | number) => {
    console.log(`Ação da notificação ID ${id} foi clicada!`);
    setNotificationModalOpen(false);
  };

  const handleDismissNotification = (id: string | number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notif) => notif.id !== id)
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          borderRadius: 0,
          bgcolor: "white",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar className="flex border-0 rounded-none">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
                zIndex: "999",
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon className="text-gray-500" />
          </IconButton>
          <Link to="/home">
            <PontoLocalLogo />
          </Link>

          <div className="flex items-center space-x-2 ml-auto">
            <DarkModeSwitch />
            <AccountCircleIcon />
          </div>

          <div className="md:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                className="flex items-center gap-2"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Avatar sx={{ bgcolor: "#728CCC" }}>J</Avatar>
                <div className="leading-tight hidden md:block">
                  <div className="text-sm font-semibold text-blue-3">
                    João Silva
                  </div>
                  <div className="text-xs text-gray-500">Comerciante</div>
                </div>
              </div>
            </div>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={openMenuPerfil}
            onClose={() => setAnchorEl(null)}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 2,
              },
            }}
          >
            <Link to="/profile">
              <MenuItem onClick={() => setAnchorEl(null)}>Meu Perfil</MenuItem>
            </Link>
            <MenuItem
              onClick={() => setLogoutModalOpen(true)}
              sx={{ color: "red" }}
            >
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <Drawer
        container={container.current}
        isMobile={isMobile}
        variant="permanent"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: 0,
            boxSizing: "border-box",
            transition: "transform 0.3s ease-in-out",
            ...(isMobile && {
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              transform: open ? "translateX(0)" : "translateX(-100%)",
              boxShadow: open ? "0 0 20px rgba(0,0,0,0.3)" : "none",
              width: "100%",
            }),
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
                onClick={handleDrawerClose}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ marginTop: "auto" }}>
            <Divider sx={{ my: 1 }} />
            <List>
              <ListItem
                key="help"
                disablePadding
                sx={{ display: "block" }}
                onClick={handleDrawerClose}
              >
                <ListItemButton
                  component={Link}
                  to="/faq"
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ajuda"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                key="notification"
                disablePadding
                sx={{ display: "block" }}
                onClick={handleDrawerClose}
              >
                <ListItemButton
                  onClick={() => setNotificationModalOpen(true)}
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    <CircleNotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notificação"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <NotificationModal
                isOpen={notificationModalOpen}
                onClose={() => setNotificationModalOpen(false)}
                notifications={notifications}
                onNotificationAction={handleNotificationAction}
                onNotificationDismiss={handleDismissNotification}
              />
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
