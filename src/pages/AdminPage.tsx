import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

interface Delivery {
  _id: string;
  description: string;
}

interface Motoboy {
  _id: string;
  name: string;
}

const AdminPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [motoboys, setMotoboys] = useState<Motoboy[]>([]);
  const [selectedMotoboy, setSelectedMotoboy] = useState<string>('');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('/api/deliveries');
        setDeliveries(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    };

    const fetchMotoboys = async () => {
      try {
        const response = await axios.get('/api/motoboys');
        setMotoboys(response.data);
      } catch (error) {
        console.error('Erro ao buscar motoboys:', error);
      }
    };

    fetchDeliveries();
    fetchMotoboys();
  }, []);

  const handleAssignMotoboy = async (deliveryId: string) => {
    try {
      await axios.post(`/api/deliveries/${deliveryId}/assign`, {
        motoboyId: selectedMotoboy,
      });
      alert('Motoboy atribuído com sucesso!');
      setSelectedMotoboy('');
    } catch (error) {
      console.error('Erro ao atribuir motoboy:', error);
      alert('Erro ao atribuir motoboy.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Administração de Entregas</Typography>

      {deliveries.map((delivery) => (
        <div key={delivery._id}>
          <Typography variant="h6">Entrega ID: {delivery._id} - {delivery.description}</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id={`select-motoboy-label-${delivery._id}`}>Selecione o Motoboy</InputLabel>
            <Select
              labelId={`select-motoboy-label-${delivery._id}`}
              value={selectedMotoboy}
              onChange={(e) => setSelectedMotoboy(e.target.value)}
            >
              {motoboys.map((motoboy) => (
                <MenuItem key={motoboy._id} value={motoboy._id}>
                  {motoboy.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAssignMotoboy(delivery._id)}
            disabled={!selectedMotoboy}
          >
            Atribuir Motoboy
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default AdminPage;
