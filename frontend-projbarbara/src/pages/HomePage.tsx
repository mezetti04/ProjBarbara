// src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw', // <--- ADICIONE ESTA LINHA: Garante 100% da largura da viewport
      overflowX: 'hidden', // <--- ADICIONE ESTA LINHA: Evita rolagem horizontal indesejada
    }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AboutUs />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;