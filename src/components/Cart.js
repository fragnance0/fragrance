import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Button,
    Typography,
    Box,
    Stack,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const CartDialog = ({ open, onClose, cart = [], setCart }) => {
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate total amount when the cart changes
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cart]); // Recalculate the total whenever the cart changes    

    const handleIncrease = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };    

    const handleDecrease = (id) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemove = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <Dialog sx={{ zIndex: 9999 }} open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Your Cart ({cart?.length || 0})
                <IconButton
                    onClick={onClose}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {cart?.map((item) => (
                    <Box key={item.id} display="flex" alignItems="center" mb={2}>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: 100, height: 100, borderRadius: 8, marginRight: 16 }}
                        />
                        <Box flexGrow={1}>
                            <Typography variant="body1" fontWeight="bold">
                                {item.name}
                            </Typography>
                            <Typography variant="body2">{item.size || "50 ML"}</Typography>
                            <Box display="flex" alignItems="center" mt={1}>
                                <Button onClick={() => handleDecrease(item.id)} size="small">
                                    -
                                </Button>
                                <Typography
                                    variant="body2"
                                    style={{
                                        margin: '0 8px',
                                        padding: '4px 12px',
                                        border: '1px solid #ccc',
                                        borderRadius: 4,
                                    }}
                                >
                                    {item.quantity}
                                </Typography>
                                <Button onClick={() => handleIncrease(item.id)} size="small">
                                    +
                                </Button>
                            </Box>
                        </Box>
                        <Box textAlign="right">
                            {item.originalPrice && (
                                <Typography
                                    variant="body1"
                                    style={{ textDecoration: 'line-through', color: 'gray' }}
                                >
                                    Rs.{item.originalPrice.toLocaleString()}
                                </Typography>
                            )}
                            <Typography variant="body1" color="error">
                                Rs.{(item.price * item.quantity).toLocaleString()}
                            </Typography>
                        </Box>
                        <IconButton onClick={() => handleRemove(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <Divider style={{ margin: '16px 0', backgroundColor: '#000' }} /> 
                {/* <Stack direction="row" spacing={0} useFlexGap>
                    <TextField
                        fullWidth
                        placeholder="Discount Code"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            shrink: false,
                            endAdornment: (
                                <Button size="small" variant="contained" style={{ marginRight: -12 }}>
                                    Apply
                                </Button>
                            ),
                        }}
                    />
                </Stack> */}
                <Box mt={2} textAlign="right">
                    <Typography variant="body1">Subtotal: Rs.{totalAmount.toLocaleString()}</Typography>
                    <Typography variant="body2" color="success.main">
                        Total Savings: Rs.{cart.reduce((sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0), 0).toLocaleString()}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('checkout')}
                >
                    Checkout (Rs.{totalAmount.toLocaleString()})
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CartDialog;
