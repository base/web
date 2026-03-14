# Project Structure

This document provides a high-level overview of how the `base/web` repository is organized to help new contributors understand where to find and make changes.

## Repository Overview

This is a monorepo containing the Base web platform, built as a Next.js application with shared UI components.

```
base/web/
├── apps/           # Application packages
│   ├── web/        # Main base.org website (Next.js app)
│   └── bridge/     # Bridge UI application
├── libs/           # Shared library packages
│   └── base-ui/    # Reusable UI components
├── tools/          # Build and CI tools
└── .github/        # GitHub workflows and templates
```

## Main Applications

### `apps/web/`

The primary Next.js application powering [base.org](https://base.org). Key directories:

- **`app/`** - Next.js App Router pages
  - `(base-org)/` - Main marketing pages (homepage, about, etc.)
  - `(base-org-dark)/` - Dark-themed pages
  - `(basenames)/` - Basename registration and management
  - `(stats)/` - Network statistics and analytics
  - `api/` - API routes
  - `farcaster/` - Farcaster-related pages

- **`src/`** - Source code
  - `components/` - React components organized by feature
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions
  - `abis/` - Smart contract ABIs
  - `addresses/` - Contract addresses by network
  - `styles/` - Global styles and Tailwind config
  - `types/` - TypeScript type definitions

- **`data/`** - Static data files
  - `ecosystem/` - Ecosystem partner data

- **`public/`** - Static assets (images, fonts, etc.)

- **`e2e/`** - End-to-end tests

### `apps/bridge/`

The Bridge UI for transferring assets to and from Base.

## Shared Libraries

### `libs/base-ui/`

Reusable UI components shared across applications. Contains:
- Design system components
- Shared styles and themes
- Common utilities

## Common Change Locations

| What you're changing | Where to look |
|---------------------|---------------|
| Marketing pages | `apps/web/app/(base-org)/` |
| Basename features | `apps/web/app/(basenames)/` |
| Stats/analytics | `apps/web/app/(stats)/` |
| API endpoints | `apps/web/app/api/` |
| UI components | `apps/web/src/components/` or `libs/base-ui/` |
| Smart contract interactions | `apps/web/src/abis/`, `apps/web/src/addresses/` |
| Ecosystem data | `apps/web/data/ecosystem/` |
| Static assets | `apps/web/public/` |

## Technology Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Yarn (with Corepack)
- **Node Version**: Managed via `.nvmrc`

## Getting Started

See the main [README.md](./README.md) for setup instructions.
