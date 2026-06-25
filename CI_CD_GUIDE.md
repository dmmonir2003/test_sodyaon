# Beginner-Friendly Guide to GitHub Actions CI/CD

Welcome to your project's CI/CD pipeline! This guide is written specifically for beginners to help you understand what CI/CD is, how it works in your project, and how to use it day-to-day.

---

## 1. What is CI/CD?

*   **CI (Continuous Integration):** Automates the process of testing and building your code every time you make changes. If you write a syntax error or a type bug, the CI pipeline will detect it immediately and warn you before it gets pushed to users.
*   **CD (Continuous Deployment):** Automates deploying your verified code to your production server (like Vercel, Render, or a VPS) so you don't have to copy files manually.

---

## 2. GitHub Actions Concepts

GitHub Actions is a tool built into GitHub that runs code in the cloud when triggers happen. It uses:
*   **Workflow:** A YAML file in `.github/workflows/` (we created `ci-cd.yml`) defining what to run.
*   **Triggers:** Events that start the workflow (e.g. a `push` or `pull_request` to a branch).
*   **Jobs:** Groups of steps that run on a virtual machine in the cloud (called a **Runner**).
*   **Steps:** Individual commands (like `npm run build` or `npm run lint`).

---

## 3. Our Multi-Branch Workflow Strategy

We have configured a three-stage branch pipeline:

```
[development branch]  --> (Push/PR: Verify & Build)
         |
         v
  [testing branch]    --> (Push/PR: Run Lints & Tests)
         |
         v
 [production branch]   --> (Push: Build, Test & Deploy) --> [Live Production App]
```

### 1. `development` Branch (Development stage)
*   **Purpose:** Where you do your day-to-day coding.
*   **CI Behavior:** Every time you push to `development`, GitHub builds both the frontend and backend to make sure everything compiles cleanly and has no TypeScript/compilation errors.

### 2. `testing` Branch (Testing stage)
*   **Purpose:** Where you integrate features to perform manual/automated testing.
*   **CI Behavior:** Builds the code and runs lints (`eslint`) and any automated test suites to ensure code quality.

### 3. `production` Branch (Release/Deployment stage)
*   **Purpose:** The live code that your customers see.
*   **CI/CD Behavior:** Builds the code, runs lints/tests, and if everything passes, automatically deploys the application to production hosting.

---

## 4. How to use it in Git (Step-by-Step)

If you are starting out, here is the exact sequence of commands to manage these branches.

### Step A: Initialize the local branches
Run these commands in your project root terminal to create the three branches:
```bash
# 1. Create and switch to development branch
git checkout -b development

# 2. Create testing branch
git branch testing

# 3. Create production branch
git branch production
```

### Step B: Working on Development
When writing code:
```bash
# Make sure you are on development branch
git checkout development

# ... edit files, add features ...

# Commit your changes
git add .
git commit -m "feat: added new shop categories filtering"

# Push to GitHub to trigger build check
git push origin development
```
*(Now go to your GitHub repository -> **Actions** tab to see your pipeline verifying the code!)*

### Step C: Merging to Testing
When development is successful and you want to test:
```bash
# Switch to testing branch
git checkout testing

# Pull latest testing changes from remote (if any)
git pull origin testing

# Merge development changes into testing
git merge development

# Push to GitHub to trigger lint & test check
git push origin testing
```

### Step E: Merging to Production (Release)
When testing is complete and you are ready to publish live:
```bash
# Switch to production branch
git checkout production

# Pull latest production changes from remote (if any)
git pull origin production

# Merge testing changes into production
git merge testing

# Push to GitHub to trigger build, test, and auto-deployment
git push origin production
```

---

## 5. Adding Secrets to GitHub (for safe deployment)

To keep API keys, passwords, and deploy tokens secure (so they aren't exposed in your Git history), you should use **GitHub Secrets**:

1. Go to your GitHub Repository.
2. Click **Settings** (top navigation bar).
3. Under the left sidebar, expand **Secrets and variables** and click **Actions**.
4. Click the green button: **New repository secret**.
5. Add your variables. For example:
   * **Name:** `RENDER_DEPLOY_HOOK_URL` | **Value:** *(Your Render service deploy hook URL)*
   * **Name:** `VERCEL_TOKEN` | **Value:** *(Your Vercel account token)*

These secrets will be securely passed into the `.github/workflows/ci-cd.yml` workflow when it runs!
