import React, { useState, useEffect } from "react";
import employeeService from "../../../../services/employee.service.jsx";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("employee_token");

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getAllEmployees(token);
      console.log("API RESPONSE:", data);
      if (data.error) {
        setError(data.error);
      } else {
        setEmployees(data.data || []);
      }
    } catch (err) {
      setError("Failed to load employees.");
    }
  };

  useEffect(() => {
    if (token) fetchEmployees();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    
    try {
      const result = await employeeService.deleteEmployee(id, token);
      if (result.status === "success") {
        fetchEmployees(); // Refresh list
      } else {
        setError(result.message || "Failed to delete employee");
      }
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Active</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added</th>
            <th>Role</th>
            <th>Edit</th>
            <th>del</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.employee_id}>
                <td>{emp.employee_active_status ? "Yes" : "No"}</td>
                <td>{emp.employee_info?.employee_first_name || "N/A"}</td>
                <td>{emp.employee_info?.employee_last_name || "N/A"}</td>
                <td>{emp.employee_email}</td>
                <td>{emp.employee_info?.employee_phone || "N/A"}</td>
                <td>
                  {emp.employee_added_date
                    ? format(new Date(emp.employee_added_date), "MM-dd-yyyy | HH:mm")
                    : "N/A"}
                </td>
                <td>{emp.employee_role?.company_roles?.company_role_name || "N/A"}</td>
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
                     className="btn btn-danger btn-sm">
                     Del
                   </button>
                  </td>
               </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesList;
