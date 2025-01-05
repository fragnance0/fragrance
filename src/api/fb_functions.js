import { getDatabase, ref, push, set, get, remove } from 'firebase/database';
import { db } from '../firebase';

export const addProductToRTDB = async (product) => {
  try {
    // Reference to the "products" collection in RTDB
    const productRef = ref(db, 'products');

    // Add a new product with a unique ID
    const newProductRef = push(productRef);
    await set(newProductRef, product);

    console.log('Product added successfully!');
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const saveOrderToRTDB = async (orderData) => {
  const ordersRef = ref(db, "orders");
  const newOrderRef = push(ordersRef);
  await set(newOrderRef, orderData);
};

export const fetchAllOrdersFromRTDB = async () => {
  const ordersRef = ref(db, "orders");
  const snapshot = await get(ordersRef);
  console.log(snapshot.val(), 'snapshot');
  if (snapshot.exists()) {
    const orders = snapshot.val();
    // Convert orders object to an array
    return Object.entries(orders).map(([id, orderData]) => ({
      id, // Firebase-generated key
      ...orderData,
    }));
  }

  // return [];
};

export const moveProductToShipped = async (orderId) => {
  const orderRef = ref(db, `orders/${orderId}`);
  const shippedRef = ref(db, `shipped/${orderId}`);

  try {
    // Fetch the product data from the 'orders' node
    const snapshot = await get(orderRef);
    if (snapshot.exists()) {

      const productData = snapshot.val();

      // Add the product to the 'shipped' node
      await set(shippedRef, productData);

      // Remove the product from the 'orders' node
      await remove(orderRef);
      localStorage.removeItem("shippedOrders");
      localStorage.removeItem("allOrders");
      console.log('Product moved to shipped successfully.');
    } else {
      console.error('Order not found.');
    }
  } catch (error) {
    console.error('Error moving product to shipped:', error);
  }
};

export const fetchAllShippedOrdersFromRTDB = async () => {
  const shippedRef = ref(db, "shipped");

  try {
    const snapshot = await get(shippedRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, details]) => ({
        id,
        ...details,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching shipped orders:", error);
    throw error;
  }
};

export const moveProductToDelivered = async (shippedProductId) => {
  const shippedRef = ref(db, `shipped/${shippedProductId}`);
  const deliveredRef = ref(db, `delivered/${shippedProductId}`);

  try {
    const snapshot = await get(shippedRef);
    if (snapshot.exists()) {
      const productData = snapshot.val();
      await set(deliveredRef, productData);
      await remove(shippedRef);
      localStorage.removeItem("deliveredOrders");

      console.log("Product moved to delivered successfully.");
    } else {
      console.log("Product not found in shipped.");
    }
  } catch (error) {
    console.error("Error moving product to delivered:", error);
  }
};

export const fetchDeliveredProducts = async () => {
  const deliveredRef = ref(db, "delivered");

  try {
    const snapshot = await get(deliveredRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } else {
      console.log("No delivered products found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching delivered products:", error);
    return [];
  }
};

export const productReturned = async (shippedProductId) => {
  const shippedRef = ref(db, `shipped/${shippedProductId}`);
  const returnedRef = ref(db, `returned/${shippedProductId}`);

  try {
    const snapshot = await get(shippedRef);
    if (snapshot.exists()) {
      const productData = snapshot.val();
      await set(returnedRef, productData);
      await remove(shippedRef);
      localStorage.removeItem("returnedOrders");

      console.log("Product moved to returned successfully.");
    } else {
      console.log("Product not found in shipped.");
    }
  } catch (error) {
    console.error("Error moving product to delivered:", error);
  }
};
export const fetchReturnedProducts = async () => {
  const returnsRef = ref(db, "returned");

  try {
    const snapshot = await get(returnsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } else {
      console.log("No returned products found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching returned products:", error);
    return [];
  }
};
