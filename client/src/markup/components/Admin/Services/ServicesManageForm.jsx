import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service.jsx";
import ServicesList from "./ServicesList.jsx";

function ServicesManageForm() {
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("employee_token");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!service_name.trim()) {
      setNameError("Service name is required");
      valid = false;
    } else setNameError("");

    if (!service_description.trim()) {
      setDescError("Service description is required");
      valid = false;
    } else setDescError("");

    if (!valid) return;

    const formData = { service_name, service_description };

    serviceService
      .createService(formData, token)
      .then((data) => {
        if (data.status === "fail") {
          setServerError(data.message);
        } else {
          setSuccess(true);
          setServerError("");
          setServiceName("");
          setServiceDescription("");
          fetchServices();
          setTimeout(() => setSuccess(false), 2000);
        }
      })
      .catch((error) => {
        setServerError(error.message || "Server error");
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await serviceService.deleteService(id, token);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <h2>Services we provide</h2>

        <div className="services-list mb-4">
          <ServicesList services={services} loading={loading} onDelete={handleDelete} />
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  {serverError && <div className="validation-error">{serverError}</div>}

                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      value={service_name}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="Service name"
                    />
                    {nameError && <div className="validation-error">{nameError}</div>}
                  </div>

                  <div className="form-group col-md-12">
                    <textarea
                      value={service_description}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      placeholder="Service description"
                      rows="4"
                    ></textarea>
                    {descError && <div className="validation-error">{descError}</div>}
                  </div>

                  <div className="form-group col-md-12">
                    <button className="theme-btn btn-style-one" type="submit">
                      ADD SERVICE
                    </button>
                  </div>

                  {success && <div className="success-message">Service added successfully!</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesManageForm;
