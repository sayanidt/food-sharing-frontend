import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';  // Use the advanced one
import Browse from './pages/Browse';
import CreateListing from './pages/CreateListing';

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#FF9800' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<><Navigation /><DashboardPage /></>} />
          <Route path="/browse" element={<><Navigation /><Browse /></>} />
          <Route path="/create-listing" element={<><Navigation /><CreateListing /></>} />
          <Route path="/impact" element={<><Navigation /><div style={{padding: '20px'}}><h2>🌱 Impact Page Coming Soon!</h2></div></>} />
          <Route path="/community" element={<><Navigation /><div style={{padding: '20px'}}><h2>👥 Community Page Coming Soon!</h2></div></>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
