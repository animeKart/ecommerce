# Maven Commands Reference

Quick reference for commonly used Maven commands in this Spring Boot project.

## 🚀 Running the Application

### Run Application (Development)
```bash
mvn spring-boot:run
```
Starts the application with hot reload support.

### Run with Skip Tests
```bash
mvn spring-boot:run -DskipTests
```

### Run with Specific Profile
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

---

## 🔨 Building the Project

### Clean & Compile
```bash
mvn clean compile
```
Removes old build files and compiles source code.

### Package Application
```bash
mvn clean package
```
Creates a JAR file in the `target/` directory.

### Install to Local Repository
```bash
mvn clean install
```
Builds and installs the project to your local Maven repository.

### Package without Tests
```bash
mvn clean package -DskipTests
```

---

## 🧪 Testing

### Run All Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=UserServiceTest
```

### Run Tests with Coverage
```bash
mvn clean test
```

### Skip Tests
```bash
mvn install -DskipTests
```

---

## 📦 Dependency Management

### Download Dependencies
```bash
mvn dependency:resolve
```

### Display Dependency Tree
```bash
mvn dependency:tree
```

### Check for Dependency Updates
```bash
mvn versions:display-dependency-updates
```

### Clean Dependencies
```bash
mvn dependency:purge-local-repository
```

---

## 🔍 Analysis & Reporting

### Check for Plugin Updates
```bash
mvn versions:display-plugin-updates
```

### Validate POM
```bash
mvn validate
```

### Generate Project Info
```bash
mvn site
```

---

## 🧹 Cleaning

### Clean Build Directory
```bash
mvn clean
```

### Deep Clean (includes IDE files)
```bash
mvn clean -U
```
The `-U` flag forces update of dependencies.

---

## 🐛 Debugging

### Run with Debug Output
```bash
mvn spring-boot:run -X
```

### Run with Verbose Logging
```bash
mvn spring-boot:run -e
```

### Show Effective POM
```bash
mvn help:effective-pom
```

---

## 📤 Production

### Create Production JAR
```bash
mvn clean package -Pprod
```

### Run Production JAR
```bash
java -jar target/ecommerce-backend-1.0.0.jar
```

### Run JAR with Profile
```bash
java -jar -Dspring.profiles.active=prod target/ecommerce-backend-1.0.0.jar
```

---

## 🎯 Quick Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `mvn clean` | Delete build directory |
| `mvn compile` | Compile source code |
| `mvn test` | Run tests |
| `mvn package` | Create JAR file |
| `mvn install` | Install to local repo |
| `mvn spring-boot:run` | Run application |
| `mvn dependency:tree` | Show dependencies |
| `mvn clean install -DskipTests` | Build without tests |

---

## 💡 Tips

- **First Build**: The first `mvn` command may take time as it downloads dependencies
- **Offline Mode**: Add `-o` flag to work offline (e.g., `mvn -o package`)
- **Parallel Build**: Add `-T 4` to use 4 threads for faster builds
- **Update Snapshots**: Add `-U` to force update of snapshots and releases

---

## 🔗 Project Specific

**Current Project**: ecommerce-backend  
**Java Version**: 17  
**Spring Boot Version**: 3.2.0  
**Default Port**: 8080  
**Database**: MongoDB Atlas
