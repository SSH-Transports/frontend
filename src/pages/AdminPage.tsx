import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Alert,
  Stack,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { deliveries_mock } from '../data/deliveries';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CancelIcon from '@mui/icons-material/Cancel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Order, OrderStatus } from '../types/Order';
import getOrders from '../services/getOrders';

const fadeInSlideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AdminPage: React.FC = () => {
  const motoboys = Array.from(new Set(deliveries_mock.map((delivery) => delivery.motoboy)));
  const [selectedMotoboyMap, setSelectedMotoboyMap] = useState<{ [key: string]: string }>({});
  const [assignedDeliveries, setAssignedDeliveries] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deliveries, setDeliveries] = useState<Order[]>([]);
  
  const mobile = useMediaQuery('(max-width:767px)');

  const handleAcceptDelivery = (deliveryId: string) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: OrderStatus.DELIVERED } 
          : delivery
      )
    );
  };
  
  const handleRejectDelivery = (deliveryId: string) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: OrderStatus.REFUSED } 
          : delivery
      )
    );
  };

  useEffect(() => {
    getOrders().then((data) => {
      console.log('Orders:', data); 
      if (Array.isArray(data)) {
        setDeliveries(data);
      } else {
        console.error('Data is not an array:', data);
      }
    });
  }, []);

  const handleAssignMotoboy = (deliveryId: string, motoboyName: string) => {
    setAssignedDeliveries((prev) => ({
      ...prev,
      [deliveryId]: motoboyName,
    }));
    setAlert({
      type: 'success',
      message: `Motoboy ${motoboyName} atribuído à entrega ${deliveryId}.`,
    });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Container>
      {alert && (
        <Stack
          sx={{
            width: '100%',
            marginBottom: '1rem',
            animation: `${fadeInSlideDown} 0.5s ease-out`,
          }}
          spacing={2}
        >
          <Alert
            variant="outlined"
            severity={alert.type}
            sx={{
              padding: '1.5rem',
              fontSize: '1.2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            {alert.message}
          </Alert>
        </Stack>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="2rem"
        padding="1rem"
        borderRadius="8px"
        bgcolor="primary.main"
        color="white"
        marginTop="2rem"
        flexDirection={mobile ? 'column' : 'row'}
      >
        <Typography
          variant="h3"
          fontSize={mobile ? '1.2rem' : '3rem'}
          fontFamily="Roboto, sans-serif"
          fontWeight="bold"
          gutterBottom
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <LocalShippingIcon fontSize={mobile ? 'large' : 'inherit'} />
          Administração de Entregas
        </Typography>
        <Typography variant="body1" fontStyle="italic">
          Gerencie suas entregas com facilidade!
        </Typography>
      </Box>

      {Array.isArray(deliveries) && deliveries.map((delivery) => {
        const isRefused = delivery.status === OrderStatus.REFUSED;
        const isPending = delivery.status === OrderStatus.WAITING_RESPONSE;
        const isAccepted = delivery.status === OrderStatus.DELIVERED;

        return (
          <Box
            key={delivery.id}
            border="1px solid #e0e0e0"
            borderRadius="8px"
            padding="1rem"
            marginBottom="1.5rem"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            bgcolor={isRefused ? '#FFEBEE' : 'white'}
            borderColor={isRefused ? '#F44336' : '#e0e0e0'}
          >
            <Typography variant="h6" gutterBottom>
              Entrega ID: {delivery.id} - {delivery.status === OrderStatus.WAITING_RESPONSE ? (
                <PendingIcon color="warning" />
              ) : delivery.status === OrderStatus.DELIVERED ? (
                <DoneIcon color="success" />
              ) : delivery.status === OrderStatus.REFUSED ? (
                <CancelIcon color="error" />
              ) : (
                <DoneIcon color="success" />
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Data: {delivery.createdAt} - Distância: {delivery.distance} km - R${delivery.cost}
            </Typography>

            {isPending && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAcceptDelivery(delivery.id ?? '')}
                  style={{ marginRight: '1rem' }}
                >
                  Aceitar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRejectDelivery(delivery.id ?? '')}
                >
                  Recusar
                </Button>
              </>
            )}

            {assignedDeliveries[delivery.id ?? ''] ? (
              <Typography
                variant="body1"
                color="secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                <AssignmentIndIcon color="secondary" />
                Motoboy <strong>{assignedDeliveries[delivery.id ?? '']}</strong> já foi designado para a entrega <strong>{delivery.id ?? ''}.</strong> Seja paciente!
              </Typography>
            ) : (
              isAccepted && (
                <>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Selecione o Motoboy</InputLabel>
                    <Select
                      value={selectedMotoboyMap[delivery.id ?? ''] || ''}
                      onChange={(e) =>
                        setSelectedMotoboyMap((prev) => ({
                          ...prev,
                          [delivery.id ?? '']: e.target.value,
                        }))
                      }
                    >
                      {motoboys.map((motoboy) => (
                        <MenuItem key={motoboy} value={motoboy}>
                          {motoboy}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleAssignMotoboy(delivery.id ?? '', selectedMotoboyMap[delivery.id ?? ''])
                    }
                    disabled={!selectedMotoboyMap[delivery.id ?? '']}
                    style={{ marginTop: '0.5rem' }}
                  >
                    Atribuir Motoboy
                  </Button>
                </>
              )
            )}
          </Box>
        );
      })}
    </Container>
  );
};

export default AdminPage;
