import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { addProductToRTDB } from '../api/fb_functions';

const AddProduct = () => {
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: '',
    originalPrice: '',
    price: '',
    image: '',
    size: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!product.name.trim()) newErrors.name = 'Product name is required.';
    if (!product.originalPrice || isNaN(product.originalPrice) || product.originalPrice <= 0)
      newErrors.originalPrice = 'Original price must be a positive number.';
    if (!product.price || isNaN(product.price) || product.price <= 0)
      newErrors.price = 'Discounted price must be a positive number.';
    if (!product.image.trim()) newErrors.image = 'Image URL is required.';
    if (!product.size.trim()) newErrors.size = 'Size is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleAddProduct = () => {
    if (validateFields()) {
      console.log('Product Added:', product);
      addProductToRTDB(product)
        .then(() => {
          setProduct({
            name: '',
            originalPrice: '',
            price: '',
            image: '',
            size: '',
          });
          setErrors({});
        });
    }
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Add Product
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  placeholder="Product Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                  error={!!errors.name}
                  helperText={errors.name}                
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Original Price (Rs.)"
                  variant="outlined"
                  fullWidth
                  name="originalPrice"
                  value={product.originalPrice}
                  onChange={handleInputChange}
                  required
                  error={!!errors.originalPrice}
                  helperText={errors.originalPrice}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Discounted Price (Rs.)"
                  variant="outlined"
                  fullWidth
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Size (e.g., 50ml, 100ml)"
                  variant="outlined"
                  fullWidth
                  name="size"
                  value={product.size}
                  onChange={handleInputChange}
                  required
                  error={!!errors.size}
                  helperText={errors.size}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  placeholder="Image URL"
                  variant="outlined"
                  fullWidth
                  name="image"
                  value={product.image}
                  onChange={handleInputChange}
                  required
                  error={!!errors.image}
                  helperText={errors.image}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={6} mb={10}>
          <Typography variant="h5" align="center" gutterBottom>
            Product Preview
          </Typography>
          {product.image && product.name && product.price && (
            <Card
              sx={{
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mb: 2, textDecorationLine: 'line-through' }}
                >
                  Rs. {product.originalPrice}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Rs. {Number(product.price).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Size: {product.size}
                </Typography>
              </CardContent>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              </Grid>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProduct;
