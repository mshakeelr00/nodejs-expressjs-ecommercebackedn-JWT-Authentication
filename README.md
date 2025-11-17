Node.js + Express.js E-commerce Backend with JWT Authentication

A fully functional backend for an e-commerce application built using Node.js, Express.js, MongoDB, and JWT Authentication.
This project includes user authentication, product management, order handling, and secure role-based access.

🚀 Features
🔐 Authentication & Security

- JWT-based Authentication

- Secure Password Hashing (bcrypt)

- Login / Register APIs

- Role-Based Access (User / Admin)

🛒 E-commerce Functionalities

Product CRUD (Create, Read, Update, Delete)

Category management

Order management

Cart system (if included)

⚙️ Tech Stack

Node.js

Express.js

MongoDB / Mongoose

JWT Authentication

bcrypt

dotenv

MVC Folder Structure

📁 Project Structure
nodejs-expressjs-ecommercebackedn-JWT-Authentication/
│── config/
│── controller/
│── middlewear/
│── routes/
│── index.js
│── package.json
│── .env

🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file

Your .env should include:

PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the server
npm start


Server runs on:

http://localhost:5000

📌 Available APIs
Auth Routes
Method	Endpoint	Description
POST	/api/register	Create a new user
POST	/api/login	Login user & generate JWT token
Product Routes
Method	Endpoint	Description
GET	/api/products	Get all products
POST	/api/products	Create product (Admin only)
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product
Order Routes (if included)
Method	Endpoint	Description
POST	/api/order	Create order
GET	/api/orders	Get user orders
GET	/api/admin/orders	Admin: View all orders
🛡️ Middleware

authMiddleware → Checks JWT Token

adminMiddleware → Verifies admin role

🗄️ Database

Uses MongoDB Atlas or local MongoDB server.

🧪 Testing (Optional)

Use Postman/ThunderClient to test all routes.

🤝 Contributing

Contributions, issues, and feature requests are welcome!
