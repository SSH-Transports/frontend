import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  AppBar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useUserContext } from '../context/userContext';
import api from '../services/api';
import { Notification, NotificationStatus } from '../types/Notification';
import { UserRoles } from '../types/User';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user, logout } = useUserContext();

  const socket = io('http://localhost:8080');

  const fetchNotifications = async () => {
    if (!user?.id) return;
    try {
      const response = await api(`/notifications/${user.id}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  const readNotification = async () => {
    try {
      const filteredNotifications = notifications.filter(({ status }) => {
        return status === 'UNREAD';
      }).map(({ id }) => id);

      socket.emit('markAsRead', filteredNotifications);

      setNotifications((prev) =>
        prev.map((notification) => {
          if (filteredNotifications.includes(notification.id)) {
            return { ...notification, status: NotificationStatus.READ };
          }
          return notification;
        })
      );
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  }

  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    fetchNotifications();

    socket.on('notification', (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off('notification');
    };
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      readNotification();
    }
  }, [menuOpen]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#06486b' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LAP Informática
          </Typography>

          {user && (
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="notifications"
              aria-controls="notification-menu"
              aria-haspopup="true"
            >
              <Badge badgeContent={notifications.filter(({ status }) => {
                return status === 'UNREAD';
              }).length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
          <Menu
            id="notification-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
                width: '300px',
              },
            }}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index} onClick={handleMenuClose}>
                  <ListItemIcon>
                    <MailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText>{notification.message}</ListItemText>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Typography variant="body2" color="textSecondary">
                  Sem notificações.
                </Typography>
              </MenuItem>
            )}
          </Menu>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar >
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#2c3e50',
            color: 'white',
          },
        }}
      >
        <Box sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h6">LAP Informática</Typography>
        </Box>
        <Divider sx={{ backgroundColor: '#7f8c8d' }} />
        <List>
          {!user ? (
            <>
              <ListItem
                component={Link}
                to="/login"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>
                  <LoginIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Login" sx={{ color: '#ecf0f1' }} />
              </ListItem>

              <ListItem
                component={Link}
                to="/signup"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>
                  <PersonAddIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Cadastro" sx={{ color: '#ecf0f1' }} />
              </ListItem>
            </>
          ) : (
            <>
              {user.role === UserRoles.ADMIN && (
                <ListItem
                  component={Link}
                  to="/dashboard"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: '#ecf0f1' }} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ color: '#ecf0f1' }} />
                </ListItem>
              )}
              {user.role === UserRoles.ADMIN && (
                <ListItem
                  component={Link}
                  to="/admin"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon sx={{ color: '#ecf0f1' }} />
                  </ListItemIcon>
                  <ListItemText primary="Admin" sx={{ color: '#ecf0f1' }} />
                </ListItem>
              )}
              {[UserRoles.ADMIN, UserRoles.CUSTOMER].includes(user.role) && (
                <ListItem
                  component={Link}
                  to="/delivery-form"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <AddShoppingCartIcon sx={{ color: '#ecf0f1' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Solicitar pedido"
                    sx={{ color: '#ecf0f1' }}
                  />
                </ListItem>
              )}
              {[UserRoles.ADMIN, UserRoles.COURIER].includes(user.role) && (
                <ListItem
                  component={Link}
                  to="/order/:id"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#ecf0f1' }} />
                  </ListItemIcon>
                  <ListItemText primary="Pedido" sx={{ color: '#ecf0f1' }} />
                </ListItem>
              )}
              {[UserRoles.ADMIN, UserRoles.COURIER].includes(user.role) && (
                <ListItem
                  component={Link}
                  to={`/motoboy/${user?.id}`}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <HistoryIcon sx={{ color: '#ecf0f1' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Histórico de pedidos"
                    sx={{ color: '#ecf0f1' }}
                  />
                </ListItem>
              )}
              <ListItem
                component={Link}
                to="/login"
                onClick={() => {
                  toggleDrawer(false);
                  logout();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Sair" sx={{ color: '#ecf0f1' }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
