import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import DeliveryList from '../components/DeliveryList'
import axios from 'axios'
import { deliveries_mock } from '../data'
const Dashboard: React.FC = () => {
  const [deliveries, setDeliveries] = useState([])

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = await axios.get('/deliveries')
      setDeliveries(response.data)
    }
    fetchDeliveries()
  }, [])

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <DeliveryList deliveries={deliveries_mock} />
    </Container>
  )
}

export default Dashboard
