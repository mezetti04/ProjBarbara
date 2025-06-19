// src/components/AboutUs.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import aboutUsImage from '../assets/sua_imagem_sobre_nos.png';
import { useTheme } from '@mui/material/styles';
import MapComponent from './MapComponent'; // Importe o novo componente de mapa

const AboutUs: React.FC = () => {
  const theme = useTheme();

  // Coordenadas para Machado, MG
  const machadoCoordinates = {
    latitude: -21.682185,
    longitude: -45.908138,
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        mb: 8,
        backgroundColor: theme.palette.mode === 'dark' ? '#212121' : theme.palette.background.default,
        padding: 4,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          textAlign: 'center',
          mb: 4,
        }}
      >
        Sobre Nós
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Coluna da Esquerda: Texto "Sobre Nós" */}
        <Box sx={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: { xs: '100%', md: 'calc(50% - 16px)' },
          maxWidth: { xs: '100%', md: 'calc(50% - 16px)' },
          boxSizing: 'border-box',
        }}>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.text.primary }}>
            Fundada em 2020 na cidade de Machado-MG, a JM INTERLOG nasceu com a missão de oferecer soluções logísticas eficientes e seguras.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.text.primary }}>
            Somos especializados no transporte de mercadorias provenientes de atacadistas, garantindo que cada entrega seja manuseada com o máximo de cuidado e profissionalismo.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.text.primary }}>
            Nosso compromisso é com a excelência. Entendemos a importância de cada carga e, por isso, investimos em uma operação pontual e confiável para que os produtos de nossos clientes cheguem ao seu destino com segurança e dentro do prazo.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            A JM INTERLOG é mais que uma transportadora; somos o parceiro estratégico que o seu negócio precisa para crescer.
          </Typography>
        </Box>

        {/* Coluna da Direita: Imagem */}
        <Box sx={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: { xs: '100%', md: 'calc(50% - 16px)' },
          maxWidth: { xs: '100%', md: 'calc(50% - 16px)' },
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img
            src={aboutUsImage}
            alt="Imagem da JM Interlog"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Box>
      </Box>

      {/* Seção do Mapa - Box Estilizado */}
      <Box
        sx={{
          mt: 8,
          width: '100%',
          p: 3, // Adiciona um preenchimento interno
          backgroundColor: theme.palette.background.paper, // Fundo correspondente a Paper do tema
          borderRadius: theme.shape.borderRadius, // Borda arredondada
          boxShadow: theme.palette.mode === 'dark' ? '0px 4px 20px rgba(255, 255, 255, 0.05)' : '0px 4px 20px rgba(0, 0, 0, 0.1)', // Sombra adaptativa
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            textAlign: 'center',
            mb: 3,
          }}
        >
          Nossa Localização
        </Typography>
        <MapComponent latitude={machadoCoordinates.latitude} longitude={machadoCoordinates.longitude} />
      </Box>
    </Container>
  );
};

export default AboutUs;