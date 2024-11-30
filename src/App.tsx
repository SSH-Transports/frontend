import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './context/userContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  MotoboyPageOrder,
  Dashboard,
  DeliveryForm,
  LoginPage,
  MotoboyPage,
  SignupPage,
  AdminPage,
} from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <ToastContainer />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/delivery-form" element={<DeliveryForm />} />
                <Route path="/motoboy/:motoboyId" element={<MotoboyPage />} />
                <Route path="/order/:id" element={<MotoboyPageOrder />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
