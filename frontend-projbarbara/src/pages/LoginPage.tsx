// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login
import { styled } from '@mui/material/styles'; // Para usar styled, se precisar

// Estilo para o Paper que envolve o formulário
const LoginFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3), // Espaçamento entre os elementos do formulário
  maxWidth: 400, // Largura máxima do formulário
  margin: 'auto', // Centraliza o formulário na página
  marginTop: theme.spacing(8), // Espaçamento superior
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Sombra para destaque
  borderRadius: theme.shape.borderRadius, // Borda arredondada
}));

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>(''); // Usaremos string aqui para facilitar o TextField
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita o recarregamento da página

    setError(''); // Limpa qualquer erro anterior

    if (!id || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // O ID do veículo deve ser um número para o backend
      const veiculoId = parseInt(id, 10);
      if (isNaN(veiculoId)) {
        setError('O ID do veículo deve ser um número.');
        return;
      }

      // Conectando com o backend: Lembre-se que o backend roda na porta 3000
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: veiculoId, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido: Salva o token e redireciona
        localStorage.setItem('token', data.token);
        console.log('Login bem-sucedido!', data.token);
        // TODO: Redirecionar para uma página protegida, ex: '/dashboard' ou '/veiculos'
        navigate('/'); // Por enquanto, redireciona para a home
      } else {
        // Erro no login
        setError(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (err) {
      console.error('Erro na requisição de login:', err);
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <Container maxWidth="sm">
      <LoginFormPaper elevation={3}>
        <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Fazer Login
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Insira seu ID do veículo e senha para fazer login.
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="ID do Veículo" // Mudança da label de "E-mail" para "ID do Veículo"
            type="number" // Tipo numérico para o input
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
                bgcolor: 'red', // Fundo vermelho para o botão
                '&:hover': {
                    bgcolor: 'darkred', // Vermelho mais escuro ao passar o mouse
                },
                color: '#fff', // Texto branco
                fontWeight: 'bold'
            }}
          >
            Fazer Login
          </Button>
        </form>
      </LoginFormPaper>
    </Container>
  );
};

export default LoginPage;