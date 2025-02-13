# Base Marketing Site

The Base marketing site is a modern web application built with Next.js, providing a robust and performant user experience. This application serves as the main marketing and information platform for Base.

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js (version specified in `.nvmrc`)
   - Yarn package manager
   - Git

2. **Installation**
   ```bash
   # Install dependencies
   yarn workspace @app/web install

   # Copy environment variables
   cp .env.local.example .env.local
   ```

3. **Development**
   ```bash
   # Start development server
   yarn workspace @app/web dev
   ```

4. **Production**
   ```bash
   # Build for production
   yarn workspace @app/web build

   # Start production server
   yarn workspace @app/web start
   ```

## 🛠 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **State Management**: React Query
- **Web3**: wagmi, viem, ethers
- **Testing**: Jest
- **Analytics**: Datadog

## 📁 Project Structure

```
apps/web/
├── app/          # Next.js app directory
├── contexts/     # React context providers
├── pages/        # Next.js pages
├── public/       # Static assets
├── src/
│   ├── components/  # React components
│   └── utils/       # Utility functions
├── scripts/     # Build and maintenance scripts
└── tracer/      # Datadog tracer configuration
```

## 🔧 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run tests
- `yarn lint` - Run linter
- `yarn analyze` - Analyze bundle size
- `yarn update-contributors` - Update contributors list
- `yarn fetch-mirror-blog` - Fetch latest blog posts

## 🔑 Environment Variables

Copy `.env.local.example` to `.env.local` and configure the required environment variables before running the application.

## 📚 Documentation

For more detailed documentation about the Base platform, visit the [Base Documentation](https://docs.base.org).

## 🤝 Contributing

Please read the [Contributing Guidelines](../../CONTRIBUTING.md) before submitting any pull requests.

## 📄 License

This project is licensed under the terms specified in the [LICENSE](../../LICENSE.md) file.
