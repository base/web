# Applying Branch Protection Rulesets

This guide provides step-by-step instructions for applying the branch protection rulesets defined in this repository to the GitHub repository.

## Configuration

This repository supports multiple allowed repository owners. The allowed owners are configured in `.github/scripts/allowed-owners.sh`:

```bash
ALLOWED_OWNERS=("kushmanmb-org" "kushmanmb")
```

When applying rulesets, ensure you are working with one of the allowed repository owners.

## Prerequisites

- Repository admin access to a repository owned by one of the allowed owners (e.g., `kushmanmb-org/web` or `kushmanmb/web`)
- GitHub CLI (`gh`) installed (for API method)
- OR access to GitHub web interface

## Method 1: Using GitHub Web Interface (Recommended)

### Step 1: Access Repository Settings

1. Navigate to https://github.com/{OWNER}/{REPO} (e.g., https://github.com/kushmanmb-org/web)
2. Click on **Settings** tab
3. In the left sidebar, click **Rules** → **Rulesets**

### Step 2: Create Master Branch Protection Ruleset

1. Click **New branch ruleset**
2. Configure the following settings:

**General**
- Ruleset Name: `Master Branch Protection`
- Enforcement status: **Active**

**Target branches**
- Add target: `Include default branch` or specifically add `master`

**Branch protections**
- ✅ Restrict deletions
- ✅ Require linear history
- ✅ Require signed commits
- ✅ Require a pull request before merging
  - Required approvals: `1`
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
  - ✅ Require conversation resolution before merging
- ✅ Require status checks to pass
  - ✅ Require branches to be up to date before merging
  - Required checks: Add the following status checks:
    - `build`
    - `test`
    - `e2e`
    - `bearer`
    - `codeql`
- ✅ Block force pushes

**Bypass list**
- Add: `Repository admin` (for emergency situations only)

3. Click **Create** to save the ruleset

### Step 3: Create Release Branch Protection Ruleset

1. Click **New branch ruleset**
2. Configure similar to master, but:

**General**
- Ruleset Name: `Release Branch Protection`

**Target branches**
- Add target: `Include by pattern` → `release/*`

**Branch protections**
- Same as master branch, except:
  - Do NOT enable "Restrict deletions" (releases can be deleted after completion)

**Bypass list**
- Add: `Maintain role` or `Repository admin`

3. Click **Create**

### Step 4: Create Tag Protection Ruleset

1. Click **New tag ruleset**
2. Configure:

**General**
- Ruleset Name: `Tag Protection`
- Enforcement status: **Active**

**Target tags**
- Add target: `Include by pattern` → `v*`

**Tag protections**
- ✅ Restrict deletions
- ✅ Require signed tags

**Bypass list**
- Add: `Maintain role` or `Repository admin`

3. Click **Create**

## Method 2: Using GitHub CLI

If you have the GitHub CLI installed and authenticated:

### Step 1: Authenticate

```bash
gh auth login
```

### Step 2: Create Rulesets via API

```bash
# Navigate to the repository directory
cd /path/to/repo

# Source the allowed owners configuration
source .github/scripts/allowed-owners.sh

# Set your repository owner (must be one of the allowed owners)
REPO_OWNER="kushmanmb-org"  # or "kushmanmb"
REPO_NAME="web"  # your repository name

# Validate the owner is allowed
if ! validate_owner "$REPO_OWNER"; then
  echo "Error: Invalid repository owner"
  exit 1
fi

# Create master branch protection ruleset
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/${REPO_OWNER}/${REPO_NAME}/rulesets \
  --input .github/rulesets/master-branch-protection.json

# Create release branch protection ruleset
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/${REPO_OWNER}/${REPO_NAME}/rulesets \
  --input .github/rulesets/release-branch-protection.json

# Create tag protection ruleset
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/${REPO_OWNER}/${REPO_NAME}/rulesets \
  --input .github/rulesets/tag-protection.json
```

### Step 3: Verify Rulesets

```bash
# List all rulesets using the same variables
gh api /repos/${REPO_OWNER}/${REPO_NAME}/rulesets | jq '.[] | {id, name, target, enforcement}'
```

## Method 3: Using Terraform (For Infrastructure as Code)

If you're managing GitHub infrastructure with Terraform:

```hcl
# main.tf
# Note: Set owner to one of the allowed owners: "kushmanmb-org" or "kushmanmb"

terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "github" {
  owner = "kushmanmb-org"  # or "kushmanmb" - must be one of the allowed owners
}

resource "github_repository_ruleset" "master_protection" {
  repository = "web"  # your repository name
  name       = "Master Branch Protection"
  target     = "branch"
  enforcement = "active"

  conditions {
    ref_name {
      include = ["refs/heads/master"]
      exclude = []
    }
  }

  rules {
    deletion                = true
    non_fast_forward        = true
    required_linear_history = true
    required_signatures     = true

    pull_request {
      required_approving_review_count = 1
      dismiss_stale_reviews_on_push   = true
      require_code_owner_review       = true
      require_last_push_approval      = false
      required_review_thread_resolution = true
    }

    required_status_checks {
      strict_required_status_checks_policy = true
      required_check {
        context = "build"
      }
      required_check {
        context = "test"
      }
      required_check {
        context = "e2e"
      }
      required_check {
        context = "bearer"
      }
      required_check {
        context = "codeql"
      }
    }
  }

  bypass_actors {
    actor_id    = 5
    actor_type  = "RepositoryRole"
    bypass_mode = "always"
  }
}

# Add similar resources for release branches and tags
```

Then apply:

```bash
terraform init
terraform plan
terraform apply
```

## Verification

After applying the rulesets, verify they are working:

1. **Test Branch Protection**:
   ```bash
   # Try to push directly to master (should fail)
   git checkout master
   git commit --allow-empty -m "Test commit"
   git push origin master
   # Expected: Error - protected branch
   ```

2. **Test Pull Request Requirements**:
   - Create a test branch and PR
   - Verify that status checks are required
   - Verify that review is required
   - Try to merge without approval (should fail)

3. **Check Ruleset Status**:
   - Go to Settings → Rules → Rulesets
   - Verify all rulesets show as **Active**
   - Check that the correct branches/tags are targeted

## Troubleshooting

### Issue: Status checks not appearing as required

**Solution**: Ensure the status check names exactly match what your workflows report. Check workflow files in `.github/workflows/` to verify job names.

### Issue: Can't push to master even with bypass permissions

**Solution**: Verify your user has the correct role assigned in the bypass list. Repository admins should be able to bypass when necessary.

### Issue: Rulesets conflict with existing branch protections

**Solution**: Remove old branch protection rules before applying rulesets. Go to Settings → Branches and delete any existing rules.

### Issue: API creation fails with authentication error

**Solution**: Ensure you have:
- Admin access to the repository
- Valid GitHub CLI authentication (`gh auth status`)
- Correct repository name and owner

## Maintenance

### Updating Rulesets

To update an existing ruleset:

1. **Via Web UI**: Navigate to Settings → Rules → Rulesets → Select ruleset → Edit
2. **Via API**: Use PATCH method with the ruleset ID
   ```bash
   gh api \
     --method PATCH \
     -H "Accept: application/vnd.github+json" \
     /repos/kushmanmb-org/web/rulesets/{ruleset_id} \
     --input updated-ruleset.json
   ```

### Reviewing Ruleset Effectiveness

Periodically review:
- Number of bypass requests
- Failed merge attempts due to rules
- Developer feedback on workflow impact
- Security incidents prevented by rules

## Resources

- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Repository POLICY.md](../POLICY.md)

## Support

If you encounter issues applying these rulesets:
1. Check the GitHub Status page for any ongoing issues
2. Review the troubleshooting section above
3. Contact repository maintainers
4. Open an issue in the repository with details about the problem
