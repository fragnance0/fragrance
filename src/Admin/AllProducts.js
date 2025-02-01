import React, { useState, useEffect } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { db } from '../firebase'; // Adjust the import according to your Firebase setup
import {
    Box,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Card,
    CardMedia,
    Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

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
    }, []);

    const handleEditClick = (product) => {
        setEditProduct(product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditProduct(null);
    };

    const handleSaveChanges = () => {
        if (editProduct) {
            const productRef = ref(db, `products/${editProduct.id}`);
            update(productRef, {
                name: editProduct.name,
                originalPrice: editProduct.originalPrice,
                price: editProduct.price,
                image: editProduct.image,
                size: editProduct.size,
            })
                .then(() => {
                    console.log('Product updated successfully!');
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.error('Error updating product:', error);
                });
        }
    };

    const handleDeleteConfirm = () => {
        if (deleteProductId) {
            const productRef = ref(db, `products/${deleteProductId}`);
            remove(productRef)
                .then(() => {
                    console.log('Product deleted successfully!');
                    setDeleteProductId(null); // Reset the delete state
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteProductId(null); // Close the confirmation dialog
    };

    return (
        <Box>
            {products.map((product) => (
                <Card key={product.id} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    {/* Product Image on the Left */}
                    <CardMedia
                        component="img"
                        sx={{ width: 150, height: 150, objectFit: 'cover' }}
                        image={product.image}
                        alt={product.name}
                    />

                    {/* Product Details on the Right */}
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                        minHeight: '2.5em',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {product.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: 1,
                                        mt: 1,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        display: 'flex',
                                        alignItems: 'center',
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
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        fontSize: { xs: '0.875rem', md: '0.875rem' },
                                    }}
                                >
                                    Size {product.size || 'N/A'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Edit and Delete Icons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <IconButton onClick={() => handleEditClick(product)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setDeleteProductId(product.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Card>
            ))}

            {/* Edit Product Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={editProduct?.name || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Original Price"
                        fullWidth
                        value={editProduct?.originalPrice || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, originalPrice: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        fullWidth
                        value={editProduct?.price || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        value={editProduct?.image || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Size"
                        fullWidth
                        value={editProduct?.size || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, size: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={Boolean(deleteProductId)} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllProducts;