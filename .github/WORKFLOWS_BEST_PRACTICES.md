# GitHub Actions Workflows Best Practices

This document outlines the best practices implemented in our GitHub Actions workflows and provides guidance for maintaining and creating new workflows.

## Best Practices Applied

### 1. Action Version Updates

All workflows now use the latest stable versions of GitHub Actions:
- `actions/checkout@v4` (previously v3)
- `actions/setup-node@v4` (previously v3)

**Why:** Using the latest versions ensures we benefit from security updates, bug fixes, and new features.

### 2. Permissions Management

All workflows now explicitly define permissions using the `permissions` key:

```yaml
permissions:
  contents: read
```

**Why:** Following the principle of least privilege, workflows should only have the permissions they need. This reduces security risks if a workflow is compromised.

### 3. Concurrency Control

All workflows now include concurrency groups:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

**Why:** This prevents multiple instances of the same workflow from running simultaneously on the same branch, saving CI/CD resources and preventing race conditions.

**Special cases:**
- For security scans (Bearer), we conditionally cancel: `cancel-in-progress: ${{ github.event_name == 'pull_request' }}`
- For scheduled jobs (Algolia), we don't cancel: `cancel-in-progress: false`

### 4. Job Timeouts

All jobs now have explicit timeout values:

```yaml
jobs:
  job-name:
    timeout-minutes: 30
```

**Timeout values by workflow type:**
- Unit tests: 20 minutes
- Build/Lint: 30 minutes
- E2E tests: 60 minutes
- File size checks: 10 minutes
- Security scans: 15 minutes
- Scheduled updates: 20 minutes

**Why:** Prevents runaway processes from consuming CI/CD resources indefinitely.

### 5. Workflow Structure Consistency

All workflows follow a consistent structure:
1. Name and description
2. Trigger events (`on:`)
3. Permissions
4. Concurrency control
5. Jobs with timeouts
6. Steps

## Workflow Descriptions

### node.js.yml - Node.js CI
- **Purpose:** Builds and lints the codebase
- **Triggers:** Push and pull requests to master
- **Timeout:** 30 minutes

### main.yml - Unit Tests
- **Purpose:** Runs Jest unit tests
- **Triggers:** Push and pull requests to master
- **Timeout:** 20 minutes

### e2e-tests.yml - E2E Tests
- **Purpose:** Runs end-to-end tests with Playwright
- **Triggers:** Push and pull requests to master
- **Timeout:** 60 minutes

### bearer.yml - Bearer Security Scanning
- **Purpose:** Scans code for security vulnerabilities
- **Triggers:** Push, pull requests, and weekly schedule
- **Timeout:** 15 minutes

### file-size-checker.yml - File Size Checker
- **Purpose:** Validates file sizes in pull requests
- **Triggers:** Pull request opened or synchronized
- **Timeout:** 10 minutes

### update-algolia.yml - Update Algolia Search
- **Purpose:** Updates Algolia search indices
- **Triggers:** Manual dispatch and weekday schedule
- **Timeout:** 20 minutes

## Composite Actions

### setup-node-yarn
- **Location:** `.github/actions/setup-node-yarn/action.yml`
- **Purpose:** Provides a reusable action for setting up Node.js with Yarn
- **Features:**
  - Sets up Node.js with specified version (default: 24.x)
  - Enables Yarn caching for faster installs
  - Enables Corepack for proper Yarn version management
  - Installs dependencies with `yarn`
- **Usage:**
  ```yaml
  steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js with Yarn
      uses: ./.github/actions/setup-node-yarn
      with:
        node-version: 24.x
  ```

## Guidelines for Creating New Workflows

When creating a new workflow, ensure you:

1. **Use latest action versions**
   - Check [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) for latest versions

2. **Define minimal permissions**
   - Start with `contents: read` and only add additional permissions as needed

3. **Add concurrency control**
   - Use `${{ github.workflow }}-${{ github.ref }}` as the group
   - Set `cancel-in-progress: true` for most workflows
   - Set `cancel-in-progress: false` only for critical scheduled jobs

4. **Set appropriate timeouts**
   - Add `timeout-minutes` to prevent runaway jobs
   - Choose values based on typical job duration plus buffer

5. **Use caching**
   - Enable caching for dependencies (e.g., `cache: 'yarn'` in setup-node)

6. **Use reusable composite actions**
   - Use `./.github/actions/setup-node-yarn` for Node.js setup with Yarn
   - This composite action handles Node.js setup, Corepack enablement, and dependency installation
   - Note: Checkout step is still needed before using this action

7. **Add workflow_dispatch when appropriate**
   - Allow manual triggering for debugging and ad-hoc runs

8. **Document the workflow**
   - Add comments explaining what the workflow does
   - Update this document with new workflows

## Security Considerations

- Never commit secrets or sensitive data
- Use GitHub Secrets for API keys and tokens
- Review third-party actions before use
- Pin third-party actions to specific commits for security
- Regularly update action versions
- Keep permissions minimal

## Maintenance

- Review workflows quarterly for updates
- Update action versions when new releases are available
- Monitor workflow run times and adjust timeouts if needed
- Check GitHub's changelog for Actions updates

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
