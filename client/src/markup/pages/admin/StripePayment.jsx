import { useParams } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayOut/AdminLayOut";
import StripePaymentForm from "../../components/Admin/StripePayment/StripePaymentForm";

function StripePayment() {
  const { orderId, amount } = useParams();

  return (
    <AdminLayout>
      <section className="contact-section">
        <div className="auto-container">
          <div className="row clearfix justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="contact-form">
                <div className="contact-title text-center mb-4">
                  <h2>Process Payment</h2>
                  <p className="text-muted">Order #{orderId}</p>
                </div>
                <StripePaymentForm orderId={orderId} amount={parseFloat(amount)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default StripePayment;
