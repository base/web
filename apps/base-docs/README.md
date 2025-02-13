# Base Documentation

This is the official documentation site for Base, built using [Docusaurus](https://docusaurus.io/). The documentation covers everything from getting started with Base to advanced development topics.

## ✨ Features

- Comprehensive Base platform documentation
- Interactive tutorials and guides
- API references
- Search functionality powered by Algolia
- Responsive design
- Multi-language support

## 🚀 Getting Started

### Prerequisites

- Node.js (version specified in root `.nvmrc`)
- Yarn package manager
- Git

### Installation

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

3. **Start Development Server**
   ```bash
   yarn workspace @app/base-docs dev
   ```

The site will be available at `http://localhost:3000`.

## 📁 Project Structure

```
apps/base-docs/
├── docs/           # Main documentation content
├── src/           # Source code
│   ├── components/  # React components
│   ├── css/        # Stylesheets
│   └── utils/      # Utility functions
├── static/        # Static assets
├── tutorials/     # Tutorial content
├── base-learn/    # Learning resources
└── scripts/       # Maintenance scripts
```

## 📝 Content Management

### Documentation

- Documentation files are written in MDX format
- Located in the `docs/` directory
- Organized by categories in `sidebars.js`
- Support for code examples, images, and interactive components

### Tutorials

- Tutorial content is in the `tutorials/` directory
- Each tutorial should include:
  - Clear objectives
  - Step-by-step instructions
  - Code examples
  - Expected outcomes

## 🔧 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn serve` - Serve production build locally
- `yarn clear` - Clear build cache
- `yarn write-translations` - Extract translations
- `yarn write-heading-ids` - Update heading IDs

## 🌐 Search Configuration

The documentation uses Algolia for search functionality. Configuration can be found in `algolia.json`.

## 🎨 Customization

- Site configuration: `docusaurus.config.js`
- Navigation structure: `sidebars.js`
- Styling: `src/css/`
- Custom components: `src/components/`

## 🔄 Deployment

The documentation is automatically deployed through our CI/CD pipeline. The deployment configuration can be found in `deploy.yml`.

## 🤝 Contributing

We welcome contributions to the Base documentation! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) before submitting changes.

### Content Guidelines

1. Keep language clear and concise
2. Include practical examples
3. Maintain consistent formatting
4. Update sidebar navigation when adding new pages
5. Test all code examples

## 📄 License

This project is licensed under the terms specified in the [LICENSE](../../LICENSE.md) file.

## 🆘 Support

For questions about the documentation or to report issues:
- Open an issue in the repository
- Join our [Discord community](https://discord.gg/buildonbase)
- Contact the Base team through official channels
