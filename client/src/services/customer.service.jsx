// customer.service.js

const api_url = import.meta.env.VITE_API_URL;

// CREATE CUSTOMER
const createCustomer = async (formData, token) => {
  return fetch(`${api_url}/api/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });
};

// GET ALL CUSTOMERS
const getAllCustomers = async (token) => {
  const response = await fetch(`${api_url}/api/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return response.json();
};

const getCustomerById = async (customerId, token) => {
  const res = await fetch(`${api_url}/api/customers/${customerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
};

const updateCustomer = async (customerId, formData, token) => {
  return fetch(`${api_url}/api/customers/${customerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  }).then(res => res.json());
};

const addVehicle = async (formData, token) => {
  return fetch(`${api_url}/api/vehicle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });
};

const deleteCustomer = async (customerId, token) => {
  const response = await fetch(`${api_url}/api/customers/${customerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return response.json();
};

export default {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  addVehicle,
  deleteCustomer
};
