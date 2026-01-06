import React, { useState, useEffect } from "react";
import customerService from "../../../../services/customer.service";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function CustomerEditForm({ customerId }) {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [customer_active_status, setActiveStatus] = useState(1);

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("employee_token");

  useEffect(() => {
    if (!customerId || !token) return;

    customerService
      .getCustomerById(customerId, token)
      .then((data) => {
        if (data?.status === "fail") {
          setServerError(data.message);
        } else {
          const cust = data.data;
          setEmail(cust.customer_email);
          setFirstName(cust.customer_first_name);
          setLastName(cust.customer_last_name);
          setPhoneNumber(cust.customer_phone_number);
          setActiveStatus(cust.active_customer_status);
        }
      })
      .catch(() => setServerError("Failed to load customer"));
  }, [customerId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status: customer_active_status
    };

    const result = await customerService.updateCustomer(customerId, formData, token);

    if (result.status === "fail") {
      setServerError(result.message || "Update failed");
    } else {
      setSuccess(true);
      setServerError("");
      setTimeout(() => {
        window.location.href = "/admin/customers";
      }, 1500);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">
            Edit: {customer_first_name} {customer_last_name}
          </h2>

          {serverError && <Alert variant="danger">{serverError}</Alert>}
          {success && <Alert variant="success">Updated successfully</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={customer_email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={customer_first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={customer_last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={customer_phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formActiveStatus">
              <Form.Check
                type="checkbox"
                label="Is active customer"
                checked={customer_active_status === 1}
                onChange={(e) =>
                  setActiveStatus(e.target.checked ? 1 : 0)
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              UPDATE
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerEditForm;
