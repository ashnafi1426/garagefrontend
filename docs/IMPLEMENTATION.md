# Implementation Guide
## Real Garage Management System

This guide provides step-by-step instructions for setting up and implementing the Garage Management System.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Setup](#2-environment-setup)
3. [Frontend Setup](#3-frontend-setup)
4. [Backend Setup](#4-backend-setup)
5. [Database Setup](#5-database-setup)
6. [Configuration](#6-configuration)
7. [Running the Application](#7-running-the-application)
8. [Testing](#8-testing)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18.x or higher | JavaScript runtime |
| npm | 9.x or higher | Package manager |
| MySQL | 8.0 or higher | Database server |
| Git | 2.x or higher | Version control |

### Recommended Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code editor |
| MySQL Workbench | Database management |
| Postman | API testing |
| Chrome DevTools | Frontend debugging |

### System Requirements

- **OS**: Windows 10+, macOS 11+, or Ubuntu 20.04+
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: Minimum 2GB free space
- **Network**: Stable internet connection

---

## 2. Environment Setup

### 2.1 Install Node.js

#### Windows/macOS
Download and install from [nodejs.org](https://nodejs.org/)

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2.2 Install MySQL

#### Windows
Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)

#### macOS
```bash
brew install mysql
brew services start mysql
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### 2.3 Verify Installations

```bash
# Check Node.js
node --version
# Expected: v18.x.x or higher

# Check npm
npm --version
# Expected: 9.x.x or higher

# Check MySQL
mysql --version
# Expected: mysql Ver 8.x.x
```

---

## 3. Frontend Setup

### 3.1 Clone Repository

```bash
git clone https://github.com/ashnafi1426/garagefrontend.git
cd garagefrontend/client
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Environment Configuration

Create a `.env` file in the `client` directory:

```env
# API URL - Point to your backend server
VITE_API_URL=http://localhost:5000
```

### 3.4 Project Structure Overview

```
client/
├── src/
│   ├── assets/          # Static assets (images, CSS)
│   ├── context/         # React Context for state management
│   │   └── AuthContext.jsx
│   ├── markup/
│   │   ├── components/  # Reusable UI components
│   │   └── pages/       # Page components
│   ├── routes/          # Route definitions
│   ├── services/        # API service functions
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 4. Backend Setup

### 4.1 Create Backend Directory

```bash
mkdir backend
cd backend
npm init -y
```

### 4.2 Install Backend Dependencies

```bash
npm install express mysql2 cors bcrypt jsonwebtoken dotenv
npm install --save-dev nodemon
```

### 4.3 Create Backend Structure

```bash
mkdir config controllers middleware models routes utils
touch app.js server.js .env
```

### 4.4 Backend Configuration Files

#### `server.js`
```javascript
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### `app.js`
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const employeeRoutes = require('./routes/employee.routes');
const customerRoutes = require('./routes/customer.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const serviceRoutes = require('./routes/service.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/employee', employeeRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error', 
        message: 'Something went wrong!' 
    });
});

module.exports = app;
```

#### `config/db.config.js`
```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'garage_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
```

#### `middleware/auth.middleware.js`
```javascript
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            status: 'error', 
            message: 'Access token required' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ 
                status: 'error', 
                message: 'Invalid or expired token' 
            });
        }
        req.employee = decoded;
        next();
    });
};

const adminOnly = (req, res, next) => {
    if (req.employee.company_role_id !== 3) {
        return res.status(403).json({ 
            status: 'error', 
            message: 'Admin access required' 
        });
    }
    next();
};

module.exports = { authMiddleware, adminOnly };
```

### 4.5 Backend `.env` Configuration

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=garage_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
```

---

## 5. Database Setup

### 5.1 Create Database

```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE garage_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE garage_db;
```

### 5.2 Create Tables

```sql
-- Roles table
CREATE TABLE company_roles (
    company_role_id INT PRIMARY KEY AUTO_INCREMENT,
    company_role_name VARCHAR(100) NOT NULL UNIQUE
);

-- Insert default roles
INSERT INTO company_roles (company_role_id, company_role_name) VALUES
(1, 'Customer'),
(2, 'Employee'),
(3, 'Admin');

-- Employees table
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

-- Customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_email VARCHAR(255) NOT NULL UNIQUE,
    customer_phone VARCHAR(50) NOT NULL,
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    active_customer_status BOOLEAN DEFAULT TRUE,
    customer_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
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

-- Services table
CREATE TABLE services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    service_price DECIMAL(10, 2) NOT NULL,
    active_service BOOLEAN DEFAULT TRUE
);

-- Orders table
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

-- Order Services (Many-to-Many relationship)
CREATE TABLE order_services (
    order_service_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    service_id INT NOT NULL,
    service_status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    service_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

-- Payments table
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

-- Create indexes for better performance
CREATE INDEX idx_employee_email ON employees(employee_email);
CREATE INDEX idx_employee_role ON employees(company_role_id);
CREATE INDEX idx_customer_email ON customers(customer_email);
CREATE INDEX idx_customer_phone ON customers(customer_phone);
CREATE INDEX idx_vehicle_customer ON vehicles(customer_id);
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_status ON orders(order_status);
CREATE INDEX idx_order_date ON orders(order_date);
CREATE INDEX idx_order_service_order ON order_services(order_id);
CREATE INDEX idx_payment_order ON payments(order_id);
CREATE INDEX idx_payment_status ON payments(payment_status);
```

### 5.3 Insert Sample Data

```sql
-- Insert sample admin user (password: admin123)
INSERT INTO employees (
    employee_email, 
    employee_password_hashed, 
    employee_phone, 
    employee_first_name, 
    employee_last_name, 
    company_role_id
) VALUES (
    'admin@garage.com',
    '$2b$10$rQZ8NHc/3a8B9C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V4W5X',
    '+1-555-000-0001',
    'System',
    'Administrator',
    3
);

-- Insert sample employee (password: employee123)
INSERT INTO employees (
    employee_email, 
    employee_password_hashed, 
    employee_phone, 
    employee_first_name, 
    employee_last_name, 
    company_role_id
) VALUES (
    'john.mechanic@garage.com',
    '$2b$10$aQZ8NHc/3a8B9C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V4W5Y',
    '+1-555-000-0002',
    'John',
    'Mechanic',
    2
);

-- Insert sample services
INSERT INTO services (service_name, service_description, service_price) VALUES
('Oil Change', 'Complete oil change including filter replacement', 49.99),
('Brake Inspection', 'Complete brake system inspection', 29.99),
('Tire Rotation', 'Rotate all four tires for even wear', 39.99),
('Engine Diagnostic', 'Computer diagnostic scan for engine issues', 89.99),
('Transmission Service', 'Transmission fluid change and inspection', 149.99),
('Battery Replacement', 'Replace old battery with new one', 129.99),
('Air Filter Replacement', 'Replace engine air filter', 24.99),
('Coolant Flush', 'Complete cooling system flush', 79.99),
('Spark Plug Replacement', 'Replace all spark plugs', 119.99),
('Wheel Alignment', 'Four-wheel alignment service', 89.99);

-- Insert sample customer
INSERT INTO customers (
    customer_email, 
    customer_phone, 
    customer_first_name, 
    customer_last_name
) VALUES (
    'jane.doe@email.com',
    '+1-555-123-4567',
    'Jane',
    'Doe'
);

-- Insert sample vehicle for the customer
INSERT INTO vehicles (
    customer_id, 
    vehicle_year, 
    vehicle_make, 
    vehicle_model, 
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_color
) VALUES (
    1,
    2022,
    'Toyota',
    'Camry',
    'Sedan',
    25000,
    'ABC-1234',
    'Silver'
);
```

---

## 6. Configuration

### 6.1 Frontend Configuration

#### Update API URL in `.env`

For **Development**:
```env
VITE_API_URL=http://localhost:5000
```

For **Production**:
```env
VITE_API_URL=https://api.yourdomain.com
```

### 6.2 Backend Configuration

#### Update `.env` file

```env
# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=garage_db

# JWT
JWT_SECRET=generate-a-strong-random-secret-key
JWT_EXPIRES_IN=24h

# Bcrypt
BCRYPT_SALT_ROUNDS=10
```

### 6.3 Generate Secure JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 7. Running the Application

### 7.1 Start Backend Server

```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Add to `backend/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 7.2 Start Frontend Development Server

```bash
cd client

# Start development server
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 7.3 Build for Production

```bash
cd client

# Build static files
npm run build

# Preview production build
npm run preview
```

---

## 8. Testing

### 8.1 API Testing with Postman

#### Test Login Endpoint
```http
POST http://localhost:5000/api/employee/login
Content-Type: application/json

{
    "employee_email": "admin@garage.com",
    "employee_password": "admin123"
}
```

#### Test Protected Endpoint
```http
GET http://localhost:5000/api/customers
Authorization: Bearer <token_from_login>
```

### 8.2 Frontend Linting

```bash
cd client
npm run lint
```

### 8.3 Build Test

```bash
cd client
npm run build
```

---

## 9. Troubleshooting

### Common Issues and Solutions

#### Issue: CORS Error
**Solution:** Ensure backend CORS configuration matches frontend URL:
```javascript
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

#### Issue: Database Connection Failed
**Solution:** Check MySQL service is running:
```bash
# Linux
sudo systemctl status mysql

# macOS
brew services list
```

#### Issue: JWT Token Invalid
**Solution:** Ensure `JWT_SECRET` is the same across all backend instances.

#### Issue: Port Already in Use
**Solution:** Kill the process using the port:
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

#### Issue: Module Not Found
**Solution:** Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

---

## Next Steps

1. Complete backend route implementations
2. Add unit and integration tests
3. Set up CI/CD pipeline
4. Configure production deployment
5. Implement additional security measures
6. Add monitoring and logging

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
