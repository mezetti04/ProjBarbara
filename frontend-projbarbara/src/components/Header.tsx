// src/components/Header.tsx
import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/jminterlog_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Estilizando o AppBar para usar as cores do tema global
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
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

// Logo - REMOVIDO O FILTRO DE INVERSÃO
const Logo = styled('img')(({ theme }) => ({
  height: '30px',
  marginRight: '20px',
  // filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none', // Linha removida
}));

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    handleClose();
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
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 2,
        }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                color: 'red',
              },
            }}
          >
            Sobre
          </Button>

          {/* Renderização condicional dos botões */}
          {isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/entregas"
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    color: 'red',
                  },
                }}
              >
                Entregas
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light' ? '#333' : '#333',
                    color: '#fff',
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'darkred',
                  color: '#fff',
                },
              }}
            >
              Login
            </Button>
          )}

          {/* Botão de alternância de tema para telas maiores */}
          <IconButton sx={{ ml: 1, color: theme.palette.text.primary }} onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Ícone de menu (hambúrguer) para telas menores */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ color: theme.palette.text.primary }}
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
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/"
              sx={{
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  color: 'red',
                },
              }}
            >
              Sobre
            </MenuItem>
            {isLoggedIn ? (
              <>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/entregas"
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      color: 'red',
                    },
                  }}
                >
                  Entregas
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'light' ? '#333' : '#333',
                      color: '#fff',
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'darkred',
                    color: '#fff',
                  },
                }}
              >
                Login
              </MenuItem>
            )}
            {/* Botão de alternância de tema no menu hambúrguer */}
            <MenuItem onClick={toggleColorMode} sx={{ color: theme.palette.text.primary }}>
              {theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </MenuItem>
          </Menu>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;