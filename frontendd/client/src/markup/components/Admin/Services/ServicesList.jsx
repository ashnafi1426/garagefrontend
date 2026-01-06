import React from "react";

function ServicesList({ services, loading, onDelete }) {
  if (loading) return <p>Loading services...</p>;
  if (services.length === 0) return <p>No services found</p>;

  return (
    <ul className="list-group">
      {services.map((service) => (
        <li
          key={service.service_id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{service.service_name}</strong>
            <p>{service.service_description}</p>
          </div>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(service.service_id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
export default ServicesList;
