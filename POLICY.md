# Repository Policy and Branch Protection Rules

This document outlines the repository policies, branch protection rules, and development workflows for the Base Web project.

## Table of Contents

- [Branch Protection Rules](#branch-protection-rules)
- [Development Workflow](#development-workflow)
- [Code Review Requirements](#code-review-requirements)
- [Security Requirements](#security-requirements)
- [Quality Standards](#quality-standards)
- [Release Process](#release-process)

## Branch Protection Rules

### Protected Branches

The following branches are protected with specific rulesets:

#### `master` Branch (Primary Branch)

The `master` branch is the main production branch and has the highest level of protection:

- **Direct Pushes**: ❌ Disabled - All changes must go through pull requests
- **Force Pushes**: ❌ Disabled - History cannot be rewritten
- **Deletions**: ❌ Disabled - Branch cannot be deleted
- **Required Reviews**: ✅ At least 1 approving review required
- **Dismiss Stale Reviews**: ✅ Enabled - New commits dismiss previous approvals
- **Require Review from Code Owners**: ✅ Enabled - CODEOWNERS must approve changes to their areas
- **Required Status Checks**: ✅ Must pass before merging:
  - `build` - Node.js CI build and lint checks
  - `test` - Jest unit tests
  - `e2e` - End-to-end tests with Playwright
  - `bearer` - Security vulnerability scanning
  - `codeql` - CodeQL security analysis
- **Require Branches to be Up to Date**: ✅ Enabled - Branch must be current with master
- **Require Linear History**: ✅ Enabled - No merge commits allowed (rebase/squash only)
- **Require Signed Commits**: ✅ Enabled - All commits must be GPG/SSH signed
- **Include Administrators**: ✅ Enabled - Rules apply to repository administrators

#### Release Branches (`release/*`)

Release branches follow similar rules with some modifications:

- **Direct Pushes**: ❌ Disabled
- **Force Pushes**: ❌ Disabled
- **Deletions**: ⚠️ Allowed by maintainers after release completion
- **Required Reviews**: ✅ At least 1 approving review required
- **Required Status Checks**: ✅ Same as master branch

#### Development Branches

All other branches should follow best practices but are not automatically protected.

## Development Workflow

### Creating a New Feature or Fix

1. **Create a Branch**: Branch from `master` using a descriptive name
   ```bash
   git checkout master
   git pull origin master
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Changes**: Develop your feature following the coding conventions

3. **Commit Changes**: Use clear, descriptive commit messages
   ```bash
   git add .
   git commit -s -m "feat: add new feature"
   ```
   Note: Use the `-s` flag to sign your commits

4. **Keep Branch Updated**: Regularly sync with master
   ```bash
   git checkout master
   git pull origin master
   git checkout your-branch
   git rebase master
   ```

5. **Push Changes**: Push your branch to the remote repository
   ```bash
   git push origin your-branch
   ```

6. **Create Pull Request**: Open a PR on GitHub
   - Use a clear, descriptive title
   - Fill out the pull request template
   - Link any related issues
   - Include screenshots for UI changes
   - Request reviews from appropriate team members

### Pull Request Requirements

Before a pull request can be merged, it must meet the following criteria:

- ✅ All required status checks pass (build, test, e2e, security scans)
- ✅ At least one approving review from a team member
- ✅ Code owner approval for files they own (see `.github/CODEOWNERS`)
- ✅ All comments and feedback addressed
- ✅ Branch is up to date with master
- ✅ All commits are signed
- ✅ No merge conflicts

## Code Review Requirements

### For Reviewers

When reviewing a pull request, consider:

- **Functionality**: Does the code work as intended?
- **Code Quality**: Is the code clean, readable, and maintainable?
- **Tests**: Are there adequate tests covering the changes?
- **Performance**: Are there any performance concerns?
- **Security**: Are there any security vulnerabilities?
- **Documentation**: Is documentation updated if needed?
- **Breaking Changes**: Are breaking changes clearly documented?

### Review Response Times

- **Initial Review**: Within 2 business days
- **Follow-up Reviews**: Within 1 business day
- **Critical Fixes**: Same day (when possible)

## Security Requirements

### Commit Signing

All commits must be signed with GPG or SSH keys:

```bash
# Configure Git to sign commits by default
git config --global commit.gpgsign true
git config --global user.signingkey YOUR_KEY_ID
```

See [GitHub's documentation on signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification) for setup instructions.

### Security Scanning

All pull requests are automatically scanned for:

- **Code Vulnerabilities**: Bearer security scanner checks for common security issues
- **Code Quality Issues**: CodeQL analyzes code for potential bugs and vulnerabilities
- **Dependency Vulnerabilities**: Dependabot automatically checks for vulnerable dependencies

### Handling Security Issues

If you discover a security vulnerability:

1. **Do Not** open a public issue
2. **Do** follow responsible disclosure practices
3. Contact the maintainers privately through appropriate channels
4. Allow time for the issue to be fixed before public disclosure

## Quality Standards

### Code Style

- Follow the ESLint configuration (`.eslintrc.js`)
- Use Prettier for code formatting (`.prettierrc.js`)
- Write clear, self-documenting code with appropriate comments

### Testing

- **Unit Tests**: Write unit tests for business logic
- **Integration Tests**: Test component interactions
- **E2E Tests**: Add end-to-end tests for critical user flows
- **Test Coverage**: Aim for high test coverage on critical code paths

### Build Requirements

Before submitting a pull request:

```bash
# Run the full CI pipeline locally
make ci

# Or run individual checks
make lint      # Check code style
make build     # Build all workspaces
make test      # Run unit tests
```

## Release Process

### Version Management

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Creating a Release

1. **Create Release Branch**:
   ```bash
   git checkout master
   git pull origin master
   git checkout -b release/v1.2.3
   ```

2. **Update Version**: Update version numbers in relevant files

3. **Update Changelog**: Document all changes since last release

4. **Create Pull Request**: Open PR for release branch to master

5. **Tag Release**: After merging, tag the release:
   ```bash
   git checkout master
   git pull origin master
   git tag -s v1.2.3 -m "Release version 1.2.3"
   git push origin v1.2.3
   ```

6. **GitHub Release**: Create a GitHub release with release notes

## Enforcement

These policies are enforced through:

- **GitHub Branch Protection Rules**: Technical enforcement at the repository level
- **GitHub Rulesets**: Advanced rules for branch protection and workflows
- **Automated Checks**: CI/CD workflows that must pass before merging
- **Code Review**: Human review to ensure quality and correctness

## Exceptions

In rare cases, exceptions to these policies may be granted:

- Emergency security fixes may bypass normal review requirements
- Repository administrators can override protections in exceptional circumstances
- All exceptions should be documented and reviewed retrospectively

## Updates to This Policy

This policy document should be reviewed and updated:

- Quarterly as part of regular maintenance
- When GitHub introduces new branch protection features
- When team workflows or requirements change
- When security best practices evolve

To propose changes to this policy:

1. Open an issue describing the proposed change and rationale
2. If approved, submit a pull request updating this document
3. Changes require review and approval from repository maintainers

## Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Workflow Best Practices](.github/WORKFLOWS_BEST_PRACTICES.md)

---

**Last Updated**: February 2026  
**Policy Version**: 1.0.0
