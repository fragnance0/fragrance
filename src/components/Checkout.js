import React, { useState } from "react";
import {
    Grid,
    Box,
    TextField,
    AppBar,
    Toolbar,
    Link,
    Typography,
    Button,
    Select,
    MenuItem,
    Divider,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useCart } from "../CartContext";
import { saveOrderToRTDB } from "../api/fb_functions";
import { remove, set } from "firebase/database";
import Sitemark from './SitemarkIcon';

const CheckoutPage = () => {
    const { cart } = useCart();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Calculate the subtotal
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // States for form fields
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [country, setCountry] = useState("Pakistan");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");

    // States for validation errors
    const [errors, setErrors] = useState({});

    // Validation function
    const validate = () => {
        const newErrors = {};

        if (!emailOrPhone) newErrors.emailOrPhone = "Email or phone number is required.";
        if (!firstName) newErrors.firstName = "First name is required.";
        if (!lastName) newErrors.lastName = "Last name is required.";
        if (!address) newErrors.address = "Address is required.";
        if (!city) newErrors.city = "City is required.";
        if (!phone) newErrors.phone = "Phone number is required.";

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleCompleteOrder = () => {
        if (!validate()) return; // Prevent submission if validation fails
        const orderData = {
            emailOrPhone,
            country,
            firstName,
            lastName,
            address,
            apartment,
            city,
            postalCode,
            phone,
            cart,
            subtotal,
        };

        saveOrderToRTDB(orderData)
            .then(() => {
                console.log("Order saved successfully!");
                setEmailOrPhone("");
                setCountry("Pakistan");
                setFirstName("");
                setLastName("");
                setAddress("");
                setApartment("");
                setCity("");
                setPostalCode("");
                setPhone("");
                localStorage.removeItem("cart");
            })
        console.log("Order data to save:", orderData);
        // Send `orderData` to the database or API
    };

    return (
        <Box sx>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 3,
                    bgcolor: '#fff',
                    backgroundImage: 'none',
                    transition: (theme) => theme.transitions.create(['margin-top'], {
                      duration: 200,
                    }),
                  }}            
            >
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Sitemark />
                </Toolbar>
            </AppBar>
            <Grid container sx={{ padding: 4, marginTop: 6, border: '1px solid', borderColor: 'divider', borderRadius: '0.5rem' }} spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={7}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Typography variant="h6">Contact</Typography>
                        <TextField
                            fullWidth
                            placeholder="Email or mobile phone number"
                            variant="outlined"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            error={!!errors.emailOrPhone}
                            helperText={errors.emailOrPhone}
                        />

                        <Typography variant="h6">Delivery</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Country/Region</InputLabel>
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                label="Country/Region"
                            >
                                <MenuItem value="Pakistan">Pakistan</MenuItem>
                                {/* Add more countries here */}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="First name"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                            <TextField
                                fullWidth
                                placeholder="Last name"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            placeholder="Address"
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                        <TextField
                            fullWidth
                            placeholder="Apartment, suite, etc. (optional)"
                            variant="outlined"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                        />
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="City"
                                variant="outlined"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                error={!!errors.city}
                                helperText={errors.city}
                            />
                            <TextField
                                fullWidth
                                placeholder="Postal code (optional)"
                                variant="outlined"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            placeholder="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                    </Box>

                    <Divider sx={{ marginY: 4 }} />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 4, backgroundColor: "black", padding: 3, color: "white" }}
                        onClick={handleCompleteOrder}
                    >
                        Place Order
                    </Button>
                </Grid>
                {/* Right Section - Order Summary */}
                <Grid item xs={12} md={5}>
                    <Box
                        sx={{
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography variant="h6">Order Summary</Typography>

                        {/* Loop through the cart items */}
                        {cart.map((item) => (
                            <Box sx={{ display: "flex", justifyContent: "space-between" }} key={item.id}>
                                <Box sx={{ width: "50px", height: "50px" }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body1">{item.name}</Typography>
                                    <Typography variant="body2">{item.size}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                </Box>
                                <Typography>{`Rs ${item.price * item.quantity}.00`}</Typography>
                            </Box>
                        ))}

                        <Divider />

                        {/* Total */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                            <Typography>Subtotal • {cart.length} items</Typography>
                            <Typography>{`Rs ${subtotal}.00`}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Shipping</Typography>
                            <Typography>FREE</Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">{`Rs ${subtotal}.00`}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutPage;
