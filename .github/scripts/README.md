# GitHub Scripts

This directory contains utility scripts for GitHub repository management.

## allowed-owners.sh

Configuration script that defines the allowed repository owners for this project.

### Configuration

```bash
ALLOWED_OWNERS=("kushmanmb-org" "kushmanmb")
```

### Usage

#### 1. Direct Execution

Run the script directly to list allowed owners:

```bash
.github/scripts/allowed-owners.sh
```

Output:
```
Allowed repository owners:
  - kushmanmb-org
  - kushmanmb
```

#### 2. Source in Other Scripts

Source the script to use the `ALLOWED_OWNERS` variable and `validate_owner` function:

```bash
#!/bin/bash
source .github/scripts/allowed-owners.sh

# Use the ALLOWED_OWNERS array
echo "Allowed owners: ${ALLOWED_OWNERS[@]}"

# Validate an owner
if validate_owner "kushmanmb-org"; then
  echo "Owner is valid"
else
  echo "Owner is not allowed"
  exit 1
fi
```

### Example: Applying Rulesets

```bash
#!/bin/bash
# Source the configuration
source .github/scripts/allowed-owners.sh

# Set repository variables
REPO_OWNER="kushmanmb-org"
REPO_NAME="web"

# Validate owner before proceeding
if ! validate_owner "$REPO_OWNER"; then
  echo "Error: $REPO_OWNER is not an allowed owner"
  exit 1
fi

# Proceed with GitHub API calls
gh api /repos/${REPO_OWNER}/${REPO_NAME}/rulesets
```

### API Reference

#### Variables

- `ALLOWED_OWNERS` - Bash array containing allowed repository owner names

#### Functions

##### validate_owner

Validates if an owner is in the allowed list.

**Parameters:**
- `$1` - Owner name to validate

**Returns:**
- `0` - Owner is allowed
- `1` - Owner is not allowed or not specified

**Example:**
```bash
if validate_owner "kushmanmb"; then
  echo "Valid owner"
fi
```

## Maintenance

When adding or removing allowed owners:

1. Edit the `ALLOWED_OWNERS` array in `allowed-owners.sh`
2. Update documentation in `.github/rulesets/APPLY_RULESETS.md` if needed
3. Test the changes:
   ```bash
   source .github/scripts/allowed-owners.sh
   validate_owner "new-owner"
   ```
