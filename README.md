# CampusEats - Full-Stack DevOps & Cloud Deployment (Lab 11)

**Student Name:** Loganathan Theebika  
**IT Number:** IT24102414  
**Course:** SE3090 – Software Engineering Frameworks  
**Lab Practical:** Lab 11 – DevOps and Cloud Hosting Platforms  

---

## 1. Project Overview & Architecture

CampusEats is a cloud-deployed, three-tier web application built as part of the SE3090 curriculum:
1. **Frontend Tier:** Single Page Application (SPA) built with React and Vite. Deployed to **Vercel** with global CDN distribution and automated GitHub continuous deployment.
2. **Backend API Tier:** RESTful API built with **ASP.NET Core 8**, packaged via a multi-stage **Dockerfile** and deployed to **Render** Web Services listening on container port `8080`.
3. **Database Tier:** Managed cloud **PostgreSQL 16** hosted on **Neon**, accessed over secure TLS/SSL (`SSL Mode=Require`) with Entity Framework Core migrations.

```
+─────────────────────────────────────────────────────────────+
|                     Browser (Client)                        |
+─────────────────────────────────────────────────────────────+
                               │
               HTTPS (Global CDN / Vercel Edge)
                               │
                               ▼
+─────────────────────────────────────────────────────────────+
|               Frontend Tier: Vercel (React/Vite)            |
|       URL: https://campuseats-it24102414.vercel.app          |
|       Environment Variable: VITE_API_URL                     |
+─────────────────────────────────────────────────────────────+
                               │
              HTTPS REST API (JSON / CORS Allowed)
                               │
                               ▼
+─────────────────────────────────────────────────────────────+
|            Backend Tier: Render (ASP.NET Core 8 Docker)     |
|       URL: https://campuseats-api-it24102414.onrender.com   |
|       Environment Variable: ConnectionStrings__Default,     |
|                             Jwt__Key, Jwt__Issuer           |
+─────────────────────────────────────────────────────────────+
                               │
                Secure TLS/SSL Connection String
                               │
                               ▼
+─────────────────────────────────────────────────────────────+
|            Database Tier: Neon Managed PostgreSQL 16        |
|       Host: ep-misty-water-a1.ap-southeast-1.aws.neon.tech  |
|       Database: campuseats (SSL Mode = Require)             |
+─────────────────────────────────────────────────────────────+
```

---

## 2. Live Deployment URLs & Repository Links

- **GitHub Repository:** [https://github.com/IT24102414/campuseats](https://github.com/IT24102414/campuseats)
- **Deployed Frontend URL:** [https://campuseats-it24102414.vercel.app](https://campuseats-it24102414.vercel.app)
- **Deployed Backend API URL:** [https://campuseats-api-it24102414.onrender.com](https://campuseats-api-it24102414.onrender.com)
- **Swagger Documentation:** [https://campuseats-api-it24102414.onrender.com/swagger](https://campuseats-api-it24102414.onrender.com/swagger)

---

## 3. Production Configuration & Environment Variables

Following the **12-Factor App** methodology and secure DevOps best practices, configuration and secrets are decoupled from the codebase:

| Tier | Platform | Variable Name | Purpose | Production Setting |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Vercel | `VITE_API_URL` | Base URL of deployed backend API | Baked into static bundle at build time |
| **Backend** | Render | `ConnectionStrings__Default` | Neon PostgreSQL SSL connection string | Overrides `appsettings.json` via double underscore `__` |
| **Backend** | Render | `Jwt__Key` | Secret key used to sign and validate JWT tokens | Secure cryptographically random key |
| **Backend** | Render | `Jwt__Issuer` | JWT Token Issuer claim | `CampusEats` |
| **Backend** | Render | `Jwt__Audience` | JWT Token Audience claim | `CampusEatsUsers` |
| **Backend** | Render | `ASPNETCORE_URLS` | Binding port for container | `http://0.0.0.0:8080` |

---

## 4. Local Build & Test Instructions

### Frontend (campuseats-frontend)
```bash
cd campuseats-frontend
npm install
npm run build
npm run preview
```

### Backend (campuseats-backend)
```bash
cd campuseats-backend
dotnet restore
dotnet build
dotnet run
```
