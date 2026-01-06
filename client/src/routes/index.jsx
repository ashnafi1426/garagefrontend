import { Routes, Route } from 'react-router-dom';
import PrivateAuthRoute from '../markup/components/Auth/PrivateAuthRoute';

// Pages
import Home from '../markup/pages/Home';
import Login from '../markup/pages/Login';
import Unauthorized from '../markup/pages/Unauthorized';
import Contact from '../markup/pages/Contact';
import Servicess from '../markup/pages/Services';
import About from '../markup/pages/About';

// Admin Pages
import AdminDashboard from '../markup/pages/admin/AdminDashboard';
import AddEmployee from '../markup/pages/admin/AddEmployee';
import Employees from '../markup/pages/admin/Employees';
import EditEmployee from '../markup/pages/admin/EditEmployee';
import Customers from '../markup/pages/admin/Customers';
import AddCustomer from '../markup/pages/admin/AddCustomer';
import EditCustomer from '../markup/pages/admin/Editcustomer';
import CustomerProfileForm from '../markup/pages/admin/CustomerProfileForma';
import AddVehicle from '../markup/pages/admin/AddVehicle';
import Vehicles from '../markup/pages/admin/Vehicles';
import EditVehicle from '../markup/pages/admin/EditVehicle';
import ServiceManage from '../markup/pages/admin/ServiceManage';
import NewOrder from '../markup/pages/admin/NewOrder';
import Orders from '../markup/pages/admin/Orders';
import EditOrder from '../markup/pages/admin/EditOrder';
import Payments from '../markup/pages/admin/Payments';
import AddPayment from '../markup/pages/admin/AddPayment';
import EditPayment from '../markup/pages/admin/EditPayment';
import StripePayment from '../markup/pages/admin/StripePayment';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/servicess" element={<Servicess />} />
      <Route path="/about" element={<About />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<PrivateAuthRoute roles={[3]}><AdminDashboard /></PrivateAuthRoute>} />

      {/* Employees Routes */}
      <Route path="/admin/employees" element={<PrivateAuthRoute roles={[3]}><Employees /></PrivateAuthRoute>} />
      <Route path="/admin/add-employee" element={<PrivateAuthRoute roles={[3]}><AddEmployee /></PrivateAuthRoute>} />
      <Route path="/admin/employee/edit/:id" element={<PrivateAuthRoute roles={[3]}><EditEmployee /></PrivateAuthRoute>} />

      {/* Customers Routes */}
      <Route path="/admin/customers" element={<PrivateAuthRoute roles={[2, 3]}><Customers /></PrivateAuthRoute>} />
      <Route path="/admin/add-customer" element={<PrivateAuthRoute roles={[3]}><AddCustomer /></PrivateAuthRoute>} />
      <Route path="/admin/customers/edit/:id" element={<PrivateAuthRoute roles={[2, 3]}><EditCustomer /></PrivateAuthRoute>} />
      <Route path="/admin/customer-profile" element={<PrivateAuthRoute roles={[2, 3]}><CustomerProfileForm /></PrivateAuthRoute>} />

      {/* Vehicles Routes */}
      <Route path="/admin/vehicles" element={<PrivateAuthRoute roles={[2, 3]}><Vehicles /></PrivateAuthRoute>} />
      <Route path="/admin/add-vehicle" element={<PrivateAuthRoute roles={[3]}><AddVehicle /></PrivateAuthRoute>} />
      <Route path="/admin/add-vehicle/:customerId" element={<PrivateAuthRoute roles={[3]}><AddVehicle /></PrivateAuthRoute>} />
      <Route path="/admin/vehicle/edit/:id" element={<PrivateAuthRoute roles={[2, 3]}><EditVehicle /></PrivateAuthRoute>} />

      {/* Services Routes */}
      <Route path="/admin/add-service" element={<PrivateAuthRoute roles={[3]}><ServiceManage /></PrivateAuthRoute>} />
      <Route path="/admin/add-service/:customerId" element={<PrivateAuthRoute roles={[3]}><ServiceManage /></PrivateAuthRoute>} />

      {/* Orders Routes */}
      <Route path="/admin/orders" element={<PrivateAuthRoute roles={[1, 2, 3]}><Orders /></PrivateAuthRoute>} />
      <Route path="/admin/new-order" element={<PrivateAuthRoute roles={[1, 2, 3]}><NewOrder /></PrivateAuthRoute>} />
      <Route path="/admin/order/edit/:id" element={<PrivateAuthRoute roles={[1, 2, 3]}><EditOrder /></PrivateAuthRoute>} />

      {/* Payments Routes */}
      <Route path="/admin/payments" element={<PrivateAuthRoute roles={[2, 3]}><Payments /></PrivateAuthRoute>} />
      <Route path="/admin/add-payment" element={<PrivateAuthRoute roles={[2, 3]}><AddPayment /></PrivateAuthRoute>} />
      <Route path="/admin/payment/edit/:id" element={<PrivateAuthRoute roles={[2, 3]}><EditPayment /></PrivateAuthRoute>} />
      <Route path="/admin/stripe-payment/:orderId/:amount" element={<PrivateAuthRoute roles={[2, 3]}><StripePayment /></PrivateAuthRoute>} />
    </Routes>
  );
}
