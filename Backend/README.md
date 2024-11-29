# Backend - Task Management API

## Requirements
- Java 17 or higher
- Maven 3.8.6 or higher
- MySQL Database

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app/backend
Configure the database:

2. Create a MySQL database (e.g., task_management).

3. Update application.properties in src/main/resources:
   properties
   Copy code
   spring.datasource.url=jdbc:mysql://localhost:3306/task_management
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   Build and Run:

  4. bash
   Copy code
   mvn clean install
   mvn spring-boot:run

   API Endpoints:

   Registration: POST /api/auth/register
   Login: POST /api/auth/login
   yaml
   Copy code

   ---

