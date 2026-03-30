# Contributing to Base Web

👍🎉 First off, thank you for considering contributing to Base Web! 🎉👍

The following is a set of guidelines for contributing to Base Web. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Pull Requests](#pull-requests)
- [Development Guidelines](#development-guidelines)
    - [Coding Conventions](#coding-conventions)
    - [Git Workflow](#git-workflow)
    - [Testing Guidelines](#testing-guidelines)
    - [Code Review Process](#code-review-process)
- [Project Structure](#project-structure)
- [Common Tasks](#common-tasks)

## Quick Start

If you're new to the project, here's how to get started:

1. **Fork and clone** the repository
2. **Set up your development environment** (see [Development Setup](#development-setup))
3. **Make your changes** following our [guidelines](#development-guidelines)
4. **Test your changes** thoroughly
5. **Submit a pull request** using our [template](.github/pull_request_template.md)

## Development Setup

### Prerequisites

- **Node.js 20+** - Use [nvm](https://github.com/nvm-sh/nvm) for version management
- **Yarn 1.22+** - Package manager
- **Git** - Version control

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/web.git
cd web

# Install dependencies
yarn install

# Copy environment variables
cp env.example .env.local

# Start development server
yarn workspace @app/web dev
```

### Environment Variables

Copy `env.example` to `.env.local` and configure the necessary variables for your development environment. See the [README.md](README.md#environment-variables) for details.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

1. **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/base/web/issues).

2. If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/base/web/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

1. **Check the [Issues](https://github.com/base/web/issues)** to see if there's someone who has already suggested the same enhancement.

2. If it doesn't exist, [create a new issue](https://github.com/base/web/issues/new). Provide a clear and detailed explanation of the feature you want and why it's important to add.

### Pull Requests

1. **Fork the repository** and create your branch from `master`.

2. **Make your changes**: Apply your changes, following the coding conventions described below.

3. **Commit your changes**: Commit your changes using a descriptive commit message.

4. **Open a Pull Request**: Describe what you did in the pull request description. Mention the issue number if your pull request is related to an existing issue. 

5. **Include Screenshots**: If your pull request includes any visual changes to the project, please include before and after screenshots in your pull request description to help us better understand the changes.

6. **Wait for review**: Once your pull request is opened, it will be reviewed as soon as possible. Changes may be requested, and your responsiveness is appreciated.

## Development Guidelines

### Coding Conventions

#### TypeScript/JavaScript
- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **descriptive variable names** and **clear function names**
- Add **JSDoc comments** for complex functions and public APIs
- Prefer **functional components** with hooks over class components

#### React/Next.js
- Use **Next.js 15 App Router** conventions
- Implement **proper error boundaries** and **loading states**
- Follow **React best practices** (proper key props, avoid inline functions in JSX)
- Use **Tailwind CSS** for styling with our design system
- Implement **responsive design** for all components

#### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

### Git Workflow

#### Branch Naming
- **Feature branches**: `feature/description` (e.g., `feature/user-authentication`)
- **Bug fixes**: `fix/description` (e.g., `fix/login-validation`)
- **Hotfixes**: `hotfix/description` (e.g., `hotfix/security-patch`)
- **Documentation**: `docs/description` (e.g., `docs/api-documentation`)

#### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

Examples:
- `feat(auth): add user authentication system`
- `fix(ui): resolve button alignment issue`
- `docs(readme): update installation instructions`
- `refactor(api): simplify user data fetching`

### Testing Guidelines

#### Unit Tests
- Write tests for all new components and utilities
- Aim for **80%+ code coverage**
- Use **React Testing Library** for component tests
- Mock external dependencies appropriately

#### End-to-End Tests
- Add E2E tests for critical user flows
- Use **Playwright** for browser automation
- Test across different browsers and devices
- Include accessibility testing

#### Running Tests
```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test with coverage
yarn test --coverage

# Watch mode for development
yarn test --watch
```

### Code Review Process

#### Before Submitting
- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation updated (if needed)
- [ ] Screenshots included (for UI changes)

#### Review Checklist
- [ ] Code is readable and well-commented
- [ ] No security vulnerabilities
- [ ] Performance implications considered
- [ ] Accessibility standards met
- [ ] Cross-browser compatibility verified

## Project Structure

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
└── .github/                # GitHub templates and workflows
```

## Common Tasks

### Adding a New Component

1. Create component file in appropriate directory
2. Add TypeScript types and interfaces
3. Implement component with proper styling
4. Add unit tests
5. Export from appropriate index file
6. Update documentation

### Adding a New Page

1. Create page in `apps/web/app/` directory
2. Follow Next.js 15 App Router conventions
3. Add proper metadata and SEO
4. Implement responsive design
5. Add E2E tests for critical flows

### Updating Dependencies

1. Update package.json files
2. Run `yarn install` to update lock file
3. Test that everything still works
4. Update documentation if needed
5. Submit PR with clear description of changes

### Database Changes

1. Create migration files
2. Update TypeScript types
3. Test migrations on local database
4. Update API endpoints if needed
5. Document breaking changes

---

## Getting Help

- **Discord**: Join our [Base Discord](https://base.org/discord) and ask in `#developer-chat`
- **Issues**: Create a [GitHub issue](https://github.com/base/web/issues) for bugs or feature requests
- **Discussions**: Use [GitHub Discussions](https://github.com/base/web/discussions) for questions

Thank you for contributing to Base Web! 🚀
