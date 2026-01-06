// src/services/vehicle.service.js
const API_URL = import.meta.env.VITE_API_URL;

const vehicleService = {
  getAllVehicles: async (token) => {
    const res = await fetch(`${API_URL}/api/vehicle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.message || "Failed to fetch vehicles");
    return payload.data || [];
  },

  addVehicle: async (vehicleData, token) => {
    const res = await fetch(`${API_URL}/api/vehicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(vehicleData),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(payload.message || "Failed to add vehicle");
    }
    return payload.vehicle || payload;
  },

  getVehicleById: async (vehicleId, token) => {
    const res = await fetch(`${API_URL}/api/vehicle/${vehicleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.message || "Failed to fetch vehicle");
    return payload;
  },

  getVehiclesByCustomer: async (customerId, token) => {
    const res = await fetch(`${API_URL}/api/vehicle/customer/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.message || "Failed to fetch customer vehicles");
    return Array.isArray(payload) ? payload : [];
  },

  updateVehicle: async (vehicleId, vehicleData, token) => {
    const res = await fetch(`${API_URL}/api/vehicle/${vehicleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(vehicleData),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.message || "Failed to update vehicle");
    return payload;
  },

  deleteVehicle: async (vehicleId, token) => {
    const res = await fetch(`${API_URL}/api/vehicle/${vehicleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.message || "Failed to delete vehicle");
    return payload;
  },
};

export default vehicleService;
