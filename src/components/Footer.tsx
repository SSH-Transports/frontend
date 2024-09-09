import React from 'react'
import { Typography } from '@mui/material'

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px 0' }}>
      <Typography variant="body2" color="textSecondary">
        © 2024 LAP Informática. Todos os direitos reservados.
      </Typography>
    </footer>
  )
}

export default Footer
