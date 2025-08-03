# Microservices Blog Application

A distributed microservices application demonstrating event-driven architecture with React frontend, Node.js backend services, and Kubernetes orchestration.

## 🏗️ Architecture Overview

This project implements a **microservices architecture** with **event-driven communication** using an event bus pattern. The application allows users to create blog posts and add comments, with automatic content moderation.

### System Components

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │    Posts    │    │  Comments   │
│  (React)    │    │   Service   │    │   Service   │
│   Port 3000 │    │   Port 4000 │    │  Port 4001  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌─────────────┐
                    │ Event Bus   │
                    │ Port 4005   │
                    └─────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
    ┌─────────▼─────────┐  │  ┌─────────▼─────────┐
    │   Query Service   │  │  │  Moderation       │
    │   Port 4002       │  │  │  Service          │
    └───────────────────┘  │  │  Port 4003        │
                           │  └───────────────────┘
                           │
              ┌────────────▼────────────┐
              │     Kubernetes          │
              │     Orchestration       │
              └─────────────────────────┘
```

## 📁 Project Structure

```
Microservices/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── PostCreate.js  # Post creation component
│   │   ├── PostList.js    # Posts display component
│   │   ├── CommentCreate.js # Comment creation component
│   │   └── CommentList.js # Comments display component
│   ├── package.json
│   └── Dockerfile
├── posts/                  # Posts microservice
│   ├── index.js           # Posts API (CRUD operations)
│   ├── package.json
│   └── Dockerfile
├── comments/               # Comments microservice
│   ├── index.js           # Comments API (CRUD operations)
│   ├── package.json
│   └── Dockerfile
├── event-bus/              # Event Bus service
│   ├── index.js           # Event routing and storage
│   ├── package.json
│   └── Dockerfile
├── query/                  # Query service
│   ├── index.js           # Data aggregation and querying
│   ├── package.json
│   └── Dockerfile
├── moderation/             # Content moderation service
│   ├── index.js           # Comment moderation logic
│   ├── package.json
│   └── Dockerfile
└── infra/
    └── k8s/               # Kubernetes deployment files
        ├── posts-depl.yaml
        ├── comments-depl.yaml
        ├── event-bus-depl.yaml
        ├── query-depl.yaml
        ├── moderation-depl.yaml
        └── posts-srv.yaml
```

## 🚀 Services Description

### 1. **Client Service** (Port 3000)
- **Technology**: React 19.1.0
- **Purpose**: Frontend user interface
- **Features**: 
  - Create new blog posts
  - View all posts with comments
  - Add comments to posts
  - Real-time updates via event-driven architecture

### 2. **Posts Service** (Port 4000)
- **Technology**: Node.js, Express
- **Purpose**: Manages blog posts
- **Endpoints**:
  - `GET /posts` - Retrieve all posts
  - `POST /posts` - Create new post
  - `POST /events` - Handle events from event bus
- **Events**: Emits `PostCreated` events

### 3. **Comments Service** (Port 4001)
- **Technology**: Node.js, Express
- **Purpose**: Manages comments on posts
- **Endpoints**:
  - `GET /posts/:id/comments` - Get comments for a post
  - `POST /posts/:id/comments` - Add comment to post
  - `POST /events` - Handle events from event bus
- **Events**: Emits `CommentCreated`, handles `CommentModerated`

### 4. **Event Bus Service** (Port 4005)
- **Technology**: Node.js, Express
- **Purpose**: Central event routing and storage
- **Features**:
  - Routes events to all services
  - Stores event history
  - Provides event replay capability
- **Endpoints**:
  - `POST /events` - Receive and route events
  - `GET /events` - Retrieve event history

### 5. **Query Service** (Port 4002)
- **Technology**: Node.js, Express
- **Purpose**: Data aggregation and querying
- **Features**:
  - Maintains denormalized data view
  - Combines posts and comments
  - Handles event replay on startup
- **Endpoints**:
  - `GET /posts` - Get posts with comments
  - `POST /events` - Handle events for data sync

### 6. **Moderation Service** (Port 4003)
- **Technology**: Node.js, Express
- **Purpose**: Content moderation
- **Features**:
  - Automatically moderates comments
  - Rejects comments containing "orange"
  - Approves all other comments
- **Events**: Emits `CommentModerated` events

## 🔄 Event Flow

1. **Post Creation**:
   ```
   Client → Posts Service → Event Bus → All Services
   ```

2. **Comment Creation**:
   ```
   Client → Comments Service → Event Bus → All Services
   ```

3. **Comment Moderation**:
   ```
   Event Bus → Moderation Service → Event Bus → Comments Service → Event Bus → Query Service
   ```

## 🐳 Docker & Kubernetes

### Docker
Each service has its own Dockerfile for containerization:
- All services use Node.js base images
- Client uses multi-stage build for React app
- Services are exposed on their respective ports

### Kubernetes
Deployment files in `infra/k8s/`:
- **Deployments**: `*-depl.yaml` files for each service
- **Services**: ClusterIP services for internal communication
- **Replicas**: Currently set to 1 replica per service
- **Images**: Using `ayushblaze/*` Docker Hub images

## 🛠️ Technology Stack

### Frontend
- **React** 19.1.0
- **Axios** for HTTP requests
- **React Scripts** for development

### Backend Services
- **Node.js** with Express
- **Axios** for service-to-service communication
- **CORS** for cross-origin requests
- **Chalk** for colored console output
- **Nodemon** for development

### Infrastructure
- **Docker** for containerization
- **Kubernetes** for orchestration
- **Event-Driven Architecture** for loose coupling

## 📊 Current Status

### ✅ Implemented Features
- Complete microservices architecture
- Event-driven communication
- Content moderation system
- React frontend with real-time updates
- Docker containerization
- Kubernetes deployment configuration
- Event replay capability
- Data aggregation in query service

### 🔧 Development Status
- **Frontend**: Fully functional React application
- **Backend Services**: All 5 microservices implemented
- **Event Bus**: Centralized event routing working
- **Moderation**: Basic content filtering implemented
- **Infrastructure**: Kubernetes manifests ready

### 🚀 Deployment Ready
- All services containerized
- Kubernetes deployment files configured
- Service discovery via ClusterIP services
- Event bus handles service communication

## 🚀 Getting Started

### Prerequisites
- Docker
- Kubernetes cluster (Minikube, Docker Desktop, or cloud)
- Node.js (for local development)

### Local Development
1. Clone the repository
2. Install dependencies in each service directory:
   ```bash
   cd client && npm install
   cd ../posts && npm install
   cd ../comments && npm install
   cd ../event-bus && npm install
   cd ../query && npm install
   cd ../moderation && npm install
   ```

3. Start services locally:
   ```bash
   # Terminal 1
   cd client && npm start
   
   # Terminal 2
   cd posts && npm start
   
   # Terminal 3
   cd comments && npm start
   
   # Terminal 4
   cd event-bus && npm start
   
   # Terminal 5
   cd query && npm start
   
   # Terminal 6
   cd moderation && npm start
   ```

### Kubernetes Deployment
1. Build and push Docker images:
   ```bash
   docker build -t ayushblaze/posts ./posts
   docker build -t ayushblaze/comments ./comments
   docker build -t ayushblaze/event-bus ./event-bus
   docker build -t ayushblaze/query ./query
   docker build -t ayushblaze/moderation ./moderation
   docker build -t ayushblaze/client ./client
   
   docker push ayushblaze/posts
   docker push ayushblaze/comments
   docker push ayushblaze/event-bus
   docker push ayushblaze/query
   docker push ayushblaze/moderation
   docker push ayushblaze/client
   ```

2. Deploy to Kubernetes:
   ```bash
   kubectl apply -f infra/k8s/
   ```

## 🔍 API Endpoints

### Posts Service (Port 4000)
- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `POST /events` - Handle events

### Comments Service (Port 4001)
- `GET /posts/:id/comments` - Get comments for post
- `POST /posts/:id/comments` - Add comment to post
- `POST /events` - Handle events

### Query Service (Port 4002)
- `GET /posts` - Get posts with comments
- `POST /events` - Handle events

### Event Bus (Port 4005)
- `POST /events` - Route events to all services
- `GET /events` - Get event history

### Moderation Service (Port 4003)
- `POST /events` - Handle comment moderation

## 🎯 Key Features

1. **Event-Driven Architecture**: Loose coupling between services
2. **Content Moderation**: Automatic filtering of inappropriate content
3. **Data Consistency**: Event replay ensures data synchronization
4. **Scalability**: Microservices can be scaled independently
5. **Fault Tolerance**: Services can recover from failures
6. **Real-time Updates**: Frontend updates automatically via events

## 🔮 Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- Authentication and authorization
- Advanced content moderation (AI-based)
- Monitoring and logging (Prometheus, Grafana)
- Service mesh implementation (Istio)
- CI/CD pipeline setup
- Load balancing and auto-scaling
- Message queue implementation (RabbitMQ, Kafka)

## 📝 License

This project is open source and available under the ISC License. 