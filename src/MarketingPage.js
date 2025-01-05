import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AppTheme from './shared-theme/AppTheme';
import ProductSlider from './components/ProductSlider';
import { Element } from 'react-scroll';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Fab from '@mui/material/Fab';

export default function MarketingPage(props) {
  React.useEffect(() => {
    localStorage.removeItem('role');
    // localStorage.setItem('role', 'user'); // Store role in local storage
  })
  return (
    <div>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Element name="home">
        <Hero />
      </Element>
      <div>
        <Element name="productSlider">
          <ProductSlider />
        </Element>
        <Divider />
        <Element name="features">
          <Features />
        </Element>
        <Divider />
        <Element name="testimonials">
          <Testimonials />
        </Element>
        <Divider />
        <Element name="faq">
          <FAQ />
        </Element>
        <Divider />
        <Element name="contact">
          <Footer />
        </Element>
      </div>
      <Fab
        color="success"
        aria-label="Chat on WhatsApp"
        sx={{
          position: 'fixed',
          bottom: 20, // Distance from the bottom
          right: 20,  // Distance from the right
          bgcolor: '#25D366', // WhatsApp green color
          '&:hover': { bgcolor: '#20b858' }, // Hover effect
        }}
        onClick={() =>
          window.open(
            'https://wa.me/1234567890?text=Hello!%20I%20want%20to%20chat%20with%20you',
            '_blank'
          )
        }
      >
        <WhatsAppIcon />
      </Fab>

    </div>
  );
}
