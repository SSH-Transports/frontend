import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material'
import AddressPicker from '../components/AddressPicker'
import postOrder from '../services/postOrder'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

type Destination = {
  lat: number
  lng: number
  address: string
}

const DeliveryForm: React.FC = () => {
  const navigate = useNavigate()

  const [weight, setWeight] = useState('')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [cost, setCost] = useState(0)
  const [destination, setDestination] = useState<Destination>({
    address: 'OI',
    lat: 28.944465,
    lng: -82.03363,
  })

  const calculateCost = () => {
    const weightNum = parseFloat(weight)
    const distanceNum = parseFloat(distance)

    if (
      isNaN(weightNum) ||
      isNaN(distanceNum) ||
      weightNum <= 0 ||
      distanceNum <= 0
    ) {
      alert('Por favor, insira valores válidos!')
      return
    }

    const weightCost = weightNum < 1 ? 3 : weightNum * 3
    const distanceCost = distanceNum * 0.5
    const totalCost = weightCost + distanceCost
    setCost(totalCost)
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: { marginTop: '2rem' },
    title: {
      fontFamily: 'Roboto Slab, sans-serif',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      maxWidth: '100%',
      height: '75px',
      objectFit: 'fill',
      borderRadius: '8px',
    },
    input: { marginBottom: '1rem' },
    result: { marginTop: '1rem', fontWeight: 600, color: '#4caf50' },
  }

  const handleDestinationSelected = (newDestination: Destination) => {
    setDestination(newDestination)
  }

  const handleFinish = async () => {
    const newOrder = await postOrder({
      weight,
      distance,
      cost,
      time,
      latitude: destination?.lat as number,
      longitude: destination?.lng as number,
    })

    console.log('Order created: ', newOrder)
    setTimeout(() => {
      navigate('/dashboard')
      toast.success('Pedido realizado com sucesso!')
    }, 2000)
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" align="center" style={styles.title} gutterBottom>
        Solicitar Entrega
        <img
          src={'images/solicitar.png'}
          alt="Solicitar Entrega"
          style={styles.image}
        />
      </Typography>

      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} sm={6} height={500}>
          <TextField
            label="Peso (kg)"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <TextField
            label="Distância (km)"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <TextField
            label="Tempo (min)"
            value={time}
            onChange={e => setTime(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={calculateCost}
            disabled={!destination || !distance || !weight}
            fullWidth
            style={{ marginTop: 'auto' }}
          >
            Calcular
          </Button>
          {cost > 0 && (
            <Box gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                fullWidth
                style={{ marginTop: 'auto' }}
              >
                Fazer pedido
              </Button>
              <Typography variant="h6" align="center" style={styles.result}>
                Custo estimado: R$ {cost.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item sm={6}>
          <Box width="100%" height={500} margin={'auto'} marginY={6}>
            <AddressPicker
              mapboxToken={''}
              onLocationSelected={handleDestinationSelected}
              initialCenter={{ lat: -23.55052, lng: -46.633308 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DeliveryForm
