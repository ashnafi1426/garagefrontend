import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import paymentService from "../../../../services/payment.service.jsx";

export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("employee_token");

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await paymentService.getAllPayments(token);
      setPayments(data || []);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPayments();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await paymentService.deletePayment(id, token);
      fetchPayments();
    } catch (err) {
      console.error(err);
      setError("Failed to delete payment");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="badge bg-success">Completed</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "refunded":
        return <span className="badge bg-info">Refunded</span>;
      case "failed":
        return <span className="badge bg-danger">Failed</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getMethodBadge = (method) => {
    const colors = {
      cash: "bg-success",
      card: "bg-primary",
      check: "bg-info",
      transfer: "bg-secondary",
    };
    return <span className={`badge ${colors[method] || "bg-secondary"}`}>{method}</span>;
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h2>Payments</h2>
          <Link to="/admin/add-payment" className="theme-btn btn-style-one">
            <span>+ Add Payment</span>
          </Link>
        </div>

        {loading && <div className="alert alert-info">Loading payments...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            {/* Desktop Table */}
            <div className="d-none d-lg-block table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((p) => (
                      <tr key={p.payment_id}>
                        <td>{p.payment_id}</td>
                        <td>
                          <Link to={`/admin/order/edit/${p.order_id}`}>
                            Order #{p.order_id}
                          </Link>
                        </td>
                        <td>
                          {p.customer?.customer_first_name} {p.customer?.customer_last_name}
                          <br />
                          <small className="text-muted">{p.customer?.customer_email}</small>
                        </td>
                        <td><strong>${p.amount?.toFixed(2)}</strong></td>
                        <td>{getMethodBadge(p.payment_method)}</td>
                        <td>{getStatusBadge(p.payment_status)}</td>
                        <td>
                          {p.payment_date
                            ? format(new Date(p.payment_date), "MM-dd-yyyy")
                            : "N/A"}
                        </td>
                        <td>
                          <Link
                            to={`/admin/payment/edit/${p.payment_id}`}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p.payment_id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No payments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="d-lg-none">
              <div className="row">
                {payments.length > 0 ? (
                  payments.map((p) => (
                    <div key={p.payment_id} className="col-12 col-sm-6 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title mb-0">${p.amount?.toFixed(2)}</h5>
                            {getStatusBadge(p.payment_status)}
                          </div>
                          <p className="card-text mb-1">
                            <strong>Order:</strong> #{p.order_id}
                          </p>
                          <p className="card-text mb-1">
                            <strong>Customer:</strong> {p.customer?.customer_first_name} {p.customer?.customer_last_name}
                          </p>
                          <p className="card-text mb-1">
                            <strong>Method:</strong> {getMethodBadge(p.payment_method)}
                          </p>
                          <p className="card-text mb-2">
                            <strong>Date:</strong> {p.payment_date ? format(new Date(p.payment_date), "MM-dd-yyyy") : "N/A"}
                          </p>
                        </div>
                        <div className="card-footer d-flex gap-2">
                          <Link
                            to={`/admin/payment/edit/${p.payment_id}`}
                            className="btn btn-primary btn-sm flex-grow-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p.payment_id)}
                            className="btn btn-danger btn-sm flex-grow-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info text-center">No payments found</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
