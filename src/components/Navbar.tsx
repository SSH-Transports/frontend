import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  return (
    <>
      <AppBar position="static">
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
            width: 210, 
          },
        }}
      >
        <List>
          <Typography variant="h6" paddingLeft="16px" sx={{ flexGrow: 1 }}>
            LAP Informática
          </Typography>
          <ListItem component={Link} to="/login" onClick={toggleDrawer(false)}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem component={Link} to="/signup" onClick={toggleDrawer(false)}>
            <ListItemText primary="Cadastro" />
          </ListItem>
          <ListItem component={Link} to="/dashboard" onClick={toggleDrawer(false)}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/admin" onClick={toggleDrawer(false)}>
            <ListItemText primary="Admin" />
          </ListItem>
          <ListItem component={Link} to="/delivery-form" onClick={toggleDrawer(false)}>
            <ListItemText primary="Solicitar pedido" />
          </ListItem>
          <ListItem component={Link} to="/order/:id" onClick={toggleDrawer(false)}>
            <ListItemText primary="Pedido" />
          </ListItem>
          <ListItem component={Link} to="/motoboy-history" onClick={toggleDrawer(false)}>
            <ListItemText primary="Histórico de pedidos" />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Navbar
