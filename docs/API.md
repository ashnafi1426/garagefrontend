# API Documentation
## Real Garage Management System

Complete REST API documentation for the Garage Management System backend.

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000` |
| Production | `https://api.yourdomain.com` |

---

## Authentication

### Overview

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected endpoints.

```http
Authorization: Bearer <your_jwt_token>
```

### Token Expiration

Tokens expire after 24 hours by default. Users must log in again to obtain a new token.

---

## Endpoints

### 1. Authentication

#### 1.1 Employee Login

```http
POST /api/employee/login
```

**Request Body:**
```json
{
    "employee_email": "admin@garage.com",
    "employee_password": "password123"
}
```

**Success Response (200):**
```json
{
    "status": "success",
    "employee_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "employee_id": 1,
    "employee_first_name": "John",
    "employee_last_name": "Doe",
    "employee_email": "admin@garage.com",
    "employee_phone": "+1-555-123-4567",
    "company_role_id": 3
}
```

**Error Response (401):**
```json
{
    "status": "error",
    "message": "Invalid email or password"
}
```

---

### 2. Employees

All employee endpoints require authentication. Admin role (role_id: 3) required for most operations.

#### 2.1 Get All Employees

```http
GET /api/employees
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "employee_id": 1,
            "employee_email": "admin@garage.com",
            "employee_phone": "+1-555-123-4567",
            "employee_first_name": "John",
            "employee_last_name": "Doe",
            "company_role_id": 3,
            "company_role_name": "Admin",
            "active_employee": true,
            "added_date": "2026-01-15T10:30:00Z"
        }
    ]
}
```

#### 2.2 Get Employee by ID

```http
GET /api/employee/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "employee_id": 1,
        "employee_email": "admin@garage.com",
        "employee_phone": "+1-555-123-4567",
        "employee_first_name": "John",
        "employee_last_name": "Doe",
        "company_role_id": 3,
        "active_employee": true,
        "added_date": "2026-01-15T10:30:00Z"
    }
}
```

#### 2.3 Create Employee

```http
POST /api/employee
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "employee_email": "newemployee@garage.com",
    "employee_password": "securePassword123",
    "employee_phone": "+1-555-987-6543",
    "employee_first_name": "Jane",
    "employee_last_name": "Smith",
    "company_role_id": 2
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Employee created successfully",
    "data": {
        "employee_id": 2
    }
}
```

#### 2.4 Update Employee

```http
PUT /api/employee/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "employee_phone": "+1-555-111-2222",
    "employee_first_name": "Jane",
    "employee_last_name": "Doe",
    "company_role_id": 2,
    "active_employee": true
}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Employee updated successfully"
}
```

#### 2.5 Delete Employee

```http
DELETE /api/employee/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Employee deleted successfully"
}
```

---

### 3. Customers

#### 3.1 Get All Customers

```http
GET /api/customers
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "customer_id": 1,
            "customer_email": "customer@email.com",
            "customer_phone": "+1-555-123-4567",
            "customer_first_name": "Jane",
            "customer_last_name": "Doe",
            "active_customer_status": true,
            "customer_added_date": "2026-01-20T14:30:00Z"
        }
    ]
}
```

#### 3.2 Get Customer by ID

```http
GET /api/customers/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "customer_id": 1,
        "customer_email": "customer@email.com",
        "customer_phone": "+1-555-123-4567",
        "customer_first_name": "Jane",
        "customer_last_name": "Doe",
        "active_customer_status": true,
        "customer_added_date": "2026-01-20T14:30:00Z",
        "vehicles": [
            {
                "vehicle_id": 1,
                "vehicle_year": 2022,
                "vehicle_make": "Toyota",
                "vehicle_model": "Camry"
            }
        ]
    }
}
```

#### 3.3 Create Customer

```http
POST /api/customers
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "customer_email": "newcustomer@email.com",
    "customer_phone": "+1-555-999-8888",
    "customer_first_name": "John",
    "customer_last_name": "Customer"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Customer created successfully",
    "data": {
        "customer_id": 2
    }
}
```

#### 3.4 Update Customer

```http
PUT /api/customers/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "customer_phone": "+1-555-777-6666",
    "customer_first_name": "John",
    "customer_last_name": "Updated"
}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Customer updated successfully"
}
```

#### 3.5 Delete Customer

```http
DELETE /api/customers/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Customer deleted successfully"
}
```

---

### 4. Vehicles

#### 4.1 Get All Vehicles

```http
GET /api/vehicle
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "vehicle_id": 1,
            "customer_id": 1,
            "customer_first_name": "Jane",
            "customer_last_name": "Doe",
            "vehicle_year": 2022,
            "vehicle_make": "Toyota",
            "vehicle_model": "Camry",
            "vehicle_type": "Sedan",
            "vehicle_mileage": 25000,
            "vehicle_tag": "ABC-1234",
            "vehicle_serial": "4T1B11HK5JU123456",
            "vehicle_color": "Silver",
            "active_vehicle": true
        }
    ]
}
```

#### 4.2 Get Vehicle by ID

```http
GET /api/vehicle/:id
Authorization: Bearer <token>
```

#### 4.3 Get Vehicles by Customer

```http
GET /api/vehicle/customer/:customerId
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "vehicle_id": 1,
            "vehicle_year": 2022,
            "vehicle_make": "Toyota",
            "vehicle_model": "Camry",
            "vehicle_color": "Silver"
        },
        {
            "vehicle_id": 2,
            "vehicle_year": 2020,
            "vehicle_make": "Honda",
            "vehicle_model": "Civic",
            "vehicle_color": "Blue"
        }
    ]
}
```

#### 4.4 Create Vehicle

```http
POST /api/vehicle
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "customer_id": 1,
    "vehicle_year": 2021,
    "vehicle_make": "Honda",
    "vehicle_model": "Accord",
    "vehicle_type": "Sedan",
    "vehicle_mileage": 30000,
    "vehicle_tag": "XYZ-5678",
    "vehicle_serial": "1HGCV1F31LA000001",
    "vehicle_color": "Black"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Vehicle added successfully",
    "vehicle": {
        "vehicle_id": 2
    }
}
```

#### 4.5 Update Vehicle

```http
PUT /api/vehicle/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "vehicle_mileage": 35000,
    "vehicle_color": "Dark Blue"
}
```

#### 4.6 Delete Vehicle

```http
DELETE /api/vehicle/:id
Authorization: Bearer <token>
```

---

### 5. Services

Services represent the types of work the garage offers.

#### 5.1 Get All Services (Public)

```http
GET /api/service
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "service_id": 1,
            "service_name": "Oil Change",
            "service_description": "Complete oil change including filter replacement",
            "service_price": 49.99,
            "active_service": true
        },
        {
            "service_id": 2,
            "service_name": "Brake Inspection",
            "service_description": "Complete brake system inspection",
            "service_price": 29.99,
            "active_service": true
        }
    ]
}
```

#### 5.2 Get Service by ID

```http
GET /api/service/:id
```

#### 5.3 Create Service (Admin Only)

```http
POST /api/service
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "service_name": "Wheel Alignment",
    "service_description": "Four-wheel alignment service for optimal tire wear",
    "service_price": 89.99
}
```

#### 5.4 Update Service (Admin Only)

```http
PUT /api/service/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "service_name": "Premium Wheel Alignment",
    "service_price": 99.99
}
```

#### 5.5 Delete Service (Admin Only)

```http
DELETE /api/service/:id
Authorization: Bearer <token>
```

---

### 6. Orders

#### 6.1 Get All Orders

```http
GET /api/order
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "order_id": 1,
            "order_date": "2026-02-01T09:00:00Z",
            "customer_id": 1,
            "customer_first_name": "Jane",
            "customer_last_name": "Doe",
            "vehicle_id": 1,
            "vehicle_make": "Toyota",
            "vehicle_model": "Camry",
            "vehicle_year": 2022,
            "order_status": "In Progress",
            "order_total_price": 129.98,
            "estimated_completion_date": "2026-02-02",
            "services": [
                {
                    "service_id": 1,
                    "service_name": "Oil Change",
                    "service_price": 49.99,
                    "service_status": "Completed"
                },
                {
                    "service_id": 2,
                    "service_name": "Tire Rotation",
                    "service_price": 79.99,
                    "service_status": "In Progress"
                }
            ]
        }
    ]
}
```

#### 6.2 Get Order by ID

```http
GET /api/order/:id
Authorization: Bearer <token>
```

#### 6.3 Create Order

```http
POST /api/order
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "employee_id": 1,
    "customer_id": 1,
    "vehicle_id": 1,
    "order_services": [1, 2, 5],
    "additional_request": "Please check brake noise",
    "notes_for_internal_use": "Customer mentioned squeaking",
    "notes_for_customer": "We will inspect brakes thoroughly",
    "estimated_completion_date": "2026-02-10"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Order created successfully",
    "data": {
        "order_id": 2,
        "order_total_price": 249.97
    }
}
```

#### 6.4 Update Order

```http
PUT /api/order/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "order_status": "Completed",
    "completion_date": "2026-02-05",
    "notes_for_customer": "All services completed. Vehicle ready for pickup."
}
```

#### 6.5 Delete Order

```http
DELETE /api/order/:id
Authorization: Bearer <token>
```

---

### 7. Payments

#### 7.1 Get All Payments

```http
GET /api/payment
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "status": "success",
    "data": [
        {
            "payment_id": 1,
            "order_id": 1,
            "payment_amount": 129.98,
            "payment_method": "Credit Card",
            "payment_date": "2026-02-05T15:30:00Z",
            "payment_status": "Completed",
            "transaction_id": "txn_abc123",
            "customer_first_name": "Jane",
            "customer_last_name": "Doe"
        }
    ]
}
```

#### 7.2 Get Payment by ID

```http
GET /api/payment/:id
Authorization: Bearer <token>
```

#### 7.3 Get Payments by Order

```http
GET /api/payment/order/:orderId
Authorization: Bearer <token>
```

#### 7.4 Create Payment

```http
POST /api/payment
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "order_id": 1,
    "payment_amount": 129.98,
    "payment_method": "Credit Card",
    "payment_status": "Completed",
    "transaction_id": "txn_abc123",
    "notes": "Paid in full"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Payment recorded successfully",
    "data": {
        "payment_id": 1
    }
}
```

#### 7.5 Update Payment

```http
PUT /api/payment/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "payment_status": "Refunded",
    "notes": "Customer requested refund"
}
```

#### 7.6 Delete Payment

```http
DELETE /api/payment/:id
Authorization: Bearer <token>
```

---

## Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | BAD_REQUEST | Invalid request parameters or body |
| 401 | UNAUTHORIZED | Authentication token missing or invalid |
| 403 | FORBIDDEN | Insufficient permissions for this action |
| 404 | NOT_FOUND | Requested resource not found |
| 409 | CONFLICT | Resource already exists (e.g., duplicate email) |
| 422 | VALIDATION_ERROR | Request body validation failed |
| 500 | INTERNAL_ERROR | Server error |

**Error Response Format:**
```json
{
    "status": "error",
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {}
}
```

---

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Pagination

For endpoints returning lists, use query parameters:

```http
GET /api/customers?page=1&limit=20
```

**Response includes:**
```json
{
    "status": "success",
    "data": [...],
    "pagination": {
        "page": 1,
        "limit": 20,
        "total": 100,
        "totalPages": 5
    }
}
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 2026 | Initial API documentation |
