import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CartDialog from './Cart';
import { useCart } from '../CartContext';
import { Link } from 'react-scroll';

const StyledToolbar = styled(Toolbar)(({ theme, scrolled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: scrolled ? 0 : `calc(${theme.shape.borderRadius}px + 8px)`,
  margin: scrolled ? 0 : '0 24px',
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: scrolled ? 'transparent' : (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / ${scrolled ? 0.95 : 0.95})`
    : alpha(theme.palette.background.default, scrolled ? 0.95 : 0.4),
  boxShadow: scrolled ? (theme.vars || theme).shadows[1] : (theme.vars || theme).shadows[1],
  padding: scrolled ? '12px 24px' : '8px 12px',
  transition: theme.transitions.create(['padding', 'border-radius', 'background-color', 'box-shadow'], {
    duration: 200,
  }),
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { cart, updateCart } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    console.log(newOpen);
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: scrolled ? 0 : 'calc(var(--template-frame-height, 0px) + 28px)',
        transition: (theme) => theme.transitions.create(['margin-top'], {
          duration: 200,
        }),
      }}
    >
      <Container
        maxWidth={false}
        disableGutters={scrolled}
        sx={{
          transition: theme => theme.transitions.create(['padding'], {
            duration: 200,
          }),
        }}
      >
        <StyledToolbar variant="dense" scrolled={scrolled}>
          {/* Rest of your existing toolbar content */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to="home" smooth={true} duration={500} offset={-70}>
                <Button variant="text" color="info" size="small">Home</Button>
              </Link>
              <Link to="productSlider" smooth={true} duration={500} offset={-70}>
                <Button variant="text" color="info" size="small">Products</Button>
              </Link>
              <Link to="features" smooth={true} duration={500} offset={-70}>
                <Button variant="text" color="info" size="small">Features</Button>
              </Link>
              <Link to="testimonials" smooth={true} duration={500} offset={-70}>
                <Button variant="text" color="info" size="small">Testimonials</Button>
              </Link>
              <Link to="faq" smooth={true} duration={500} offset={-70}>
                <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>FAQ</Button>
              </Link>
              <Link to="contact" smooth={true} duration={500} offset={-70}>
                <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>Contact</Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {/* <Button color="primary" variant="text" size="small">Sign in</Button> */}
            <Button
              onClick={() => {
                setOpenCart(true);
                setOpen(false);
              }}
              color="primary"
              variant="contained"
              size="medium"
              startIcon={<ShoppingCart />}
            >
              Cart
            </Button>
            {/* <ColorModeIconDropdown /> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            {/* <ColorModeIconDropdown size="medium" /> */}
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Menu Items with Smooth Scroll */}
                <Link to="home" smooth={true} duration={500} offset={-70}>
                  <MenuItem onClick={toggleDrawer(false)}>Home</MenuItem>
                </Link>
                <Link to="productSlider" smooth={true} duration={500} offset={-70}>
                  <MenuItem onClick={toggleDrawer(false)}>Products</MenuItem>
                </Link>
                <Link to="features" smooth={true} duration={500} offset={-70}>
                  <MenuItem onClick={toggleDrawer(false)}>Features</MenuItem>
                </Link>
                <Link to="testimonials" smooth={true} duration={500} offset={-70}>
                  <MenuItem onClick={toggleDrawer(false)}>Testimonials</MenuItem>
                </Link>
                <Link to="faq" smooth={true} duration={500} offset={-70}>
                  <MenuItem onClick={toggleDrawer(false)}>FAQ</MenuItem>
                </Link>
                <Link to="contact" smooth={true} duration={500} offset={-70}>
                  <MenuItem onClick={toggleDrawer(false)}>Contact</MenuItem>
                </Link>

                <Divider sx={{ my: 3 }} />

                {/* Sign up and Sign in buttons */}
                <MenuItem>
                  <Button
                    onClick={() => {
                      setOpenCart(true);
                      setOpen(false);
                    }}
                    color="primary"
                    variant="contained"
                    size="medium"
                    fullWidth
                    startIcon={<ShoppingCart />}
                  >
                    Cart
                  </Button>
                </MenuItem>
                {/* <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem> */}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
      <CartDialog open={openCart} onClose={() => setOpenCart(false)} cart={cart} setCart={updateCart} />
    </AppBar>
  );
}