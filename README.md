# ☕ WHERE TO STUDY

![Java](https://img.shields.io/badge/Java-Spring_Boot-6DB33F?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat-square&logo=postgresql)
![Google Maps API](https://img.shields.io/badge/API-Google_Maps-4285F4?style=flat-square&logo=googlemaps)

## 📌 Overview
**WHERE TO STUDY** is a full-stack web application designed to solve a modern problem for students and remote workers: finding the perfect cafe to work or study. 

Unlike general map applications, this platform focuses entirely on productivity features. It allows users to discover cafes based on essential study needs such as reliable Wi-Fi, power outlet availability, noise levels, and seating capacity. 

*Currently seeded with pilot data for cafes around **Riga Technical University (RTU), Latvia**.*

## ✨ Key Features
- **🗺️ Interactive Map Discovery:** Seamlessly browse cafes on an interactive map powered by the Google Maps API.
- **🔍 Advanced Productivity Filters:** Filter locations dynamically by:
  - Wi-Fi Quality
  - Power Outlet Availability
  - Quiet Areas vs. Group Friendly Spaces
- **📖 Detailed Cafe Profiles:** View specific details like coffee bean origins, food options, and study facility tags.
- **⭐ Community Reviews:** Users can leave ratings and upload photo reviews based strictly on the "work/study atmosphere."
- **🏢 Cafe Owner Panel:** Owners can claim their business, update facility status, and respond to community feedback.

## 🛠️ Technology Stack
### Frontend
- **React.js** (Functional Components & Hooks)
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)

### Backend
- **Java 17 & Spring Boot 3.x**
- **Spring Security & JWT** (Authentication & Authorization)
- **Spring Data JPA / Hibernate** (ORM)

### Database & Infrastructure
- **PostgreSQL**
- **Google Maps API** (Geolocation & Rendering)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Node.js & npm](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Database Setup
Create a local PostgreSQL database for the project:
```sql
CREATE DATABASE where_to_study_db;
2. Backend Setup (Spring Boot)
Navigate to the backend directory:

Bash
cd backend
Open src/main/resources/application.properties and configure your database credentials:

Properties
spring.datasource.url=jdbc:postgresql://localhost:5432/where_to_study_db
spring.datasource.username=YOUR_POSTGRES_USERNAME
spring.datasource.password=YOUR_POSTGRES_PASSWORD
spring.jpa.hibernate.ddl-auto=update
Run the Spring Boot application. The server will start on http://localhost:8080.
(Note: The DatabaseSeeder class will automatically populate the database with 5 mock cafes in Riga upon the first startup).

3. Frontend Setup (React)
Navigate to the frontend directory:

Bash
cd frontend
Install dependencies:

Bash
npm install
Create a .env file in the root of the frontend folder and add your Google Maps API key and Backend URL:

Kod snippet'i
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:8080/api/v1
Start the development server:

Bash
npm run dev
🛡️ Security Measures Implemented
SQL Injection Prevention: Utilization of Parameterized Queries via Spring Data JPA.

XSS Protection: Input sanitization on the backend and safe rendering practices in React.

Authentication: Secure password hashing using BCrypt and stateless session management using JWT.

API Security: Environment variables used for sensitive keys (.env & .gitignore).
