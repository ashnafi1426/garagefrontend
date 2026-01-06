const api_url = import.meta.env.VITE_API_URL;

const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loggedInEmployeeToken}`
    },
    body: JSON.stringify(formData)
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}
const getAllEmployees = async (token) => {
  const response = await fetch(`${api_url}/api/employees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
}
const getEmployeeById = async (id, token) => {
  const response = await fetch(`${api_url}/api/employee/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return await response.json();
}
const updateEmployee = async (id, formData, token) => {
  const response = await fetch(`${api_url}/api/employee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const deleteEmployee = async (id, token) => {
  const response = await fetch(`${api_url}/api/employee/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return await response.json();
};

const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
}
export default employeeService; 