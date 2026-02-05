# Deployment Guide
## Real Garage Management System

This guide provides instructions for deploying the Garage Management System to production environments.

---

## Table of Contents

1. [Deployment Overview](#1-deployment-overview)
2. [Frontend Deployment (Vercel)](#2-frontend-deployment-vercel)
3. [Backend Deployment (AWS EC2)](#3-backend-deployment-aws-ec2)
4. [Database Setup (AWS RDS)](#4-database-setup-aws-rds)
5. [Environment Configuration](#5-environment-configuration)
6. [SSL/HTTPS Configuration](#6-sslhttps-configuration)
7. [Monitoring and Logging](#7-monitoring-and-logging)
8. [Backup and Recovery](#8-backup-and-recovery)

---

## 1. Deployment Overview

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                          │
│   │    Vercel       │  ◄── Frontend (React.js)                 │
│   │ (Static Host)   │      https://yourapp.vercel.app          │
│   └────────┬────────┘                                          │
│            │                                                    │
│            │ HTTPS                                              │
│            ▼                                                    │
│   ┌─────────────────┐                                          │
│   │   AWS EC2       │  ◄── Backend (Node.js/Express)           │
│   │ (API Server)    │      https://api.yourdomain.com          │
│   └────────┬────────┘                                          │
│            │                                                    │
│            │ Private Network                                    │
│            ▼                                                    │
│   ┌─────────────────┐                                          │
│   │   AWS RDS       │  ◄── Database (MySQL)                    │
│   │   (MySQL)       │      Internal endpoint                   │
│   └─────────────────┘                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Deployment Checklist

- [ ] Set up AWS account and configure IAM users
- [ ] Create RDS MySQL instance
- [ ] Launch EC2 instance for backend
- [ ] Deploy frontend to Vercel
- [ ] Configure domain and SSL
- [ ] Set up monitoring and alerts
- [ ] Configure automated backups
- [ ] Test production environment

---

## 2. Frontend Deployment (Vercel)

### 2.1 Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- GitHub repository with frontend code

### 2.2 Connect Repository to Vercel

1. Log in to Vercel
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Environment Variables

Add environment variables in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://api.yourdomain.com` |

### 2.4 Deploy

Click "Deploy" and wait for build to complete.

### 2.5 Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

### 2.6 Vercel Configuration (`vercel.json`)

The repository already includes a `vercel.json` for SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Backend Deployment (AWS EC2)

### 3.1 Launch EC2 Instance

1. Go to AWS EC2 Console
2. Click "Launch Instance"
3. Configure:
   - **Name**: `garage-api-server`
   - **AMI**: Amazon Linux 2023 or Ubuntu 22.04
   - **Instance Type**: `t2.micro` (free tier) or `t2.small`
   - **Key Pair**: Create or select existing
   - **Security Group**: Create with rules below

### 3.2 Security Group Configuration

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| SSH | TCP | 22 | Your IP | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web traffic |
| Custom TCP | TCP | 5000 | 0.0.0.0/0 | API server |

### 3.3 Connect to EC2

```bash
# Set permissions for key file
chmod 400 your-key.pem

# Connect via SSH
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

### 3.4 Install Dependencies

```bash
# Update system
sudo yum update -y  # Amazon Linux
# or
sudo apt update && sudo apt upgrade -y  # Ubuntu

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs  # Amazon Linux
# or
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs  # Ubuntu

# Install Git
sudo yum install git -y  # Amazon Linux
# or
sudo apt install git -y  # Ubuntu

# Install PM2 globally
sudo npm install -g pm2
```

### 3.5 Clone and Setup Backend

```bash
# Create app directory
sudo mkdir -p /var/www/garage-api
sudo chown $USER:$USER /var/www/garage-api

# Clone repository (your backend repo)
cd /var/www/garage-api
git clone https://github.com/yourusername/garage-backend.git .

# Install dependencies
npm install --production

# Create .env file
nano .env
```

### 3.6 Configure `.env` for Production

```env
# Server
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://yourapp.vercel.app

# Database (RDS)
DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-secure-password
DB_NAME=garage_db

# JWT
JWT_SECRET=your-production-secret-key
JWT_EXPIRES_IN=24h

# Bcrypt
BCRYPT_SALT_ROUNDS=12
```

### 3.7 Start Application with PM2

```bash
# Start application
pm2 start server.js --name garage-api

# Save PM2 process list
pm2 save

# Configure PM2 to start on boot
pm2 startup
# Run the command that PM2 outputs

# View logs
pm2 logs garage-api

# View status
pm2 status
```

### 3.8 Setup Nginx as Reverse Proxy (Optional)

```bash
# Install Nginx
sudo yum install nginx -y  # Amazon Linux
# or
sudo apt install nginx -y  # Ubuntu

# Create Nginx configuration
sudo nano /etc/nginx/conf.d/garage-api.conf
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Test configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 4. Database Setup (AWS RDS)

### 4.1 Create RDS Instance

1. Go to AWS RDS Console
2. Click "Create database"
3. Configure:
   - **Engine**: MySQL 8.0
   - **Template**: Free tier or Production
   - **DB Instance Identifier**: `garage-db`
   - **Master Username**: `admin`
   - **Master Password**: (secure password)
   - **Instance Class**: `db.t2.micro` (free tier) or `db.t2.small`
   - **Storage**: 20 GB (General Purpose SSD)
   - **VPC**: Default VPC
   - **Public Access**: No (for security)
   - **Security Group**: Create new

### 4.2 Security Group for RDS

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| MySQL/Aurora | TCP | 3306 | EC2 Security Group | Allow from API server |

### 4.3 Connect to RDS from EC2

```bash
# Install MySQL client on EC2
sudo yum install mysql -y  # Amazon Linux
# or
sudo apt install mysql-client -y  # Ubuntu

# Connect to RDS
mysql -h your-rds-endpoint.region.rds.amazonaws.com -u admin -p
```

### 4.4 Create Database and Tables

Run the SQL scripts from the Implementation Guide to create tables:

```sql
CREATE DATABASE garage_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE garage_db;
-- Run table creation scripts...
```

---

## 5. Environment Configuration

### 5.1 Production Environment Variables

#### Frontend (Vercel)
```
VITE_API_URL=https://api.yourdomain.com
```

#### Backend (EC2)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourapp.vercel.app
DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-secure-password
DB_NAME=garage_db
JWT_SECRET=your-64-character-secret-key
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=12
```

### 5.2 Generate Production JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 6. SSL/HTTPS Configuration

### 6.1 Using AWS Certificate Manager (ACM)

1. Go to AWS Certificate Manager
2. Request a public certificate
3. Add domain names: `api.yourdomain.com`
4. Validate via DNS or Email
5. Use with Application Load Balancer or CloudFront

### 6.2 Using Let's Encrypt with Certbot

```bash
# Install Certbot
sudo yum install certbot python3-certbot-nginx -y  # Amazon Linux
# or
sudo apt install certbot python3-certbot-nginx -y  # Ubuntu

# Obtain certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

## 7. Monitoring and Logging

### 7.1 PM2 Monitoring

```bash
# View logs in real-time
pm2 logs garage-api

# View metrics
pm2 monit

# Generate startup script
pm2 startup

# Save current process list
pm2 save
```

### 7.2 AWS CloudWatch (Optional)

1. Install CloudWatch Agent on EC2
2. Configure metrics to collect
3. Set up alarms for CPU, memory, disk usage

### 7.3 Application Logging

Add logging to your Express app:

```javascript
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create log directory
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create write stream
const accessLogStream = fs.createWriteStream(
    path.join(logDir, 'access.log'),
    { flags: 'a' }
);

// Use morgan middleware
app.use(morgan('combined', { stream: accessLogStream }));
```

---

## 8. Backup and Recovery

### 8.1 RDS Automated Backups

1. Go to RDS Console > Your DB Instance
2. Modify > Backup
3. Set backup retention period (7-35 days)
4. Choose backup window

### 8.2 Manual Snapshots

```bash
# Create manual snapshot via AWS CLI
aws rds create-db-snapshot \
    --db-instance-identifier garage-db \
    --db-snapshot-identifier garage-db-manual-backup-$(date +%Y%m%d)
```

### 8.3 Application Backup

```bash
# Backup application files
tar -czvf garage-api-backup-$(date +%Y%m%d).tar.gz /var/www/garage-api

# Upload to S3
aws s3 cp garage-api-backup-*.tar.gz s3://your-backup-bucket/
```

### 8.4 Recovery Procedure

1. **Database**: Restore from RDS snapshot
2. **Application**: Re-deploy from Git or restore from backup
3. **Configuration**: Apply environment variables

---

## Quick Reference

### Useful Commands

```bash
# EC2 - View running processes
pm2 status

# EC2 - Restart application
pm2 restart garage-api

# EC2 - View logs
pm2 logs garage-api --lines 100

# EC2 - Update application
cd /var/www/garage-api
git pull
npm install --production
pm2 restart garage-api

# RDS - Connect to database
mysql -h your-rds-endpoint -u admin -p garage_db
```

### Health Check Endpoints

- **API Health**: `https://api.yourdomain.com/health`
- **Frontend**: `https://yourapp.vercel.app`

---

## Support

For issues or questions:
1. Check PM2 logs: `pm2 logs garage-api`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check application error logs
4. Verify environment variables
5. Test database connection
