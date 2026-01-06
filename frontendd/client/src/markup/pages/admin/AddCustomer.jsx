import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import AddCustomerForm from "../../components/Admin/AddCustomer/AddCustomerForm";

function AddCustomer() {
  return (
    <AdminLayout>
      <AddCustomerForm />
    </AdminLayout>
  );
}

export default AddCustomer;
