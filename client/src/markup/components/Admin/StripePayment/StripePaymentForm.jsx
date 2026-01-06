import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StripePaymentForm({ orderId, amount, onSuccess }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("employee_token");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cardNumber || !expiry || !cvc || !cardName) {
      setError("Please fill in all card details");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create payment intent with backend
      const intentResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/stripe/create-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          order_id: orderId,
          amount: amount
        })
      });

      const intentData = await intentResponse.json();
      if (!intentResponse.ok) throw new Error(intentData.message);

      const paymentIntentId = intentData.data.paymentIntentId;
      const clientSecret = intentData.data.clientSecret;

      // Step 2: Parse expiry
      const [expMonth, expYear] = expiry.split('/');

      // Step 3: Create payment method (simulated - in production use Stripe.js)
      // For now, we'll send card details to backend for processing
      const paymentMethodData = {
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: parseInt(expMonth),
          exp_year: parseInt('20' + expYear),
          cvc: cvc
        },
        billing_details: {
          name: cardName
        }
      };

      // Step 4: Confirm payment with backend
      const confirmResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/stripe/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentId,
          order_id: orderId,
          amount: amount,
          payment_method: "card",
          notes: `Card ending in ${cardNumber.slice(-4)}`,
          paymentMethodData: paymentMethodData
        })
      });

      const confirmData = await confirmResponse.json();
      if (!confirmResponse.ok) throw new Error(confirmData.message);

      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => navigate("/admin/payments"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h5 className="mb-4">💳 Stripe Card Payment</h5>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">✓ Payment successful! Check Stripe dashboard.</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cardholder Name</label>
          <input
            type="text"
            className="form-control"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            className="form-control"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
            placeholder="4242 4242 4242 4242"
            maxLength="16"
            required
          />
          <small className="text-muted d-block mt-2">
            <strong>Test Cards:</strong><br/>
            ✓ Success: 4242 4242 4242 4242<br/>
            ✗ Decline: 4000 0000 0000 0002
          </small>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Expiry (MM/YY)</label>
            <input
              type="text"
              className="form-control"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="12/25"
              maxLength="5"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">CVC</label>
            <input
              type="text"
              className="form-control"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>

        <div className="alert alert-info">
          <strong>Amount:</strong> ${amount?.toFixed(2)}
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary flex-grow-1"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          <Link to="/admin/payments" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>

      <hr className="my-4" />

      <div className="alert alert-info">
        <strong>ℹ️ Real Stripe Integration:</strong> Payments will appear in your Stripe dashboard at stripe.com
      </div>
    </div>
  );
}
