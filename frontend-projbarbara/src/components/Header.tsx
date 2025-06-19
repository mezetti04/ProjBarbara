// src/components/Header.tsx
import React, { useState, useEffect } from 'react'; // Importe useEffect também
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/jminterlog_logo.png';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate

// Estilizando o AppBar
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#333',
  boxShadow: 'none',
  borderBottom: '1px solid #eee',
  width: '100%',
  boxSizing: 'border-box',
}));

// Estilizando a Toolbar
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '24px',
  paddingRight: '24px',
  width: '100%',
  boxSizing: 'border-box',
});

const Logo = styled('img')({
  height: '30px',
  marginRight: '20px',
});

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Novo estado para login
  const navigate = useNavigate(); // Hook para navegação

  // Verifica o status de login ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Converte para booleano: true se token existe, false caso contrário
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para lidar com o Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    setIsLoggedIn(false); // Atualiza o estado de login
    navigate('/'); // Redireciona para a página inicial (ou login)
    handleClose(); // Fecha o menu hambúrguer, se estiver aberto
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo src={logo} alt="JM Interlog Logo" />
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* Botões para telas maiores */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 'bold' }}>Sobre</Button>

          {/* Renderização condicional dos botões */}
          {isLoggedIn ? (
            <> {/* Fragmento para agrupar múltiplos elementos */}
              <Button component={Link} to="/entregas" color="inherit" sx={{ fontWeight: 'bold' }}>Entregas</Button>
              <Button onClick={handleLogout} color="inherit" sx={{ fontWeight: 'bold' }}>Logout</Button> {/* Botão de Logout */}
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'red', color: '#fff' },
                color: { md: 'red' },
              }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Ícone de menu (hambúrguer) para telas menores */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">Sobre</MenuItem>
            {/* Renderização condicional dos itens do menu hambúrguer */}
            {isLoggedIn ? (
              <>
                <MenuItem onClick={handleClose} component={Link} to="/entregas">Entregas</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Item de Logout */}
              </>
            ) : (
              <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
            )}
          </Menu>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;