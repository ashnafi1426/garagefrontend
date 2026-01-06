import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import EditOrderForm from "../../components/Admin/EditOrder/EditOrderForm";
import { useParams } from "react-router-dom";

function EditOrder() {
  const { id } = useParams();
  return (
    <AdminLayout>
      <EditOrderForm orderId={id} />
    </AdminLayout>
  );
}

export default EditOrder;
