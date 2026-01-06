import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../../services/login.service";
import { useAuth } from "../../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    setServerError("");

    let valid = true;

    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const data = await logIn({ employee_email, employee_password });

      if (data && data.status === "success") {
        // Use AuthContext login to store employee data
        login(data.data);
        
        // Check if user is admin (role 3)
        const roleId = data.data.company_role_id || data.data.employee_role;
        console.log('Login successful - Role ID:', roleId);
        
        if (roleId === 3) {
          // Admin - redirect to admin dashboard
          navigate("/admin", { replace: true });
        } else {
          // Non-admin users - redirect to unauthorized
          setServerError("Access denied. Admin privileges required.");
          // Clear the login data
          logout();
        }
      } else {
        setServerError(data?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">

                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error">{serverError}</div>
                      )}

                      <input
                        type="email"
                        placeholder="Email"
                        value={employee_email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <div className="validation-error">{emailError}</div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        placeholder="Password"
                        value={employee_password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <div className="validation-error">{passwordError}</div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit">
                        <span>{loading ? "Please wait..." : "Login"}</span>
                      </button>
                    </div>
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

export default LoginForm;
