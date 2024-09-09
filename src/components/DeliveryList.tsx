import React from 'react'
import { Grid } from '@mui/material'
import DeliveryCard from './DeliveryCard'

interface Delivery {
  id: string
  status: string
  cost: number
  motoboy: string
  distance: number
}

interface DeliveryListProps {
  deliveries: Delivery[]
}

const DeliveryList: React.FC<DeliveryListProps> = ({ deliveries }) => {
  return (
    <Grid container spacing={2}>
      {deliveries.map(delivery => (
        <Grid item xs={12} md={6} lg={4} key={delivery.id}>
          <DeliveryCard delivery={delivery} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DeliveryList
