import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import getOrderById from '../services/getOrderById'
import { Order } from '../types/Order'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import RoomIcon from '@mui/icons-material/Room';

const MotoboyPageOrder: React.FC = () => {
  const params = useParams()
  const [order, setOrder] = useState<Order>()

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
    console.log('Corrida aceita!')
  }

  const handleDecline = () => {
    console.log('Corrida recusada!')
  }

  return order ? (
    <div style={{ padding: '20px' }}>
      <h1>Detalhes da Corrida</h1>
      <p><strong>Id do Pedido:</strong> {order.id}</p>
      <p>
        {/* <strong>Local de Entrega:</strong> {order.enderecoEntrega.descricao} */}
      </p>
      <p>
        <strong>Valor:</strong> R$ {order.cost.toFixed(2)}
      </p>
      <p>
        <strong>Peso:</strong> {order.weight} kg
      </p>
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
