import React, { useEffect, useState } from "react";
import orderService from "../../../../services/orders.services.jsx";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("employee_token");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await orderService.getAllOrders(token);
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await orderService.deleteOrder(id, token);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setError("Failed to delete order");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return <span className="badge bg-secondary">Pending</span>;
      case 1:
        return <span className="badge bg-warning text-dark">In Progress</span>;
      case 2:
        return <span className="badge bg-success">Completed</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <div className="content-wrapper">
      <div className="page-header d-flex justify-content-between align-items-center mb-4">
        <h3 className="page-title">Orders</h3>
        <Link to="/admin/new-order" className="btn btn-primary">
          + New Order
        </Link>
      </div>

      {loading && <p className="alert alert-info">Loading orders...</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>
                      <strong>{order.customer_first_name} {order.customer_last_name}</strong>
                      <br />
                      <small>{order.customer_email}</small>
                    </td>
                    <td>
                      <strong>{order.vehicle_make} {order.vehicle_model}</strong>
                      <br />
                      <small>{order.vehicle_year} - {order.vehicle_tag}</small>
                    </td>
                    <td>
                      {order.order_date
                        ? format(new Date(order.order_date), "MM-dd-yyyy")
                        : "N/A"}
                    </td>
                    <td>{getStatusBadge(order.order_status)}</td>
                    <td>
                      <Link
                        to={`/admin/order/edit/${order.order_id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(order.order_id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
