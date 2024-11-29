
Task Management Application
===========================

This is a Task Management Application built using Spring Boot for the backend and Angular for the frontend. 
The application allows users to create, manage, and track tasks efficiently.

Features
--------
Backend (Spring Boot):
- Create, edit, delete, and retrieve tasks.
- Search tasks by title or description.
- Tasks are stored in a MySQL database.
- API endpoints are secured.

Frontend (Angular):
- Modern and responsive UI for managing tasks.
- Task filtering and sorting capabilities.
- Form validation for creating and editing tasks.

Getting Started
---------------

Prerequisites:
Ensure you have the following installed:
1. Java JDK 17 or later.
2. Maven (for backend).
3. Node.js and npm (for frontend).
4. MySQL Database.

Backend Setup:
1. Clone the Repository:
   git clone <repository-url>
   cd <project-directory>/backend

2. Configure the Database:
   - Start your MySQL server.
   - Create a new database:
     CREATE DATABASE task_management;
   - Update `application.properties` with your database credentials:
     spring.datasource.url=jdbc:mysql://localhost:3306/task_management
     spring.datasource.username=<your-username>
     spring.datasource.password=<your-password>

3. Run the Backend Server:
   - Build the backend using Maven:
     mvn clean install
   - Start the server:
     ./mvnw spring-boot:run
   - The backend server will run at: http://localhost:8080.

API Endpoints:

   Registration: POST /api/auth/register
   Login: POST /api/auth/login
   Task :Post /api/task/create-task
   Task :Delete /api/task/delete-task/{id}
   Task :Update /api/task/update-task/{id}
   Task :Get /api/task/get-tasks

Frontend Setup:
1. Navigate to the Frontend Directory:
   cd <project-directory>/frontend

2. Install Dependencies:
   npm install

3. Configure the Backend URL:
   Update the `environment.ts` file in the `src/environments` directory to point to the backend API:
   export const environment = {  
     production: false,  
     apiUrl: 'http://localhost:8080/api'  
   };

4. Run the Frontend Server:
   ng serve
   The frontend will be accessible at: http://localhost:4200.

Usage:
1. Open the browser and navigate to http://localhost:4200.
2. Log in or register (if applicable).
3. Use the UI to create, edit, delete, or search for tasks.

Testing:
- Backend:
  Run tests for the backend using Maven:
  mvn test

- Frontend:
  Run tests for the frontend using Angular CLI:
  ng test

Technologies Used
-----------------
Backend:
- Spring Boot
- MySQL
- Maven
- Hibernate/JPA

Frontend:
- Angular
- Bootstrap

Contributing:
Feel free to fork this repository and contribute. Please ensure all contributions follow the standard guidelines and include relevant documentation.

License:
This project is licensed under the MIT License.
