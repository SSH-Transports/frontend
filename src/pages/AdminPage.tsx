import { keyframes } from '@emotion/react';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

import {
  Alert,
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { changeStatus } from '../helpers/changeStatus';
import getOrders from '../services/getOrders';
import getUsers from '../services/getUsers';
import updateOrder from '../services/updateOrder';
import { Order, OrderStatus } from '../types/Order';
import { User, UserRoles } from '../types/User';

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
  const navigate = useNavigate();
  const [couriers, setCouriers] = useState<User[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<User>();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const mobile = useMediaQuery('(max-width:767px)');
  const { user, socket } = useUserContext();

  socket.on('newOrder', () => {
    getOrders().then(setOrders);
  });

  socket.on('message', () => {
    getOrders().then(setOrders);
  })

  const handleAcceptDelivery = (orderId: string) => {
    changeStatus({
      socket,
      user,
      orderId,
      orderStatus: OrderStatus.SEPARATING,
    });
    setAlert({
      type: 'success',
      message: `Entrega ${orderId} aceita.`,
    });

    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: OrderStatus.SEPARATING };
        }
        return order;
      })
    });
  };

  const handleRejectDelivery = (orderId: string) => {
    changeStatus({
      socket,
      user,
      orderId,
      orderStatus: OrderStatus.REFUSED,
    });
    setAlert({
      type: 'error',
      message: `Entrega ${orderId} recusada.`,
    });
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: OrderStatus.REFUSED };
        }
        return order;
      })
    })
  };

  const handleAssignMotoboy = (orderId: string) => {
    updateOrder({
      id: orderId,
      body: {
        courierId: selectedCourier?.id,
      }
    });
    changeStatus({
      socket,
      user,
      orderId,
      orderStatus: OrderStatus.ON_THE_WAY,
    });
    setAlert({
      type: 'success',
      message: `Motoboy ${selectedCourier?.name} atribuído à entrega ${orderId}.`,
    });
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: OrderStatus.ON_THE_WAY, courierId: selectedCourier?.id };
        }
        return order;
      })
    });
  };

  useEffect(() => {
    getOrders().then(setOrders);
    getUsers(UserRoles.COURIER).then(setCouriers);
  }, []);

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

      {Array.isArray(orders) && orders.map((delivery) => {
        const isRefused = delivery.status === OrderStatus.REFUSED;
        const isPending = delivery.status === OrderStatus.WAITING_RESPONSE;
        const isSeparating = delivery.status === OrderStatus.SEPARATING;
        const isOnTheWay = delivery.status === OrderStatus.ON_THE_WAY;
        const isDelivered = delivery.status === OrderStatus.DELIVERED;

        const id = delivery.id ?? '';

        return (
          <Box
            key={id}
            border="1px solid #e0e0e0"
            borderRadius="8px"
            padding="1rem"
            marginBottom="1.5rem"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            bgcolor={isRefused ? '#FFEBEE' : 'white'}
            borderColor={isRefused ? '#F44336' : '#e0e0e0'}
            style={{ cursor: 'pointer' }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
              onClick={() => {
                navigate(`/order/${id}`);
              }}
            >
              <Typography variant="h6" gutterBottom>
                Entrega ID: {id}
              </Typography>
              {
                {
                  [OrderStatus.WAITING_RESPONSE]: <PendingIcon color="warning" />,
                  [OrderStatus.SEPARATING]: <DoneIcon color="success" />,
                  [OrderStatus.REFUSED]: <CancelIcon color="error" />,
                  [OrderStatus.ON_THE_WAY]: <TwoWheelerIcon color="warning" />,
                  [OrderStatus.DELIVERED]: <DoneIcon color="success" />,
                }[delivery.status ?? '']
              }
            </div>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Data: {
                delivery?.createdAt
                  ? new Date(delivery.createdAt).toLocaleDateString("pt-BR")
                  : 'Data inválida'
              }
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Distância: {delivery.distance} km
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Peso: {delivery.weight} kg
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Preço: R${delivery.cost}
            </Typography>

            {isPending && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAcceptDelivery(id)}
                  style={{ marginRight: '1rem' }}
                >
                  Aceitar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRejectDelivery(id)}
                >
                  Recusar
                </Button>
              </>
            )}

            {
              isSeparating && (
                <>
                  <InputLabel>Selecione o Motoboy</InputLabel>
                  <Select
                    style={{ width: '100%' }}
                    value={selectedCourier?.id ?? ""}
                    onChange={(e) =>
                      setSelectedCourier(couriers.find((courier) => {
                        return courier.id === e.target.value
                      }))
                    }
                  >
                    {couriers.map((courier) => (
                      <MenuItem key={courier.id} value={courier.id}>
                        {courier.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssignMotoboy(id)}
                    disabled={!selectedCourier}
                    style={{ marginTop: '0.5rem' }}
                  >
                    Atribuir Motoboy
                  </Button>
                </>
              )
            }

            {isOnTheWay && (
              <Typography variant="body2" color="textSecondary">
                Motoboy: {couriers.find(({ id }) => id === delivery.courierId)?.name}
              </Typography>
            )}
          </Box>
        );
      })}
    </Container>
  );
};

export default AdminPage;
