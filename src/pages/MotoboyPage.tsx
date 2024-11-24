import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useParams } from 'react-router-dom';
import { order_mock } from '../data/order';

interface Delivery {
  id: number;
  motoboyId: number;
  nomeDoProduto: string;
  enderecoColeta: {
    descricao: string;
    latitude: number;
    longitude: number;
  };
  enderecoEntrega: {
    descricao: string;
    latitude: number;
    longitude: number;
  };
  valor: number;
  peso: number;
  data: string;
}

const MotoboyPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const { motoboyId } = useParams<{ motoboyId: string }>();

  useEffect(() => {
    const filteredDeliveries = order_mock.filter((order) => order.motoboyId === Number(motoboyId));
    setDeliveries(filteredDeliveries);
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
                    <ListItem>
                      <IconButton edge="start">
                        <LocationOnIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Endereço de Retirada"
                        secondary={delivery.enderecoColeta.descricao}
                      />
                    </ListItem>
                    <ListItem>
                      <IconButton edge="start">
                        <LocationOnIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Endereço de Entrega"
                        secondary={delivery.enderecoEntrega.descricao}
                      />
                    </ListItem>
                    <ListItem>
                      <IconButton edge="start">
                        <AccessTimeIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Data"
                        secondary={new Date(delivery.data).toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <IconButton edge="start">
                        <ReceiptIcon sx={{ color: '#06486b' }} />
                      </IconButton>
                      <ListItemText
                        primary="Valor do Frete"
                        secondary={`R$ ${delivery.valor.toFixed(2)}`}
                      />
                    </ListItem>
                  </List>
                  <Divider sx={{ margin: '10px 0' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DirectionsBikeIcon sx={{ marginRight: '8px', color: '#06486b' }} />
                    <Typography variant="body2" sx={{ color: '#06486b' }}>
                      Em Andamento
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
