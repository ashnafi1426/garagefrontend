const API_URL = import.meta.env.VITE_API_URL;

const paymentService = {
  getAllPayments: async (token) => {
    const res = await fetch(`${API_URL}/api/payment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const payload = await res.json();
    return payload.data || [];
  },

  getPaymentById: async (id, token) => {
    const res = await fetch(`${API_URL}/api/payment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const payload = await res.json();
    return payload.data;
  },

  getPaymentsByOrder: async (orderId, token) => {
    const res = await fetch(`${API_URL}/api/payment/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const payload = await res.json();
    return payload.data || [];
  },

  createPayment: async (data, token) => {
    const res = await fetch(`${API_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || "Failed to create payment");
    return payload.data;
  },

  updatePayment: async (id, data, token) => {
    const res = await fetch(`${API_URL}/api/payment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || "Failed to update payment");
    return payload.data;
  },

  deletePayment: async (id, token) => {
    const res = await fetch(`${API_URL}/api/payment/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.json();
  },
};

export default paymentService;
