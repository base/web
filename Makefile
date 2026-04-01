.PHONY: help setup build lint test test-unit test-e2e clean security-scan audit all ci

# Default target
.DEFAULT_GOAL := help

# Detect number of CPU cores for parallel execution
# Use 75% of available cores to avoid overloading the system
# Can be overridden with MAKE_JOBS environment variable
NPROC := $(shell nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)
MAKE_JOBS ?= $(shell echo $$(($(NPROC) * 3 / 4)))
MAKEFLAGS += --jobs=$(MAKE_JOBS)

help: ## Display this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Install dependencies
	@echo "Installing dependencies..."
	yarn config set enableGlobalCache false
	yarn --immutable

build: ## Build all workspaces (excluding bridge)
	@echo "Building workspaces..."
	yarn workspaces foreach --parallel --exclude @app/bridge run build

lint: ## Run linting on all workspaces
	@echo "Running linters..."
	yarn workspaces foreach --parallel --exclude @app/bridge run lint

test-unit: ## Run unit tests
	@echo "Running unit tests..."
	yarn workspaces foreach --parallel --exclude @app/bridge run test

test-e2e: ## Run end-to-end tests
	@echo "Running e2e tests..."
	yarn workspace @app/web test:e2e

test: test-unit ## Run all tests

security-scan: ## Run security scanning with Bearer
	@echo "Running security scan..."
	@command -v bearer >/dev/null 2>&1 || { echo "Bearer not installed. Skipping..."; exit 0; }
	bearer scan . --format sarif --output results.sarif --exit-code 0 || true

audit: ## Run yarn audit for dependency vulnerabilities
	@echo "Auditing dependencies..."
	yarn npm audit --all --recursive || true

clean: ## Clean build artifacts and caches
	@echo "Cleaning build artifacts..."
	yarn workspaces foreach --parallel run clean || true
	rm -rf .yarn/cache/*
	rm -rf node_modules/.cache
	find . -type d \( -name "dist" -o -name "build" -o -name ".next" \) | grep -v node_modules | xargs rm -rf

ci: setup lint test-unit build security-scan audit ## Run full CI pipeline locally

all: setup build lint test ## Build and test everything
