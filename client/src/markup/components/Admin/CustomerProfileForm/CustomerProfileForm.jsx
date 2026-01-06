import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerProfileForm.css";

const API_URL = "http://localhost:8000/api/customer"; // update to your backend

const INITIAL_STATE = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  is_active: 1,
};

function CustomerProfileForm({ customerId = null }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch customer data if editing
  useEffect(() => {
    if (customerId) {
      setLoading(true);
      axios
        .get(`${API_URL}/${customerId}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("Fetch error:", err))
        .finally(() => setLoading(false));
    }
  }, [customerId]);

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (customerId) {
        // Update existing customer
        await axios.put(`${API_URL}/${customerId}`, formData);
        alert("Customer updated successfully!");
      } else {
        // Create new customer
        await axios.post(API_URL, formData);
        alert("Customer created successfully!");
        setFormData(INITIAL_STATE); // clear form
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm customer-profile-form">
      <div className="card-body">
        <h4 className="mb-4">
          {customerId ? "Edit Customer" : "Create Customer"}
        </h4>

        <form onSubmit={handleSubmit} noValidate>
          {/* First & Last Name */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="first_name"
                className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="last_name"
                className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              disabled={loading || !!customerId} // disable email in edit
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              placeholder="Optional"
            />
          </div>

          {/* Active */}
          <div className="form-check mb-4">
            <input
              type="checkbox"
              name="is_active"
              className="form-check-input"
              checked={formData.is_active === 1}
              onChange={handleChange}
              disabled={loading}
            />
            <label className="form-check-label">Active Customer</label>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Saving..." : customerId ? "Update Customer" : "Save Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerProfileForm;
