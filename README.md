# 🛒 ShopHub - Full Stack E-Commerce Application

A production-style full-stack e-commerce application built with **Next.js**, **NestJS**, **PostgreSQL**, **Prisma**, **Redis**, and **Docker**.

This project demonstrates authentication, product browsing, cart management, order processing, password reset via email, search, pagination, caching, and modern frontend/backend architecture.

---

# 🚀 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Public Routes
- Forgot Password
- Reset Password via Email
- Password Hashing (bcrypt)

---

## Products

- Product Listing
- Product Details
- Search Products
- Debounced Search Suggestions
- Pagination
- Product Caching with Redis

---

## Cart

- Add to Cart
- Update Quantity
- Remove Item
- Clear Cart
- Total Price Calculation

---

## Orders

- Place Order
- Order History
- Order Details
- Transaction-based Order Creation

---

## Backend

- REST APIs
- JWT Authentication
- Prisma ORM
- PostgreSQL
- Redis Caching
- Docker
- Validation using class-validator
- Global Exception Handling

---

## Frontend

- Next.js App Router
- TypeScript
- React Query
- Zustand
- Tailwind CSS
- Shadcn UI
- Axios
- React Hook Form
- Zod Validation

---

# 🏗 Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React Query
- Zustand
- Axios
- React Hook Form
- Zod
- Shadcn UI

---

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- Docker
- JWT
- Nodemailer
- Handlebars
- Class Validator

---

# 📂 Project Structure

```
intern-ecommerce/

├── frontend/
│
├── backend/
│
├── docker-compose.yml
│
└── README.md
```

---

# Backend Architecture

```
src/

common/
    prisma/
    redis/
    mail/
    dto/
    guards/
    interceptors/

modules/

    auth/

    users/

    products/

    cart/

    orders/
```

---

# Frontend Architecture

```
app/

(auth)

products/

cart/

orders/

features/

auth/

products/

cart/

orders/

components/

hooks/

lib/

store/
```

---

# Database

## Tables

- User
- Product
- Cart
- CartItem
- Order
- OrderItem
- PasswordResetToken

---

# Authentication Flow

```
Register

↓

Login

↓

Generate JWT

↓

Frontend stores token

↓

Protected APIs

↓

Logout
```

---

# Forgot Password Flow

```
Forgot Password

↓

Generate Secure Token

↓

Save Token

↓

Send Email

↓

User Clicks Link

↓

Reset Password

↓

Token Invalidated
```

---

# Product Caching Flow

```
Client

↓

Redis

↓

Cache Hit

↓

Return Products

--------------------

Cache Miss

↓

Database

↓

Save to Redis

↓

Return Products
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/intern-ecommerce.git
```

```bash
cd intern-ecommerce
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
pnpm install
```

---

Create `.env`

```env
DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_EXPIRES_IN=7d

MAIL_HOST=smtp.gmail.com

MAIL_PORT=587

MAIL_USER=

MAIL_PASS=

MAIL_FROM=

FRONTEND_URL=http://localhost:3000

REDIS_HOST=localhost

REDIS_PORT=6379

REDIS_TTL=300
```

---

Run Docker

```bash
docker compose up -d
```

---

Generate Prisma Client

```bash
pnpm prisma generate
```

---

Run Migrations

```bash
pnpm prisma migrate dev
```

---

Start Backend

```bash
pnpm start:dev
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
pnpm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run

```bash
pnpm dev
```

---

# Running the Project

Backend

```
http://localhost:5000
```

Frontend

```
http://localhost:3000
```

---

# API Endpoints

## Auth

```
POST /auth/register

POST /auth/login

POST /auth/forgot-password

POST /auth/reset-password

GET /auth/me
```

---

## Products

```
GET /products

GET /products/:id

GET /products/suggestions
```

---

## Cart

```
GET /cart

POST /cart

PATCH /cart/:productId

DELETE /cart/:productId

DELETE /cart
```

---

## Orders

```
POST /orders

GET /orders

GET /orders/:id
```

---

# Redis

Product list is cached with TTL.

```
GET Products

↓

Redis

↓

Cache Hit

↓

Return

------------------

Cache Miss

↓

Database

↓

Redis SET

↓

Return
```

---

# Unit Testing

Run all tests

```bash
pnpm test
```

Coverage

```bash
pnpm test:cov
```

Watch Mode

```bash
pnpm test:watch
```

---

# Future Improvements

- Admin Dashboard
- Product Management
- Payment Gateway
- Image Upload
- Wishlist
- Reviews & Ratings
- Coupons
- Inventory Management
- Role-Based Authorization
- CI/CD Pipeline
- Kubernetes Deployment
- AWS Deployment

---

# Screenshots

## Login

_Add Screenshot_

## Products

_Add Screenshot_

## Cart

_Add Screenshot_

## Orders

_Add Screenshot_

---

# Author

**Krishna Naik**

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://linkedin.com/in/YOUR_PROFILE

---

# License

This project is licensed under the MIT License.