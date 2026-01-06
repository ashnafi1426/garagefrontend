import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicleService from "../../../../services/vehicle.service.jsx";

function EditVehicleForm({ vehicleId }) {
  const navigate = useNavigate();
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleMileage, setVehicleMileage] = useState('');
  const [vehicleTag, setVehicleTag] = useState('');
  const [vehicleSerial, setVehicleSerial] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const token = localStorage.getItem('employee_token');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehicleService.getVehicleById(vehicleId, token);
        setVehicleYear(data.data?.vehicle_year || '');
        setVehicleMake(data.data?.vehicle_make || '');
        setVehicleModel(data.data?.vehicle_model || '');
        setVehicleType(data.data?.vehicle_type || '');
        setVehicleMileage(data.data?.vehicle_mileage || '');
        setVehicleTag(data.data?.vehicle_tag || '');
        setVehicleSerial(data.data?.vehicle_serial_number || '');
        setVehicleColor(data.data?.vehicle_color || '');
        setCustomerId(data.data?.customer_id || '');
        setLoadingData(false);
      } catch (err) {
        setServerError(err?.message || String(err));
        setLoadingData(false);
      }
    };

    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId, token]);

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
      await vehicleService.updateVehicle(vehicleId, formData, token);
      setLoading(false);
      setSuccess(true);
      setServerError('');
      
      setTimeout(() => {
        navigate('/admin/vehicles');
      }, 1500);

    } catch (err) {
      setLoading(false);
      setServerError(err?.message || String(err));
      console.error("Update vehicle failed:", err);
    }
  };

  if (loadingData) {
    return <div className="text-center p-5">Loading vehicle data...</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="row clearfix justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="contact-form">
              <div className="contact-title text-center mb-4">
                <h2>Edit Vehicle</h2>
                <small className="text-muted">Vehicle ID: {vehicleId}</small>
              </div>

              {serverError && <div className="alert alert-danger">{serverError}</div>}
              {success && <div className="alert alert-success">Vehicle updated successfully!</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Year *</label>
                    <input 
                      type="number" 
                      className="form-control"
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
                      value={vehicleMake} 
                      onChange={e => setVehicleMake(e.target.value)} 
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Model *</label>
                    <input 
                      type="text" 
                      className="form-control"
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

                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">Mileage *</label>
                    <input 
                      type="number" 
                      className="form-control"
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
                      value={vehicleColor} 
                      onChange={e => setVehicleColor(e.target.value)} 
                    />
                  </div>

                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">License Plate / Tag</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={vehicleTag} 
                      onChange={e => setVehicleTag(e.target.value)} 
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group">
                    <label className="form-label fw-bold">VIN / Serial Number</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={vehicleSerial} 
                      onChange={e => setVehicleSerial(e.target.value)} 
                    />
                  </div>

                  <div className="col-12 form-group d-flex flex-wrap gap-2 mt-3">
                    <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
                      <span>{loading ? 'Updating...' : 'Update Vehicle'}</span>
                    </button>
                    <button 
                      type="button"
                      className="theme-btn btn-style-two"
                      onClick={() => navigate('/admin/vehicles')}
                    >
                      <span>Cancel</span>
                    </button>
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

export default EditVehicleForm;
