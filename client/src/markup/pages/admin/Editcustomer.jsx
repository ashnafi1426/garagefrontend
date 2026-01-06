import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import EditCustomerForm from "../../components/Admin/AddCustomer/CustomerEditForm";
import { useParams } from "react-router-dom";
function EditCustomer() {
  const params = useParams();
  return (
    <AdminLayout>
      <EditCustomerForm customerId={params.id}/>
    </AdminLayout>
  );
}

export default EditCustomer;
