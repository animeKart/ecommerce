# Git Operations Guide

Complete guide for managing Git operations in the E-Commerce monorepo project.

---

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Common Workflow](#common-workflow)
3. [Scenario 1: Backend Changes Only](#scenario-1-backend-changes-only)
4. [Scenario 2: Frontend Changes Only](#scenario-2-frontend-changes-only)
5. [Scenario 3: Both Backend & Frontend Changes](#scenario-3-both-backend--frontend-changes)
6. [Branch Management](#branch-management)
7. [Useful Git Commands](#useful-git-commands)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Initial Setup

### First Time Setup (Only Once)

If you're cloning the repository for the first time:

```bash
# Clone the repository
git clone https://github.com/animeKart/ecommerce.git

# Navigate to project directory
cd ecommerce

# Configure your Git identity (if not already done)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Check Your Current Status

Before making any changes, always check your current branch and status:

```bash
# Check which branch you're on
git branch

# Check status of your files
git status
```

---

## 🔄 Common Workflow

Every time you want to push changes, follow this pattern:

1. **Check status** → `git status`
2. **Stage changes** → `git add .` or specific files
3. **Commit changes** → `git commit -m "message"`
4. **Push to GitHub** → `git push origin main`

---

## 📦 Scenario 1: Backend Changes Only

You made changes to files in the `backend/` folder (e.g., Java files, controllers, services, configuration).

### Step-by-Step:

#### 1. Navigate to the Project Root
```bash
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend
```

#### 2. Check What Changed
```bash
git status
```

**Example Output:**
```
On branch main
Changes not staged for commit:
  modified:   backend/src/main/java/com/ecommerce/controller/ProductController.java
  modified:   backend/src/main/resources/application.yml
```

#### 3. Stage Backend Changes Only
```bash
# Option A: Stage all backend changes
git add backend/

# Option B: Stage specific files
git add backend/src/main/java/com/ecommerce/controller/ProductController.java
git add backend/src/main/resources/application.yml
```

#### 4. Commit with Descriptive Message
```bash
git commit -m "Backend: Add new product filtering endpoint"
```

**Good Commit Message Examples:**
- `"Backend: Fix user authentication bug"`
- `"Backend: Add MongoDB Atlas connection"`
- `"Backend: Update product validation logic"`
- `"Backend: Add new order status endpoint"`

#### 5. Push to GitHub
```bash
git push origin main
```

#### 6. Verify on GitHub
Visit: `https://github.com/animeKart/ecommerce/commits/main`

---

### Complete Example - Backend Only

```bash
# 1. Navigate to project
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend

# 2. Check status
git status

# 3. Stage backend changes
git add backend/

# 4. Commit changes
git commit -m "Backend: Add price range filter for products"

# 5. Push to GitHub
git push origin main
```

---

## 🎨 Scenario 2: Frontend Changes Only

You made changes to files in the `frontend/` folder (e.g., TypeScript files, components, services, HTML, CSS).

### Step-by-Step:

#### 1. Navigate to the Project Root
```bash
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend
```

#### 2. Check What Changed
```bash
git status
```

**Example Output:**
```
On branch main
Changes not staged for commit:
  modified:   frontend/src/app/components/product-list/product-list.component.ts
  modified:   frontend/src/app/services/product.service.ts
  new file:   frontend/src/app/components/cart-icon/cart-icon.component.ts
```

#### 3. Stage Frontend Changes Only
```bash
# Option A: Stage all frontend changes
git add frontend/

# Option B: Stage specific files
git add frontend/src/app/components/product-list/product-list.component.ts
git add frontend/src/app/services/product.service.ts
```

#### 4. Commit with Descriptive Message
```bash
git commit -m "Frontend: Add shopping cart icon component"
```

**Good Commit Message Examples:**
- `"Frontend: Update product display layout"`
- `"Frontend: Fix login form validation"`
- `"Frontend: Add loading spinner to product list"`
- `"Frontend: Implement cart functionality"`

#### 5. Push to GitHub
```bash
git push origin main
```

---

### Complete Example - Frontend Only

```bash
# 1. Navigate to project
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend

# 2. Check status
git status

# 3. Stage frontend changes
git add frontend/

# 4. Commit changes
git commit -m "Frontend: Implement product search functionality"

# 5. Push to GitHub
git push origin main
```

---

## 🔀 Scenario 3: Both Backend & Frontend Changes

You made changes to both `backend/` and `frontend/` folders, and they are related (e.g., adding a new API endpoint and its corresponding UI).

### Step-by-Step:

#### 1. Navigate to the Project Root
```bash
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend
```

#### 2. Check What Changed
```bash
git status
```

**Example Output:**
```
On branch main
Changes not staged for commit:
  modified:   backend/src/main/java/com/ecommerce/controller/OrderController.java
  modified:   backend/src/main/java/com/ecommerce/service/OrderService.java
  modified:   frontend/src/app/services/order.service.ts
  modified:   frontend/src/app/components/order-list/order-list.component.ts
```

#### 3. Stage All Changes
```bash
# Option A: Stage everything
git add .

# Option B: Stage backend and frontend separately (but in same commit)
git add backend/
git add frontend/

# Option C: Stage specific files from both
git add backend/src/main/java/com/ecommerce/controller/OrderController.java
git add frontend/src/app/services/order.service.ts
```

#### 4. Commit with Descriptive Message
```bash
git commit -m "Feature: Add order cancellation functionality (backend + frontend)"
```

**Good Commit Message Examples:**
- `"Feature: Add user profile editing (backend + frontend)"`
- `"Fix: Resolve cart total calculation issue (backend + frontend)"`
- `"Update: Improve order status display (backend + frontend)"`
- `"Feature: Implement product reviews (backend + frontend)"`

#### 5. Push to GitHub
```bash
git push origin main
```

---

### Complete Example - Both Backend & Frontend

```bash
# 1. Navigate to project
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend

# 2. Check status
git status

# 3. Stage all changes
git add .

# 4. Commit changes
git commit -m "Feature: Add order tracking system (backend + frontend)"

# 5. Push to GitHub
git push origin main
```

---

## 🌿 Branch Management

### Working with Branches (Recommended for Teams)

Instead of pushing directly to `main`, create feature branches:

#### Create a New Branch
```bash
# Create and switch to a new branch
git checkout -b feature/add-payment-gateway

# Or create branch for backend only
git checkout -b backend/fix-authentication

# Or create branch for frontend only
git checkout -b frontend/improve-ui
```

#### Work on Your Branch
```bash
# Make changes to files
# ...

# Stage changes
git add .

# Commit changes
git commit -m "Add payment gateway integration"

# Push branch to GitHub
git push origin feature/add-payment-gateway
```

#### Merge Branch to Main
```bash
# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Merge your branch
git merge feature/add-payment-gateway

# Push to GitHub
git push origin main

# Optional: Delete the branch after merging
git branch -d feature/add-payment-gateway
git push origin --delete feature/add-payment-gateway
```

---

## 📝 Useful Git Commands

### Checking Status

```bash
# View current status
git status

# View commit history
git log

# View short commit history
git log --oneline

# View changes before staging
git diff

# View changes after staging
git diff --staged
```

### Staging Files

```bash
# Stage all changes
git add .

# Stage specific folder
git add backend/
git add frontend/

# Stage specific file
git add backend/pom.xml

# Stage multiple specific files
git add backend/pom.xml frontend/package.json
```

### Committing Changes

```bash
# Commit with message
git commit -m "Your message here"

# Commit all tracked files (skip git add)
git commit -a -m "Your message"

# Amend last commit (if you forgot something)
git commit --amend -m "Updated message"
```

### Pushing Changes

```bash
# Push to main branch
git push origin main

# Push current branch
git push

# Force push (use carefully!)
git push -f origin main
```

### Pulling Changes

```bash
# Pull latest changes from GitHub
git pull origin main

# Pull and rebase
git pull --rebase origin main
```

### Viewing Changes

```bash
# See what files changed
git status

# See differences in files
git diff

# See commit history
git log

# See detailed commit history
git log --graph --decorate --all
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- backend/src/main/resources/application.yml

# Unstage files (keep changes)
git reset HEAD backend/pom.xml

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - CAREFUL!
git reset --hard HEAD~1
```

---

## 🆘 Troubleshooting

### Problem: "Your branch is behind 'origin/main'"

**Solution:** Pull the latest changes first
```bash
git pull origin main
```

Then push your changes:
```bash
git push origin main
```

---

### Problem: Merge Conflicts

**When it happens:** Two people edited the same file.

**Solution:**
```bash
# 1. Pull latest changes
git pull origin main

# 2. Git will show conflict markers in files:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>> origin/main

# 3. Edit the files to resolve conflicts

# 4. Stage resolved files
git add .

# 5. Commit the merge
git commit -m "Resolve merge conflicts"

# 6. Push
git push origin main
```

---

### Problem: "fatal: not a git repository"

**Solution:** Make sure you're in the project directory
```bash
cd c:\Users\satya\.gemini\antigravity\scratch\ecommerce-backend
```

---

### Problem: Accidentally committed wrong files

**Solution:** Undo the last commit
```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Re-stage only the files you want
git add backend/specific-file.java

# Commit again
git commit -m "Corrected commit"
```

---

### Problem: Need to discard all local changes

**CAREFUL - This deletes your changes!**
```bash
# Discard all changes
git reset --hard HEAD

# Or pull fresh from GitHub
git fetch origin
git reset --hard origin/main
```

---

## 💡 Best Practices

### 1. **Commit Messages**
- Use clear, descriptive messages
- Start with category: `Backend:`, `Frontend:`, `Feature:`, `Fix:`, `Update:`
- Be specific: ❌ "Fixed bug" → ✅ "Backend: Fix null pointer in user login"

### 2. **Commit Frequency**
- Commit small, logical changes frequently
- Don't commit half-finished features
- Each commit should represent a complete, working change

### 3. **Before Pushing**
- Always run `git status` to check what you're pushing
- Test your changes locally
- Pull latest changes first: `git pull origin main`

### 4. **Branch Naming**
- Use descriptive names: `feature/add-payment`, `fix/login-bug`, `update/readme`
- Use lowercase with hyphens: `feature-name`, not `FeatureName`

### 5. **Pulling Changes**
- Pull frequently to stay updated: `git pull origin main`
- Pull before starting new work
- Pull before pushing your changes

---

## 🎯 Quick Reference

### Daily Workflow

```bash
# Morning: Pull latest changes
git pull origin main

# ... work on your code ...

# Check what changed
git status

# Stage your changes
git add backend/    # or frontend/ or .

# Commit your changes
git commit -m "Backend: Add new feature"

# Push to GitHub
git push origin main
```

---

## 📚 Additional Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Interactive Git Tutorial**: https://learngitbranching.js.org/

---

## 🔗 Repository Information

- **Repository URL**: https://github.com/animeKart/ecommerce
- **Main Branch**: `main`
- **Project Structure**:
  ```
  ecommerce/
  ├── backend/    (Spring Boot)
  └── frontend/   (Angular)
  ```

---

**Last Updated:** December 2, 2024  
**Maintainer:** AnimeKart Team
