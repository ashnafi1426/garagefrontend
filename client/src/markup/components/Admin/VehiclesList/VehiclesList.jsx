import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import vehicleService from "../../../../services/vehicle.service.jsx";

export default function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("employee_token");

  const fetchVehicles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await vehicleService.getAllVehicles(token);
      setVehicles(data || []);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
      setError("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVehicles();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await vehicleService.deleteVehicle(id, token);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      setError("Failed to delete vehicle");
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h2>Vehicles</h2>
          <Link to="/admin/add-vehicle" className="theme-btn btn-style-one">
            <span>+ Add Vehicle</span>
          </Link>
        </div>

        {loading && <div className="alert alert-info">Loading vehicles...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            {/* Desktop Table View */}
            <div className="d-none d-lg-block table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Vehicle</th>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Tag</th>
                    <th>Mileage</th>
                    <th>Color</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.length > 0 ? (
                    vehicles.map((v) => (
                      <tr key={v.vehicle_id}>
                        <td>{v.vehicle_id}</td>
                        <td>
                          <strong>{v.vehicle_make} {v.vehicle_model}</strong>
                        </td>
                        <td>{v.vehicle_year}</td>
                        <td>{v.vehicle_type}</td>
                        <td>{v.vehicle_tag}</td>
                        <td>{v.vehicle_mileage?.toLocaleString()}</td>
                        <td>{v.vehicle_color}</td>
                        <td>
                          <Link
                            to={`/admin/vehicle/edit/${v.vehicle_id}`}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(v.vehicle_id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No vehicles found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="d-lg-none">
              <div className="row">
                {vehicles.length > 0 ? (
                  vehicles.map((v) => (
                    <div key={v.vehicle_id} className="col-12 col-sm-6 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">
                            {v.vehicle_make} {v.vehicle_model}
                          </h5>
                          <p className="card-text mb-1">
                            <strong>Year:</strong> {v.vehicle_year}
                          </p>
                          <p className="card-text mb-1">
                            <strong>Type:</strong> {v.vehicle_type}
                          </p>
                          <p className="card-text mb-1">
                            <strong>Tag:</strong> {v.vehicle_tag}
                          </p>
                          <p className="card-text mb-1">
                            <strong>Mileage:</strong> {v.vehicle_mileage?.toLocaleString()}
                          </p>
                          <p className="card-text mb-2">
                            <strong>Color:</strong> {v.vehicle_color}
                          </p>
                        </div>
                        <div className="card-footer d-flex gap-2">
                          <Link
                            to={`/admin/vehicle/edit/${v.vehicle_id}`}
                            className="btn btn-primary btn-sm flex-grow-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(v.vehicle_id)}
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
                    <div className="alert alert-info text-center">No vehicles found</div>
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
