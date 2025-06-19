// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ... (LoginFormPaper - seu styled component, se estiver usando) ...

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error'); // Padrão para erro
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Inicia o carregamento
    setError('');
    setSnackbarOpen(false);

    if (!id || !password) {
      setError('Por favor, preencha todos os campos.');
      setSnackbarMessage('Por favor, preencha todos os campos.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false); // Finaliza o carregamento
      return;
    }

    try {
      const veiculoId = parseInt(id, 10);
      if (isNaN(veiculoId)) {
        setError('O ID do veículo deve ser um número.');
        setSnackbarMessage('O ID do veículo deve ser um número.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false); // Finaliza o carregamento
        return;
      }

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: veiculoId, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSnackbarMessage('Login realizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate('/entregas'); // Redireciona para a página de entregas após login
      } else {
        setError(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
        setSnackbarMessage(data.message || 'Erro ao fazer login.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err: any) {
      console.error('Erro na requisição de login:', err);
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      setSnackbarMessage('Erro de conexão. Tente novamente mais tarde.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Garante que ocupe a altura mínima da viewport
      width: '100vw',    // Garante que ocupe a largura total da viewport
      overflowX: 'hidden', // Evita rolagem horizontal indesejada
    }}>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1, // Permite que o container ocupe todo o espaço disponível entre header e footer
          display: 'flex', // Transforma o container em um flex container
          flexDirection: 'column', // Organiza os itens em coluna (se houver mais de um)
          justifyContent: 'center', // Centraliza o conteúdo verticalmente
          alignItems: 'center', // Centraliza o conteúdo horizontalmente (se o item tiver menos que 100% de largura)
          py: 4, // Padding vertical para evitar que o formulário cole nas bordas
        }}
      >
        <Paper elevation={3} sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: 400,
            width: '100%', // Garante que o Paper ocupe 100% do maxWidth ou do Container
            margin: 'auto', // Ajuda na centralização horizontal se Container não tiver alignItems: 'center'
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: theme => theme.shape.borderRadius,
            // Ajustar mt (margin-top) removido aqui, pois justifyContent: 'center' cuidará disso
        }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Fazer Login
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Insira seu ID do veículo e senha para fazer login.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="ID do Veículo"
              type="number"
              fullWidth
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            {error && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                bgcolor: 'red',
                '&:hover': { bgcolor: 'darkred' },
                color: '#fff',
                fontWeight: 'bold',
              }}
              disabled={loading} // Desabilita o botão enquanto carrega
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Fazer Login'}
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;