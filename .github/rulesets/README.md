# Branch Protection Rulesets

This directory contains the GitHub rulesets configuration for branch protection and repository policies.

## Overview

GitHub Rulesets provide advanced branch protection and repository rules that enforce policies across the repository. These rulesets are defined in JSON format and can be applied through the GitHub UI or API.

## Rulesets in This Repository

1. **`master-branch-protection.json`** - Main branch protection rules
2. **`release-branch-protection.json`** - Release branch protection rules
3. **`tag-protection.json`** - Tag protection rules

## Applying Rulesets

These ruleset configurations serve as documentation and templates. To apply them to the repository:

### Option 1: GitHub Web UI

1. Go to repository Settings → Rules → Rulesets
2. Click "New ruleset" → "New branch ruleset"
3. Use the JSON files as reference to configure rules
4. Apply to appropriate branches

### Option 2: GitHub API

Use the GitHub REST API to create rulesets programmatically:

```bash
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/kushmanmb-org/web/rulesets \
  --input master-branch-protection.json
```

### Option 3: Terraform/Infrastructure as Code

Use GitHub's Terraform provider to manage rulesets:

```hcl
resource "github_repository_ruleset" "master_protection" {
  repository = "web"
  name       = "Master Branch Protection"
  target     = "branch"
  enforcement = "active"
  # ... additional configuration
}
```

## Ruleset Configuration Details

### Master Branch Protection

Applies to: `master` branch

Key Rules:
- Require pull request before merging
- Require at least 1 approving review
- Dismiss stale reviews on push
- Require review from code owners
- Require status checks to pass
- Require branches to be up to date
- Require linear history (no merge commits)
- Require signed commits
- Block force pushes
- Block deletions

### Release Branch Protection

Applies to: `release/*` branches

Similar to master protection with allowances for release management.

### Tag Protection

Applies to: Tags matching `v*.*.*`

Key Rules:
- Block tag deletions
- Require signed tags
- Restrict tag creation to maintainers

## Maintenance

Review and update rulesets:
- When GitHub introduces new ruleset features
- When team workflows change
- Quarterly as part of policy review
- After security audits

## Resources

- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)
- [Repository POLICY.md](../../POLICY.md)
- [Branch Protection Best Practices](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
