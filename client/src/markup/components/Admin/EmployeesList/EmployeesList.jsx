import React, { useState, useEffect } from "react";
import employeeService from "../../../../services/employee.service.jsx";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("employee_token");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await employeeService.getAllEmployees(token);
      console.log("API RESPONSE:", response);
      
      if (response.status === "fail") {
        setError(response.message || "Failed to load employees");
        setEmployees([]);
      } else if (response.status === "success") {
        setEmployees(response.data || []);
      } else if (response.error) {
        setError(response.error);
        setEmployees([]);
      } else {
        // Handle case where response.data might be directly the array
        setEmployees(response.data || response || []);
      }
    } catch (err) {
      console.error("Fetch employees error:", err);
      setError("Failed to load employees. Please check your connection.");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmployees();
    } else {
      setError("No authentication token found");
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    
    try {
      const result = await employeeService.deleteEmployee(id, token);
      if (result.status === "success") {
        alert("Employee deleted successfully");
        fetchEmployees(); // Refresh list
      } else {
        setError(result.message || "Failed to delete employee");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
        <button 
          className="btn btn-sm btn-outline-danger ms-3" 
          onClick={fetchEmployees}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees List</h2>
        <Link to="/admin/add-employee" className="btn btn-primary">
          Add New Employee
        </Link>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Active</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Added Date</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => {
                // Handle nested data structures
                const firstName = emp.employee_info?.employee_first_name || 
                                 emp.employee_first_name || "N/A";
                const lastName = emp.employee_info?.employee_last_name || 
                                emp.employee_last_name || "N/A";
                const phone = emp.employee_info?.employee_phone || 
                             emp.employee_phone || "N/A";
                
                // Get role information
                const roleId = emp.employee_role?.company_role_id || 0;
                const roleName = emp.employee_role?.company_roles?.company_role_name || "Unknown";
                
                // Determine badge color based on role
                let roleBadgeClass = "bg-secondary";
                if (roleId === 3) {
                  roleBadgeClass = "bg-danger"; // Admin - Red
                } else if (roleId === 2) {
                  roleBadgeClass = "bg-warning"; // Manager - Yellow
                } else if (roleId === 1) {
                  roleBadgeClass = "bg-primary"; // Employee - Blue
                }
                
                console.log(`Rendering employee ${emp.employee_id}: Role ID=${roleId}, Role Name=${roleName}`);
                
                return (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>
                      <span className={`badge ${emp.employee_active_status ? 'bg-success' : 'bg-secondary'}`}>
                        {emp.employee_active_status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{emp.employee_email}</td>
                    <td>{phone}</td>
                    <td>
                      {emp.employee_added_date
                        ? format(new Date(emp.employee_added_date), "MM-dd-yyyy | HH:mm")
                        : "N/A"}
                    </td>
                    <td>
                      <span className={`badge ${roleBadgeClass}`}>
                        {roleName} ({roleId})
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin/employee/edit/${emp.employee_id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(emp.employee_id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesList;
