import React, { useState } from "react";
import AdminMenu from "../AdminMenu/AdminMenu";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile only

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <AdminMenu />
      </aside>
      <main className="admin-main">
        <button
          className="btn btn-primary btn-sm admin-toggle d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div className="admin-content">
          {children}
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="admin-overlay d-md-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminLayout;
