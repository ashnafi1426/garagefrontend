import { useState } from 'react';
import { Link } from 'react-router-dom';
import vehicleService from "../../../../services/vehicle.service.jsx";

function AddVehicleForm({ customerId }) {
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleMileage, setVehicleMileage] = useState('');
  const [vehicleTag, setVehicleTag] = useState('');
  const [vehicleSerial, setVehicleSerial] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('employee_token');

  if (!customerId) {
    return (
      <div className="alert alert-warning mt-4">
        Customer ID is required to add a vehicle. Please select a customer first.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);

    if (!vehicleYear || !vehicleMake || !vehicleModel || !vehicleType || !vehicleMileage) {
      setServerError("Please fill in all required fields");
      return;
    }

    const formData = {
      customer_id: Number(customerId),
      vehicle_year: Number(vehicleYear),
      vehicle_make: vehicleMake,
      vehicle_model: vehicleModel,
      vehicle_type: vehicleType,
      vehicle_mileage: Number(vehicleMileage),
      vehicle_tag: vehicleTag,
      vehicle_serial_number: vehicleSerial,
      vehicle_color: vehicleColor
    };

    try {
      setLoading(true);
      await vehicleService.addVehicle(formData, token);
      setLoading(false);
      setSuccess(true);
      setServerError('');
      
      // Clear form
      setVehicleYear('');
      setVehicleMake('');
      setVehicleModel('');
      setVehicleType('');
      setVehicleMileage('');
      setVehicleTag('');
      setVehicleSerial('');
      setVehicleColor('');

    } catch (err) {
      setLoading(false);
      setServerError(err?.message || String(err));
      console.error("Add vehicle failed:", err);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="row clearfix justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="contact-form">
              <div className="contact-title text-center mb-4">
                <h2>Add New Vehicle</h2>
                <small className="text-muted">Customer ID: {customerId}</small>
              </div>

              {serverError && <div className="alert alert-danger">{serverError}</div>}
              {success && <div className="alert alert-success">Vehicle added successfully!</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Year & Make */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Year *</label>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="e.g. 2023" 
                      value={vehicleYear} 
                      onChange={e => setVehicleYear(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Make *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. Toyota" 
                      value={vehicleMake} 
                      onChange={e => setVehicleMake(e.target.value)} 
                      required
                    />
                  </div>

                  {/* Model & Type */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Model *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. Camry" 
                      value={vehicleModel} 
                      onChange={e => setVehicleModel(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Type *</label>
                    <select 
                      className="form-control form-select"
                      value={vehicleType} 
                      onChange={e => setVehicleType(e.target.value)}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Truck">Truck</option>
                      <option value="Van">Van</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Mileage & Color */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Mileage *</label>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="e.g. 50000" 
                      value={vehicleMileage} 
                      onChange={e => setVehicleMileage(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Color</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. Silver" 
                      value={vehicleColor} 
                      onChange={e => setVehicleColor(e.target.value)} 
                    />
                  </div>
                  {/* Tag & Serial */}
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">License Plate / Tag</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. ABC-1234" 
                      value={vehicleTag} 
                      onChange={e => setVehicleTag(e.target.value)} 
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">VIN / Serial Number</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Vehicle identification number" 
                      value={vehicleSerial} 
                      onChange={e => setVehicleSerial(e.target.value)} 
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-12 form-group d-flex flex-wrap gap-2 mt-3">
                    <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
                      <span>{loading ? 'Adding...' : 'Add Vehicle'}</span>
                    </button>
                    <Link to="/admin/vehicles" className="theme-btn btn-style-two">
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
export default AddVehicleForm;
