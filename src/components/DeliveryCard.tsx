import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface DeliveryCardProps {
  delivery: {
    id: string
    status: string
    cost: number
    motoboy: string
    distance: number
  }
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">ID: {delivery.id}</Typography>
        <Typography>Status: {delivery.status}</Typography>
        <Typography>Motoboy: {delivery.motoboy}</Typography>
        <Typography>Distância: {delivery.distance} km</Typography>
        <Typography>Custo: R$ {delivery.cost}</Typography>
      </CardContent>
    </Card>
  )
}

export default DeliveryCard
