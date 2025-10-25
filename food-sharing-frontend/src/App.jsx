import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfigProvider } from 'antd';
import CssBaseline from '@mui/material/CssBaseline';
import { themeTokens } from './theme/colors';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import DonorDashboard from './pages/donor/DonorDashboard';
import ReceiverDashboard from './pages/receiver/ReceiverDashboard';
import CreateListingPage from './pages/food/CreateListingPage';
import Browse from './pages/Browse';
import Community from './pages/Community';
import Impact from './pages/Impact';
import Profile from './pages/Profile';

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#FF9800' },
  },
});

function App() {
  return (
    <ConfigProvider theme={{ token: themeTokens }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <LocationProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes - General Dashboard (for 'both' role) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MainLayout><DashboardPage /></MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Donor Dashboard */}
              <Route
                path="/donor-dashboard"
                element={
                  <ProtectedRoute>
                    <MainLayout><DonorDashboard /></MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Receiver Dashboard */}
              <Route
                path="/receiver-dashboard"
                element={
                  <ProtectedRoute>
                    <MainLayout><ReceiverDashboard /></MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/browse"
                element={
                  <ProtectedRoute>
                    <MainLayout><Browse /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-listing"
                element={
                  <ProtectedRoute>
                    <MainLayout><CreateListingPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <MainLayout><Community /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/impact"
                element={
                  <ProtectedRoute>
                    <MainLayout><Impact /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MainLayout><Profile /></MainLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </LocationProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </ConfigProvider>
  );
}

export default App;
