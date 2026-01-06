import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu"; 
import paymentService from "../../../services/payment.service.jsx";
import employeeService from "../../../services/employee.service.jsx";
import customerService from "../../../services/customer.service.jsx";
import orderService from "../../../services/orders.services.jsx";
import "./Admindashboard.css";

function AdminDashboard({ employeeId, customerId }) {
  const [payments, setPayments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const token = localStorage.getItem("employee_token");

  useEffect(() => {
    if (token) {
      // Fetch payments
      paymentService.getAllPayments(token)
        .then(data => {
          setPayments(data || []);
          const total = (data || []).reduce((sum, p) => sum + (p.amount || 0), 0);
          setTotalRevenue(total);
        })
        .catch(err => console.error(err));

      // Fetch employees
      employeeService.getAllEmployees(token)
        .then(data => setEmployees(data || []))
        .catch(err => console.error(err));

      // Fetch customers
      customerService.getAllCustomers(token)
        .then(data => setCustomers(data.data || []))
        .catch(err => console.error(err));

      // Fetch orders
      orderService.getAllOrders(token)
        .then(data => setOrders(data || []))
        .catch(err => console.error(err));
    }
  }, [token]);

  const dashboardItems = [
    { title: "Employees", link: "/admin/employees" },
    { title: "Add Employee", link: "/admin/add-employee" },
    { title: "Customers", link: "/admin/customers" },
    { title: "Add Customer", link: "/admin/add-customer" },
    { title: "Vehicles", link: "/admin/vehicles" },
    { title: "Orders", link: "/admin/orders" },
    { title: "New Order", link: "/admin/new-order" },
    { title: "Payments", link: "/admin/payments" },
    { title: "Services", link: "/admin/add-service" },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-lg-2 col-md-3 bg-light vh-100 p-3 border-end">
          <AdminMenu employeeId={employeeId} customerId={customerId} />
        </aside>
        <main className="col-lg-10 col-md-9 p-4">
          <div className="mb-4 p-2 bg-danger text-white text-center rounded">
            Enjoy the Best while we fix your car | Monday - Saturday 7:00AM - 6:00PM
          </div>
          <h3 className="fw-bold mb-3 text-primary">Admin Dashboard</h3>
          
          {/* Revenue Summary */}
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card bg-success text-white shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Total Revenue</h6>
                  <h2 className="mb-0">${totalRevenue.toFixed(2)}</h2>
                  <small>{payments.length} payments</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card bg-info text-white shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Employees</h6>
                  <h2 className="mb-0">{employees.length}</h2>
                  <Link to="/admin/add-employee" className="btn btn-light btn-sm mt-2">
                    + Add
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card bg-primary text-white shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Customers</h6>
                  <h2 className="mb-0">{customers.length}</h2>
                  <Link to="/admin/add-customer" className="btn btn-light btn-sm mt-2">
                    + Add
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card bg-warning text-white shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Orders</h6>
                  <h2 className="mb-0">{orders.length}</h2>
                  <Link to="/admin/new-order" className="btn btn-light btn-sm mt-2">
                    + New
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted mb-4">Quick access to all admin management links.</p>
          <div className="row g-3">
            {dashboardItems.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{item.title}</h5>
                    <Link to={item.link} className="btn btn-primary btn-sm mt-3">
                      Go →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
