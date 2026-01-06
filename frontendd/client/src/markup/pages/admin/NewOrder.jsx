import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import NewOrderForm from "../../components/Admin/NewOrders/NewOrderForm";

function NewOrder() {
  return (
    <AdminLayout>
      <NewOrderForm />
    </AdminLayout>
  );
}

export default NewOrder;
