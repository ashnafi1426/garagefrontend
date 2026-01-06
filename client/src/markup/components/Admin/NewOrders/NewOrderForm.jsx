import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customerService from "../../../../services/customer.service.jsx";
import vehicleService from "../../../../services/vehicle.service.jsx";
import orderService from "../../../../services/orders.services.jsx";

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export default function NewOrderForm() {
  const token = localStorage.getItem("employee_token");
  const decoded = token ? decodeToken(token) : null;
  const employeeId = decoded?.employee_id;

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const [extraDescription, setExtraDescription] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
    loadServices();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await customerService.getAllCustomers(token);
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err);
      setCustomers([]);
      setMessage("Failed to load customers");
    }
  };

  const loadVehicles = async (customerId) => {
    try {
      const res = await vehicleService.getVehiclesByCustomer(customerId, token);
      setVehicles(res || []);
      setSelectedVehicle("");
    } catch (err) {
      console.error(err);
      setVehicles([]);
      setMessage("Failed to load vehicles");
    }
  };

  const loadServices = async () => {
    try {
      const res = await orderService.getAllGarageServices();
      setServices(res || []);
    } catch (err) {
      console.error(err);
      setServices([]);
      setMessage("Failed to load services");
    }
  };

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token || !employeeId) {
      setMessage("Login required to create an order");
      return;
    }

    if (!selectedCustomer || selectedServices.length === 0) {
      setMessage("Please select customer and at least one service");
      return;
    }

    const formData = {
      customer_id: Number(selectedCustomer),
      employee_id: Number(employeeId),
      services: selectedServices.map(Number),
      order_total_price: Number(extraPrice) || 0,
      order_additional_requests: extraDescription || null,
    };

    try {
      setLoading(true);
      const res = await orderService.createOrder(formData, token);
      setMessage(`Order created successfully! (ID: ${res?.order_id})`);

      // Reset form
      setSelectedCustomer("");
      setSelectedVehicle("");
      setSelectedServices([]);
      setExtraDescription("");
      setExtraPrice("");
      setVehicles([]);
    } catch (err) {
      console.error(err);
      setMessage("Failed to create order: " + err.message);
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
                <h2>Create New Order</h2>
              </div>

              {message && (
                <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Customer Selection */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Customer *</label>
                    <select
                      className="form-select form-control"
                      value={selectedCustomer}
                      onChange={(e) => {
                        setSelectedCustomer(e.target.value);
                        if (e.target.value) loadVehicles(e.target.value);
                      }}
                      required
                    >
                      <option value="">-- Select Customer --</option>
                      {customers.map((c) => (
                        <option key={c.customer_id} value={c.customer_id}>
                          {c.customer_first_name} {c.customer_last_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Vehicle</label>
                    <select
                      className="form-select form-control"
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      disabled={vehicles.length === 0}
                    >
                      <option value="">
                        {vehicles.length === 0 ? "Select customer first" : "-- Select Vehicle --"}
                      </option>
                      {vehicles.map((v) => (
                        <option key={v.vehicle_id} value={v.vehicle_id}>
                          {v.vehicle_year} {v.vehicle_make} {v.vehicle_model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Services Selection */}
                  <div className="col-12 form-group">
                    <label className="form-label fw-bold">Select Services *</label>
                    <div className="card p-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
                      {services.length === 0 ? (
                        <p className="text-muted mb-0">No services available</p>
                      ) : (
                        <div className="row">
                          {services.map((srv) => (
                            <div key={srv.service_id} className="col-12 col-sm-6 col-lg-4 mb-2">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`service-${srv.service_id}`}
                                  checked={selectedServices.includes(srv.service_id)}
                                  onChange={() => toggleService(srv.service_id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`service-${srv.service_id}`}
                                  style={{ cursor: "pointer" }}
                                >
                                  {srv.service_name}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedServices.length > 0 && (
                      <small className="text-success">
                        {selectedServices.length} service(s) selected
                      </small>
                    )}
                  </div>

                  {/* Estimated Price */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Estimated Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={extraPrice}
                      onChange={(e) => setExtraPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                    />
                  </div>

                  {/* Additional Requests */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Additional Notes</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={extraDescription}
                      onChange={(e) => setExtraDescription(e.target.value)}
                      placeholder="Any special requests..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-12 form-group d-flex flex-wrap gap-2 mt-3">
                    <button
                      className="theme-btn btn-style-one"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? "Creating..." : "Create Order"}</span>
                    </button>
                    <Link to="/admin/orders" className="theme-btn btn-style-two">
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
