// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTheme } from '@mui/material/styles'; // Importe useTheme

const Footer: React.FC = () => {
  const theme = useTheme(); // Obtém o tema atual

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper, // Usa o fundo 'paper' do tema
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`, // Usa a cor do divisor do tema
        boxShadow: theme.palette.mode === 'dark' ? '0px -2px 5px rgba(255, 255, 255, 0.05)' : '0px -2px 5px rgba(0, 0, 0, 0.05)', // Ajusta a sombra para o modo escuro
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box>
        <IconButton color="inherit" aria-label="Instagram" sx={{ color: theme.palette.text.secondary }}> {/* Usa a cor de texto secundária do tema */}
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="LinkedIn" sx={{ color: theme.palette.text.secondary }}> {/* Usa a cor de texto secundária do tema */}
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Facebook" sx={{ color: theme.palette.text.secondary }}> {/* Usa a cor de texto secundária do tema */}
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