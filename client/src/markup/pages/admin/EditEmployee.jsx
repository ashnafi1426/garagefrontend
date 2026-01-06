import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import EditEmployeeForm from "../../components/Admin/AddEmployeeForm/EmployeeEditForm";
function EditEmployee() {
  return (
    <AdminLayout>
      <EditEmployeeForm />
    </AdminLayout>
  );
}

export default EditEmployee;
