import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';

const items = [
  {
    icon: <LocalFloristRoundedIcon />,
    title: 'Exquisite Scents',
    description:
      'Explore our curated collection of fragrances, crafted to evoke emotions and leave a lasting impression.',
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYYEOZBjTUOhIAX18AUUDySsB9B2P-l3h_g&s'}")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://example.com'}/images/fragrance-dark1.jpg")`,
  },
  {
    icon: <PaletteRoundedIcon />,
    title: 'Custom Blends',
    description:
      'Personalize your scent with our custom fragrance blending service for a truly unique experience.',
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://liraimportltd.com/wp-content/uploads/2023/07/Fragnance-Mist-Pure-Seduction.jpg'}")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://example.com'}/images/fragrance-dark2.jpg")`,
  },
  {
    icon: <SpaRoundedIcon />,
    title: 'Eco-Friendly Packaging',
    description:
      'Our fragrances come in sustainable, eco-friendly packaging to help preserve the environment.',
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://shopatshams.com.pk/cdn/shop/files/www.shopatshams.com.pk_e0034e20-5323-4f47-9d28-e9ccf83c2dae.png?v=1721373813'}")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://example.com'}/images/fragrance-dark3.jpg")`,
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        marginBottom: 8,
        borderColor: (theme.vars || theme).palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            m: 'auto',
            width: '100%', // Ensure it spans its container
            maxWidth: 300, // Optional: restrict maximum width
            height: 280, // Explicit height
            backgroundSize: 'cover', // Ensure it covers the container
            backgroundPosition: 'center', // Center the image
            backgroundRepeat: 'no-repeat', // Prevent repetition
            backgroundImage: 'var(--items-imageLight)',
            ...theme.applyStyles('dark', {
              backgroundImage: 'var(--items-imageDark)',
            }),
          })}
          style={
            items[selectedItemIndex]
              ? {
                '--items-imageLight': items[selectedItemIndex].imageLight,
                '--items-imageDark': items[selectedItemIndex].imageDark,
              }
              : {}
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    imageDark: PropTypes.string.isRequired,
    imageLight: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};

export { MobileLayout };

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 4, sm: 8 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Fragrance Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          Discover what makes our fragrances stand out. From unique scents to sustainable practices, we offer an unparalleled experience.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: (theme.vars || theme).palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={(theme) => ({
                m: 'auto',
                width: '100%', // Ensure it spans its container
                maxWidth: 420, // Optional: restrict maximum width
                height: 500, // Explicit height
                backgroundSize: 'cover', // Ensure it covers the container
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent repetition
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)',
                }),
              })}
              style={
                items[selectedItemIndex]
                  ? {
                    '--items-imageLight': items[selectedItemIndex].imageLight,
                    '--items-imageDark': items[selectedItemIndex].imageDark,
                  }
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
