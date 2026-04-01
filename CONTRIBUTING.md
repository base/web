# Contributing to Base Web

👍🎉 First off, thank you for considering contributing to Base Web! 🎉👍

The following is a set of guidelines for contributing to Base Web. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Pull Requests](#pull-requests)
- [Coding Conventions](#coding-conventions)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

Before you start contributing, make sure you have configured your Git identity:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

This ensures your commits are properly attributed to you.

## How Can I Contribute?

### Reporting Bugs

1. **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/base/web/issues).

2. If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/base/web/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

1. **Check the [Issues](https://github.com/base/web/issues)** to see if there's someone who has already suggested the same enhancement.

2. If it doesn't exist, [create a new issue](https://github.com/base/web/issues/new). Provide a clear and detailed explanation of the feature you want and why it's important to add.

### Pull Requests

**Important**: Before creating a pull request, please review the [Repository Policy (POLICY.md)](POLICY.md) which outlines branch protection rules, required status checks, and development workflows.

1. **Fork the repository** and create your branch from `master`.

2. **Set up the development environment**:
   ```bash
   yarn          # Install dependencies
   # OR
   make setup    # Install dependencies using Make
   ```

3. **Build System**: Use the parallelized build system for faster development:
   ```bash
   make build    # Build all workspaces in parallel
   make lint     # Run linting
   make test     # Run tests
   make ci       # Run full CI pipeline locally
   ```
   See [BUILD_SYSTEM.md](BUILD_SYSTEM.md) for more details.

4. **Make your changes**: Apply your changes, following the coding conventions described below.

5. **Test your changes**: Run `make ci` to ensure all checks pass locally before submitting.

6. **Commit your changes**: Commit your changes using a descriptive commit message.

7. **Open a Pull Request**: Describe what you did in the pull request description. Mention the issue number if your pull request is related to an existing issue. 

8. **Include Screenshots**: If your pull request includes any visual changes to the project, please include before and after screenshots in your pull request description to help us better understand the changes.

9. **Wait for review**: Once your pull request is opened, it will be reviewed as soon as possible. Changes may be requested, and your responsiveness is appreciated.

## Coding Conventions

- Use clear and descriptive variable names.
- Comment your code where necessary.
- Follow the lint configurations.

---

Feel free to customize this template according to the specific needs and nuances of Base Web. A well-crafted `CONTRIBUTING.md` can help your project attract quality contributions and foster a collaborative community.
