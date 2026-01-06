const API_URL = import.meta.env.VITE_API_URL;

const orderService = {
  createOrder: async (formData, token) => {
    const res = await fetch(`${API_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || "Failed to create order");
    return payload.data;
  },

  getAllOrders: async (token) => {
    const res = await fetch(`${API_URL}/api/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const payload = await res.json();
    return payload.data || [];
  },

  getOrderById: async (orderId, token) => {
    const res = await fetch(`${API_URL}/api/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const payload = await res.json();
    return payload.data;
  },

  updateOrder: async (orderId, data, token) => {
    const res = await fetch(`${API_URL}/api/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteOrder: async (orderId, token) => {
    const res = await fetch(`${API_URL}/api/order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getAllGarageServices: async () => {
    const res = await fetch(`${API_URL}/api/service`);
    const payload = await res.json();
    return payload.data || [];
  },
};

export default orderService;
