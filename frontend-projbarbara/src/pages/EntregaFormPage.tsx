// src/pages/EntregaFormPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; // <-- Importe useParams
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
}

// Definição de tipo para Entrega (completa, incluindo campos que podem vir do backend para edição)
interface EntregaData {
  cidadeDestino: string;
  quilometragem: number;
  status: string;
  dataSaida: string;
  veiculoId: number;
}


const EntregaFormPage: React.FC = () => { // <-- Nome do componente alterado
  const [cidadeDestino, setCidadeDestino] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [status, setStatus] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [veiculoId, setVeiculoId] = useState<number | ''>('');
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [pageLoading, setPageLoading] = useState(true); // Novo estado para carregamento inicial da página

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // <-- Obtém o ID da URL (se existir)
  const isEditing = !!id; // Boolean para saber se estamos em modo de edição

  // useEffect para buscar veículos e, se estiver editando, buscar dados da entrega
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setPageLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setFormError('Você precisa estar logado para acessar esta página.');
          setPageLoading(false);
          return;
        }

        // Buscar veículos (necessário tanto para cadastro quanto para edição)
        const veiculosResponse = await fetch('http://localhost:3000/veiculos', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!veiculosResponse.ok) {
          const errorData = await veiculosResponse.json();
          throw new Error(errorData.message || 'Falha ao carregar veículos.');
        }
        const veiculosData: Veiculo[] = await veiculosResponse.json();
        setVeiculos(veiculosData);

        // Se estiver em modo de edição, buscar os dados da entrega específica
        if (isEditing) {
          const entregaResponse = await fetch(`http://localhost:3000/entregas/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!entregaResponse.ok) {
            const errorData = await entregaResponse.json();
            throw new Error(errorData.message || 'Falha ao carregar dados da entrega para edição.');
          }
          const entregaData = await entregaResponse.json();
          // Preencher o formulário com os dados da entrega
          setCidadeDestino(entregaData.cidadeDestino);
          setQuilometragem(entregaData.quilometragem.toString()); // Converter para string para o TextField
          setStatus(entregaData.status);
          setDataSaida(new Date(entregaData.dataSaida).toISOString().split('T')[0]); // Formato 'YYYY-MM-DD'
          setVeiculoId(entregaData.veiculoId);
        }
      } catch (err: any) {
        console.error('Erro ao carregar dados do formulário:', err);
        setFormError(err.message || 'Erro ao carregar informações. Tente novamente.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchFormData();
  }, [id, isEditing]); // Refaz o fetch se o ID ou o modo de edição mudar

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFormError('');
    setSnackbarOpen(false);

    if (!cidadeDestino || !quilometragem || !status || !dataSaida || !veiculoId) {
      setFormError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const parsedQuilometragem = parseFloat(quilometragem);
    if (isNaN(parsedQuilometragem) || parsedQuilometragem <= 0) {
        setFormError('Quilometragem deve ser um número positivo.');
        setLoading(false);
        return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setFormError('Token de autenticação ausente. Por favor, faça login novamente.');
        setLoading(false);
        return;
      }

      const method = isEditing ? 'PUT' : 'POST'; // Mude o método baseado no modo
      const url = isEditing ? `http://localhost:3000/entregas/${id}` : 'http://localhost:3000/entregas'; // Mude a URL

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cidadeDestino,
          quilometragem: parsedQuilometragem,
          status,
          dataSaida: new Date(dataSaida).toISOString(),
          veiculoId: Number(veiculoId),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage(`Entrega ${isEditing ? 'atualizada' : 'cadastrada'} com sucesso!`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // Opcional: Limpar formulário se for cadastro, ou redirecionar
        if (!isEditing) {
            setCidadeDestino('');
            setQuilometragem('');
            setStatus('');
            setDataSaida('');
            setVeiculoId('');
        }
        navigate('/entregas'); // Redireciona para a lista de entregas
      } else {
        setFormError(data.message || `Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} entrega. Verifique os dados.`);
        setSnackbarMessage(data.message || `Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} entrega.`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err: any) {
      console.error('Erro na requisição:', err);
      setFormError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      setSnackbarMessage('Erro de conexão ao servidor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (pageLoading) { // Mostra um loader enquanto a página carrega os dados iniciais
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
        <Header />
        <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Carregando formulário...</Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Header />
      <Container maxWidth="sm" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            {isEditing ? 'Alteração de Entrega' : 'Cadastro de Entrega'} {/* Título dinâmico */}
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Insira os dados para {isEditing ? 'alterar a entrega.' : 'cadastrar uma nova entrega.'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Cidade de Destino"
              fullWidth
              variant="outlined"
              value={cidadeDestino}
              onChange={(e) => setCidadeDestino(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Quilometragem (km)"
              fullWidth
              variant="outlined"
              type="number"
              value={quilometragem}
              onChange={(e) => setQuilometragem(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Status"
              fullWidth
              variant="outlined"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Data de Saída"
              fullWidth
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dataSaida}
              onChange={(e) => setDataSaida(e.target.value)}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="veiculo-select-label">Veículo</InputLabel>
              <Select
                labelId="veiculo-select-label"
                id="veiculo-select"
                value={veiculoId}
                label="Veículo"
                onChange={(e) => setVeiculoId(e.target.value as number)}
              >
                {veiculos.length === 0 && !formError ? (
                  <MenuItem disabled>Carregando veículos...</MenuItem>
                ) : (
                  veiculos.map((veic) => (
                    <MenuItem key={veic.id} value={veic.id}>
                      {veic.placa} - {veic.modelo} ({veic.marca})
                    </MenuItem>
                  ))
                )}
                {veiculos.length === 0 && formError && (
                  <MenuItem disabled>Erro ao carregar veículos</MenuItem>
                )}
              </Select>
            </FormControl>

            {formError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formError}
              </Alert>
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
                mt: 3,
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? 'Salvar Alterações' : 'Cadastrar Entrega')} {/* Texto do botão dinâmico */}
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

export default EntregaFormPage; // <-- Nome do componente alterado