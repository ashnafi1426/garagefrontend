import React, { useEffect, useState } from "react";
import orderService from "../../../../services/orders.services.jsx";
import { useNavigate } from "react-router-dom";

export default function EditOrderForm({ orderId }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("employee_token");

  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!orderId || !token) return;

    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(orderId, token);
        setOrder(data);
        setOrderStatus(data?.order_status?.order_status || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await orderService.updateOrder(orderId, { order_status: orderStatus }, token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/orders");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading order...</div>;
  if (!order) return <div className="alert alert-danger">Order not found</div>;

  return (
    <div className="content-wrapper">
      <h3 className="mb-4">Edit Order #{orderId}</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Order updated successfully! Redirecting...</div>}

      <div className="card p-4 mb-4">
        <h5>Order Details</h5>
        <p><strong>Customer:</strong> {order.customer?.customer_info?.customer_first_name} {order.customer?.customer_info?.customer_last_name}</p>
        <p><strong>Email:</strong> {order.customer?.customer_email}</p>
        <p><strong>Order Date:</strong> {order.order_date ? new Date(order.order_date).toLocaleDateString() : "N/A"}</p>
        <p><strong>Order Hash:</strong> {order.order_hash}</p>
      </div>

      {order.vehicle && (
        <div className="card p-4 mb-4">
          <h5>Vehicle</h5>
          <p><strong>Make:</strong> {order.vehicle.vehicle_make}</p>
          <p><strong>Model:</strong> {order.vehicle.vehicle_model}</p>
          <p><strong>Year:</strong> {order.vehicle.vehicle_year}</p>
          <p><strong>Tag:</strong> {order.vehicle.vehicle_tag}</p>
        </div>
      )}

      {order.order_services && order.order_services.length > 0 && (
        <div className="card p-4 mb-4">
          <h5>Services</h5>
          <ul>
            {order.order_services.map((srv) => (
              <li key={srv.order_service_id}>
                {srv.common_services?.service_name || `Service #${srv.service_id}`}
                {srv.service_completed ? " ✅" : " ⏳"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card p-4 mb-4">
          <h5>Update Status</h5>
          <div className="mb-3">
            <label className="form-label">Order Status</label>
            <select
              className="form-control"
              value={orderStatus}
              onChange={(e) => setOrderStatus(Number(e.target.value))}
            >
              <option value={0}>Pending</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Order"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/admin/orders")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
