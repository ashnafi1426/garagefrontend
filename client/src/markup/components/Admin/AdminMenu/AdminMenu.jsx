import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaCar,
  FaListAlt,
  FaShoppingCart,
  FaTools,
  FaUserEdit,
  FaCreditCard
} from "react-icons/fa";
import "./Adminmenu.css";

function AdminMenu({ employeeId, customerId }) {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Employees", path: "/admin/employees", icon: <FaUsers /> },
    { name: "Add Employee", path: "/admin/add-employee", icon: <FaUserPlus /> },
    { name: "Customers", path: "/admin/customers", icon: <FaUsers /> },
    { name: "Add Customer", path: "/admin/add-customer", icon: <FaUserPlus /> },
    { name: "Vehicles", path: "/admin/vehicles", icon: <FaCar /> },
    { name: "Orders", path: "/admin/orders", icon: <FaListAlt /> },
    { name: "New Order", path: "/admin/new-order", icon: <FaShoppingCart /> },
    { name: "Payments", path: "/admin/payments", icon: <FaCreditCard /> },
    { name: "Services", path: "/admin/add-service", icon: <FaTools /> },
  ];

  return (
    <div className="admin-menu">
      <ul className="list-group list-group-flush">
        {menuItems.map((item) => (
          <li key={item.name} className="list-group-item">
            <Link to={item.path} className="menu-link">
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </Link>
          </li>
        ))}

        {employeeId && (
          <li className="list-group-item">
            <Link to={`/admin/employee/edit/${employeeId}`} className="menu-link">
              <FaUserEdit className="icon" />
              <span className="text">Edit Employee</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AdminMenu;
