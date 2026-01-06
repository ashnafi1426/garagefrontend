import { useParams } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import EditPaymentForm from "../../components/Admin/EditPayment/EditPaymentForm";

function EditPayment() {
  const { id } = useParams();

  return (
    <AdminLayout>
      <EditPaymentForm paymentId={id} />
    </AdminLayout>
  );
}

export default EditPayment;
