import React, { useState, useEffect } from "react";
import customerService from "../../../../services/customer.service.jsx";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("employee_token");

  const fetchCustomers = async () => {
    if (!token) return; 
    try {
      const data = await customerService.getAllCustomers(token);
      console.log("CUSTOMERS API RESPONSE:", data);
      if (data.status === "fail") {
        setError(data.message);
      } else {
        setCustomers(data.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load customers.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    
    try {
      const result = await customerService.deleteCustomer(id, token);
      if (result.status === "success") {
        fetchCustomers(); // Refresh list
      } else {
        setError(result.message || "Failed to delete customer");
      }
    } catch (err) {
      setError("Failed to delete customer");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Active</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((cust) => (
              <tr key={cust.customer_id}>
                <td>{cust.customer_id}</td>
                <td>{cust.active_customer_status ? "Yes" : "No"}</td>
                <td>{cust.customer_first_name || "N/A"}</td>
                <td>{cust.customer_last_name || "N/A"}</td>
                <td>{cust.customer_email}</td>
                <td>{cust.customer_phone_number || "N/A"}</td>
                <td>
                  {cust.customer_added_date
                    ? format(new Date(cust.customer_added_date), "MM-dd-yyyy | HH:mm")
                    : "N/A"}
                </td>
                <td>
                  <Link
                    to={`/admin/customers/edit/${cust.customer_id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(cust.customer_id)}
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

export default CustomersList;
