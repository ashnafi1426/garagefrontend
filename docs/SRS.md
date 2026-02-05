# Software Requirements Specification (SRS)
## Real Garage Management System (Enterprise-Level)

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Approved for Implementation

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope of the System](#12-scope-of-the-system)
   - 1.3 [Definitions and Abbreviations](#13-definitions-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Document Overview](#15-document-overview)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [Functional Requirements](#3-functional-requirements)
   - 3.1 [Customer Module](#31-customer-module)
   - 3.2 [Employee Module](#32-employee-module)
   - 3.3 [Admin Module](#33-admin-module)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [External Interface Requirements](#5-external-interface-requirements)
6. [Database Design](#6-database-design)
7. [API Specification](#7-api-specification)
8. [System Architecture](#8-system-architecture)
9. [Future Enhancements](#9-future-enhancements)
10. [Appendix](#10-appendix)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document defines the functional and non-functional requirements for a **Real Garage Management System** designed for large and chain garages. The purpose of this document is to provide a complete, clear, and agreed reference for stakeholders, developers, testers, and clients regarding system behavior, scope, and constraints.

**This document is suitable for:**

- Real-world garage business operations
- Enterprise-level web application development
- Academic final-year projects / capstone projects
- Client agreements and implementation reference
- Professional portfolios and startup documentation

### 1.2 Scope of the System

The Garage Management System is a **web-based enterprise application** that digitalizes garage operations including:

- Customer registration and authentication
- Vehicle management (multi-vehicle per customer)
- Service ordering and tracking
- Employee workflows and task management
- Payment processing and invoicing
- Administrative control across operations

**The system provides:**

| Component | Description |
|-----------|-------------|
| Customer Self-Service Portal | Customers can register, manage vehicles, request services, and view history |
| Employee Operational Dashboard | Staff can manage daily operations, orders, and customer interactions |
| Admin Enterprise Control Dashboard | Full system management including users, services, and reports |
| Role-Based Access Control (RBAC) | Secure access management based on user roles |
| Scalable Architecture | Designed for large garages with growth potential |

### 1.3 Definitions and Abbreviations

| Term | Definition |
|------|------------|
| SRS | Software Requirements Specification |
| RBAC | Role-Based Access Control |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| CRUD | Create, Read, Update, Delete |
| JWT | JSON Web Token |
| Admin | System administrator with highest privileges |
| Employee | Garage staff member with operational access |
| Customer | Service receiver who registers to use garage services |
| Vehicle | Customer's automobile registered in the system |
| Order | Service request created for a vehicle |
| Service | Type of garage work (e.g., oil change, brake repair) |
| Payment | Financial transaction associated with an order |

### 1.4 References

- IEEE 830-1998 Standard for Software Requirements Specifications
- Node.js Documentation (https://nodejs.org/docs/)
- React.js Documentation (https://react.dev/)
- Express.js Documentation (https://expressjs.com/)
- MySQL Documentation (https://dev.mysql.com/doc/)

### 1.5 Document Overview

- **Section 1** provides an introduction to the SRS document
- **Section 2** gives an overall description of the product
- **Section 3** specifies detailed functional requirements
- **Section 4** defines non-functional requirements
- **Section 5** describes external interface requirements
- **Section 6** details the database design
- **Section 7** specifies the API endpoints
- **Section 8** describes system architecture
- **Section 9** outlines future enhancements
- **Section 10** contains appendix materials

---

## 2. Overall Description

### 2.1 Product Perspective

The system is a **standalone web application** built using a three-tier architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER                        │
│                     (React.js + Bootstrap)                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐   │
│  │  Customer   │ │  Employee   │ │   Admin Dashboard       │   │
│  │   Portal    │ │  Dashboard  │ │                         │   │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       APPLICATION TIER                          │
│                    (Node.js + Express.js)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      REST API Layer                      │   │
│  │  /api/customers  /api/vehicles  /api/orders  /api/...   │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Business Logic Layer                   │   │
│  │  Authentication | Authorization | Validation | Services │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          DATA TIER                              │
│                         (MySQL 8+)                              │
│  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌─────────┐  │
│  │Employees│ │ Customers│ │Vehicles│ │  Orders  │ │ Services│  │
│  └─────────┘ └──────────┘ └────────┘ └──────────┘ └─────────┘  │
│  ┌─────────┐ ┌──────────┐ ┌────────────────────────────────┐   │
│  │Payments │ │  Roles   │ │      Order_Services (M:M)      │   │
│  └─────────┘ └──────────┘ └────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Product Functions

The primary functions of the system include:

| Function Category | Capabilities |
|-------------------|--------------|
| **User Management** | Registration, authentication, profile management, role assignment |
| **Vehicle Management** | Add, edit, delete vehicles; track service history per vehicle |
| **Service Management** | Define service types, pricing, descriptions |
| **Order Management** | Create orders, assign services, track status, update progress |
| **Payment Management** | Record payments, generate invoices, track payment status |
| **Reporting** | View operational metrics, financial reports, service analytics |

### 2.3 User Classes and Characteristics

#### 2.3.1 Customer
```
Role ID: 1
Access Level: Limited (own data only)
```

| Attribute | Description |
|-----------|-------------|
| Authentication | Email/phone-based registration and login |
| Vehicle Management | Can add, view, and manage multiple personal vehicles |
| Service Requests | Can request services and view real-time order status |
| History Access | Complete access to personal service and payment history |
| Technical Level | Basic computer literacy assumed |

#### 2.3.2 Employee
```
Role ID: 2
Access Level: Operational
```

| Attribute | Description |
|-----------|-------------|
| Authentication | Secure credential-based login |
| Customer Management | Create and update customer records |
| Order Management | Create, assign, and update service orders |
| Vehicle Access | View and update vehicle service history |
| Dashboard | View assigned jobs and operational metrics |
| Technical Level | Familiar with garage operations software |

#### 2.3.3 Admin
```
Role ID: 3
Access Level: Full System Access
```

| Attribute | Description |
|-----------|-------------|
| User Management | Create, update, deactivate employees and customers |
| Role Management | Assign and modify user roles and permissions |
| Service Configuration | Manage service catalog and pricing |
| System Monitoring | View system-wide analytics and reports |
| Security | Manage access control rules and audit logs |
| Technical Level | Advanced system administration skills |

### 2.4 Operating Environment

| Component | Requirement |
|-----------|-------------|
| **Web Browsers** | Chrome 90+, Firefox 88+, Edge 90+, Safari 14+ |
| **Server OS** | Linux (Ubuntu 20.04+ / AWS Amazon Linux 2+) |
| **Runtime** | Node.js 18+ |
| **Database** | MySQL 8.0+ |
| **Protocols** | HTTPS (TLS 1.2+) |
| **Hosting** | AWS EC2, Vercel (Frontend), or similar cloud platforms |

### 2.5 Design and Implementation Constraints

1. **Technology Stack**: Must use React.js for frontend and Node.js/Express.js for backend
2. **Database**: Must use MySQL for data persistence
3. **Security**: All passwords must be hashed using bcrypt
4. **Authentication**: JWT-based token authentication required
5. **API Design**: RESTful API architecture must be followed
6. **Responsive Design**: UI must be responsive across devices (mobile, tablet, desktop)

### 2.6 Assumptions and Dependencies

**Assumptions:**
- Users have access to modern web browsers
- Reliable internet connection is available
- Backend API server is deployed and accessible
- Database is configured and running

**Dependencies:**
- Node.js and npm for package management
- MySQL database server
- Bootstrap CSS framework
- React Router for navigation
- Axios for HTTP requests

---

## 3. Functional Requirements

### 3.1 Customer Module

#### 3.1.1 Customer Registration & Authentication

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-C-001 | The system shall allow customers to register using email address | High |
| FR-C-002 | The system shall allow customers to register using phone number | Medium |
| FR-C-003 | The system shall authenticate customers using email/password | High |
| FR-C-004 | The system shall hash all passwords using bcrypt before storage | High |
| FR-C-005 | The system shall generate JWT tokens upon successful login | High |
| FR-C-006 | The system shall maintain user sessions until explicit logout or token expiry | High |
| FR-C-007 | The system shall validate email format during registration | High |
| FR-C-008 | The system shall enforce minimum password complexity (8+ characters) | High |

#### 3.1.2 Customer Profile Management

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-C-009 | Customers shall view their profile details | High |
| FR-C-010 | Customers shall update personal information (name, email, phone) | High |
| FR-C-011 | Customers shall change their password | High |
| FR-C-012 | Customers shall view all their registered vehicles | High |
| FR-C-013 | Customers shall add new vehicles to their profile | High |
| FR-C-014 | Customers shall edit vehicle details | Medium |
| FR-C-015 | Customers shall delete vehicles from their profile | Medium |

#### 3.1.3 Service Requests & Orders

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-C-016 | Customers shall view available services with pricing | High |
| FR-C-017 | Customers shall book service appointments | High |
| FR-C-018 | Customers shall select specific vehicle for service | High |
| FR-C-019 | Customers shall select desired service type(s) | High |
| FR-C-020 | Customers shall add notes/description for service request | Medium |
| FR-C-021 | Customers shall view order status in real-time | High |
| FR-C-022 | Customers shall receive confirmation of order placement | High |

#### 3.1.4 Service History & Invoices

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-C-023 | Customers shall view complete service history | High |
| FR-C-024 | Customers shall filter service history by date range | Medium |
| FR-C-025 | Customers shall filter service history by vehicle | Medium |
| FR-C-026 | Customers shall access invoices for completed services | High |
| FR-C-027 | Customers shall view payment status for each order | High |
| FR-C-028 | Customers shall download/print invoices | Low |

### 3.2 Employee Module

#### 3.2.1 Employee Authentication

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-E-001 | Employees shall log in using secure credentials (email/password) | High |
| FR-E-002 | The system shall enforce role-based permissions for employees | High |
| FR-E-003 | The system shall redirect unauthorized employees to unauthorized page | High |
| FR-E-004 | Employee sessions shall expire after period of inactivity | Medium |

#### 3.2.2 Customer & Vehicle Management

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-E-005 | Employees shall create new customer records | High |
| FR-E-006 | Employees shall update existing customer information | High |
| FR-E-007 | Employees shall search customers by name, email, or phone | High |
| FR-E-008 | Employees shall view complete customer profiles | High |
| FR-E-009 | Employees shall add vehicles for customers | High |
| FR-E-010 | Employees shall view vehicle service history | High |
| FR-E-011 | Employees shall update vehicle information | High |

#### 3.2.3 Order & Service Management

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-E-012 | Employees shall create new service orders | High |
| FR-E-013 | Employees shall assign one or more services to an order | High |
| FR-E-014 | Employees shall select vehicle for service order | High |
| FR-E-015 | Employees shall update order status (Pending → In Progress → Completed) | High |
| FR-E-016 | Employees shall add notes/comments to orders | Medium |
| FR-E-017 | Employees shall calculate total order cost based on services | High |
| FR-E-018 | Employees shall cancel orders (with reason) | Medium |

#### 3.2.4 Operational Dashboard

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-E-019 | Employees shall view dashboard with assigned jobs | High |
| FR-E-020 | Employees shall view pending orders count | High |
| FR-E-021 | Employees shall view in-progress orders count | High |
| FR-E-022 | Employees shall view completed orders for the day | Medium |
| FR-E-023 | Employees shall update repair notes and observations | Medium |

### 3.3 Admin Module

#### 3.3.1 User & Role Management

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-A-001 | Admins shall create new employee accounts | High |
| FR-A-002 | Admins shall update employee information | High |
| FR-A-003 | Admins shall deactivate employee accounts | High |
| FR-A-004 | Admins shall assign roles to employees (Employee, Admin) | High |
| FR-A-005 | Admins shall view all employees with their roles | High |
| FR-A-006 | Admins shall view all customers | High |
| FR-A-007 | Admins shall search and filter users | High |
| FR-A-008 | Admins shall reset employee passwords | Medium |

#### 3.3.2 Service Management

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-A-009 | Admins shall create new service types | High |
| FR-A-010 | Admins shall define service pricing | High |
| FR-A-011 | Admins shall provide service descriptions | High |
| FR-A-012 | Admins shall update existing services | High |
| FR-A-013 | Admins shall deactivate/delete services | Medium |
| FR-A-014 | Admins shall set service categories | Low |

#### 3.3.3 System Monitoring & Reports

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-A-015 | Admins shall view total customers count | High |
| FR-A-016 | Admins shall view total orders count | High |
| FR-A-017 | Admins shall view total revenue metrics | High |
| FR-A-018 | Admins shall view orders by status breakdown | High |
| FR-A-019 | Admins shall generate operational reports | Medium |
| FR-A-020 | Admins shall generate financial reports | Medium |
| FR-A-021 | Admins shall export reports to PDF/Excel | Low |

#### 3.3.4 Security & Configuration

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-A-022 | Admins shall manage access control rules | High |
| FR-A-023 | Admins shall view system audit logs | Medium |
| FR-A-024 | Admins shall configure system settings | Low |

---

## 4. Non-Functional Requirements

### 4.1 Security Requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| NFR-S-001 | All data shall be transmitted over HTTPS | High |
| NFR-S-002 | Passwords shall be encrypted using bcrypt (min 10 salt rounds) | High |
| NFR-S-003 | JWT tokens shall expire after configurable period (default 24h) | High |
| NFR-S-004 | API endpoints shall validate authorization tokens | High |
| NFR-S-005 | SQL injection prevention through parameterized queries | High |
| NFR-S-006 | XSS prevention through input sanitization | High |
| NFR-S-007 | CORS shall be configured to allow only trusted origins | High |

### 4.2 Performance Requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| NFR-P-001 | Page load time shall be < 3 seconds on standard connection | High |
| NFR-P-002 | API response time shall be < 500ms for standard requests | High |
| NFR-P-003 | System shall support minimum 100 concurrent users | Medium |
| NFR-P-004 | Database queries shall be optimized with proper indexing | High |
| NFR-P-005 | Frontend assets shall be minified and compressed | Medium |

### 4.3 Scalability Requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| NFR-SC-001 | System shall use modular architecture for easy extension | High |
| NFR-SC-002 | Database shall support horizontal scaling | Medium |
| NFR-SC-003 | API shall be stateless to support load balancing | High |
| NFR-SC-004 | System shall support multiple concurrent operations | High |

### 4.4 Usability Requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| NFR-U-001 | UI shall be intuitive and require minimal training | High |
| NFR-U-002 | UI shall be responsive (mobile, tablet, desktop) | High |
| NFR-U-003 | Error messages shall be clear and actionable | High |
| NFR-U-004 | Loading states shall be indicated to users | Medium |
| NFR-U-005 | Forms shall provide validation feedback | High |

### 4.5 Reliability Requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| NFR-R-001 | System uptime shall be 99.5% or higher | High |
| NFR-R-002 | Data shall be backed up daily | High |
| NFR-R-003 | Error logging shall be comprehensive | High |
| NFR-R-004 | System shall gracefully handle errors | High |
| NFR-R-005 | Database transactions shall ensure data integrity | High |

### 4.6 Maintainability Requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| NFR-M-001 | Code shall follow consistent coding standards | High |
| NFR-M-002 | Components shall be reusable and modular | High |
| NFR-M-003 | API versioning shall be supported | Medium |
| NFR-M-004 | Documentation shall be maintained | High |

---

## 5. External Interface Requirements

### 5.1 User Interface Requirements

| ID | Requirement |
|----|-------------|
| UI-001 | Web-based responsive UI using React.js |
| UI-002 | Bootstrap 5 CSS framework for consistent styling |
| UI-003 | Navigation menu with role-based visibility |
| UI-004 | Dashboard cards for quick metrics overview |
| UI-005 | Data tables with sorting, filtering, and pagination |
| UI-006 | Modal dialogs for confirmations and forms |
| UI-007 | Toast notifications for user feedback |
| UI-008 | Loading spinners during async operations |

### 5.2 Hardware Interfaces

| ID | Requirement |
|----|-------------|
| HW-001 | Standard web-enabled devices (desktop, laptop, tablet, smartphone) |
| HW-002 | Minimum 1GB RAM, stable internet connection |

### 5.3 Software Interfaces

| Interface | Protocol | Format |
|-----------|----------|--------|
| REST API | HTTPS | JSON |
| Database | TCP/IP (MySQL Protocol) | SQL |
| Authentication | JWT | Base64 encoded tokens |

### 5.4 Communication Interfaces

| Protocol | Usage |
|----------|-------|
| HTTPS | All client-server communication |
| WebSocket | Real-time updates (optional future enhancement) |

---

## 6. Database Design

### 6.1 Entity-Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐
│  company_roles  │     │    employees    │
├─────────────────┤     ├─────────────────┤
│ company_role_id │◄────│ company_role_id │
│ company_role_   │     │ employee_id     │
│    name         │     │ employee_email  │
└─────────────────┘     │ employee_pass   │
                        │ employee_phone  │
                        │ employee_first_ │
                        │    name         │
                        │ employee_last_  │
                        │    name         │
                        │ active_employee │
                        │ added_date      │
                        └─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   customers     │     │    vehicles     │     │    services     │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ customer_id     │◄────│ customer_id     │     │ service_id      │
│ customer_email  │     │ vehicle_id      │     │ service_name    │
│ customer_phone  │     │ vehicle_year    │     │ service_        │
│ customer_first_ │     │ vehicle_make    │     │    description  │
│    name         │     │ vehicle_model   │     │ service_price   │
│ customer_last_  │     │ vehicle_type    │     │ active_service  │
│    name         │     │ vehicle_mileage │     └─────────────────┘
│ active_customer │     │ vehicle_tag     │              │
│ added_date      │     │ vehicle_serial  │              │
└─────────────────┘     │ vehicle_color   │              │
        │               │ active_vehicle  │              │
        │               │ added_date      │              │
        ▼               └─────────────────┘              │
┌─────────────────┐              │                       │
│     orders      │              │                       │
├─────────────────┤              │                       │
│ order_id        │◄─────────────┘                       │
│ employee_id     │                                      │
│ customer_id     │                                      │
│ vehicle_id      │                                      │
│ order_date      │                                      │
│ order_total     │                                      │
│ additional_req  │                                      │
│ notes_for_int   │                                      │
│ notes_for_cust  │                                      │
│ estimated_comp  │                                      │
│ completion_date │                                      │
│ order_status    │                                      │
└─────────────────┘                                      │
        │                                                │
        ▼                                                │
┌─────────────────┐                                      │
│ order_services  │                                      │
├─────────────────┤                                      │
│ order_service_id│                                      │
│ order_id        │                                      │
│ service_id      │◄─────────────────────────────────────┘
│ service_status  │
│ service_complete│
└─────────────────┘

┌─────────────────┐
│    payments     │
├─────────────────┤
│ payment_id      │
│ order_id        │──────► orders.order_id
│ payment_amount  │
│ payment_method  │
│ payment_date    │
│ payment_status  │
│ transaction_id  │
│ notes           │
└─────────────────┘
```

### 6.2 Table Definitions

#### 6.2.1 company_roles Table

```sql
CREATE TABLE company_roles (
    company_role_id INT PRIMARY KEY AUTO_INCREMENT,
    company_role_name VARCHAR(100) NOT NULL UNIQUE
);

-- Default roles
INSERT INTO company_roles (company_role_id, company_role_name) VALUES
(1, 'Customer'),
(2, 'Employee'),
(3, 'Admin');
```

#### 6.2.2 employees Table

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_email VARCHAR(255) NOT NULL UNIQUE,
    employee_password_hashed VARCHAR(255) NOT NULL,
    employee_phone VARCHAR(50) NOT NULL,
    employee_first_name VARCHAR(100) NOT NULL,
    employee_last_name VARCHAR(100) NOT NULL,
    company_role_id INT NOT NULL DEFAULT 2,
    active_employee BOOLEAN DEFAULT TRUE,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
);

CREATE INDEX idx_employee_email ON employees(employee_email);
CREATE INDEX idx_employee_role ON employees(company_role_id);
```

#### 6.2.3 customers Table

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_email VARCHAR(255) NOT NULL UNIQUE,
    customer_phone VARCHAR(50) NOT NULL,
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    active_customer_status BOOLEAN DEFAULT TRUE,
    customer_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customer_email ON customers(customer_email);
CREATE INDEX idx_customer_phone ON customers(customer_phone);
```

#### 6.2.4 vehicles Table

```sql
CREATE TABLE vehicles (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    vehicle_year INT NOT NULL,
    vehicle_make VARCHAR(100) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL,
    vehicle_type VARCHAR(50),
    vehicle_mileage INT,
    vehicle_tag VARCHAR(50),
    vehicle_serial VARCHAR(100),
    vehicle_color VARCHAR(50),
    active_vehicle BOOLEAN DEFAULT TRUE,
    vehicle_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

CREATE INDEX idx_vehicle_customer ON vehicles(customer_id);
```

#### 6.2.5 services Table

```sql
CREATE TABLE services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    service_price DECIMAL(10, 2) NOT NULL,
    active_service BOOLEAN DEFAULT TRUE
);
```

#### 6.2.6 orders Table

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    customer_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_total_price DECIMAL(10, 2),
    additional_request TEXT,
    notes_for_internal_use TEXT,
    notes_for_customer TEXT,
    estimated_completion_date DATE,
    completion_date DATE,
    order_status ENUM('Pending', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
);

CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_status ON orders(order_status);
CREATE INDEX idx_order_date ON orders(order_date);
```

#### 6.2.7 order_services Table (Many-to-Many)

```sql
CREATE TABLE order_services (
    order_service_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    service_id INT NOT NULL,
    service_status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    service_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

CREATE INDEX idx_order_service_order ON order_services(order_id);
CREATE INDEX idx_order_service_status ON order_services(service_status);
```

#### 6.2.8 payments Table

```sql
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Stripe') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
    transaction_id VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

CREATE INDEX idx_payment_order ON payments(order_id);
CREATE INDEX idx_payment_status ON payments(payment_status);
```

---

## 7. API Specification

### 7.1 Base URL

```
Production: https://api.yourdomain.com
Development: http://localhost:5000
```

### 7.2 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

### 7.3 API Endpoints

#### 7.3.1 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/employee/login` | Employee/Admin login | No |
| POST | `/api/customer/login` | Customer login | No |
| POST | `/api/customer/register` | Customer registration | No |
| POST | `/api/employee/logout` | Logout (invalidate token) | Yes |

**Login Request:**
```json
{
    "employee_email": "admin@garage.com",
    "employee_password": "securepassword123"
}
```

**Login Response:**
```json
{
    "status": "success",
    "employee_token": "eyJhbGciOiJIUzI1NiIs...",
    "employee_id": 1,
    "employee_first_name": "John",
    "employee_last_name": "Doe",
    "employee_email": "admin@garage.com",
    "company_role_id": 3
}
```

#### 7.3.2 Employee Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/employees` | Get all employees | Yes | Admin |
| GET | `/api/employee/:id` | Get employee by ID | Yes | Admin |
| POST | `/api/employee` | Create new employee | Yes | Admin |
| PUT | `/api/employee/:id` | Update employee | Yes | Admin |
| DELETE | `/api/employee/:id` | Delete employee | Yes | Admin |

**Create Employee Request:**
```json
{
    "employee_email": "john.smith@garage.com",
    "employee_password": "password123",
    "employee_phone": "+1-555-123-4567",
    "employee_first_name": "John",
    "employee_last_name": "Smith",
    "company_role_id": 2
}
```

#### 7.3.3 Customer Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/customers` | Get all customers | Yes | Employee, Admin |
| GET | `/api/customers/:id` | Get customer by ID | Yes | Employee, Admin |
| POST | `/api/customers` | Create new customer | Yes | Employee, Admin |
| PUT | `/api/customers/:id` | Update customer | Yes | Employee, Admin |
| DELETE | `/api/customers/:id` | Delete customer | Yes | Admin |

**Create Customer Request:**
```json
{
    "customer_email": "customer@email.com",
    "customer_phone": "+1-555-987-6543",
    "customer_first_name": "Jane",
    "customer_last_name": "Doe"
}
```

#### 7.3.4 Vehicle Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/vehicle` | Get all vehicles | Yes | Employee, Admin |
| GET | `/api/vehicle/:id` | Get vehicle by ID | Yes | Employee, Admin |
| GET | `/api/vehicle/customer/:customerId` | Get vehicles by customer | Yes | Employee, Admin |
| POST | `/api/vehicle` | Create new vehicle | Yes | Employee, Admin |
| PUT | `/api/vehicle/:id` | Update vehicle | Yes | Employee, Admin |
| DELETE | `/api/vehicle/:id` | Delete vehicle | Yes | Admin |

**Create Vehicle Request:**
```json
{
    "customer_id": 1,
    "vehicle_year": 2022,
    "vehicle_make": "Toyota",
    "vehicle_model": "Camry",
    "vehicle_type": "Sedan",
    "vehicle_mileage": 25000,
    "vehicle_tag": "ABC-1234",
    "vehicle_serial": "4T1B11HK5JU123456",
    "vehicle_color": "Silver"
}
```

#### 7.3.5 Service Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/service` | Get all services | No | Public |
| GET | `/api/service/:id` | Get service by ID | No | Public |
| POST | `/api/service` | Create new service | Yes | Admin |
| PUT | `/api/service/:id` | Update service | Yes | Admin |
| DELETE | `/api/service/:id` | Delete service | Yes | Admin |

**Create Service Request:**
```json
{
    "service_name": "Oil Change",
    "service_description": "Complete oil change including filter replacement",
    "service_price": 49.99
}
```

#### 7.3.6 Order Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/order` | Get all orders | Yes | Employee, Admin |
| GET | `/api/order/:id` | Get order by ID | Yes | Employee, Admin |
| POST | `/api/order` | Create new order | Yes | Employee, Admin |
| PUT | `/api/order/:id` | Update order | Yes | Employee, Admin |
| DELETE | `/api/order/:id` | Delete order | Yes | Admin |

**Create Order Request:**
```json
{
    "employee_id": 1,
    "customer_id": 1,
    "vehicle_id": 1,
    "order_services": [1, 2, 3],
    "additional_request": "Please check brake pads",
    "notes_for_internal_use": "Customer mentioned squeaking noise",
    "estimated_completion_date": "2026-02-10"
}
```

**Order Response:**
```json
{
    "status": "success",
    "data": {
        "order_id": 1,
        "order_date": "2026-02-05T10:30:00Z",
        "customer_first_name": "Jane",
        "customer_last_name": "Doe",
        "vehicle_make": "Toyota",
        "vehicle_model": "Camry",
        "vehicle_year": 2022,
        "order_status": "Pending",
        "order_total_price": 149.97,
        "services": [
            {"service_name": "Oil Change", "service_price": 49.99},
            {"service_name": "Brake Inspection", "service_price": 29.99},
            {"service_name": "Tire Rotation", "service_price": 69.99}
        ]
    }
}
```

#### 7.3.7 Payment Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/payment` | Get all payments | Yes | Admin |
| GET | `/api/payment/:id` | Get payment by ID | Yes | Employee, Admin |
| GET | `/api/payment/order/:orderId` | Get payments by order | Yes | Employee, Admin |
| POST | `/api/payment` | Create new payment | Yes | Employee, Admin |
| PUT | `/api/payment/:id` | Update payment | Yes | Employee, Admin |
| DELETE | `/api/payment/:id` | Delete payment | Yes | Admin |

**Create Payment Request:**
```json
{
    "order_id": 1,
    "payment_amount": 149.97,
    "payment_method": "Credit Card",
    "payment_status": "Completed",
    "transaction_id": "txn_123456789"
}
```

### 7.4 Error Responses

All API errors follow a consistent format:

```json
{
    "status": "error",
    "message": "Descriptive error message",
    "code": "ERROR_CODE"
}
```

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | BAD_REQUEST | Invalid request parameters |
| 401 | UNAUTHORIZED | Authentication required |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource already exists |
| 500 | INTERNAL_ERROR | Server error |

---

## 8. System Architecture

### 8.1 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React.js 19+ | UI components and state management |
| **UI Framework** | Bootstrap 5 / React-Bootstrap | Responsive design and components |
| **Routing** | React Router 7+ | Client-side navigation |
| **HTTP Client** | Axios | API communication |
| **Backend** | Node.js 18+ | Server runtime |
| **API Framework** | Express.js | RESTful API server |
| **Database** | MySQL 8+ | Data persistence |
| **Authentication** | JWT (jsonwebtoken) | Token-based auth |
| **Password Hashing** | bcrypt | Secure password storage |
| **Deployment (Frontend)** | Vercel | Static hosting |
| **Deployment (Backend)** | AWS EC2 | Server hosting |
| **Version Control** | Git / GitHub | Source code management |

### 8.2 Folder Structure

#### Frontend (React.js)
```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                    # Static assets (images, fonts, CSS)
│   │   ├── styles/
│   │   └── template_assets/
│   ├── context/                   # React context providers
│   │   └── AuthContext.jsx
│   ├── markup/                    # UI components and pages
│   │   ├── components/
│   │   │   ├── Admin/             # Admin-specific components
│   │   │   ├── Auth/              # Authentication components
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   └── LoginForm/
│   │   └── pages/
│   │       ├── admin/             # Admin pages
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── Contact.jsx
│   │       ├── Services.jsx
│   │       ├── About.jsx
│   │       └── Unauthorized.jsx
│   ├── routes/                    # Route definitions
│   │   └── index.jsx
│   ├── services/                  # API service functions
│   │   ├── customer.service.jsx
│   │   ├── employee.service.jsx
│   │   ├── login.service.jsx
│   │   ├── orders.services.jsx
│   │   ├── payment.service.jsx
│   │   ├── service.service.jsx
│   │   └── vehicle.service.jsx
│   ├── util/                      # Utility functions
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

#### Backend (Node.js/Express.js) - Recommended Structure
```
backend/
├── config/
│   ├── db.config.js               # Database configuration
│   └── jwt.config.js              # JWT configuration
├── controllers/
│   ├── employee.controller.js
│   ├── customer.controller.js
│   ├── vehicle.controller.js
│   ├── service.controller.js
│   ├── order.controller.js
│   └── payment.controller.js
├── middleware/
│   ├── auth.middleware.js         # JWT verification
│   └── role.middleware.js         # Role-based access control
├── models/
│   ├── employee.model.js
│   ├── customer.model.js
│   ├── vehicle.model.js
│   ├── service.model.js
│   ├── order.model.js
│   └── payment.model.js
├── routes/
│   ├── employee.routes.js
│   ├── customer.routes.js
│   ├── vehicle.routes.js
│   ├── service.routes.js
│   ├── order.routes.js
│   └── payment.routes.js
├── utils/
│   └── helpers.js
├── .env
├── app.js
├── server.js
└── package.json
```

### 8.3 Deployment Architecture

```
                    ┌──────────────────┐
                    │     Users        │
                    │  (Web Browser)   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   CloudFlare     │
                    │   (CDN + SSL)    │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
    ┌──────────────────┐         ┌──────────────────┐
    │      Vercel      │         │     AWS EC2      │
    │    (Frontend)    │◄───────►│    (Backend)     │
    │   React.js App   │  HTTPS  │  Node.js API     │
    └──────────────────┘         └────────┬─────────┘
                                          │
                                          ▼
                                 ┌──────────────────┐
                                 │   AWS RDS or     │
                                 │   MySQL Server   │
                                 │    (Database)    │
                                 └──────────────────┘
```

---

## 9. Future Enhancements

| Priority | Enhancement | Description |
|----------|-------------|-------------|
| High | Online Payments | Integrate Stripe/PayPal for online payment processing |
| High | Mobile Application | Native iOS/Android apps for customers and employees |
| High | SMS/Email Notifications | Automated notifications for order status updates |
| Medium | Inventory Management | Track parts and supplies inventory |
| Medium | Appointment Scheduling | Calendar-based appointment booking |
| Medium | Multi-Branch Support | Support for multiple garage locations |
| Medium | Customer Reviews | Rating and review system for services |
| Low | AI Service Recommendations | Machine learning-based service suggestions |
| Low | Fleet Management | Corporate customer fleet management features |
| Low | Loyalty Program | Points/rewards system for repeat customers |

---

## 10. Appendix

### 10.1 Glossary

| Term | Definition |
|------|------------|
| API | Application Programming Interface - a set of protocols for building software |
| Authentication | Process of verifying user identity |
| Authorization | Process of determining user access rights |
| CRUD | Create, Read, Update, Delete - basic database operations |
| JWT | JSON Web Token - secure way to transmit information |
| RBAC | Role-Based Access Control - restricting access based on roles |
| REST | Representational State Transfer - architectural style for APIs |
| SRS | Software Requirements Specification |

### 10.2 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | February 2026 | Development Team | Initial SRS document |

### 10.3 Approval Signatures

---

**Client Signature:** ________________________  
**Date:** ________________________

---

**Service Provider Signature:** ________________________  
**Date:** ________________________

---

*This SRS document represents a complete and agreed specification for the Real Garage Management System.*
