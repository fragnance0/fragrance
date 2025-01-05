import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchReturnedProducts } from "../api/fb_functions";
import { Box, Card, Chip, Typography, LinearProgress } from "@mui/material";
import { set } from "firebase/database";

const ReturnedOrdersScreen = () => {
  const [returnedOrders, setReturnedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersFromLocalStorage = () => {
    const data = localStorage.getItem("returnedOrders");
    if (!data) return null;

    const { orders, timestamp } = JSON.parse(data);
    const expiryTime = 2 * 60 * 60 * 1000; // 2 hours
    if (Date.now() - timestamp > expiryTime) {
      localStorage.removeItem("returnedOrders");
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
    localStorage.setItem("returnedOrders", JSON.stringify(data));

    // Remove data after 2 hours
    setTimeout(() => {
      localStorage.removeItem("returnedOrders");
      console.log("Orders data removed from local storage after 2 hours.");
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  };


  useEffect(() => {
    const fetchReturnedOrders = async () => {
      try {
        const loadOrders = async () => {
          const existingOrders = getOrdersFromLocalStorage();
          if (existingOrders) {
            console.log("Loaded returned orders from local storage:", existingOrders);
            setReturnedOrders(existingOrders);
            setLoading(false);
          } else {
            setLoading(true);
            const data = await fetchReturnedProducts();
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
              status: "Returned",
              returnDate: new Date().toLocaleDateString(), // Replace with actual return date if available
            }));
            saveOrdersToLocalStorage(transformedData);
            setReturnedOrders(transformedData);
          }
        };
        await loadOrders();
      } catch (error) {
        console.error("Error fetching returned orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "returned":
        return "#f57f17"; // Amber for returned status
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
    { field: "returnDate", headerName: "Return Date", width: 120 },
    { field: "firstName", headerName: "First Name", width: 130 },
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
        <Typography sx={{ fontWeight: "bold" }}>
          Rs. {params.value}
        </Typography>
      )
    }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Card elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#bf360c" }}>
            Returned Orders
            <Chip
              label={`Total: ${returnedOrders.length}`}
              size="small"
              sx={{ ml: 2, bgcolor: "#ffccbc", color: "#bf360c" }}
            />
          </Typography>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={returnedOrders}
            columns={columns}
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
              }
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ReturnedOrdersScreen;
