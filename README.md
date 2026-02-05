# Real Garage Management System

A comprehensive, enterprise-level web application for managing garage operations including customer registration, vehicle management, service ordering, employee workflows, and administrative control.

## 🚀 Features

### Customer Portal
- Customer registration and authentication
- Multi-vehicle management
- Service request booking
- Real-time order status tracking
- Service history and invoice access

### Employee Dashboard
- Secure credential-based login
- Customer and vehicle management
- Order creation and status updates
- Operational task management
- Repair notes and observations

### Admin Control Panel
- User and role management (RBAC)
- Service catalog configuration
- System-wide analytics
- Employee management
- Access control and security

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js 19+, Bootstrap 5, React Router 7+ |
| **Backend** | Node.js 18+, Express.js |
| **Database** | MySQL 8+ |
| **Authentication** | JWT (JSON Web Tokens) |
| **Build Tool** | Vite |
| **Deployment** | Vercel (Frontend), AWS EC2 (Backend) |

## 📁 Project Structure

```
garagefrontend/
├── client/                    # React.js Frontend
│   ├── src/
│   │   ├── assets/           # Static assets (images, CSS)
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── markup/
│   │   │   ├── components/   # Reusable UI components
│   │   │   └── pages/        # Page components
│   │   ├── routes/           # Route definitions
│   │   ├── services/         # API service functions
│   │   └── util/             # Utility functions
│   ├── package.json
│   └── vite.config.js
├── docs/                      # Documentation
│   ├── SRS.md                # Software Requirements Specification
│   ├── IMPLEMENTATION.md     # Implementation Guide
│   ├── DEPLOYMENT.md         # Deployment Guide
│   └── API.md                # API Documentation
└── README.md
```

## 🚦 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL 8+
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/ashnafi1426/garagefrontend.git
cd garagefrontend/client

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Software Requirements Specification](./docs/SRS.md) | Complete system requirements, features, and specifications |
| [Implementation Guide](./docs/IMPLEMENTATION.md) | Step-by-step setup and development instructions |
| [Deployment Guide](./docs/DEPLOYMENT.md) | Production deployment to Vercel, AWS EC2, and RDS |
| [API Documentation](./docs/API.md) | Complete REST API endpoint reference |

## 🔐 Role-Based Access Control

| Role | Role ID | Access Level |
|------|---------|--------------|
| Customer | 1 | Own data only |
| Employee | 2 | Operational access |
| Admin | 3 | Full system access |

## 📋 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please refer to the documentation in the `/docs` directory or open an issue in the repository