import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div>
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/motoboy">
          <ListItemText primary="Motoboy" />
        </ListItem>
        <ListItem component={Link} to="/admin">
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
