import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DeliveryForm from './pages/DeliveryForm'
import MotoboyPage from './pages/MotoboyPage'
import AdminPage from './pages/AdminPage'
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
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
