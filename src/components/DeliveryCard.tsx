import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { AccessAlarm, CheckCircle, Clear, Person, Money, LocalTaxi } from '@mui/icons-material'

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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Entregue':
        return <CheckCircle color="success" />
      case 'Pendente':
        return <AccessAlarm color="warning" />
      case 'Recusada':
        return <Clear color="error" />
      default:
        return <AccessAlarm color="action" />
    }
  }

  return (
    <Card sx={{
      width: '100%',
      height: '200px',
      border: '0px solid #e0e0e0',
      paddingBottom:'20px',
      boxShadow: 3,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6,
      },
      backgroundColor: '#fff',
    }}>
      <CardContent sx={{ padding: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="textPrimary">
            ID: {delivery.id}
          </Typography>
          {getStatusIcon(delivery.status)}
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Person sx={{ marginRight: 1, color: 'text.secondary' }} />
            <Typography variant="body2">{delivery.motoboy}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalTaxi sx={{ marginRight: 1, color: 'text.secondary' }} />
            <Typography variant="body2">{delivery.distance} km</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Money sx={{ marginRight: 1, color: 'text.secondary' }} />
            <Typography variant="body2">R$ {delivery.cost.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: 'auto', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Status: {delivery.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DeliveryCard
