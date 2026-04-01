# Build System Documentation

This document describes the parallelized build system for the Base Web monorepo.

## Overview

The build system has been enhanced with the following improvements:
- **Makefile**: Centralized build orchestration with parallel execution
- **Parallelized CI**: Independent jobs run concurrently in CI/CD pipelines
- **Code Safety**: Integrated security scanning and dependency auditing
- **Consistent Interface**: Same commands work locally and in CI

## Makefile Targets

The project now includes a Makefile with the following targets:

### Primary Targets

- `make help` - Display all available targets with descriptions
- `make setup` - Install dependencies with Yarn
- `make build` - Build all workspaces in parallel (excluding bridge)
- `make lint` - Run linting on all workspaces in parallel
- `make test` - Run all tests (alias for test-unit)
- `make test-unit` - Run unit tests in parallel
- `make test-e2e` - Run end-to-end tests
- `make clean` - Clean build artifacts and caches

### CI/Security Targets

- `make security-scan` - Run Bearer security scanner (if installed)
- `make audit` - Run yarn audit for dependency vulnerabilities
- `make ci` - Run the full CI pipeline locally (setup, lint, test, build, security checks)
- `make all` - Build and test everything

## Parallel Execution

The Makefile automatically detects the number of CPU cores available and runs tasks in parallel where possible:

- Uses 75% of available CPU cores by default to avoid overloading the system
- `yarn workspaces foreach --parallel` is used for workspace operations
- Build, lint, and test operations run concurrently across workspaces
- Can be customized via the `MAKE_JOBS` environment variable

### Customizing Parallelism

```bash
# Use all available cores
MAKE_JOBS=$(nproc) make build

# Limit to 2 parallel jobs
MAKE_JOBS=2 make build

# Or use Make's -j flag directly
make -j2 build
```

## CI/CD Pipelines

### Buildkite Pipeline

The Buildkite pipeline (`.buildkite/pipeline.yml`) now runs jobs in parallel:

1. **Build** - Builds all workspaces
2. **Lint** - Runs linting checks
3. **Unit Tests** - Runs unit tests
4. **Security Audit** - Audits dependencies (soft fail)

All jobs run concurrently, followed by a summary step after completion.

### GitHub Actions

The GitHub Actions workflows have been updated:

#### Node.js CI (`.github/workflows/node.js.yml`)
- **lint** job - Runs linting in parallel
- **build** job - Runs build in parallel
- **audit** job - Runs security audit in parallel (allowed to fail)

#### Unit Tests (`.github/workflows/main.yml`)
- **Jest** job - Runs unit tests

All jobs run independently and concurrently.

## Local Development

### Quick Start

```bash
# Install dependencies
make setup

# Run full build and test
make all

# Run individual tasks
make build
make lint
make test

# Run CI pipeline locally
make ci
```

### Parallel Execution

By default, the Makefile uses all available CPU cores. To limit parallelism:

```bash
# Use 4 jobs maximum
make -j4 build
```

## Code Safety Features

### Dependency Auditing

The `make audit` target runs `yarn npm audit` to check for known vulnerabilities in dependencies:

```bash
make audit
```

This is integrated into:
- Buildkite pipeline (soft fail)
- GitHub Actions workflow (continue on error)
- Local CI run (`make ci`)

### Security Scanning

The `make security-scan` target runs Bearer security scanner when available:

```bash
make security-scan
```

Bearer scans code for security issues and best practice violations.

### GitHub Security Features

The repository also uses:
- **Bearer Workflow** (`.github/workflows/bearer.yml`) - Scheduled security scans
- **CodeQL** integration - Can be added via `.github/workflows/codeql.yml`

## Performance

The parallelized build system provides significant performance improvements:

- **Local builds**: Up to N× faster (where N = number of CPU cores)
- **CI builds**: Independent jobs run concurrently, reducing total pipeline time
- **Efficient caching**: Yarn cache is preserved between builds

## Troubleshooting

### Build Failures

If a build fails:

```bash
# Clean and rebuild
make clean
make build
```

### Parallel Execution Issues

If parallel execution causes issues:

```bash
# Run serially
make -j1 build
```

### Missing Dependencies

```bash
# Reinstall dependencies
make clean
make setup
```

## Migration Guide

For developers familiar with the old build process:

| Old Command | New Command |
|-------------|-------------|
| `yarn build` | `make build` |
| `yarn lint` | `make lint` |
| `yarn test` | `make test` |
| `yarn workspaces foreach run build` | `make build` |

The old commands still work, but using `make` provides:
- Better parallelization
- Consistent behavior across environments
- Additional safety checks

## Future Enhancements

Potential improvements:
- Add incremental build support with Nx or Turborepo
- Integrate CodeQL scanning into Makefile
- Add performance benchmarking
- Cache build artifacts between CI runs
