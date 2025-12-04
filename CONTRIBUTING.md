# Contributing to E-Commerce Project

## Quick Setup Guide

### Prerequisites
- **Java 17** or higher
- **Maven 3.6+**
- **Node.js 18+** and npm
- **Git**
- A code editor (VS Code, IntelliJ IDEA, etc.)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-backend
```

### 2. Get Required Configuration Files

**⚠️ Important**: Some files contain sensitive information (credentials, API keys) and are **NOT** included in the repository for security reasons.

**Request these files privately from the project owner:**

#### 📁 Files to Request

**Backend**:
- `backend/src/main/resources/application.yml`

**Frontend**:
- Currently no sensitive frontend files (API connects to localhost:8080)

---

#### 🔧 Setting Up Backend Configuration

Once you receive `application.yml` from the project owner:

1. **Place the file** in this exact location:
   ```
   backend/src/main/resources/application.yml
   ```

2. **Verify it contains**:
   - MongoDB Atlas connection URI
   - Database name
   - JWT secret key
   - Server configuration

3. **Never commit this file** - it's already in `.gitignore`

**Don't have the file?** A template is available at `backend/src/main/resources/application.yml.example` showing the required structure.

---

#### 📋 How to Request Files

Contact the project owner via:
- Email
- Slack/Discord/Teams
- Secure file sharing platform

**What to ask for**: 
> "Hi! I'm setting up the e-commerce project locally. Could you please share the `application.yml` file for the backend? Thanks!"

---

## Running the Project

### Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

**API Documentation**: http://localhost:8080/swagger-ui.html

### Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

Frontend runs on: **http://localhost:4200**

---

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Test your changes locally

### 3. Test Before Committing

**Backend**:
```bash
cd backend
mvn test
mvn spring-boot:run  # Verify it starts
```

**Frontend**:
```bash
cd frontend
npm test
npm start  # Verify it compiles
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
# or
git commit -m "fix: fix your bug description"
```

**Commit message format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Why the change is needed
- Any testing done

---

## Project Structure

```
ecommerce-backend/
├── backend/              # Spring Boot API
│   ├── src/main/java/   # Java source code
│   ├── src/main/resources/  # Config files
│   └── pom.xml          # Maven dependencies
└── frontend/            # Angular app
    ├── src/app/         # Angular components
    └── package.json     # npm dependencies
```

---

## Common Issues

### Backend won't start?
- ✅ Check `application.yml` exists and has correct credentials
- ✅ Ensure MongoDB Atlas is accessible (check IP whitelist)
- ✅ Verify Java 17 is installed: `java -version`

### Frontend errors?
- ✅ Delete `node_modules` and run `npm install` again
- ✅ Check if backend is running on port 8080
- ✅ Clear browser cache

### Can't connect to MongoDB?
- ✅ Ask project owner to whitelist your IP in MongoDB Atlas
- ✅ Verify the connection URI is correct

---

## Need Help?

- 📚 Check `README.md` in backend/frontend folders
- 🔍 Review existing code for examples
- 💬 Ask questions in the team chat
- 📖 API documentation: http://localhost:8080/swagger-ui.html (when backend is running)

---

## Important Notes

⚠️ **Never commit these files**:
- `backend/src/main/resources/application.yml` ⚠️ **Contains DB credentials & secrets**
- `backend/src/main/resources/application.properties`
- `.env` files
- Any files with passwords, API keys, or tokens

✅ **Always safe to commit**:
- `application.yml.example` (template files)
- Source code files (.java, .ts, .html, etc.)
- Configuration without secrets (pom.xml, package.json)
- Documentation files
- Pull latest changes before starting: `git pull origin main`
- Test your changes locally
- Write clear commit messages
- Keep PRs focused on one feature/fix
