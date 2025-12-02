# E-Commerce Application

Full-stack e-commerce application built with Spring Boot (backend) and Angular (frontend).

## 📁 Project Structure

```
ecommerce/
├── backend/          # Spring Boot REST API
└── frontend/         # Angular application
```

## 🚀 Getting Started

### Backend (Spring Boot)

Navigate to the backend directory:
```bash
cd backend
```

Run the application:
```bash
mvn spring-boot:run
```

The backend API will be available at: `http://localhost:8080`

For more details, see [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

### Frontend (Angular)

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm start
```

The frontend will be available at: `http://localhost:4200`

## 📚 Documentation

- **Backend API Documentation**: [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)
- **Maven Commands**: [backend/MAVEN_COMMANDS.md](backend/MAVEN_COMMANDS.md)

## 🛠️ Technologies

### Backend
- Java 20
- Spring Boot 3.2.0
- MongoDB Atlas
- Spring Security with JWT
- Maven

### Frontend
- Angular
- TypeScript
- RxJS

## 🔗 Database

This application uses **MongoDB Atlas** for data storage.

Connection details are configured in `backend/src/main/resources/application.yml`

## 👥 Authors

AnimeKart Team

## 📄 License

This project is licensed under the MIT License.
