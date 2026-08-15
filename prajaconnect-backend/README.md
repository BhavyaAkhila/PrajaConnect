# Praja Connect Backend

This is the production-ready Spring Boot backend for the Praja Connect platform.

## Overview
- **Java**: 17
- **Framework**: Spring Boot 3.x
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **Build Tool**: Maven

## Requirements
- MySQL server running locally on `localhost:3306`.
- Create a database called `praja_connect_db`.

## Setup & Run
1. Configure `src/main/resources/application.properties` with your database username and password.
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

## React Frontend Connection Examples

Connecting your React app at `https://prajaconnect.netlify.app` with the backend:

### Setup Axios Instance
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with production URL when deployed
});

// Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 1. Login Example
```javascript
import api from './api';

const login = async (email, password) => {
   try {
     const response = await api.post("/api/auth/login", { email, password });
     localStorage.setItem('token', response.data.token);
     console.log("Logged in successfully!");
   } catch (error) {
     console.error(error.response.data);
   }
};
```

### 2. Fetch Services
```javascript
import api from './api';

const getServices = async () => {
   try {
     const response = await api.get("/api/services");
     return response.data;
   } catch (error) {
     console.error(error);
   }
};
```

### 3. Post a Job
```javascript
import api from './api';

const postJob = async (jobData) => {
   try {
     const response = await api.post("/api/jobs", jobData);
     console.log("Job posted!");
   } catch (error) {
     console.error(error);
   }
};
```

## Deployment Instructions

### Deploying to Render
1. Push your Spring Boot project to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the environment:
    - **Runtime**: Java
    - **Build Command**: `./mvnw clean package -DskipTests`
    - **Start Command**: `java -jar target/prajaconnect-0.0.1-SNAPSHOT.jar`
5. Create a MySQL database on Render (or Railway / PlanetScale) and update your production `spring.datasource.url`, `username`, and `password` inside Render's **Environment Variables**.
6. Set frontend URL (Netlify) as an allowed origin for CORS in the deployed backend variables or update `WebSecurityConfig` appropriately if URLs change.

### Database Deploy (Railway)
1. Go to [Railway](https://railway.app/).
2. Create a new project and add a MySQL provision.
3. Grab the generated database URL and connection details.
4. Supply these credentials to your Render Web Service.

### Connect Netlify Frontend
1. Once your Render Web Service is live (e.g., `https://praja-connect-api.onrender.com`), update your React frontend source code to use this URL as the base URL instead of `localhost:8080`.
2. Push your React code changes to Netlify to deploy the frontend that talks to your new backend.
