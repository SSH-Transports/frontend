import { Button, Typography } from '@mui/material'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '../context/userContext'
import { changeStatus } from '../helpers/changeStatus'
import getOrderById from '../services/getOrderById'
import { OrderStatus } from '../services/getOrders'
import { Order, OrderStatusNames } from '../types/Order'

const MotoboyPageOrder: React.FC = () => {
  const params = useParams()
  const [order, setOrder] = useState<Order>()
  const { user, socket } = useUserContext();

  const handleGetOrderById = async (id: string) => {
    const order = await getOrderById(id)
    if (order.id) {
      setOrder(order)
    } else {
      toast.error('Erro ao procurar Pedido')
    }
  }

  useEffect(() => {
    if (params.id) {
      handleGetOrderById(params.id)
    }
  }, [params])

  const handleAccept = () => {
    if (!order || !order.id) return;

    changeStatus({
      socket,
      user,
      orderId: order?.id,
      orderStatus: OrderStatus.DELIVERED,
    });
  }

  return order ? (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
        }}>
        <h1>Detalhes da Corrida</h1>
        <Typography variant="h6" fontWeight={"bold"}>
          {OrderStatusNames[order.status]}
        </Typography>
      </div>
      <p><strong>Id do Pedido:</strong> {order.id}</p>
      <p>
        <strong>Local de Entrega:</strong> {order.latitude}, {order.longitude}
      </p>
      <p>
        <strong>Valor:</strong> R$ {order.cost.toFixed(2)}
      </p>
      <p>
        <strong>Peso:</strong> {order.weight} kg
      </p>
      <p>
        <strong>Distância:</strong> {order.distance} km
      </p>

      {order.status === OrderStatus.ON_THE_WAY && (
        <div style={{
          display: "flex",
          justifyContent: "end",
        }}>
          <Button onClick={handleAccept} variant="contained" color="success">
            Aceitar
          </Button>
        </div>
      )}
      <div style={{ height: '300px', margin: '20px 0' }}>
        <MapContainer
          center={[order.latitude, order.longitude]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <CircleMarker center={[order.latitude, order.longitude]} radius={10}>
          </CircleMarker>
        </MapContainer>
      </div>
    </div>
  ) : (
    <div
      style={{
        padding: '5rem 10rem',
        textAlign: 'center',
      }}
    >
      Não foi possível encontrar essa corrida
    </div>
  )
}

export default MotoboyPageOrder
