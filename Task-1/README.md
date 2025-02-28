# Task Manager API

A Java Spring Boot application that provides REST APIs to manage shell command tasks stored in MongoDB. 
Tasks can be created, executed, searched, and deleted programmatically.

---

## Screenshots
![Image](https://github.com/user-attachments/assets/4af29388-5fa4-470e-a8d9-ead47de42a10)

### Output of the API call test

![Image](https://github.com/user-attachments/assets/15201811-5144-4dea-9c1a-b362805dcaaa)

## Features
- **CRUD Operations**: Create, read, update, and delete tasks
- **Command Execution**: Execute shell commands and store their output
- **MongoDB Integration**: Persistent storage for tasks and execution logs
- **Validation**: Block unsafe commands (e.g., `rm`, `sudo`)

---

## Prerequisites
- Java 17+
- Maven 3.8+
- MongoDB 5.0+ (or Docker)
- Docker (optional)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2.Build the Application
```bash
mvn clean package
```
### 3. Run MongoDB (Docker)
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```
### 4. Run the Application
```bash
java -jar target/task-manager-0.0.1-SNAPSHOT.jar
```
# API Documentation

## Overview
The Task Manager API provides endpoints for managing and executing tasks. It supports CRUD operations and task execution.

## Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks?id={id} | Get a single task by ID |
| POST | /tasks | Create a new task |
| DELETE | /tasks/{id} | Delete a task by ID |
| GET | /tasks/search?name={query} | Search tasks by name |
| POST | /tasks/{id}/execute | Execute a task's command |

## Configuration

### MongoDB Connection
Update the following configuration in `src/main/resources/application.properties`:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/taskdb
```

## Example Usage

### Create a Task
```bash
curl -X POST http://localhost:8080/tasks \  
  -H "Content-Type: application/json" \  
  -d '{
    "id": "task-1",
    "name": "Test Task",
    "owner": "John Doe",
    "command": "echo Hello World"
  }'
```

### Execute a Task
```bash
curl -X POST http://localhost:8080/tasks/task-1/execute
```

### Get All Tasks
```bash
curl http://localhost:8080/tasks
```

## Docker Deployment

### Build Docker Image
```bash
docker build -t task-manager:latest .
```

### Run Container
```bash
docker run -p 8080:8080 --link mongo:mongo task-manager:latest
```

## Validation Rules
- Commands containing `rm` or `sudo` will be rejected.
- All fields are required when creating a task.
