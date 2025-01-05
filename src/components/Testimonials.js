import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/system';

const fragranceTestimonials = [
  {
    avatar: <Avatar alt="Alice Perfume" src="/static/images/avatar/1.jpg" />,
    name: 'Alice Harper',
    favoriteFragrance: 'Rose Bloom',
    testimonial:
      "Rose Bloom has become an essential part of my daily routine. Its subtle yet captivating aroma makes me feel refreshed and confident throughout the day.",
  },
  {
    avatar: <Avatar alt="Ethan Musk" src="/static/images/avatar/2.jpg" />,
    name: 'Ethan Musk',
    favoriteFragrance: 'Mystic Oud',
    testimonial:
      "Mystic Oud is unlike any fragrance I've tried before. It strikes the perfect balance between boldness and elegance. Highly recommend it for special occasions!",
  },
  {
    avatar: <Avatar alt="Sophia Jasmine" src="/static/images/avatar/3.jpg" />,
    name: 'Sophia Jasmine',
    favoriteFragrance: 'Vanilla Bliss',
    testimonial:
      'Vanilla Bliss is my go-to fragrance for its warm and comforting scent. It never fails to bring a smile to my face every time I wear it."',
  },
  {
    avatar: <Avatar alt="Liam Woods" src="/static/images/avatar/4.jpg" />,
    name: 'Liam Woods',
    favoriteFragrance: 'Citrus Spark',
    testimonial:
      "Citrus Spark is the epitome of freshness. It gives me a burst of energy and keeps me feeling vibrant all day long.",
  },
  {
    avatar: <Avatar alt="Emma Floral" src="/static/images/avatar/5.jpg" />,
    name: 'Emma Floral',
    favoriteFragrance: 'Jasmine Whisper',
    testimonial:
      "Jasmine Whisper perfectly encapsulates elegance and charm. Every time I wear it, I receive endless compliments.",
  },
  {
    avatar: <Avatar alt="Noah Amber" src="/static/images/avatar/6.jpg" />,
    name: 'Noah Amber',
    favoriteFragrance: 'Amber Woods',
    testimonial:
      "Amber Woods is a masterpiece. Its rich and deep scent is truly captivating and leaves a lasting impression.",
  },
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function FragranceTestimonials() {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', mb: 4 }}
        >
          Fragrance Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Discover what our customers love about our fragrances. From timeless classics to modern blends, experience the scents that bring joy and inspiration.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {fragranceTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex'}}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: { xs: 2, sm: 2 }
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.favoriteFragrance}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
