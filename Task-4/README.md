# Task Manager - CI/CD Pipeline

This project includes a CI/CD pipeline for the Task Manager API (from Task 1). The pipeline automates:
- Code compilation and testing
- Docker image building and pushing
- Deployment to Kubernetes (optional)

---

## Pipeline Overview

### Tools Used
- **GitHub Actions**: For CI/CD automation
- **Maven**: For building the Java application
- **Docker**: For containerizing the application
- **Kubernetes**: For deployment (optional)

---

## Pipeline Steps

1. **Code Checkout**: Fetches the latest code from the repository.
2. **Build**: Compiles the Java code using Maven.
3. **Test**: Runs unit tests (if any).
4. **Docker Build**: Builds a Docker image for the application.
5. **Docker Push**: Pushes the Docker image to Docker Hub.
6. **Deploy to Kubernetes** (optional): Deploys the application to a Kubernetes cluster.

---

## Prerequisites
- GitHub repository for the Task Manager API
- Docker Hub account (for pushing images)
- Kubernetes cluster (optional, for deployment)

---

## Setup

### 1. GitHub Actions Workflow
Create a file named `.github/workflows/ci-cd.yml` in your repository:

```yaml
name: Java CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

env:
  DOCKER_HUB_USERNAME: ${{ secrets.DOCKERHUB_USERNAME }}
  DOCKER_HUB_ACCESS_TOKEN: ${{ secrets.DOCKERHUB_TOKEN }}
  IMAGE_NAME: your-dockerhub-username/task-manager

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'

    - name: Build with Maven
      run: mvn -B package --file pom.xml

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ env.DOCKER_HUB_USERNAME }}
        password: ${{ env.DOCKER_HUB_ACCESS_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          ${{ env.IMAGE_NAME }}:latest
          ${{ env.IMAGE_NAME }}:${{ github.sha }}
```

### 2. Dockerfile
Ensure you have a valid Dockerfile in your project root:

```dockerfile
FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### 3. Set Up Secrets in GitHub
Go to your GitHub repo → Settings → Secrets → Actions

Add these secrets:

- **DOCKERHUB_USERNAME**: Your Docker Hub username
- **DOCKERHUB_TOKEN**: Your Docker Hub access token (Create token)

---

## How It Works
- **Trigger**: The pipeline runs on every push to the main branch or pull request.
- **Build**: Compiles the Java code using Maven.
- **Docker**: Builds and pushes the Docker image to Docker Hub.
- **Deploy (optional)**: Deploys the application to Kubernetes (requires additional setup).

