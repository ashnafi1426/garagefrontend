import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import AddVehicleForm from "../../components/Admin/AddVehicle/AddVehicleForm";
import customerService from "../../../services/customer.service";

function AddVehicle() {
  const { customerId } = useParams();
  const [selectedCustomerId, setSelectedCustomerId] = useState(customerId || "");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("employee_token");

  useEffect(() => {
    if (!customerId) {
      customerService.getAllCustomers(token)
        .then((data) => {
          setCustomers(data.data || []);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [customerId, token]);

  if (loading) return <div className="container mt-5">Loading customers...</div>;

  return (
    <AdminLayout>
      {!customerId && !selectedCustomerId ? (
        <div>
          <h4>Please select a customer first to add a vehicle</h4>
          <select
            className="form-select mt-3"
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
          >
            <option value="">-- Select Customer --</option>
            {customers.map(c => (
              <option key={c.customer_id} value={c.customer_id}>
                {c.customer_first_name} {c.customer_last_name} ({c.customer_email})
              </option>
            ))}
          </select>

          {selectedCustomerId && <AddVehicleForm customerId={selectedCustomerId} />}
        </div>
      ) : (
        <AddVehicleForm customerId={customerId || selectedCustomerId} />
      )}
    </AdminLayout>
  );
}

export default AddVehicle;
