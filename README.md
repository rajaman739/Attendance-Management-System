# Attendance Management System

## Overview

The Smart Attendance Management System is a full-stack web application developed to automate attendance management in educational institutions.

The system provides modules for student management, faculty management, subject management, attendance tracking, attendance analytics, attendance prediction, report generation, and face-recognition-based attendance marking.

The project uses Spring Boot for backend services, ReactJS for frontend development, MySQL as the database, and Python OpenCV for face recognition.

---

# Key Features

## Authentication

* JWT-Based Login
* User Registration
* Secure API Access

## Student Management

* Add Student
* Update Student
* Delete Student
* View Students
* Search by Roll Number
* Search by Department

## Faculty Management

* Add Faculty
* Update Faculty
* Delete Faculty
* View Faculty

## Subject Management

* Add Subject
* Update Subject
* Delete Subject
* View Subjects

## Attendance Management

* Mark Attendance
* View Attendance Records
* Delete Attendance
* Attendance Percentage Calculation
* Low Attendance Detection

## Attendance Analytics

* Attendance Percentage Monitoring
* Attendance Statistics Dashboard
* Low Attendance Identification

## Attendance Prediction

* Risk Prediction
* LOW Risk Classification
* MEDIUM Risk Classification
* HIGH Risk Classification
* Classes Needed to Reach 75% Attendance

## Face Recognition Attendance

* Face Dataset Generation
* Face Model Training
* Face Recognition Scanner
* Automatic Attendance Recording

## Reports

* PDF Attendance Report
* Excel Attendance Report

---

# Technology Stack

## Frontend

* ReactJS
* React Router DOM
* Axios
* Recharts

## Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Hibernate

## Database

* MySQL

## Face Recognition Module

* Python
* OpenCV
* LBPH Face Recognizer

## Development Tools

* IntelliJ IDEA
* VS Code
* MySQL Workbench
* Postman
* Swagger UI
* GitHub

---

## System Architecture Overview

The Attendance Management System follows a multi-layered architecture consisting of:

1. Presentation Layer (React Frontend)
2. API Layer (Spring Boot REST APIs)
3. Business Logic Layer (Service Layer)
4. Data Access Layer (JPA Repository Layer)
5. Database Layer (MySQL)
6. Face Recognition Layer (Python + OpenCV)

---

## High-Level Architecture

```text
+------------------------------------------------+
|                React Frontend                  |
|------------------------------------------------|
| Login | Dashboard | Students | Faculty         |
| Subjects | Attendance | Analytics             |
| Prediction | Face Recognition                 |
+------------------------+-----------------------+
                         |
                         | HTTP Requests
                         v
+------------------------------------------------+
|            Spring Boot REST APIs               |
|------------------------------------------------|
| Auth Controller                                |
| Student Controller                             |
| Faculty Controller                             |
| Subject Controller                             |
| Attendance Controller                          |
| Prediction Controller                          |
| Report Controller                              |
| Dashboard Controller                           |
| Face Recognition Controller                    |
+------------------------+-----------------------+
                         |
                         | Service Calls
                         v
+------------------------------------------------+
|              Business Logic Layer              |
|------------------------------------------------|
| Auth Service                                   |
| Student Service                                |
| Faculty Service                               |
| Subject Service                               |
| Attendance Service                            |
| Prediction Service                            |
| Dashboard Service                             |
| Report Service                                |
+------------------------+-----------------------+
                         |
                         | JPA/Hibernate
                         v
+------------------------------------------------+
|              Repository Layer                  |
|------------------------------------------------|
| Student Repository                             |
| Faculty Repository                             |
| Subject Repository                             |
| Attendance Repository                          |
| Prediction Repository                          |
+------------------------+-----------------------+
                         |
                         | SQL Queries
                         v
+------------------------------------------------+
|                  MySQL Database                |
|------------------------------------------------|
| students                                        |
| faculty                                         |
| subjects                                        |
| attendance                                      |
| attendance_prediction                           |
| users                                           |
+------------------------------------------------+
```

---

## Face Recognition Architecture

```text
+----------------------------------+
|      Face Recognition UI         |
|      (React Frontend)            |
+---------------+------------------+
                |
                |
                v
+----------------------------------+
|      Python OpenCV Module        |
|----------------------------------|
| dataset_generator.py             |
| train.py                         |
| recognize.py                     |
+---------------+------------------+
                |
                |
                v
+----------------------------------+
|      Face Detection Model        |
|----------------------------------|
| Haar Cascade Classifier          |
| LBPH Recognizer                  |
+---------------+------------------+
                |
                |
                v
+----------------------------------+
|      Spring Boot Attendance API  |
|----------------------------------|
| POST /api/attendance             |
+---------------+------------------+
                |
                |
                v
+----------------------------------+
|          MySQL Database          |
|----------------------------------|
| Attendance Records Stored        |
+----------------------------------+
```

---

## Authentication Flow

```text
User Login
     |
     v
React Login Page
     |
     v
POST /api/auth/login
     |
     v
Spring Security Authentication
     |
     v
JWT Token Generated
     |
     v
Token Stored in Browser
(localStorage)
     |
     v
Protected API Access
```

---

## Attendance Prediction Flow

```text
Student Attendance Records
            |
            v
Attendance Service
            |
            v
Calculate Attendance Percentage
            |
            v
Prediction Service
            |
            +----> Attendance >= 75%
            |           LOW RISK
            |
            +----> Attendance >= 60%
            |           MEDIUM RISK
            |
            +----> Attendance < 60%
                        HIGH RISK
            |
            v
Prediction Stored
            |
            v
Displayed in Prediction Dashboard
```

---

## Attendance Recovery Calculation

```text
Current Attendance %
          |
          v
Check if Attendance < 75%
          |
          v
Calculate Additional Classes Needed
          |
          v
Display:
"Classes Required To Reach Safe Attendance"
```

---

## Report Generation Flow

```text
Attendance Records
        |
        v
Report Controller
        |
        +----> PDF Report
        |
        +----> Excel Report
        |
        v
Download File
```

---

## Dashboard Analytics Flow

```text
Students Data
Faculty Data
Subjects Data
Attendance Data
Prediction Data
        |
        v
Dashboard Service
        |
        v
Aggregated Statistics
        |
        v
React Dashboard Charts
(Recharts)
```

---

## Database Relationships

```text
Student
   |
   | One Student
   |
   |<---------------------+
   |                      |
   v                      |
Attendance                |
   ^                      |
   |                      |
   | Many Attendance      |
   |                      |
Subject ------------------+

Student
   |
   | One Student
   |
   v
Attendance Prediction
```

### Entity Relationships

Student (1) ------ (Many) Attendance

Subject (1) ------ (Many) Attendance

Student (1) ------ (Many) AttendancePrediction

User (1) ------ Authentication & Authorization



---

# API Modules

## Authentication APIs

POST /api/auth/register

POST /api/auth/login

---

## Student APIs

GET /api/students

GET /api/students/{id}

POST /api/students

PUT /api/students/{id}

DELETE /api/students/{id}

GET /api/students/roll/{rollNo}

GET /api/students/department/{department}

---

## Faculty APIs

GET /api/faculty

GET /api/faculty/{id}

POST /api/faculty

PUT /api/faculty/{id}

DELETE /api/faculty/{id}

---

## Subject APIs

GET /api/subjects

GET /api/subjects/{id}

POST /api/subjects

PUT /api/subjects/{id}

DELETE /api/subjects/{id}

---

## Attendance APIs

GET /api/attendance

POST /api/attendance

DELETE /api/attendance/{id}

GET /api/attendance/student/{studentId}

GET /api/attendance/subject/{subjectId}

GET /api/attendance/percentage/{studentId}

GET /api/attendance/low/{studentId}

GET /api/attendance/required/{studentId}

---

## Prediction APIs

GET /api/predictions

POST /api/predictions

POST /api/predictions/generate/{studentId}

GET /api/predictions/student/{studentId}

DELETE /api/predictions/{id}

---

## Reports APIs

GET /api/reports/attendance/pdf

GET /api/reports/attendance/excel

---

## Dashboard APIs

GET /api/dashboard

---

## Face Recognition APIs

GET /api/face/status

---

# Project Screenshots

## Login Page

![Login Page](screenshots/login.png)

---

## Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Student Management

![Students](screenshots/students.png)

---

## Faculty Management

![Faculty](screenshots/faculty.png)

---

## Subject Management

![Subjects](screenshots/subjects.png)

---

## Attendance Management

![Attendance](screenshots/attendance.png)

---

## Attendance Analytics

![Analytics](screenshots/analytics.png)

---

## Attendance Prediction

![Prediction](screenshots/prediction.png)

---

## Face Recognition Attendance

![Face Recognition](screenshots/face-recognition.png)

---

# Database Configuration

Database Name:

attendance_db

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/attendance_db

spring.datasource.username=root

spring.datasource.password=YOUR_PASSWORD

---

# Installation Guide

## Backend

Open backend folder:

mvn clean install

mvn spring-boot

Backend URL:

http://localhost:8080

Swagger:

http://localhost:8080/swagger-ui/index.html

---

## Frontend

Open frontend folder:

npm install

npm run dev

Frontend URL:

http://localhost:5173

---

## Face Recognition

Capture dataset:

python dataset_generator.py

Train model:

python train.py

Run recognition:

python recognize.py

---

# Future Enhancements

* Real-Time Camera Streaming
* Student Portal
* Faculty Portal
* Mobile Application
* Cloud Deployment
* Advanced AI Prediction Models
* Email Notification System
* Attendance Trend Forecasting
* Dark Mode


---

# Author

Aman Raj

B.Tech Computer Science & Engineering

Smart Attendance Management System
