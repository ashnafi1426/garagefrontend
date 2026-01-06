import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import EmployeesList from "../../components/Admin/EmployeesList/EmployeesList";

function Employees() {
  return (
    <AdminLayout>
      <EmployeesList />
    </AdminLayout>
  );
}

export default Employees;
