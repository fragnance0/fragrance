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
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const visibleCards = useMemo(() => {
        if (isMobile) return 2;
        if (isTablet) return 3;
        return 3;
    }, [isMobile, isTablet]);

    const customTheme = useMemo(() => {
        return createTheme({
            cssVariables: {
                colorSchemeSelector: 'data-mui-color-scheme',
                cssVarPrefix: 'template',
            },
            components: {
                ...surfacesCustomizations,
            },
        });
    }, []);

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

    return (
        <Box sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '100%', md: "100%" },
            mx: 'auto', 
            position: 'relative',
            overflow: 'hidden',
            mt: { xs: 2, sm: 3, md: 5 },
            mb: { xs: 2, sm: 3, md: 5 },
            px: { xs: 2, sm: 3, md: 4 }
        }}>
            <Typography
                variant="h2"
                sx={{
                    mt: { xs: 1, sm: 2 },
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                    fontFamily: "sans-serif",
                    textAlign: "center"
                }}
                gutterBottom
            >
                Our Latest Products
            </Typography>

            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${(currentIndex * 42) / visibleCards}%)`,
                        width: `${(products.length * 100) / visibleCards}%`,
                    }}
                >
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            sx={[
                                {
                                    // flex: `0 0 calc(100%})`,
                                    boxSizing: 'border-box',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: { xs: 0.5, sm: 1 },
                                    margin: { xs: 0.5, sm: 1 },
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                },
                                surfacesCustomizations.MuiCard.styleOverrides.root({ theme: customTheme }),
                            ]}
                        >
                            <CardMedia
                                component="img"
                                height="300"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                    objectFit: 'cover',
                                    width: '100%'
                                }}
                            />
                            <CardContent
                                sx={[
                                    {
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        p: { xs: 1.5, sm: 2 },
                                    },
                                    surfacesCustomizations.MuiCardContent.styleOverrides.root,
                                ]}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 1,
                                        fontSize: { xs: '0.780rem', sm: '1.25rem' }
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: { xs: 1, sm: 2 },
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    Rs. {product.price}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: { xs: 1, sm: 2 },
                                        fontSize: { xs: '0.800rem', sm: '0.875rem' }
                                    }}
                                >
                                    Size {product.size || 'N/A'}
                                </Typography>
                                <Button
                                    sx={{
                                        mt: { xs: 1, sm: 2, md: 2 },
                                        mt: 'auto',
                                        mx: 'auto',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minWidth: { xs: '120px', sm: '150px' },
                                        fontSize: { xs: '0.780rem', sm: '1rem', md: '1rem', lg: '1rem' },
                                        padding: { xs: '6px 12px', sm: '8px 16px' },
                                    }}
                                    variant="contained"
                                    onClick={() => handleAddToCart(product)}
                                    startIcon={<ShoppingCart />}
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
                        left: { xs: '0px', sm: '10px' },
                        transform: 'translateY(-50%)',
                        backgroundColor: 'white',
                        zIndex: 1,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
                        right: { xs: '0px', sm: '10px' },
                        transform: 'translateY(-50%)',
                        backgroundColor: 'white',
                        zIndex: 1,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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