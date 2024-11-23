import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

const DeliveryForm: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [cost, setCost] = useState(0);

  const calculateCost = () => {
    const weightNum = parseFloat(weight);
    const distanceNum = parseFloat(distance);

    if (isNaN(weightNum) || isNaN(distanceNum) || weightNum <= 0 || distanceNum <= 0) {
      alert('Por favor, insira valores válidos!');
      return;
    }

    const weightCost = weightNum < 1 ? 3 : weightNum * 3;
    const distanceCost = distanceNum * 0.5;
    const totalCost = weightCost + distanceCost;
    setCost(totalCost);
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: { marginTop: '2rem' },
    title: { fontFamily: 'Roboto Slab, sans-serif', fontWeight: 700 },
    image: { maxWidth: '100%', height: 'auto', objectFit: 'contain', borderRadius: '8px' },
    input: { marginBottom: '1rem' },
    result: { marginTop: '1rem', fontWeight: 600, color: '#4caf50' },
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h4" align="center" style={styles.title} gutterBottom>
        Solicitar Entrega
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={"images/solicitar.png"}
            alt="Solicitar Entrega"
            style={styles.image}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <TextField
            label="Distância (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <TextField
            label="Tempo (min)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={calculateCost}
            fullWidth
          >
            Calcular
          </Button>
          {cost > 0 && (
            <Typography variant="h6" align="center" style={styles.result}>
              Custo estimado: R$ {cost.toFixed(2)}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeliveryForm;
