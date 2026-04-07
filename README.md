# Mutual Fund Platform

A comprehensive platform for investment perception and selection behavior towards mutual funds.

## Project Structure
- `backend/`: Spring Boot Java application
- `frontend/`: Vite + React web application

## Getting Started

### 1. Database Setup
The project requires a MySQL database. Please follow the instructions in [DATABASE_SETUP.md](./DATABASE_SETUP.md).

### 2. Run the Backend
```bash
cd backend
mvn spring-boot:run
```

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- **User Management**: Authentication and Role-based access (Admin, Investor, Advisor, Analyst).
- **Mutual Fund Discovery**: Search and compare different mutual funds.
- **Investment Tracking**: Manage and track your mutual fund investments.
- **Educational Content**: Learn about mutual fund basics and strategies.
- **Reporting**: Advanced analytics and behavior reports.

## Tech Stack
- **Backend**: Java 17, Spring Boot, Spring Security (JWT), Spring Data JPA, MySQL.
- **Frontend**: React, Axios, React Router.

<!-- Update: Update dependency versions in pom.xml -->
