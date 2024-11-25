import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Card, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import getCourierOrders from '../services/getCourierOrders';
import { Order, OrderStatusNames } from '../types/Order';
import dayjs from 'dayjs';

const MotoboyPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Order[]>([]);
  const { motoboyId } = useParams<{ motoboyId: string }>();

  const fetchDeliveries = async (motoboyId: string) => {
    const response = await getCourierOrders(motoboyId);
    
    if (response) {
      setDeliveries(response);
    }
  }

  useEffect(() => {
    console.log(motoboyId);

    if (motoboyId) {
      fetchDeliveries(motoboyId);
    }
  }, [motoboyId]);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        Histórico de Corridas - Motoboy {motoboyId}
      </Typography>

      <Grid container spacing={3}>
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <Grid item xs={12} sm={6} md={4} key={delivery.id}>
              <Card sx={{ backgroundColor: '#fff', boxShadow: 3, borderRadius: '8px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Pedido #{delivery.id}
                  </Typography>
                  <List>
                    {/* <ListItem>
                      <IconButton edge="start">
                        <LocationOnIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Endereço de Retirada"
                        secondary={delivery.latitude}
                      />
                    </ListItem> */}
                    <ListItem>
                      <IconButton edge="start">
                        <LocationOnIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Endereço de Entrega"
                        secondary={`${delivery.latitude}, ${delivery.longitude}`}
                      />
                    </ListItem>
                    <ListItem>
                      <IconButton edge="start">
                        <AccessTimeIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Data"
                        secondary={dayjs(delivery.createdAt).format('DD/MM/YYYY')}
                      />
                    </ListItem>
                    <ListItem>
                      <IconButton edge="start">
                        <ReceiptIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Valor do Frete"
                        secondary={`R$ ${delivery.cost.toFixed(2)}`}
                      />
                    </ListItem>
                  </List>
                  <Divider sx={{ margin: '10px 0' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DirectionsBikeIcon sx={{ marginRight: '8px', color: '#06486b' }} />
                    <Typography variant="body2" sx={{ color: '#06486b' }}>
                      {OrderStatusNames[delivery.status]}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#888' }}>
              Não há corridas para este motoboy.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MotoboyPage;
