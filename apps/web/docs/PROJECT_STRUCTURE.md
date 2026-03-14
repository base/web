# Base/web Project Structure Overview

This document provides an overview of how the `base/web` repository is organized to help new contributors understand where to find and modify code.

## Repository Structure

```
base/web/
├── apps/
│   ├── base-docs/          # Main documentation site (docs.base.org)
│   ├── bridge/             # Base Bridge application
│   ├── landing/            # Marketing landing pages
│   └── web/                # Main web application (base.org)
│       ├── app/            # Next.js App Router pages
│       ├── components/     # React components
│       ├── docs/           # Documentation files
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utility functions and helpers
│       ├── public/         # Static assets
│       ├── styles/         # Global styles and Tailwind config
│       └── types/          # TypeScript type definitions
├── packages/
│   ├── base-i18n/          # Internationalization utilities
│   ├── base-ui/            # Shared UI component library
│   └── config/             # Shared configuration files
└── tooling/                # Build tools and scripts
```

## Key Directories

### `/apps/web/app`
Contains the Next.js App Router pages using the file-based routing system:
- `page.tsx` - Homepage
- `about/page.tsx` - About page
- `ecosystem/page.tsx` - Ecosystem page
- `developers/page.tsx` - Developers page

### `/apps/web/components`
Reusable React components organized by feature:
- `Layout/` - Layout components (Header, Footer, Navigation)
- `Shared/` - Common UI components (Button, Card, Modal)
- `Home/` - Homepage-specific components

### `/apps/web/lib`
Utility functions and helpers:
- `utils/` - General utility functions
- `api/` - API client functions
- `constants/` - Application constants

### `/apps/base-docs`
Documentation site built with similar structure:
- `docs/` - Markdown documentation files
- `components/` - Documentation-specific components

## Common Development Tasks

### Adding a New Page
1. Create a new directory in `/apps/web/app/[page-name]/`
2. Add `page.tsx` with your React component
3. Update navigation in `/apps/web/components/Layout/Navigation.tsx`

### Adding a Component
1. Create component file in `/apps/web/components/[Category]/`
2. Export from `/apps/web/components/index.ts`
3. Use in pages or other components

### Modifying Documentation
1. Edit files in `/apps/base-docs/docs/`
2. Uses MDX for interactive documentation
3. Automatically deployed to docs.base.org

### Styling
- Uses Tailwind CSS for styling
- Custom theme configuration in `/apps/web/tailwind.config.ts`
- Global styles in `/apps/web/styles/globals.css`

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State**: React hooks and context
- **Build**: Turborepo monorepo setup

## Getting Started

1. Install dependencies: `pnpm install`
2. Run development server: `pnpm dev`
3. Open http://localhost:3000

For more details, see the main [README.md](../../README.md).
