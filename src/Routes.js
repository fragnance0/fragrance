import React from 'react';
import { firebaseConfig } from './firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Admin/Login';
import AddProduct from './Admin/AddProduct';
import OrderList from './Admin/OrderList';
import ProtectedRoute from './ProtectedRoute';
import MarketingPage from './MarketingPage';
import CheckoutPage from './components/Checkout';
import AppAppBar from './components/AppAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './shared-theme/AppTheme';
import OrderDetails from './Admin/OrderDetails';
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/Dashboard';
import ShippedOrderList from './Admin/ShippedOrders';
import DeliveredOrdersScreen from './Admin/DeliveredOrders';
import ReturnedOrdersScreen from './Admin/ReturnedOrders';
import SignIn from './Admin/Signin';

const AppRoutes = (props) => {
    return (
        <AppTheme {...props}>
            <Router>
                <CssBaseline enableColorScheme />
                {/* <AppAppBar /> */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<MarketingPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    {/* Admin-Only Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <Dashboard />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/add-product"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <AddProduct />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <OrderList />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/shipped-orders"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <ShippedOrderList />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/delivered-orders"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <DeliveredOrdersScreen />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/returned-orders"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <ReturnedOrdersScreen />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/order-details/:id" element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminLayout>
                                <OrderDetails />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />


                    {/* Unauthorized Access */}
                    <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
                </Routes>
            </Router>
        </AppTheme>
    );
};

export default AppRoutes;
