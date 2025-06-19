// src/components/AboutUs.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import aboutUsImage from '../assets/sua_imagem_sobre_nos.png'; // **Importe sua imagem aqui!**
// Lembre-se: O nome do arquivo da imagem deve ser EXATO (incluindo extensão e capitalização).

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}> {/* Container para limitar a largura geral do conteúdo */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#000', textAlign: 'center', mb: 4 }}>
        Sobre Nós
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Empilha em telas pequenas, lado a lado em telas médias+
          gap: 4, // Espaçamento entre os itens (texto e imagem)
          alignItems: 'center', // Centraliza os itens verticalmente (se necessário)
          justifyContent: 'center', // Centraliza os blocos de conteúdo horizontalmente
          width: '100%', // Garante que este Box ocupe toda a largura do Container pai
        }}
      >
        {/* Coluna da Esquerda: Texto "Sobre Nós" */}
        <Box sx={{
          flexGrow: 1, // Permite que esta Box cresça para ocupar espaço disponível
          flexShrink: 1, // Permite que esta Box encolha se necessário
          flexBasis: { xs: '100%', md: 'calc(50% - 16px)' }, // Base de 100% ou 50% menos o gap
          maxWidth: { xs: '100%', md: 'calc(50% - 16px)' }, // Garante que não exceda 50% em telas maiores
          boxSizing: 'border-box', // Inclui padding/border no cálculo da largura
          // Sem padding explícito aqui para evitar conflito com gap, o gap já fará o espaçamento
        }}>
          <Typography variant="body1" paragraph>
            Fundada em 2020 na cidade de Machado-MG, a JM INTERLOG nasceu com a missão de oferecer soluções logísticas eficientes e seguras.
          </Typography>
          <Typography variant="body1" paragraph>
            Somos especializados no transporte de mercadorias provenientes de atacadistas, garantindo que cada entrega seja manuseada com o máximo de cuidado e profissionalismo.
          </Typography>
          <Typography variant="body1" paragraph>
            Nosso compromisso é com a excelência. Entendemos a importância de cada carga e, por isso, investimos em uma operação pontual e confiável para que os produtos de nossos clientes cheguem ao seu destino com segurança e dentro do prazo.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
            A JM INTERLOG é mais que uma transportadora; somos o parceiro estratégico que o seu negócio precisa para crescer.
          </Typography>
        </Box>

        {/* Coluna da Direita: Imagem */}
        <Box sx={{
          flexGrow: 1, // Permite que esta Box cresça para ocupar espaço disponível
          flexShrink: 1, // Permite que esta Box encolha se necessário
          flexBasis: { xs: '100%', md: 'calc(50% - 16px)' }, // Base de 100% ou 50% menos o gap
          maxWidth: { xs: '100%', md: 'calc(50% - 16px)' }, // Garante que não exceda 50% em telas maiores
          boxSizing: 'border-box', // Inclui padding/border no cálculo da largura
          display: 'flex', // Transforma este Box em um container flex para centralizar a imagem
          justifyContent: 'center', // Centraliza a imagem horizontalmente
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
    </Container>
  );
};

export default AboutUs;