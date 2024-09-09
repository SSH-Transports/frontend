import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import DeliveryList from '../components/DeliveryList'
import axios from 'axios'

const MotoboyPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState([])

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = await axios.get('/api/deliveries/motoboy')
      setDeliveries(response.data)
    }
    fetchDeliveries()
  }, [])

  return (
    <Container>
      <Typography variant="h4">Entregas do Motoboy</Typography>
      <DeliveryList deliveries={deliveries} />
    </Container>
  )
}

export default MotoboyPage
