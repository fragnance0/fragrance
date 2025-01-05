import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, CardMedia, Divider, Paper, Grid, Chip } from "@mui/material";
import {
    LocalShipping,
    LocationOn,
    AssignmentReturnOutlined,
    Phone,
    Email,
    ShoppingBag
} from '@mui/icons-material';
import { moveProductToShipped, moveProductToDelivered, productReturned } from "../api/fb_functions";


const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const orderData = location.state;

    useEffect(() => {
        setOrder(orderData);
    }, [orderData]);

    if (!order) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#f5f5f5"
            }}>
                <Typography variant="h6">Loading order details...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh", mt: 10 }}>
            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 2, color: "#1a237e", fontWeight: "bold" }}>
                    Order Details
                    <Chip
                        label={`Order #${id}`}
                        sx={{ ml: 2, bgcolor: "#e8eaf6", color: "#1a237e" }}
                    />

                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={4}>
                    {/* Customer Information */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ bgcolor: "#fafafa", p: 2, height: "100%" }}>
                            <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                <LocalShipping size={20} /> Customer Information
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <span style={{ fontWeight: "bold" }}>Name:</span>
                                    {order.firstName} {order.lastName}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Email size={16} /> {order.emailOrPhone}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Phone size={16} /> {order.phone}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <LocationOn size={16} /> {order.apartment}, {order.address}, {order.city}, {order.country}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ bgcolor: "#fafafa", p: 2, height: "100%" }}>
                            <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                <ShoppingBag size={20} /> Order Summary
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="h5" sx={{ color: "#1a237e", mt: 2 }}>
                                    Subtotal: Rs. {order.subtotal}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Cart Items */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, color: "#1a237e" }}>
                    Order Items ({order.cart.length})
                </Typography>
                <Grid container spacing={3}>
                    {order.cart.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image}
                                    alt={item.name}
                                    sx={{
                                        objectFit: "cover",
                                        borderRadius: "8px 8px 0 0"
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                                        {item.name}
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant="body1" color="primary">
                                            ${item.price}
                                        </Typography>
                                        <Chip
                                            label={`Qty: ${item.quantity}`}
                                            size="small"
                                            sx={{ bgcolor: "#e8eaf6" }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "end" }}>
                    {
                        orderData.status === "Shipped" ? (
                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 2,
                                    gap: 2, // Add some spacing between buttons
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AssignmentReturnOutlined />}
                                    onClick={() => productReturned(id)}
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        textTransform: "none", // Prevent text from being all caps
                                        "&:hover": {
                                            backgroundColor: "red", // Darker blue on hover
                                        },
                                        borderRadius: "8px", // Rounded corners
                                        boxShadow: "0px 3px 5px rgba(0,0,0,0.2)", // Subtle shadow
                                    }}
                                >
                                    Product Returned
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<LocalShipping />}
                                    onClick={() => moveProductToDelivered(id)}
                                    sx={{
                                        backgroundColor: "#388e3c", // Green for delivered
                                        color: "#fff",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#2e7d32", // Darker green on hover
                                        },
                                        borderRadius: "8px",
                                        boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    Add to Delivered
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LocalShipping />}
                                onClick={() => moveProductToShipped(id)}
                            >
                                Add to Shipping
                            </Button>
                        )
                    }
                </Box>

            </Paper>
        </Box>
    );
};

export default OrderDetails;