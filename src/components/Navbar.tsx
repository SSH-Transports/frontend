import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HistoryIcon from '@mui/icons-material/History'
import LogoutIcon from '@mui/icons-material/Logout'
import { useUserContext } from '../context/userContext'
import { UserRoles } from '../types/User'

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    }

  const { user } = useUserContext()

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#06486b' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LAP Informática
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
                  to="/motoboy-history"
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
                  toggleDrawer(false)
                  localStorage.setItem(`user`, ``)
                  localStorage.setItem(`token`, ``)
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
  )
}

export default Navbar
