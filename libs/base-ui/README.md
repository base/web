# base-ui

A foundational UI component library for building consistent, accessible interfaces.

## Overview

`base-ui` provides a set of reusable React components that form the basis of the application's design system. This library ensures UI consistency across the project while maintaining accessibility and performance standards.

## Components

The library currently includes:

- **Button**: Customizable button component with primary and secondary variants
- **Select**: Component for dropdown selection interfaces
- **Icon**: Icon component for displaying various UI icons

## Usage

```tsx
import { Button, Select, Icon } from 'base-ui';

// Button example
<Button variant="primary" onClick={handleClick}>
  Submit
</Button>

// Additional components follow similar patterns
```

## Development

This library is actively maintained. When adding new components, ensure they follow the established patterns and meet accessibility standards.

## Dependencies

The library leverages several dependencies including:
- React 18
- Radix UI components
- CLSX for class name composition

## Versioning

Current version: 0.1.1

See [CHANGELOG.md](./CHANGELOG.md) for the version history.
