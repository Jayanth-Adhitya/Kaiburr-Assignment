# Task Manager API - Kubernetes Deployment

This guide explains how to deploy the Task Manager API (from Task 1) to a Kubernetes cluster. The deployment includes:
- A Java Spring Boot application
- MongoDB for persistent storage
- Kubernetes manifests for deployment and service configuration

---

## Prerequisites
- Docker
- Kubernetes cluster (e.g., Minikube, Docker Desktop, or cloud provider like GKE/EKS/AKS)
- `kubectl` installed and configured
- Helm (optional, for MongoDB deployment)

---

## Steps to Deploy

### 1. Build Docker Image
Build the Docker image for the Java application:
```bash
docker build -t your-dockerhub-username/task-manager:latest .
```
Push the image to Docker Hub:
```bash
docker push your-dockerhub-username/task-manager:latest
```

### 2. Deploy MongoDB

#### Option 1: Using Kubernetes Manifest
Create a file named `mongo-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo:latest
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-storage
          mountPath: /data/db
      volumes:
      - name: mongo-storage
        persistentVolumeClaim:
          claimName: mongo-pvc
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
---
apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  selector:
    app: mongo
  ports:
  - port: 27017
    targetPort: 27017
```
Apply the manifest:
```bash
kubectl apply -f mongo-deployment.yaml
```

#### Option 2: Using Helm
Install MongoDB using Helm:
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mongo bitnami/mongodb
```

### 3. Deploy the Java Application
Create a file named `app-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: java-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: java-app
  template:
    metadata:
      labels:
        app: java-app
    spec:
      containers:
      - name: java-app
        image: your-dockerhub-username/task-manager:latest
        env:
        - name: SPRING_DATA_MONGODB_URI
          value: "mongodb://mongo:27017/taskdb"
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: java-app-service
spec:
  type: LoadBalancer
  ports:
  - port: 8080
    targetPort: 8080
  selector:
    app: java-app
```
Apply the manifest:
```bash
kubectl apply -f app-deployment.yaml
```

### 4. Access the Application
Get the service URL:
```bash
minikube service java-app-service --url
```
If using a cloud provider, use the external IP provided by the LoadBalancer.

### Verify Deployment
Check running pods:
```bash
kubectl get pods
```
Check services:
```bash
kubectl get svc
```
Test the API:
```bash
curl http://<SERVICE-IP>:8080/tasks
```

### Persistent Storage
MongoDB data is stored in a Persistent Volume (PV).

If the MongoDB pod is deleted, the data will persist and be reattached to the new pod.

