// src/App.tsx
import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; // Importe a página de Login
import EntregasPage from './pages/EntregasPage'; // Importe a nova página de Entregas
import EntregaFormPage from './pages/EntregaFormPage'; // <-- NOVO NOME
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importe para roteamento

// Você pode customizar seu tema MUI aqui se quiser
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', // Vermelho da logo
    },
    secondary: {
      main: '#000000', // Preto da logo
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Exemplo de fonte
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router> {/* Envolve toda a aplicação com o Router */}
        <Routes> {/* Define as rotas */}
          <Route path="/" element={<HomePage />} /> {/* Rota para a página inicial */}
          <Route path="/login" element={<LoginPage />} /> {/* Rota para a página de login */}
          <Route path="/entregas" element={<EntregasPage />} /> {/* Nova Rota para Entregas */}
          <Route path="/entregas/cadastro" element={<EntregaFormPage />} /> {/* Rota de Cadastro */}
          <Route path="/entregas/editar/:id" element={<EntregaFormPage />} /> {/* Rota de Edição com ID */}
          {/* Futuramente, adicione mais rotas aqui, ex: /dashboard, /veiculos */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;