import React from "react";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import Orderlist from "../../components/Admin/orderList/OrderList";

function Orders() {
  return (
    <AdminLayout>
      <Orderlist />
    </AdminLayout>
  );
}

export default Orders;
