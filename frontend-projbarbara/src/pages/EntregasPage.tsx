// src/pages/EntregasPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

// Definição de tipo para uma Entrega (simplificada para o frontend)
interface Entrega {
  id: number;
  cidadeDestino: string;
  quilometragem: number;
  status: string;
  dataSaida: string; // Vem como string do backend
  veiculoId: number;
  veiculo?: { // O backend inclui o veículo, então podemos ter essa tipagem opcional
    placa: string;
    modelo: string;
    marca: string;
  };
}

const EntregasPage: React.FC = () => {
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Hook para navegação
    // ADICIONE ESTES NOVOS ESTADOS:
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token'); // Pega o token do localStorage
        if (!token) {
          setError('Você precisa estar logado para ver as entregas.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/entregas', {
          headers: {
            'Authorization': `Bearer ${token}`, // Envia o token na requisição
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Falha ao carregar entregas.');
        }

        const data: Entrega[] = await response.json();
        setEntregas(data);
      } catch (err: any) {
        console.error('Erro ao buscar entregas:', err);
        setError(err.message || 'Ocorreu um erro ao carregar as entregas.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntregas();
  }, []);

// Função para lidar com a exclusão de uma entrega
const handleDelete = async (id: number) => {
    // Adiciona um modal de confirmação simples antes de prosseguir
    if (!window.confirm(`Tem certeza que deseja excluir a entrega ID ${id}? Esta ação é irreversível.`)) {
      return; // Aborta se o usuário cancelar
    }

    try {
      const token = localStorage.getItem('token');
      // A CHECAGEM DO TOKEN AQUI FOI SIMPLIFICADA, POIS A PÁGINA JÁ É PROTEGIDA
      if (!token) { // Mantemos essa checagem mínima caso haja um erro inesperado de token ausente
          setSnackbarMessage('Token de autenticação ausente. Por favor, faça login novamente.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          return;
      }

      const response = await fetch(`http://localhost:3000/entregas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao excluir entrega.');
      }

      // Se a exclusão no backend for bem-sucedida, atualiza a lista no frontend
      // Filtra a entrega excluída da lista atual para re-renderizar a UI
      setEntregas(prevEntregas => prevEntregas.filter(entrega => entrega.id !== id));
      setSnackbarMessage(`Entrega ID ${id} excluída com sucesso!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err: any) {
      console.error('Erro ao excluir entrega:', err);
      setSnackbarMessage(err.message || 'Erro ao excluir entrega.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Função para fechar o Snackbar (ADICIONE ESTA FUNÇÃO TAMBÉM)
  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    // Box principal da página: garante que ela ocupe toda a largura e altura da viewport
    // e evita rolagem horizontal indesejada.
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw', // Garante que ocupe a largura total da viewport
      overflowX: 'hidden' // Impede a rolagem horizontal
    }}>
      <Header /> {/* O Header será renderizado aqui */}
      
      {/* Conteúdo principal da página, com Container para limitar largura do texto/cartões */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Lista de Entregas
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'darkred' } }}
            onClick={() => navigate('/entregas/cadastro')} // <-- LINHA CORRIGIDA AQUI: ADICIONADO O onClick
          >
            Cadastrar Nova Entrega
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>Carregando entregas...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && entregas.length === 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Nenhuma entrega encontrada.
          </Alert>
        )}

        {!loading && !error && entregas.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap', // Permite que os itens quebrem para a próxima linha
              gap: 3, // Espaçamento entre os cartões (horizontal e vertical)
              justifyContent: 'center', // Centraliza os cartões horizontalmente
            }}
          >
            {entregas.map((entrega) => (
              <Box
                key={entrega.id}
                sx={{
                  // Larguras responsivas para cada cartão:
                  // xs (extra small): 1 coluna (100%)
                  // sm (small): 2 colunas (aprox. 50% cada, com gap)
                  // md (medium): 3 colunas (aprox. 33.33% cada, com gap)
                  // lg (large): 4 colunas (aprox. 25% cada, com gap)
                  width: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(33.33% - 16px)',
                    lg: 'calc(25% - 18px)',
                  },
                  minWidth: '280px', // Largura mínima para o cartão
                  display: 'flex', // Faz o Box filho ser flex para o Paper dentro dele
                  flexDirection: 'column', // Organiza o Paper como coluna
                }}
              >
                <Paper elevation={3} sx={{
                  p: 3,
                  flexGrow: 1, // Faz o Paper preencher a altura disponível no Box item
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between', // Empurra botões para o final
                }}>
                  <Box> {/* Conteúdo textual da entrega */}
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      Entrega ID: {entrega.id}
                    </Typography>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 'bold' }}>Cidade Destino:</span> {entrega.cidadeDestino}
                    </Typography>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 'bold' }}>Quilometragem:</span> {entrega.quilometragem} km
                    </Typography>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 'bold' }}>Status:</span> {entrega.status}
                    </Typography>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 'bold' }}>Data de Saída:</span> {new Date(entrega.dataSaida).toLocaleDateString()}
                    </Typography>
                    {entrega.veiculo && (
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>Veículo:</span> {entrega.veiculo.marca} {entrega.veiculo.modelo} ({entrega.veiculo.placa})
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}> {/* Botões de ação */}
                  <Button
                      variant="outlined"
                      color="primary"
                      sx={{ flexGrow: 1 }}
                      onClick={() => navigate(`/entregas/editar/${entrega.id}`)} // <-- ADICIONE ESTE onClick
                    >
                      Alterar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ flexGrow: 1 }}
                      onClick={() => handleDelete(entrega.id)} // <-- ADICIONE ESTE onClick
                    >
                      Excluir
                    </Button>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Footer />

      {/* Snackbar para mensagens de feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EntregasPage;