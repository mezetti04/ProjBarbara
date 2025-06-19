// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material'; // Importe IconButton
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook'; // Importe o ícone do Facebook

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#fff', // Fundo branco
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto', // Empurra o footer para baixo
        borderTop: '1px solid #eee', // Adiciona uma linha na parte superior
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.05)', // Sombra sutil para cima
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1, // Espaço entre os elementos do footer
      }}
    >
      <Box>
        <IconButton color="inherit" aria-label="Instagram" sx={{ color: '#333' }}>
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="LinkedIn" sx={{ color: '#333' }}>
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Facebook" sx={{ color: '#333' }}>
          <FacebookIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} JM Interlog. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;