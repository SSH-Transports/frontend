import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

const Notifications: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulação da chamada para o backend
  useEffect(() => {
    // Substituir por uma chamada para o backend
    const fetchNotifications = async () => {
      // Substituir com o código real para buscar notificações do backend
      // Exemplo: const response = await fetch('/api/notifications');
      // const data = await response.json();

      // Simulação de dados vindos do backend
      const notificationsFromBackend = [
        'Pedido #1234 foi concluído.',
        'Atualização disponível.',
      ];

      // Atualiza o estado com as notificações recebidas do backend
      setNotifications(notificationsFromBackend);
    };

    fetchNotifications();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    handleMenuClose();
  };

  const menuOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        aria-label="notifications"
        aria-controls="notification-menu"
        aria-haspopup="true"
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 200,
              width: '300px',
            },
          },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleMenuClose}>
              <ListItemIcon>
                <MailIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{notification}</Typography>
              </ListItemText>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">
              Sem notificações.
            </Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleClearNotifications}>
          <Typography variant="body2" color="secondary">
            Limpar todas as notificações
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Notifications;
