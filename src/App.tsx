import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './context/userContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
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

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/delivery-form"
                  element={
                    <ProtectedRoute>
                      <DeliveryForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/motoboy/:motoboyId"
                  element={
                    <ProtectedRoute>
                      <MotoboyPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <MotoboyPageOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
