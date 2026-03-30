![Base](logo.webp)

# Base Web

> **[ARCHIVED]** This repository is no longer actively maintained. For ecosystem listing requests, please submit via [this form](https://forms.gle/hJhc2PqfAsQp86YL8) instead of opening a PR.

Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users onchain. It's built on Optimism's open-source [OP Stack](https://stack.optimism.io/).

<!-- Badge row 1 - status -->

[![GitHub contributors](https://img.shields.io/github/contributors/base/web)](https://github.com/base/web/graphs/contributors)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/base/web)](https://github.com/base/web/graphs/contributors)
[![GitHub Stars](https://img.shields.io/github/stars/base/web.svg)](https://github.com/base/web/stargazers)
![GitHub repo size](https://img.shields.io/github/repo-size/base/web)
[![GitHub](https://img.shields.io/github/license/base/web?color=blue)](https://github.com/base/web/blob/master/LICENSE.md)

<!-- Badge row 2 - links and profiles -->

[![Website base.org](https://img.shields.io/website-up-down-green-red/https/base.org.svg)](https://base.org)
[![Blog](https://img.shields.io/badge/blog-up-green)](https://base.mirror.xyz/)
[![Docs](https://img.shields.io/badge/docs-up-green)](https://docs.base.org/)
[![Discord](https://img.shields.io/discord/1067165013397213286?label=discord)](https://base.org/discord)
[![Twitter Base](https://img.shields.io/twitter/follow/Base?style=social)](https://twitter.com/Base)

<!-- Badge row 3 - detailed status -->

[![GitHub pull requests by-label](https://img.shields.io/github/issues-pr-raw/base/web)](https://github.com/base/web/pulls)
[![GitHub Issues](https://img.shields.io/github/issues-raw/base/web.svg)](https://github.com/base/web/issues)

## Setup

1. Ensure that `nvm` is [installed](https://github.com/nvm-sh/nvm#install--update-script).
2. Clone the repository.
3. If `nvm` doesn't auto-load the Node.js environment when changing to the repo directory, run `nvm use`.
4. Enable Yarn by running `corepack enable`.

## Getting started

After cloning the repository begin by installing dependencies at the root.

```shell
yarn
yarn build
```

## Local development

To start a development server on localhost, run `yarn workspace @app/<project> dev`.

For example, to start the `web` app locally, you would run `yarn workspace @app/web dev`.

## Projects

There are three projects which can be run individually.

### Web

```
yarn workspace @app/web dev
```

## Contributing

We welcome contributions to Base! For guidelines on how to contribute please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

### Updating the Base Ecosystem Page

> **This repository is archived.** Ecosystem listing requests via pull request are no longer accepted.
>
> To add or update your project on the [Base Ecosystem](https://base.org/ecosystem) page, please submit a request using this form: **https://forms.gle/hJhc2PqfAsQp86YL8**

---

## 🚀 Quickstart

### Requirements

- Node.js >= 20
- Yarn >= 1.22

### Installation

```bash
git clone https://github.com/base/web.git
cd web
yarn install
yarn dev
```

## 🏗️ Architecture

This monorepo contains multiple applications and libraries:

- **`apps/web`** - Main Base website application built with Next.js 15
- **`apps/bridge`** - Base bridge application
- **`libs/base-ui`** - Shared UI component library

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Wagmi v2 + Viem for Ethereum interactions
- **3D Graphics**: Three.js with React Three Fiber
- **Animation**: Framer Motion
- **Testing**: Jest + Playwright for E2E
- **Deployment**: Vercel with custom Docker configuration

## 🔧 Development Workflow

### Prerequisites Setup

1. Install Node.js 20+ using [nvm](https://github.com/nvm-sh/nvm):
   ```bash
   nvm install 20
   nvm use 20
   ```

2. Enable Yarn package manager:
   ```bash
   corepack enable
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server for web app |
| `yarn build` | Build all applications |
| `yarn test` | Run unit tests |
| `yarn test:e2e` | Run end-to-end tests |
| `yarn lint` | Run ESLint on all packages |
| `yarn workspace @app/web dev` | Start specific app in development |

### Development Commands

```bash
# Start the main web application
yarn workspace @app/web dev

# Build the entire project
yarn build

# Run tests
yarn test

# Run E2E tests
yarn test:e2e

# Run E2E tests with UI
yarn test:e2e:ui
```

## 🧪 Testing

### Unit Tests
```bash
yarn test
```

### End-to-End Tests
```bash
# Run all E2E tests
yarn test:e2e

# Run with browser UI
yarn test:e2e:ui

# Debug mode
yarn test:e2e:debug

# Run in headed mode
yarn test:e2e:headed
```

### Test Configuration
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Playwright with custom wallet configurations
- **Test Coverage**: Configured for comprehensive coverage reporting

## 🚀 Deployment

### Production Build
```bash
yarn build
yarn workspace @app/web start
```

### Environment Variables
Required environment variables for production:

```bash
# Database
DATABASE_URL=postgresql://...

# Redis
REDIS_URL=redis://...

# External APIs
CLOUDINARY_URL=cloudinary://...

# Analytics
DATADOG_CLIENT_TOKEN=...
BUGSNAG_API_KEY=...
```

### Docker Deployment
```bash
# Build Docker image
docker build -t base-web .

# Run container
docker run -p 3000:3000 base-web
```

## 🔍 Troubleshooting

### Common Issues

**Node.js Version Issues**
```bash
# Ensure you're using Node.js 20+
nvm use 20
```

**Yarn Installation Issues**
```bash
# Clear yarn cache
yarn cache clean

# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install
```

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
yarn build
```

**E2E Test Issues**
```bash
# Install Playwright browsers
npx playwright install

# Run tests in debug mode
yarn test:e2e:debug
```

### Performance Optimization

- **Bundle Analysis**: Run `yarn workspace @app/web analyze` to analyze bundle size
- **Million.js**: Use `yarn workspace @app/web dev:million` for performance monitoring
- **Image Optimization**: All images are automatically optimized with Next.js Image component

## 📁 Project Structure

```
web/
├── apps/
│   ├── web/                 # Main website application
│   │   ├── app/            # Next.js 15 App Router
│   │   ├── src/            # Source code
│   │   ├── public/         # Static assets
│   │   └── e2e/            # End-to-end tests
│   └── bridge/             # Bridge application
├── libs/
│   └── base-ui/            # Shared UI components
├── tools/                  # Build tools and CI
└── docs/                   # Documentation
```

---

If you have any questions, please reach out to us in #developer-chat in the [Base Discord](https://base.org/discord).
