# 🛒 Shop Fullstack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

A full-stack, backend-focused application for an online shop built using Node.js, Express, and EJS. The project follows the **MVC (Model-View-Controller)** architecture to maintain clean, scalable, and manageable code.

Currently, the application uses a file-based data system (JSON) for storage, with plans to integrate a relational or NoSQL database in the future.

---

## ✨ Features

### 🛍️ User (Shop)
- **View Products:** Browse through all available products on the main shop page.
- **Product Details:** View specific details for individual products.
- **Shopping Cart:** Add products to the cart, manage quantities, and remove items.
- **Checkout & Orders:** Place orders and view past orders.

### ⚙️ Admin Panel
- **Manage Products:** Add new products with details like name, price, description, and image URL.
- **Edit Products:** Update details of existing products.
- **Delete Products:** Remove products from the store permanently.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Templating Engine:** EJS (Embedded JavaScript)
- **Middleware:** `body-parser` (for parsing form data)
- **Architecture:** MVC (Model, View, Controller)
- **Storage:** File-based JSON storage (e.g., `data/products.json`, `data/cart.json`)

---

## 📁 Project Structure

```text
shop-backend/
├── controllers/    # Contains logic for handling routes (admin.js, shop.js, etc.)
├── models/         # Defines data models and data manipulation methods (product.js, cart.js)
├── routes/         # Defines application routes (admin, shop, products)
├── views/          # EJS templates for the frontend UI
├── data/           # JSON files acting as a mock database
├── public/         # Static files (CSS, client-side JS, images)
├── utils/          # Utility functions and helpers
├── server.js       # Main application entry point
└── package.json    # Project metadata and dependencies
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or download the source code:
   ```bash
   git clone <repository-url>
   cd shop-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

To start the development server with `nodemon` (which auto-restarts the server on file changes):

```bash
npm start
```

The server will start running on `http://localhost:3000`.

---

## 🛣️ Roadmap

- [ ] Integrate a real database (e.g., MySQL via Sequelize, or MongoDB via Mongoose).
- [ ] Implement User Authentication and Authorization.
- [ ] Add form validation and error handling enhancements.
- [ ] Implement image uploads via Multer.

---

## 👨‍💻 Author

**Abdulrahman Ismael**

---

## 📄 License

This project is licensed under the **ISC License**.
