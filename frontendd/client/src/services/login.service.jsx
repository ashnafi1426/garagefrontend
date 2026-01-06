const API_URL = import.meta.env.VITE_API_URL;

export const logIn = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/employee/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logOut = () => {
  localStorage.removeItem("employee_token");
  localStorage.removeItem("employee");
};
