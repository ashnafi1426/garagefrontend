// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(() => {
    const saved = localStorage.getItem("employee");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLogged, setIsLogged] = useState(() =>
    Boolean(localStorage.getItem("employee_token"))
  );

  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem("employee");
    if (!saved) return false;
    const emp = JSON.parse(saved);
    return emp.company_role_id === 3;
  });

  const login = (data) => {
    console.log('AuthContext - Login Data:', data);
    
    // Store token
    localStorage.setItem("employee_token", data.employee_token);
    
    // Store employee data with role information
    const employeeData = {
      ...data,
      employee_role: data.company_role_id, // Add employee_role for compatibility
    };
    
    localStorage.setItem("employee", JSON.stringify(employeeData));
    
    console.log('AuthContext - Stored Employee Data:', employeeData);
    
    setEmployee(employeeData);
    setIsLogged(true);
    setIsAdmin(data.company_role_id === 3);
  };

  const logout = () => {
    localStorage.removeItem("employee_token");
    localStorage.removeItem("employee");
    setEmployee(null);
    setIsLogged(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ employee, isLogged, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
