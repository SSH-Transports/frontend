import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import getOrderById from '../services/getOrderById'
import { Order } from '../types/Order'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

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
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[order.latitude, order.longitude]}>
            <Popup>Local de Coleta</Popup>
          </Marker>
          <Marker position={[order.latitude, order.longitude]}>
            <Popup>Local de Entrega</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div>
        <button
          onClick={handleAccept}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Aceitar
        </button>
        <button
          onClick={handleDecline}
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Recusar
        </button>
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
