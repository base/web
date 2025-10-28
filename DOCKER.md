# Docker Setup for Base Web

This document provides comprehensive instructions for running Base Web using Docker containers.

## 🐳 Docker Overview

Base Web uses Docker for consistent development and production environments. The project includes a multi-stage Dockerfile optimized for Next.js applications.

## 📋 Prerequisites

- **Docker** 20.10+ 
- **Docker Compose** 2.0+
- **Git** for cloning the repository

## 🚀 Quick Start with Docker

### 1. Clone and Build

```bash
git clone https://github.com/base/web.git
cd web
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env.local

# Edit environment variables
nano .env.local
```

### 3. Build Docker Image

```bash
# Build the application image
docker build -t base-web .

# Or build for specific architecture
docker build --platform linux/amd64 -t base-web .
```

### 4. Run Container

```bash
# Run the container
docker run -p 3000:3000 \
  --env-file .env.local \
  base-web

# Or run in detached mode
docker run -d -p 3000:3000 \
  --name base-web-container \
  --env-file .env.local \
  base-web
```

## 🛠️ Development with Docker

### Development Container

```bash
# Build development image
docker build -t base-web-dev \
  --target development \
  .

# Run with volume mounting for hot reload
docker run -p 3000:3000 \
  -v $(pwd):/repo \
  --env-file .env.local \
  base-web-dev
```

### Docker Compose Setup

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  base-web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/repo
      - /repo/node_modules
    env_file:
      - .env.local
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: base_web
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Run with Docker Compose:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## 🏗️ Production Deployment

### Multi-Stage Build

The Dockerfile uses multi-stage builds for optimization:

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["yarn", "start"]
```

### Production Environment Variables

Required environment variables for production:

```bash
# Database
DATABASE_URL=postgresql://user:password@postgres:5432/base_web

# Redis
REDIS_URL=redis://redis:6379

# Analytics
DATADOG_CLIENT_TOKEN=your_token
BUGSNAG_API_KEY=your_key

# Blockchain
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

## 🔧 Docker Commands Reference

### Building Images

```bash
# Build with cache
docker build --cache-from base-web -t base-web .

# Build for multiple architectures
docker buildx build --platform linux/amd64,linux/arm64 -t base-web .

# Build without cache
docker build --no-cache -t base-web .
```

### Container Management

```bash
# List containers
docker ps -a

# View logs
docker logs base-web-container

# Execute commands in running container
docker exec -it base-web-container /bin/sh

# Stop and remove container
docker stop base-web-container
docker rm base-web-container
```

### Image Management

```bash
# List images
docker images

# Remove unused images
docker image prune

# Remove all unused images
docker image prune -a

# Tag image for registry
docker tag base-web your-registry/base-web:latest
```

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
docker run -p 3001:3000 base-web
```

**Permission Issues**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Or run with user mapping
docker run -u $(id -u):$(id -g) base-web
```

**Build Failures**
```bash
# Clear Docker cache
docker builder prune

# Check Dockerfile syntax
docker build --no-cache -t base-web .
```

**Memory Issues**
```bash
# Increase Docker memory limit
# In Docker Desktop: Settings > Resources > Memory
```

### Debugging

**Inspect Container**
```bash
# Get container details
docker inspect base-web-container

# View container logs
docker logs -f base-web-container

# Access container shell
docker exec -it base-web-container /bin/sh
```

**Check Environment Variables**
```bash
# List environment variables in container
docker exec base-web-container env
```

## 📊 Performance Optimization

### Image Size Optimization

- Use Alpine Linux base images
- Multi-stage builds to exclude dev dependencies
- .dockerignore to exclude unnecessary files
- Combine RUN commands to reduce layers

### Runtime Optimization

- Use specific Node.js versions
- Enable Docker layer caching
- Use health checks for better orchestration
- Configure resource limits

## 🔒 Security Considerations

### Best Practices

- Use non-root user in containers
- Keep base images updated
- Scan images for vulnerabilities
- Use secrets management for sensitive data
- Implement proper network isolation

### Security Scanning

```bash
# Scan image for vulnerabilities
docker scan base-web

# Use security-focused base image
FROM node:20-alpine
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Docker Examples](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

For questions or issues, please reach out in #developer-chat in the [Base Discord](https://base.org/discord).
