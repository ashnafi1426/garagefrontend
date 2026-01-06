import React, { useEffect, useState } from "react";
import employeeService from "../../../../services/employee.service";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("employee_token");

  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhone] = useState("");
  const [active_employee, setActiveEmployee] = useState(1);
  const [company_role_id, setCompanyRole] = useState(1);

  const [firstNameError, setFirstNameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;

    employeeService
      .getEmployeeById(id, token)
      .then((data) => {
        if (data?.status === "fail") {
          setServerError(data.message);
        } else {
          const emp = data.data;
          setEmail(emp.employee_email);
          setFirstName(emp.employee_first_name);
          setLastName(emp.employee_last_name);
          setPhone(emp.employee_phone);
          setActiveEmployee(emp.active_employee);
          setCompanyRole(emp.company_role_id);
        }
      })
      .catch(() => setServerError("Failed to load employee data"));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee_first_name.trim()) {
      setFirstNameError("First name is required");
      return;
    }

    setFirstNameError("");

    const formData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    };

    employeeService
      .updateEmployee(id, formData, token)
      .then((data) => {
        if (data?.status === "fail") {
          setServerError(data.message);
        } else {
          setSuccess(true);
          setServerError("");

          setTimeout(() => {
            navigate("/admin/employees");
          }, 1500);
        }
      })
      .catch(() => setServerError("Update failed"));
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {employee_first_name} {employee_last_name}
          </h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  {serverError && (
                    <div className="validation-error">{serverError}</div>
                  )}

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={employee_email}
                      readOnly
                      disabled
                      style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      value={employee_first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                    />
                    {firstNameError && (
                      <div className="validation-error">
                        {firstNameError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={employee_last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      value={employee_phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="form-group">
                    <select
                      value={company_role_id}
                      onChange={(e) => setCompanyRole(Number(e.target.value))}
                    >
                      <option value={1}>Employee</option>
                      <option value={2}>Manager</option>
                      <option value={3}>Admin</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={active_employee === 1}
                        onChange={(e) =>
                          setActiveEmployee(e.target.checked ? 1 : 0)
                        }
                      />{" "}
                      Active employee
                    </label>
                  </div>

                  <button className="theme-btn btn-style-one" type="submit">
                    UPDATE
                  </button>

                  {success && (
                    <div className="success-message">
                      Employee updated successfully
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeEditForm;
