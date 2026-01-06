import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import paymentService from "../../../../services/payment.service.jsx";
import orderService from "../../../../services/orders.services.jsx";

export default function AddPaymentForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("employee_token");

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentStatus, setPaymentStatus] = useState("completed");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAllOrders(token);
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-fill amount from order total if available
  const handleOrderChange = (e) => {
    const selectedOrderId = e.target.value;
    setOrderId(selectedOrderId);
    
    const selectedOrder = orders.find(o => o.order_id === Number(selectedOrderId));
    if (selectedOrder) {
      // Try to get order total from order_info
      setAmount(selectedOrder.order_total_price || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!orderId || !amount) {
      setError("Please select an order and enter amount");
      return;
    }

    try {
      setLoading(true);
      await paymentService.createPayment({
        order_id: Number(orderId),
        amount: Number(amount),
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        notes: notes || null,
      }, token);

      setSuccess(true);
      setTimeout(() => navigate("/admin/payments"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="row clearfix justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="contact-form">
              <div className="contact-title text-center mb-4">
                <h2>Add New Payment</h2>
                <p className="text-muted">Record a payment for an order</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">Payment added successfully! Redirecting...</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Order Selection */}
                  <div className="col-12 form-group">
                    <label className="form-label fw-bold">Select Order *</label>
                    <select
                      className="form-control form-select"
                      value={orderId}
                      onChange={handleOrderChange}
                      required
                    >
                      <option value="">-- Choose an Order --</option>
                      {orders.map((o) => (
                        <option key={o.order_id} value={o.order_id}>
                          Order #{o.order_id} - {o.customer_first_name} {o.customer_last_name} (${o.order_total_price?.toFixed(2) || "0.00"})
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">Select an order to auto-fill the amount</small>
                  </div>

                  {/* Amount */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Amount ($) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Payment Method</label>
                    <select
                      className="form-control form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="cash">💵 Cash</option>
                      <option value="card">💳 Credit/Debit Card</option>
                      <option value="check">📋 Check</option>
                      <option value="transfer">🏦 Bank Transfer</option>
                    </select>
                  </div>

                  {/* Payment Status */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Status</label>
                    <select
                      className="form-control form-select"
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                      <option value="completed">✓ Completed</option>
                      <option value="pending">⏳ Pending</option>
                      <option value="refunded">↩️ Refunded</option>
                      <option value="failed">✗ Failed</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Partial payment, customer request..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-12 form-group d-flex flex-wrap gap-2 mt-3">
                    <button
                      className="theme-btn btn-style-one"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? "Processing..." : "Add Payment"}</span>
                    </button>
                    <Link to="/admin/payments" className="theme-btn btn-style-two">
                      <span>Cancel</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
