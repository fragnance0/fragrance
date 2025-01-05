import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchAllOrdersFromRTDB } from "../api/fb_functions";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Card,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Visibility,
  Download,
  Share
} from '@mui/icons-material';

const COLUMN_SETTINGS_KEY = "dataGridColumnSettings";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  const navigate = useNavigate();

  const getOrdersFromLocalStorage = () => {
    const data = localStorage.getItem("allOrders");
    if (!data) return null;

    const { orders, timestamp } = JSON.parse(data);
    const expiryTime = 2 * 60 * 60 * 1000; // 2 hours
    if (Date.now() - timestamp > expiryTime) {
      localStorage.removeItem("allOrders");
      console.log("Orders data expired and removed.");
      return null;
    }

    return orders;
  };

  const saveOrdersToLocalStorage = (orders) => {
    const data = {
      orders,
      timestamp: Date.now(),
    };
    localStorage.setItem("allOrders", JSON.stringify(data));

    // Remove data after 2 hours
    setTimeout(() => {
      localStorage.removeItem("allOrders");
      console.log("Orders data removed from local storage after 2 hours.");
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const loadOrders = async () => {
          const existingOrders = getOrdersFromLocalStorage();
          if (existingOrders) {
            console.log("Loaded orders from local storage:", existingOrders);
            setOrders(existingOrders);
            setLoading(false);
          } else {
            const data = await fetchAllOrdersFromRTDB();
            const transformedData = data.map((order) => ({
              id: order.id,
              firstName: order.firstName,
              lastName: order.lastName,
              emailOrPhone: order.emailOrPhone,
              address: `${order.apartment}, ${order.address}`,
              city: order.city,
              country: order.country,
              phone: order.phone,
              subtotal: order.subtotal,
              cart: order.cart,
              status: "Pending", // You can modify this based on your actual order status
              orderDate: new Date().toLocaleDateString() // Replace with actual order date
            }));
            saveOrdersToLocalStorage(transformedData);
            setOrders(transformedData);
            setLoading(false);
          }
        };
        await loadOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
    const savedSettings = JSON.parse(localStorage.getItem(COLUMN_SETTINGS_KEY));
    if (savedSettings) {
      setColumnVisibilityModel(savedSettings.visibilityModel || {});
    }
  }, []);

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
    // Save column visibility settings
    localStorage.setItem(
      COLUMN_SETTINGS_KEY,
      JSON.stringify({ visibilityModel: newModel })
    );
  };


  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#4caf50';
      case 'pending': return '#ff9800';
      case 'cancelled': return '#f44336';
      default: return '#1976d2';
    }
  };

  const [columns, setColumns] = useState([
    {
      field: "id",
      headerName: "Order ID",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          #{params.value}
        </Typography>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: `${getStatusColor(params.value)}20`,
            color: getStatusColor(params.value),
            fontWeight: 'bold'
          }}
        />
      )
    },
    { field: "orderDate", headerName: "Order Date", width: 120 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
      renderCell: (params) => (
        <Tooltip title={`${params.row.firstName} ${params.row.lastName}`}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "emailOrPhone", headerName: "Email/Phone", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    {
      field: "subtotal",
      headerName: "Subtotal",
      width: 120,
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 'bold' }}>
          Rs. {params.value}
        </Typography>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              color="primary"
              onClick={() => navigate(`/order-details/${params.row.id}`, { state: params.row })}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Invoice">
            <IconButton size="small" color="secondary">
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <Share fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]);

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Card elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            Orders
            <Chip
              label={`Total: ${orders.length}`}
              size="small"
              sx={{ ml: 2, bgcolor: "#e8eaf6", color: "#1a237e" }}
            />
          </Typography>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityChange}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            loading={loading}
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: LinearProgress,
            }}
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderColor: "#f5f5f5",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default OrdersScreen;