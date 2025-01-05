import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchAllShippedOrdersFromRTDB } from "../api/fb_functions";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Card,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, Download, Share } from "@mui/icons-material";
import { set } from "firebase/database";

const ShippedOrderList = () => {
  const [shippedOrders, setShippedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getOrdersFromLocalStorage = () => {
    const data = localStorage.getItem("shippedOrders");
    if (!data) return null;

    const { orders, timestamp } = JSON.parse(data);
    const expiryTime = 2 * 60 * 60 * 1000; // 2 hours
    if (Date.now() - timestamp > expiryTime) {
      localStorage.removeItem("shippedOrders");
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
    localStorage.setItem("shippedOrders", JSON.stringify(data));

    // Remove data after 2 hours
    setTimeout(() => {
      localStorage.removeItem("shippedOrders");
      console.log("Orders data removed from local storage after 2 hours.");
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  };

  useEffect(() => {
    const fetchShippedOrders = async () => {
      try {
        const loadOrders = async () => {
          const existingOrders = getOrdersFromLocalStorage();
          if (existingOrders) {
            console.log("Loaded shipped orders from local storage:", existingOrders);
            setShippedOrders(existingOrders);
            setLoading(false);
          } else {
            const data = await fetchAllShippedOrdersFromRTDB();
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
              status: "Shipped",
              shippedDate: new Date().toLocaleDateString(), // Replace with actual shipped date
            }));
            saveOrdersToLocalStorage(transformedData);
            setShippedOrders(transformedData);
            setLoading(false);
          }
        };
        await loadOrders();
      } catch (error) {
        console.error("Error fetching shipped orders:", error);
        setLoading(false);
      }
    };

    fetchShippedOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#4caf50";
      default:
        return "#1976d2";
    }
  };
  const columns = [
    { field: "id", headerName: "Order ID", width: 130 },
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
            fontWeight: "bold"
          }}
        />
      )
    },
    { field: "shippedDate", headerName: "Shipped Date", width: 120 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "emailOrPhone", headerName: "Email/Phone", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "subtotal", headerName: "Subtotal", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
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
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Card elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1a237e" }}>
            Shipped Orders
            <Chip
              label={`Total: ${shippedOrders.length}`}
              size="small"
              sx={{ ml: 2, bgcolor: "#e8eaf6", color: "#1a237e" }}
            />
          </Typography>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={shippedOrders}
            columns={columns}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection={false}
            disableSelectionOnClick
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

export default ShippedOrderList;
