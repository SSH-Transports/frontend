import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { MotoboyPageOrder, Dashboard, DeliveryForm, LoginPage, MotoboyPage, SignupPage, AdminPage } from './pages'

import theme from './theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/delivery-form" element={<DeliveryForm />} />
          <Route path="/motoboy" element={<MotoboyPage />} />
          <Route path="/motoboy-order" element={<MotoboyPageOrder />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
