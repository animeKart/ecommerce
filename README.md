# E-Commerce Backend MVP

A fully-featured e-commerce backend built with **Spring Boot 3** and **MongoDB**, providing REST APIs for product management, user authentication, shopping cart, and order processing.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Customer, Admin)
  - Secure password hashing with BCrypt

- **Product Management**
  - CRUD operations for products
  - Search and filter by name, category, price range
  - Pagination support
  - Admin-only product creation/update/deletion

- **Shopping Cart**
  - Add/remove/update items
  - Automatic total calculation
  - One cart per user

- **Order Management**
  - Create orders from cart
  - Stock validation and deduction
  - Order status tracking
  - Order history retrieval

## 📋 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **MongoDB 4.4+** (running locally or remotely)
- **Git** (for cloning the repository)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-backend
```

### 2. Configure MongoDB

Make sure MongoDB is running on your machine. Default connection:
- **URI**: `mongodb://localhost:27017/ecommerce`
- **Database**: `ecommerce`

To modify the MongoDB connection, edit `src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/ecommerce
      database: ecommerce
```

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register a New User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }
}
```

#### Get User Profile (Authenticated)
```http
GET /users/profile
Authorization: Bearer <JWT_TOKEN>
```

#### Update User Profile (Authenticated)
```http
PUT /users/profile
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

---

### Product Endpoints

#### Get All Products
```http
GET /products?page=0&size=10
```

#### Get Product by ID
```http
GET /products/{id}
```

#### Search Products
```http
GET /products/search?q=laptop&page=0&size=10
```

#### Filter by Category
```http
GET /products/category/{category}?page=0&size=10
```

#### Filter by Price Range
```http
GET /products/price-range?minPrice=100&maxPrice=500&page=0&size=10
```

#### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stockQuantity": 50,
  "imageUrl": "https://example.com/laptop.jpg"
}
```

#### Update Product (Admin Only)
```http
PUT /products/{id}
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "price": 899.99,
  "stockQuantity": 45
}
```

#### Delete Product (Admin Only)
```http
DELETE /products/{id}
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

---

### Cart Endpoints (All Require Authentication)

#### Get User's Cart
```http
GET /cart
Authorization: Bearer <JWT_TOKEN>
```

#### Add Item to Cart
```http
POST /cart/items
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "productId": "product123",
  "quantity": 2
}
```

#### Update Cart Item Quantity
```http
PUT /cart/items/{productId}
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Remove Item from Cart
```http
DELETE /cart/items/{productId}
Authorization: Bearer <JWT_TOKEN>
```

#### Clear Cart
```http
DELETE /cart
Authorization: Bearer <JWT_TOKEN>
```

---

### Order Endpoints (All Require Authentication)

#### Create Order
```http
POST /orders
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Note:** Order is created from the user's current cart.

#### Get User's Orders
```http
GET /orders
Authorization: Bearer <JWT_TOKEN>
```

#### Get Order by ID
```http
GET /orders/{id}
Authorization: Bearer <JWT_TOKEN>
```

#### Update Order Status (Admin Only)
```http
PUT /orders/{id}/status?status=SHIPPED
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

**Order Status Values:**
- `PENDING`
- `CONFIRMED`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

#### Get All Orders (Admin Only)
```http
GET /orders/all
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

---

## 🔑 Creating an Admin User

By default, all registered users have the `CUSTOMER` role. To create an admin user, you'll need to manually update a user in MongoDB:

1. Connect to MongoDB:
```bash
mongosh
```

2. Switch to the ecommerce database:
```javascript
use ecommerce
```

3. Update a user's role:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "ADMIN" } }
)
```

## 🏗️ Project Structure

```
ecommerce-backend/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/
│   │   │   ├── EcommerceApplication.java
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── CartController.java
│   │   │   │   └── OrderController.java
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── LoginResponse.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── OrderRequest.java
│   │   │   │   ├── AddToCartRequest.java
│   │   │   │   ├── UpdateCartItemRequest.java
│   │   │   │   └── ApiResponse.java
│   │   │   ├── exception/
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   ├── InsufficientStockException.java
│   │   │   │   ├── DuplicateResourceException.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── model/
│   │   │   │   ├── Product.java
│   │   │   │   ├── User.java
│   │   │   │   ├── Order.java
│   │   │   │   ├── Cart.java
│   │   │   │   ├── OrderItem.java
│   │   │   │   ├── CartItem.java
│   │   │   │   ├── Address.java
│   │   │   │   ├── UserRole.java
│   │   │   │   └── OrderStatus.java
│   │   │   ├── repository/
│   │   │   │   ├── ProductRepository.java
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── OrderRepository.java
│   │   │   │   └── CartRepository.java
│   │   │   ├── security/
│   │   │   │   ├── JwtUtil.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── CustomUserDetailsService.java
│   │   │   └── service/
│   │   │       ├── ProductService.java
│   │   │       ├── UserService.java
│   │   │       ├── OrderService.java
│   │   │       └── CartService.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
├── pom.xml
└── README.md
```

## 🧪 Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test manually
- **cURL**: Use command-line requests
- **REST Client**: VS Code extension or similar tools

### Example cURL Request:

```bash
# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## ⚙️ Configuration

### JWT Settings
Edit `application.yml` to change JWT settings:
```yaml
jwt:
  secret: your-secret-key-here  # Base64 encoded
  expiration: 86400000  # 24 hours in milliseconds
```

### CORS Configuration
The application allows CORS from:
- `http://localhost:3000` (React default)
- `http://localhost:4200` (Angular default)

To add more origins, edit `SecurityConfig.java`:
```java
configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:4200", "your-origin-here"));
```

## 🐛 Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

Common HTTP status codes:
- **200 OK**: Success
- **201 Created**: Resource created
- **400 Bad Request**: Validation error
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate resource
- **500 Internal Server Error**: Server error

## 📝 Notes

- All passwords are hashed using BCrypt
- JWT tokens expire after 24 hours by default
- Stock is automatically deducted when an order is created
- Cart is cleared after successful order creation
- Products require valid stock quantity for orders

## 🚀 Next Steps

- Add unit and integration tests
- Implement payment gateway integration
- Add email notifications for orders
- Implement product reviews and ratings
- Add wishlist functionality
- Implement advanced search with filters
- Add file upload for product images
- Deploy to cloud (AWS, Azure, or GCP)

## 📄 License

This project is open-source and available under the MIT License.

## 👤 Author

Created as part of an E-Commerce MVP Backend project.

---

**Happy Coding! 🎉**
