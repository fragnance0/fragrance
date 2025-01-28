import React from 'react';
import { Box, Typography, Rating, LinearProgress, Card, CardContent, Avatar, Grid, TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const reviews = [
    {
      id: 1,
      user: 'Amina Khan',
      rating: 5,
      title: 'Amazing Quality!',
      review: 'This oil has transformed my hair. It feels so nourished and healthy. Highly recommend it!',
      date: '2024-10-05',
    },
    {
      id: 2,
      user: 'Yusuf Ahmed',
      rating: 5,
      title: 'Best Oil Ever!',
      review: 'I’ve tried many oils, but this one stands out. It’s lightweight and smells amazing. My skin feels so soft!',
      date: '2024-09-28',
    },
    {
      id: 3,
      user: 'Fatima Ali',
      rating: 5,
      title: 'Perfect for Dry Skin',
      review: 'This oil is a lifesaver for my dry skin. It absorbs quickly and leaves my skin glowing. Love it!',
      date: '2024-09-20',
    },
    {
      id: 4,
      user: 'Umar Ameen',
      rating: 4.5,
      title: 'Great Value for Money',
      review: 'The oil is very effective and affordable. My hair feels stronger and shinier after just a few uses.',
      date: '2024-09-15',
    },
    {
      id: 5,
      user: 'Zainab Malik',
      rating: 5,
      title: 'Natural and Soothing',
      review: 'I love how natural this oil feels. It’s perfect for my sensitive skin and has a calming effect.',
      date: '2024-09-10',
    },
    {
      id: 6,
      user: 'Ibrahim Hassan',
      rating: 5,
      title: 'Excellent for Hair Growth',
      review: 'I’ve noticed a significant improvement in my hair growth since using this oil. It’s a must-have!',
      date: '2024-09-05',
    },
  ];

const ratingDistribution = {
    5: 700,
    4: 300,
    3: 50,
    2: 10,
    1: 1
};

const totalReviews = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
const averageRating = (Object.entries(ratingDistribution).reduce((a, [stars, count]) => a + (parseInt(stars) * count), 0) / totalReviews).toFixed(1);

function ReviewsScreen() {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Product Reviews</Typography>

            {/* Overall Rating and Rating Breakdown in one row */}
            <Grid container spacing={3} sx={{ marginBottom: 4, mt: 2, p: 2 }}>
                {/* Rating Breakdown */}
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Rating Breakdown</Typography>
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <Box key={stars} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Typography variant="body2">{stars} Star</Typography>
                            <LinearProgress variant="determinate" value={(ratingDistribution[stars] / totalReviews) * 100} sx={{ marginLeft: 2, marginRight: 2, flexGrow: 1 }} />
                            <Typography variant="body2">{ratingDistribution[stars]}</Typography>
                        </Box>
                    ))}
                </Grid>
                {/* Overall Rating */}
                <Grid item xs={6} alignSelf={'center'} justifyContent={'center'} alignItems={'center'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h2">{averageRating}</Typography>
                        <Box sx={{ marginLeft: 2 }}>
                            <Rating value={parseFloat(averageRating)} precision={0.1} readOnly />
                            <Typography variant="body2">{totalReviews} reviews</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Customer Reviews */}
            <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
            <Grid container spacing={3}>
                {reviews.map((review) => (
                    <Grid item xs={12} md={4} key={review.id}> {/* Change xs={12} to xs={4} */}
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                    <Avatar sx={{ marginLeft: 1, marginRight: 2, mt: 1 }}>{review.user[0]}</Avatar>
                                    <Typography variant="subtitle1">{review.user}</Typography>
                                </Box>
                                <Rating sx={{ color: '#FFD700', ml: 1 }} value={review.rating} readOnly />
                                <Typography variant="h6" sx={{ marginTop: 1, marginLeft: 1 }}>{review.title}</Typography>
                                <Typography variant="body1" sx={{ marginTop: 1, marginLeft: 1 }}>{review.review}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2, marginLeft: 1 }}>{review.date}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ReviewsScreen;