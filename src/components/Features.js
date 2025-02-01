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
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import HealingRoundedIcon from '@mui/icons-material/HealingRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import featuresImageLight from '../assets/features.jpeg';

const items = [
  {
    icon: <SpaRoundedIcon />,
    title: 'Boost Hair Growth',
    description: 'Enhance your hair growth naturally with a unique blend of herbal ingredients for thick and healthy hair.',
    imageLight: `url(${featuresImageLight})`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || '../assets'}/features-dark.jpg")`,
  },
  {
    icon: <LocalFloristRoundedIcon />,
    title: 'Soft & Shiny Hair',
    description: 'Nourish your hair for a silky, shiny texture that stands out with natural herbal goodness.',
    imageLight: `url(${featuresImageLight})`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || '../assets'}/featuresark.jpg")`,
  },
  {
    icon: <HealingRoundedIcon />,
    title: 'Reduces Hair Fall',
    description: 'Strengthen your hair roots to minimize hair fall with the power of herbal oils.',
    imageLight: `url(${featuresImageLight})`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || '../assets'}/featuresll-dark.jpg")`,
  },
  {
    icon: <BrushRoundedIcon />,
    title: 'Repairs Damage',
    description: 'Repair damaged hair and restore its natural vitality with our carefully crafted herbal formula.',
    imageLight: `url(${featuresImageLight})`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || '../assets'}/features.jpg")`,
  },
  {
    icon: <FavoriteRoundedIcon />,
    title: 'Controls Dandruff',
    description: 'Say goodbye to dandruff with our herbal oil that soothes and balances your scalp.',
    imageLight: `url(${featuresImageLight})`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || '../assets'}/featuresff-dark.jpg")`,
  },
  {
    icon: <OpacityRoundedIcon />,
    title: 'Removes Frizz',
    description: 'Tame unruly frizz and get smooth, manageable hair with the nourishing power of herbs.',
    imageLight: `url(${featuresImageLight})`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || '../assets'}/featuresdark.jpg")`,
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
            backgroundSize: 'contain', // Ensure it covers the container
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
            sx={{ color: 'text.primary', fontWeight: 'bold', mt: 2 }}
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
          Oil Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          Discover what makes our oils stand out. From pure and natural extracts to sustainable practices, we offer an unparalleled experience.
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
              gap: 1,
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
                      backgroundColor: 'selected.main',
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: '#fff',
                    '&:hover': {
                      backgroundColor: selectedItemIndex === index && '#fff',
                    }
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
                      gap: 0,
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
            width: { xs: '100%', md: '100%' },
            height: { xs: 'auto', md: 'auto' },
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
                width: '100%', // Ensure it spans its container
                height: "100%", // Explicit height
                backgroundSize: 'contain', // Ensure it covers the container
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