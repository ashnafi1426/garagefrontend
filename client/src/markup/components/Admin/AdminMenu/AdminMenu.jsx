import React, { useState, useEffect } from "react";
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
import getAuth from "../../../../util/auth";

function AdminMenu({ employeeId, customerId }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const authData = await getAuth();
      const role = authData.company_role_id || authData.employee_role;
      console.log('AdminMenu - User Role:', role);
      setUserRole(role);
    };
    fetchRole();
  }, []);

  // Define menu items - ALL require admin role (3)
  const allMenuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt />, roles: [3] },
    { name: "Employees", path: "/admin/employees", icon: <FaUsers />, roles: [3] },
    { name: "Add Employee", path: "/admin/add-employee", icon: <FaUserPlus />, roles: [3] },
    { name: "Customers", path: "/admin/customers", icon: <FaUsers />, roles: [3] },
    { name: "Add Customer", path: "/admin/add-customer", icon: <FaUserPlus />, roles: [3] },
    { name: "Vehicles", path: "/admin/vehicles", icon: <FaCar />, roles: [3] },
    { name: "Orders", path: "/admin/orders", icon: <FaListAlt />, roles: [3] },
    { name: "New Order", path: "/admin/new-order", icon: <FaShoppingCart />, roles: [3] },
    { name: "Payments", path: "/admin/payments", icon: <FaCreditCard />, roles: [3] },
    { name: "Services", path: "/admin/add-service", icon: <FaTools />, roles: [3] },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => {
    if (!userRole) return false;
    return item.roles.includes(userRole);
  });

  if (!userRole) {
    return <div className="admin-menu">Loading...</div>;
  }

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
