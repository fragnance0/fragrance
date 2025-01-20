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

    const cardWidth = 100 / visibleCards;

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
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontFamily: "sans-serif",
                    textAlign: "center"
                }}
            >
                Our Latest Products
            </Typography>

            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        display: 'flex',
                        mx: -1,
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
                                // mx: 1,
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '480px' // Fixed height for all cards
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                height="240"
                                sx={{
                                    // height: '240px',
                                    // objectFit: 'cover'
                                }}
                            />
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
                                            mb: 1,
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
                                            fontSize: { xs: '0.875rem', md: '1rem' }
                                        }}
                                    >
                                        Rs. {product.price}
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
                                    onClick={() => handleAddToCart(product)}
                                    startIcon={<ShoppingCart />}
                                    sx={{
                                        width: '100%',
                                        py: 1,
                                        mt: 2
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
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