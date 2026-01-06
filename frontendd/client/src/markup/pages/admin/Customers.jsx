import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import CustomersList from "../../components/Admin/CustmerList/CustomerList";

function Customers() {
  return (
    <AdminLayout>
      <CustomersList />
    </AdminLayout>
  );
}

export default Customers;
