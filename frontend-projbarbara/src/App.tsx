// src/App.tsx
import React, { useState, useMemo, createContext } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EntregasPage from './pages/EntregasPage';
import EntregaFormPage from './pages/EntregaFormPage';
import { ThemeProvider, createTheme } from '@mui/material'; // Removido PaletteMode daqui
import type { PaletteMode } from '@mui/material/styles'; // Importado PaletteMode de 'styles'
 // Importado PaletteMode de 'styles'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Crie um contexto para o modo de cor (light/dark)
// Isso nos permitirá acessar a função de alternância em qualquer componente filho
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  // 2. Estado para controlar o modo atual (ligh ou dark)
  // Tentamos carregar do localStorage, caso contrário, padrão para 'light'
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as PaletteMode) || 'light';
  });

  // 3. Use useMemo para memorizar o objeto de contexto de modo de cor
  // Isso evita recriações desnecessárias da função toggleColorMode
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode); // Salva a preferência no localStorage
          return newMode;
        });
      },
    }),
    [],
  );

  // 4. Use useMemo para criar o tema dinamicamente com base no 'mode'
  // Definimos as paletas para os modos claro e escuro aqui
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // O modo atual (light ou dark)
          primary: {
            main: '#FF0000', // Vermelho da logo
          },
          secondary: {
            main: '#000000', // Preto da logo
          },
          ...(mode === 'light'
            ? {
                // Paleta para o modo claro
                background: {
                  default: '#f4f6f8', // Um cinza claro para o fundo padrão
                  paper: '#ffffff',    // Branco para componentes tipo Paper
                },
                text: {
                  primary: '#333',     // Cor de texto principal escura
                  secondary: '#666',   // Cor de texto secundária
                },
              }
            : {
                // Paleta para o modo escuro
                background: {
                  default: '#121212', // Um cinza bem escuro para o fundo padrão
                  paper: '#1d1d1d',    // Cinza escuro para componentes tipo Paper
                },
                text: {
                  primary: '#ffffff', // Cor de texto principal clara
                  secondary: '#b0b0b0', // Cor de texto secundária clara
                },
              }),
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
        },
        components: {
          // Exemplo: Estilização para o AppBar no modo escuro para que ele não se misture com o fundo
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#212121' : '#fff', // Fundo mais escuro para o AppBar no dark mode
                color: mode === 'dark' ? '#fff' : '#333', // Texto branco no dark mode
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                // Sombras um pouco mais escuras no dark mode para dar profundidade
                boxShadow: mode === 'dark' ? '0px 4px 20px rgba(255, 255, 255, 0.05)' : '0px 4px 20px rgba(0, 0, 0, 0.1)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              containedPrimary: {
                // Garante que botões vermelhos sejam sempre vibrantes
                backgroundColor: '#FF0000',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              },
              containedSecondary: {
                // Garante que botões pretos sejam sempre consistentes
                backgroundColor: '#000',
                '&:hover': {
                  backgroundColor: '#333',
                },
              },
              // Assegura que o texto nos botões de texto (como "Sobre", "Entregas") siga o tema
              textInherit: {
                color: mode === 'dark' ? '#fff' : '#333', // Cor do texto no dark mode para botões de texto
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.1)',
                  color: 'red',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#fff' : '#333', // Cor do ícone no dark mode
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              // Ajusta a cor padrão da tipografia para se adequar ao tema
              root: {
                color: mode === 'dark' ? '#fff' : '#213547', // Cor padrão de texto
              },
              h1: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              h2: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              h3: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              h4: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              h5: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              h6: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              body1: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              body2: {
                color: mode === 'dark' ? '#fff' : '#213547',
              },
              // Adicione mais variantes se necessário
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? '#bbb' : '#333', // Cor do label
                },
                '& .MuiInputBase-input': {
                  color: mode === 'dark' ? '#eee' : '#333', // Cor do texto digitado
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'dark' ? '#555' : '#ccc', // Cor da borda
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'dark' ? '#888' : '#999', // Cor da borda no hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'red', // Cor da borda no focus (pode ser primary.main)
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              icon: {
                color: mode === 'dark' ? '#fff' : '#333', // Cor do ícone do select
              },
              select: {
                color: mode === 'dark' ? '#eee' : '#333', // Cor do texto selecionado
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? 'rgba(255, 0, 0, 0.15)' : undefined, // Fundo levemente adaptado no dark
                color: mode === 'dark' ? '#fff' : undefined, // Texto adaptado no dark
              },
              standardError: {
                backgroundColor: mode === 'dark' ? '#4f0000' : undefined, // Fundo mais escuro para erro no dark
                color: mode === 'dark' ? '#ffcccc' : undefined, // Texto claro para erro no dark
              },
              standardInfo: {
                backgroundColor: mode === 'dark' ? '#003366' : undefined,
                color: mode === 'dark' ? '#ccddff' : undefined,
              },
              standardSuccess: {
                backgroundColor: mode === 'dark' ? '#0a4f00' : undefined,
                color: mode === 'dark' ? '#ccffcc' : undefined,
              },
              standardWarning: {
                backgroundColor: mode === 'dark' ? '#4f3300' : undefined,
                color: mode === 'dark' ? '#ffeecc' : undefined,
              }
            }
          },
          // Adicione aqui mais overrides de componentes se quiser personalizar
          // como cada componente do Material-UI se comporta em cada tema.
        },
      }),
    [mode], // O tema é recriado apenas quando o 'mode' muda
  );

  return (
    // 5. Envolve a aplicação com o ColorModeContext.Provider e ThemeProvider
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Reseta CSS e aplica os estilos base do Material-UI */}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/entregas" element={<EntregasPage />} />
            <Route path="/entregas/cadastro" element={<EntregaFormPage />} />
            <Route path="/entregas/editar/:id" element={<EntregaFormPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;