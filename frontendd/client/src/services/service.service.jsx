// src/services/service.service.js
const API_URL = import.meta.env.VITE_API_URL;

const serviceService = {
  getAllServices: async () => {
    const response = await fetch(`${API_URL}/api/service`);
    if (!response.ok) throw new Error("Failed to fetch services");
    const data = await response.json();
    return data.data || [];
  },

  getServiceById: async (id) => {
    const response = await fetch(`${API_URL}/api/service/${id}`);
    if (!response.ok) throw new Error("Failed to fetch service");
    const data = await response.json();
    return data.data;
  },

  createService: async (serviceData, token) => {
    const response = await fetch(`${API_URL}/api/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    return response.json();
  },

  updateService: async (id, serviceData, token) => {
    const response = await fetch(`${API_URL}/api/service/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    return response.json();
  },

  deleteService: async (id, token) => {
    const response = await fetch(`${API_URL}/api/service/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete service");
    return response.json();
  },
};

export default serviceService;
