# E-Commerce Backend API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:8080`  
**Database:** MongoDB Atlas

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Response Format](#response-format)
3. [Auth Endpoints](#auth-endpoints)
4. [User Endpoints](#user-endpoints)
5. [Product Endpoints](#product-endpoints)
6. [Cart Endpoints](#cart-endpoints)
7. [Order Endpoints](#order-endpoints)
8. [Error Handling](#error-handling)
9. [Data Models](#data-models)

---

## 🔐 Authentication

This API uses **JWT (JSON Web Token)** for authentication.

### How to Authenticate

1. **Register** or **Login** to get a JWT token
2. Include the token in the `Authorization` header for protected endpoints

**Header Format:**
```http
Authorization: Bearer <your-jwt-token>
```

**Example:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Protected Endpoints

- All `/api/users/*` endpoints require authentication
- All `/api/cart/*` endpoints require authentication
- All `/api/orders/*` endpoints require authentication
- Some product endpoints (create, update, delete) require **ADMIN** role

---

## 📦 Response Format

All API responses follow this standard format:

**Success Response:**
```json
{
  "success": true,
  "message": "Success" | "Custom success message",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

**Paginated Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "content": [ /* array of items */ ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "offset": 0
    },
    "totalElements": 100,
    "totalPages": 10,
    "size": 10,
    "number": 0,
    "first": true,
    "last": false,
    "empty": false
  }
}
```

---

## 🔑 Auth Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`  
**Authentication:** Not required  
**Description:** Create a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Validation Rules:**
- `email`: Required, must be valid email format
- `password`: Required, minimum 6 characters
- `firstName`: Required, cannot be blank
- `lastName`: Required, cannot be blank

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER",
    "createdAt": "2024-12-02T08:30:00"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Email already exists",
  "data": null
}
```

---

### 2. Login

**Endpoint:** `POST /api/auth/login`  
**Authentication:** Not required  
**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, must be valid email format
- `password`: Required, cannot be blank

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk5MjgwMDAwLCJleHAiOjE2OTkzNjY0MDB9.xxx",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }
}
```

**Token Expiration:** 24 hours (86400000 milliseconds)

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid credentials",
  "data": null
}
```

---

## 👤 User Endpoints

### 1. Get User Profile

**Endpoint:** `GET /api/users/profile`  
**Authentication:** Required  
**Description:** Get current authenticated user's profile

**Request Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER",
    "createdAt": "2024-12-02T08:30:00"
  }
}
```

---

### 2. Update User Profile

**Endpoint:** `PUT /api/users/profile`  
**Authentication:** Required  
**Description:** Update current user's profile information

**Request Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Note:** You can update any user fields except `id`, `email`, `password`, and `role` through this endpoint.

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "CUSTOMER",
    "createdAt": "2024-12-02T08:30:00"
  }
}
```

---

## 🛍️ Product Endpoints

### 1. Get All Products (Paginated)

**Endpoint:** `GET /api/products`  
**Authentication:** Not required  
**Description:** Get all products with pagination

**Query Parameters:**
- `page` (optional): Page number, default: `0`
- `size` (optional): Items per page, default: `10`

**Example Request:**
```http
GET /api/products?page=0&size=10
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "content": [
      {
        "id": "prod123",
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse with USB receiver",
        "price": 29.99,
        "category": "Electronics",
        "stockQuantity": 150,
        "imageUrl": "https://example.com/images/mouse.jpg",
        "createdAt": "2024-12-01T10:00:00",
        "updatedAt": "2024-12-01T10:00:00"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10
    },
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true,
    "empty": false
  }
}
```

---

### 2. Get Product by ID

**Endpoint:** `GET /api/products/{id}`  
**Authentication:** Not required  
**Description:** Get a single product by its ID

**Path Parameters:**
- `id`: Product ID (MongoDB ObjectId)

**Example Request:**
```http
GET /api/products/prod123
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "prod123",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "price": 29.99,
    "category": "Electronics",
    "stockQuantity": 150,
    "imageUrl": "https://example.com/images/mouse.jpg",
    "createdAt": "2024-12-01T10:00:00",
    "updatedAt": "2024-12-01T10:00:00"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Product not found",
  "data": null
}
```

---

### 3. Search Products

**Endpoint:** `GET /api/products/search`  
**Authentication:** Not required  
**Description:** Search products by name or description

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number, default: `0`
- `size` (optional): Items per page, default: `10`

**Example Request:**
```http
GET /api/products/search?q=wireless&page=0&size=10
```

**Success Response:** `200 OK` (same format as Get All Products)

---

### 4. Get Products by Category

**Endpoint:** `GET /api/products/category/{category}`  
**Authentication:** Not required  
**Description:** Get all products in a specific category

**Path Parameters:**
- `category`: Category name (e.g., "Electronics", "Clothing")

**Query Parameters:**
- `page` (optional): Page number, default: `0`
- `size` (optional): Items per page, default: `10`

**Example Request:**
```http
GET /api/products/category/Electronics?page=0&size=10
```

**Success Response:** `200 OK` (same format as Get All Products)

---

### 5. Get Products by Price Range

**Endpoint:** `GET /api/products/price-range`  
**Authentication:** Not required  
**Description:** Get products within a price range

**Query Parameters:**
- `minPrice` (required): Minimum price
- `maxPrice` (required): Maximum price
- `page` (optional): Page number, default: `0`
- `size` (optional): Items per page, default: `10`

**Example Request:**
```http
GET /api/products/price-range?minPrice=10&maxPrice=100&page=0&size=10
```

**Success Response:** `200 OK` (same format as Get All Products)

---

### 6. Create Product (Admin Only)

**Endpoint:** `POST /api/products`  
**Authentication:** Required (ADMIN role)  
**Description:** Create a new product

**Request Headers:**
```http
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Wireless Keyboard",
  "description": "Mechanical keyboard with RGB lighting",
  "price": 79.99,
  "category": "Electronics",
  "stockQuantity": 50,
  "imageUrl": "https://example.com/images/keyboard.jpg"
}
```

**Validation Rules:**
- `name`: Required, cannot be blank
- `price`: Required, must be positive
- `stockQuantity`: Required, cannot be negative

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "prod456",
    "name": "Wireless Keyboard",
    "description": "Mechanical keyboard with RGB lighting",
    "price": 79.99,
    "category": "Electronics",
    "stockQuantity": 50,
    "imageUrl": "https://example.com/images/keyboard.jpg",
    "createdAt": "2024-12-02T09:00:00",
    "updatedAt": "2024-12-02T09:00:00"
  }
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Access denied",
  "data": null
}
```

---

### 7. Update Product (Admin Only)

**Endpoint:** `PUT /api/products/{id}`  
**Authentication:** Required (ADMIN role)  
**Description:** Update an existing product

**Request Headers:**
```http
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
```

**Path Parameters:**
- `id`: Product ID

**Request Body:**
```json
{
  "name": "Wireless Keyboard Pro",
  "price": 89.99,
  "stockQuantity": 75
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "prod456",
    "name": "Wireless Keyboard Pro",
    "description": "Mechanical keyboard with RGB lighting",
    "price": 89.99,
    "category": "Electronics",
    "stockQuantity": 75,
    "imageUrl": "https://example.com/images/keyboard.jpg",
    "createdAt": "2024-12-02T09:00:00",
    "updatedAt": "2024-12-02T09:30:00"
  }
}
```

---

### 8. Delete Product (Admin Only)

**Endpoint:** `DELETE /api/products/{id}`  
**Authentication:** Required (ADMIN role)  
**Description:** Delete a product

**Request Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `id`: Product ID

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

---

## 🛒 Cart Endpoints

### 1. Get User's Cart

**Endpoint:** `GET /api/cart`  
**Authentication:** Required  
**Description:** Get current user's shopping cart

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "cart123",
    "userId": "user123",
    "items": [
      {
        "productId": "prod123",
        "productName": "Wireless Mouse",
        "quantity": 2,
        "price": 29.99,
        "subtotal": 59.98
      },
      {
        "productId": "prod456",
        "productName": "Wireless Keyboard",
        "quantity": 1,
        "price": 79.99,
        "subtotal": 79.99
      }
    ],
    "totalAmount": 139.97,
    "updatedAt": "2024-12-02T10:00:00"
  }
}
```

---

### 2. Add Item to Cart

**Endpoint:** `POST /api/cart/items`  
**Authentication:** Required  
**Description:** Add a product to the cart or update quantity if already exists

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "prod123",
  "quantity": 2
}
```

**Validation Rules:**
- `productId`: Required, cannot be blank
- `quantity`: Required, must be positive integer

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "id": "cart123",
    "userId": "user123",
    "items": [
      {
        "productId": "prod123",
        "productName": "Wireless Mouse",
        "quantity": 2,
        "price": 29.99,
        "subtotal": 59.98
      }
    ],
    "totalAmount": 59.98,
    "updatedAt": "2024-12-02T10:00:00"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Product not found",
  "data": null
}
```

---

### 3. Update Cart Item Quantity

**Endpoint:** `PUT /api/cart/items/{productId}`  
**Authentication:** Required  
**Description:** Update the quantity of an item in the cart

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Path Parameters:**
- `productId`: Product ID

**Request Body:**
```json
{
  "quantity": 5
}
```

**Validation Rules:**
- `quantity`: Required, must be positive integer

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Cart item updated",
  "data": {
    "id": "cart123",
    "userId": "user123",
    "items": [
      {
        "productId": "prod123",
        "productName": "Wireless Mouse",
        "quantity": 5,
        "price": 29.99,
        "subtotal": 149.95
      }
    ],
    "totalAmount": 149.95,
    "updatedAt": "2024-12-02T10:15:00"
  }
}
```

---

### 4. Remove Item from Cart

**Endpoint:** `DELETE /api/cart/items/{productId}`  
**Authentication:** Required  
**Description:** Remove a specific item from the cart

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
```

**Path Parameters:**
- `productId`: Product ID to remove

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": {
    "id": "cart123",
    "userId": "user123",
    "items": [],
    "totalAmount": 0.0,
    "updatedAt": "2024-12-02T10:20:00"
  }
}
```

---

### 5. Clear Cart

**Endpoint:** `DELETE /api/cart`  
**Authentication:** Required  
**Description:** Remove all items from the cart

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Cart cleared",
  "data": null
}
```

---

## 📦 Order Endpoints

### 1. Create Order

**Endpoint:** `POST /api/orders`  
**Authentication:** Required  
**Description:** Create an order from the current cart items

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
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

**Validation Rules:**
- `shippingAddress`: Required, all fields must be present

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "order123",
    "userId": "user123",
    "items": [
      {
        "productId": "prod123",
        "productName": "Wireless Mouse",
        "quantity": 2,
        "price": 29.99,
        "subtotal": 59.98
      }
    ],
    "totalAmount": 59.98,
    "status": "PENDING",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "createdAt": "2024-12-02T11:00:00",
    "updatedAt": "2024-12-02T11:00:00"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Cart is empty",
  "data": null
}
```

---

### 2. Get User Orders

**Endpoint:** `GET /api/orders`  
**Authentication:** Required  
**Description:** Get all orders for the current user

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "order123",
      "userId": "user123",
      "items": [
        {
          "productId": "prod123",
          "productName": "Wireless Mouse",
          "quantity": 2,
          "price": 29.99,
          "subtotal": 59.98
        }
      ],
      "totalAmount": 59.98,
      "status": "PENDING",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "createdAt": "2024-12-02T11:00:00",
      "updatedAt": "2024-12-02T11:00:00"
    }
  ]
}
```

---

### 3. Get Order by ID

**Endpoint:** `GET /api/orders/{id}`  
**Authentication:** Required  
**Description:** Get a specific order by ID (users can only access their own orders)

**Request Headers:**
```http
Authorization: Bearer <jwt-token>
```

**Path Parameters:**
- `id`: Order ID

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "order123",
    "userId": "user123",
    "items": [
      {
        "productId": "prod123",
        "productName": "Wireless Mouse",
        "quantity": 2,
        "price": 29.99,
        "subtotal": 59.98
      }
    ],
    "totalAmount": 59.98,
    "status": "PENDING",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "createdAt": "2024-12-02T11:00:00",
    "updatedAt": "2024-12-02T11:00:00"
  }
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Access denied",
  "data": null
}
```

---

### 4. Update Order Status (Admin Only)

**Endpoint:** `PUT /api/orders/{id}/status`  
**Authentication:** Required (ADMIN role)  
**Description:** Update the status of an order

**Request Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `id`: Order ID

**Query Parameters:**
- `status`: New order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)

**Example Request:**
```http
PUT /api/orders/order123/status?status=SHIPPED
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "id": "order123",
    "userId": "user123",
    "items": [...],
    "totalAmount": 59.98,
    "status": "SHIPPED",
    "shippingAddress": {...},
    "createdAt": "2024-12-02T11:00:00",
    "updatedAt": "2024-12-02T12:00:00"
  }
}
```

**Valid Order Statuses:**
- `PENDING`: Order placed, awaiting processing
- `PROCESSING`: Order is being prepared
- `SHIPPED`: Order has been shipped
- `DELIVERED`: Order delivered to customer
- `CANCELLED`: Order cancelled

---

### 5. Get All Orders (Admin Only)

**Endpoint:** `GET /api/orders/all`  
**Authentication:** Required (ADMIN role)  
**Description:** Get all orders from all users

**Request Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "order123",
      "userId": "user123",
      "items": [...],
      "totalAmount": 59.98,
      "status": "PENDING",
      "shippingAddress": {...},
      "createdAt": "2024-12-02T11:00:00",
      "updatedAt": "2024-12-02T11:00:00"
    },
    {
      "id": "order124",
      "userId": "user456",
      "items": [...],
      "totalAmount": 129.99,
      "status": "SHIPPED",
      "shippingAddress": {...},
      "createdAt": "2024-12-02T10:00:00",
      "updatedAt": "2024-12-02T11:30:00"
    }
  ]
}
```

---

## ❌ Error Handling

### HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data or validation error
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Authenticated but not authorized (e.g., not ADMIN)
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

### Common Error Responses

**Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed: Email should be valid, Password must be at least 6 characters long",
  "data": null
}
```

**Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token",
  "data": null
}
```

**Forbidden:**
```json
{
  "success": false,
  "message": "Access denied - Admin role required",
  "data": null
}
```

**Not Found:**
```json
{
  "success": false,
  "message": "Product not found with id: prod999",
  "data": null
}
```

---

## 📊 Data Models

### User
```typescript
{
  id: string;                 // MongoDB ObjectId
  email: string;              // Unique email
  firstName: string;
  lastName: string;
  role: "CUSTOMER" | "ADMIN"; // User role
  createdAt: string;          // ISO 8601 DateTime
}
```

### Product
```typescript
{
  id: string;                 // MongoDB ObjectId
  name: string;
  description: string;
  price: number;              // Decimal value
  category: string;
  stockQuantity: number;      // Integer
  imageUrl: string;
  createdAt: string;          // ISO 8601 DateTime
  updatedAt: string;          // ISO 8601 DateTime
}
```

### Cart
```typescript
{
  id: string;                 // MongoDB ObjectId
  userId: string;             // Reference to User
  items: CartItem[];
  totalAmount: number;        // Calculated total
  updatedAt: string;          // ISO 8601 DateTime
}
```

### CartItem
```typescript
{
  productId: string;          // Reference to Product
  productName: string;
  quantity: number;           // Integer
  price: number;              // Product price at time of adding
  subtotal: number;           // Calculated: quantity * price
}
```

### Order
```typescript
{
  id: string;                 // MongoDB ObjectId
  userId: string;             // Reference to User
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;          // ISO 8601 DateTime
  updatedAt: string;          // ISO 8601 DateTime
}
```

### OrderItem
```typescript
{
  productId: string;          // Reference to Product
  productName: string;
  quantity: number;
  price: number;              // Product price at time of order
  subtotal: number;           // Calculated: quantity * price
}
```

### Address
```typescript
{
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

### OrderStatus
```typescript
enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}
```

---

## 🧪 Testing Examples

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Products:**
```bash
curl http://localhost:8080/api/products
```

**Add to Cart (with auth):**
```bash
curl -X POST http://localhost:8080/api/cart/items \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod123",
    "quantity": 2
  }'
```

### Using JavaScript (Fetch API)

**Login and Save Token:**
```javascript
const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
});

const loginData = await loginResponse.json();
const token = loginData.data.token;

// Save token to localStorage
localStorage.setItem('authToken', token);
```

**Get Products with Pagination:**
```javascript
const response = await fetch('http://localhost:8080/api/products?page=0&size=10');
const data = await response.json();
console.log(data.data.content); // Array of products
```

**Add to Cart (Authenticated):**
```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('http://localhost:8080/api/cart/items', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    productId: 'prod123',
    quantity: 2
  })
});

const data = await response.json();
console.log(data.data); // Updated cart
```

**Create Order:**
```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('http://localhost:8080/api/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  })
});

const data = await response.json();
console.log(data.data); // Created order
```

---

## 📝 Notes for Frontend Team

1. **Token Management:**
   - Store the JWT token securely (localStorage or sessionStorage)
   - Include token in all authenticated requests
   - Token expires after 24 hours - implement refresh or re-login

2. **Error Handling:**
   - Always check the `success` field in responses
   - Display `message` field to users for errors
   - Handle 401 errors by redirecting to login

3. **Pagination:**
   - Products endpoints return paginated data
   - Use `page` and `size` query parameters
   - Check `totalPages` and `totalElements` for UI pagination controls

4. **Cart Flow:**
   - Get cart → Display items
   - Add/Update/Remove items → Update UI with returned cart
   - Checkout → Create order with shipping address

5. **Admin Features:**
   - Check user role after login (`data.role`)
   - Show/hide admin features based on role
   - Admin can: create/update/delete products, view all orders, update order status

6. **Date/Time:**
   - All timestamps are in ISO 8601 format
   - Convert to local time in the frontend

7. **CORS:**
   - CORS is enabled for all origins in development
   - Ensure backend allows your frontend origin

---

## 🔗 Useful Links

- **Base URL:** `http://localhost:8080`
- **Database:** MongoDB Atlas (animekartcoin_db)
- **Authentication:** JWT (24h expiration)

---

**Last Updated:** December 2, 2024  
**API Version:** 1.0.0
