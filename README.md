

---

# 🛍️ Evara — React eCommerce App

Evara is a modern, full-featured eCommerce web application built with **React + Redux Toolkit**, powered by the **DummyJSON API**. It provides a complete shopping experience for users along with a functional admin dashboard.

---

## 🚀 Live Demo

👉 [https://evara-react-ecommerce-web-app.vercel.app/]([https://evara-react-ecommerce-web-app.vercel.app/](https://evara-react-ecommerce-web-pjjebi3f7-khushidesaiiiiis-projects.vercel.app/))

---

## ✨ Features

### 👤 User Features

* 🔐 Authentication (Login / Signup)
* 🏠 Browse products by category
* 🔎 Search, sort, and filter products
* ❤️ Wishlist management
* 🛒 Add to cart with quantity controls
* 📦 Checkout with shipping address
* 🧾 Invoice / Receipt generation
* 📜 Order history
* 📱 Responsive design

---

### 🛠️ Admin Features

* 📊 Admin dashboard with analytics charts
* 👥 Manage users (add / edit / delete)
* 🏷️ Manage product categories
* 🛍️ Manage products (add / edit / delete)
* 📦 View and manage orders

---

### 🔒 Security & Access

* 🔐 Role-based protected routes
* 👤 Separate access for Admin and User

---

## 🧠 Core Functionality

* Redux Toolkit for global state management
* Persistent storage using LocalStorage
* DummyJSON API integration
* Dynamic filtering and sorting
* Wishlist & cart synchronization per user
* Modern UI with custom theme

---

## 🧱 Tech Stack

### Frontend

* ⚛️ React
* 🧠 Redux Toolkit
* 🧭 React Router
* 🎨 CSS / Custom UI Theme
* 📊 Chart.js
* 🧩 Reactstrap (Bootstrap components)
* 🔔 React Toastify
* 🎯 React Icons

### Backend (Mock API)

* 🧪 DummyJSON API

---

## 📂 Project Structure

```
src/
│
├── components/   # Reusable UI components
├── pages/        # Page-level components
├── store/        # Redux slices
├── utils/        # Local storage helpers
├── UI/           # Custom UI elements
├── assets/       # Images & styles
└── App.jsx
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/khushidesaiiiii/evara-react-ecommerce.git
cd evara-react-ecommerce
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Run the development server

```bash
npm run dev
```

---

## 🔑 Demo Credentials (DummyJSON)

You can use any DummyJSON test users.

### 👨‍💼 Admin

```
Username: emilys
Password: emilyspass
```

### 👤 User

```
Username: chloem
Password: chloempass
```

---

## 🧾 Invoice & Orders

After checkout, users receive:

* Order confirmation
* Invoice view
* Saved order history
* Persistent storage per user

---

## 🔐 Role-Based Access

| Role  | Access                                    |
| ----- | ----------------------------------------- |
| User  | Shop, Cart, Wishlist, Orders              |
| Admin | Dashboard, Manage Users, Products, Orders |

---

## 📦 API Used

DummyJSON eCommerce API

👉 [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)

---

# 🔄 CI/CD Documentation

## 📌 CI/CD Overview

This project implements **Continuous Integration using GitHub Actions** and **Continuous Deployment using Vercel**.

Whenever code is pushed to specific branches, GitHub Actions automatically builds the application. Vercel then deploys the latest version to the appropriate environment.

This follows the principle:

```
Write Once → Deploy Everywhere
```

---

## 🏗️ CI/CD Architecture

```
Developer → GitHub Repository → GitHub Actions (Build) → Vercel (Deploy) → End Users
```

---

## 🌿 Branch Strategy

| Branch  | Environment | Purpose                   |
| ------- | ----------- | ------------------------- |
| dev     | Development | Feature testing           |
| staging | Staging     | Pre-production validation |
| main    | Production  | Live application          |

Each branch triggers automated build via GitHub Actions and deployment via Vercel.

---

## ⚙️ GitHub Actions Workflow

This project uses the following CI workflow:

```yaml
name: Build Vite App

on:
  push:
    branches:
      - dev
      - staging
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Build DEV
        if: github.ref == 'refs/heads/dev'
        run: npm run build

      - name: Build STAGING
        if: github.ref == 'refs/heads/staging'
        run: npm run build -- --mode staging

      - name: Build PRODUCTION
        if: github.ref == 'refs/heads/main'
        run: npm run build
```

---

## 🚀 Deployment Process

1. Developer pushes code to a branch.
2. GitHub Actions runs automated build.
3. If build succeeds, Vercel automatically deploys the branch.
4. Application is updated on the respective environment URL.

No manual deployment is required.

---

## 🌍 Environment Mapping in Vercel

| Git Branch | Vercel Environment    |
| ---------- | --------------------- |
| dev        | Preview Deployment    |
| staging    | Preview Deployment    |
| main       | Production Deployment |

Environment variables are managed securely in Vercel dashboard.

---

## 🔐 Environment Variables

Production secrets and configuration are handled using Vercel Environment Variables.

Examples:

* VITE_API_URL
* VITE_ENV

Local `.env` files are used only for development.

---

## 🎯 Future Improvements

* 💳 Real payment integration
* 🌐 Backend with database
* 📧 Email notifications
* ⭐ Product reviews & ratings
* 🧾 PDF invoice download
* 🔍 Advanced search with suggestions
* 🌓 Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Khushi Desai**

GitHub: [https://github.com/khushidesaiiiii](https://github.com/khushidesaiiiii)

---

