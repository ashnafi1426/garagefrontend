import React, { useState } from 'react';
import { useAuth } from "../../../../context/AuthContext.jsx";

function CustomerProfileForm() {
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_email, setEmail] = useState("");
  const [customer_phone, setPhone] = useState("");
  const [active_customer, setActiveCustomer] = useState(1);
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!customer_first_name) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!valid) return;

    const formData = {
      customer_first_name,
      customer_last_name,
      customer_email,
      customer_phone,
      active_customer
    };
    const newCustomer = customerService.createCustomer(formData, loggedInEmployeeToken);

    newCustomer
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");

          setTimeout(() => {
            window.location.href = "/admin/customers";
          }, 2000);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setServerError(resMessage);
      });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add / Update Customer</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">

                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="customer_email"
                        value={customer_email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Customer Email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Customer First Name"
                      />
                      {firstNameError && (
                        <div className="validation-error" role="alert">
                          {firstNameError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Customer Last Name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={customer_phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Customer Phone (555-555-5555)"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        value={active_customer}
                        onChange={(e) => setActiveCustomer(e.target.value)}
                        className="custom-select-box"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                      >
                        <span>Save Customer</span>
                      </button>
                    </div>

                    {success && (
                      <div
                        className="success-message"
                        style={{ color: "green", marginTop: "10px" }}
                      >
                        Customer saved successfully!
                      </div>
                    )}

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CustomerProfileForm;
