import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";

function AddEmployee() {
  return (
    <AdminLayout>
      <AddEmployeeForm />
    </AdminLayout>
  );
}

export default AddEmployee;
