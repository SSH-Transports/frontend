import React, { useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'

const DeliveryForm: React.FC = () => {
  const [weight, setWeight] = useState('')
  const [distance, setDistance] = useState('')
  const [cost, setCost] = useState(0)

  const calculateCost = () => {
    const weightCost = parseFloat(weight) < 1 ? 3 : parseFloat(weight) * 3
    const distanceCost = parseFloat(distance) * 0.5
    const totalCost = weightCost + distanceCost
    setCost(totalCost)
  }

  return (
    <Container>
      <Typography variant="h4">Solicitar Entrega</Typography>
      <TextField
        label="Peso (kg)"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Distância (km)"
        value={distance}
        onChange={e => setDistance(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={calculateCost}>
        Calcular
      </Button>
      {cost > 0 && (
        <Typography variant="h6">
          Custo estimado: R$ {cost.toFixed(2)}
        </Typography>
      )}
    </Container>
  )
}

export default DeliveryForm
