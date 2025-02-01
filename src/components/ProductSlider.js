import React, { useEffect, useState, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { ChevronLeft, ChevronRight, ShoppingCart } from '@mui/icons-material';
import { db } from '../firebase';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { surfacesCustomizations } from '../shared-theme/customizations/surfaces';
import { createTheme } from '@mui/material/styles';
import CartDialog from './Cart';
import { useCart } from '../CartContext';
import '../App.css';

const ProductSlider = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { cart, updateCart } = useCart();
    const [openCart, setOpenCart] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const visibleCards = useMemo(() => {
        if (isMobile) return 1;
        if (isMedium) return 4;
        return 2; // Default for tablet
    }, [isMobile, isMedium]);

    const customTheme = useMemo(() => createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
        },
        components: {
            ...surfacesCustomizations,
        },
    }), []);

    useEffect(() => {
        const productsRef = ref(db, 'products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setProducts(productsArray);
        });

        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCart(savedCart);
    }, []);

    const handleAddToCart = (product) => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }
        setOpenCart(true);
        updateCart(updatedCart);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - visibleCards : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= products.length - visibleCards ? 0 : prevIndex + 1
        );
    };

    const cardWidth = 96 / visibleCards;

    return (
        <Box sx={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            mt: 3,
            mb: 3,
            px: { xs: 1, md: 2 }
        }}>
            <Typography
                variant="h2"
                sx={{
                    mb: 5,
                    mt: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    animation: 'fadeInSlideUp 1s ease-out', // Apply the animation
                    animationFillMode: 'forwards', // Keep the final state after animation
                    background: 'linear-gradient(45deg, #FF0080, #7928CA)', // Gradient text
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
                }}
            >
                Our Latest Products
            </Typography>
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        display: 'flex',
                        mx: -1,
                        gap: 2,
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${currentIndex * cardWidth}%)`,
                    }}
                >
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                flex: `0 0 ${cardWidth}%`,
                                boxSizing: 'border-box',
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '480px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.02)', // Slightly scale up on hover
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
                                },
                            }}
                        >
                            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{
                                        height: '240px',
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)', // Zoom in slightly on hover
                                        },
                                    }}
                                />
                                {/* Save Tag */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        left: 8,
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: 10,
                                        width: '100px',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 0 8px rgba(255, 0, 0, 0.8)', // Glowing effect
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)', // Slightly scale up on hover
                                        },
                                    }}
                                >
                                    {`Save Rs.${product.originalPrice - product.price}`}
                                </Box>

                                {/* Gradient Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
                                    }}
                                />

                            </Box>
                            <CardContent sx={{
                                textAlign: 'center',
                                p: 2,
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between', // Ensures even spacing
                                minHeight: '210px' // Fixed content height
                            }}>
                                <Box sx={{ mb: 'auto' }}> {/* Wrapper for product info */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '1.25rem' },
                                            // mb: 1,
                                            minHeight: '2.5em', // Minimum height for title
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            mb: 1,
                                            mt: 1,
                                            fontSize: { xs: '0.875rem', md: '1rem' },
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box component="span" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                                            Rs. {product.originalPrice}
                                        </Box>
                                        <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                                            Rs. {product.price}
                                        </Box>
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            fontSize: { xs: '0.875rem', md: '0.875rem' }
                                        }}
                                    >
                                        Size {product.size || 'N/A'}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color='primary'
                                    onClick={() => handleAddToCart(product)}
                                    startIcon={<ShoppingCart />}
                                    sx={{
                                        width: '100%',
                                        py: 1,
                                        mt: 2,
                                        mb: 1,
                                        // background: 'linear-gradient(45deg, #FF0080, #7928CA)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)', // Slight lift on hover
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        },
                                    }}
                                >
                                    Add to Cart
                                </Button>                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <IconButton
                    onClick={handlePrevious}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: { xs: 0, md: 2 },
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                    }}
                >
                    <ChevronLeft />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: { xs: 0, md: 2 },
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            <CartDialog open={openCart} onClose={() => setOpenCart(false)} cart={cart} setCart={updateCart} />
        </Box>
    );
};

export default ProductSlider;