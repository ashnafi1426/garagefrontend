import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useAuth } from "../../../context/AuthContext.jsx";
import jwtDecode from "jwt-decode";
import "./Header.css";

export default function Header() {
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  useEffect(() => {
    if (!employee?.employee_token) return;

    try {
      const decoded = jwtDecode(employee.employee_token);
      setDisplayName(decoded.employee_first_name || decoded.employee_email || "User");
    } catch (err) {
      console.error("Failed to decode JWT in Header:", err);
      setDisplayName("User");
    }
  }, [employee]);

  const handleLogOut = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="header-fixed bg-white shadow-sm">
      <div className="bg-dark text-white py-2 small">
        <div className="container d-flex justify-content-between flex-wrap">
          <span>Enjoy the Best while we fix your car | Mon–Sat 7:00AM – 6:00PM</span>
          <span>
            {isLogged ? (
              <strong>Welcome {displayName}</strong>
            ) : (
              <>Call us: <strong>1800 456 7890</strong></>
            )}
          </span>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <img src={logo} alt="Logo" height="45" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/servicess" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    className="nav-link nav-link-responsive fw-semibold text-uppercase text-dark"
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {isLogged ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={handleLogOut}
              >
                Log out
              </button>
            ) : (
              <Link
                className="btn btn-primary btn-sm"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
