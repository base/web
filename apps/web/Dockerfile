# Use specific node version for better stability
FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:18-slim

ARG TARGETARCH
ENV TARGETARCH=${TARGETARCH:-arm64}

# Install only necessary dependencies and clean up in the same layer
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gnupg \
    wget \
    python3 \
    build-essential \
    make && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

WORKDIR /repo

# Copy package files first to leverage Docker cache
COPY package.json yarn.lock ./
COPY packages/web/package.json ./packages/web/

# Install dependencies with frozen lockfile
RUN yarn install --frozen-lockfile --production

# Copy source files
COPY . .

# Build the application
RUN yarn workspace @app/web next build

EXPOSE 3000

# Use more specific start command
CMD ["yarn", "workspace", "@app/web", "start", "-p", "3000"]
