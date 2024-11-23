import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#06486b', textAlign: 'center', py: 2 }}>
      <Typography variant="body2" color="#fff">
        © 2024 LAP Informática. Todos os direitos reservados.
      </Typography>
    </Box>
  )
}

export default Footer
