#!/bin/bash
# Configuration for allowed repository owners
# This script defines which GitHub organizations/users are allowed to own this repository

ALLOWED_OWNERS=("kushmanmb-org" "kushmanmb")

# Function to validate if an owner is allowed
# Usage: validate_owner "owner-name"
# Returns: 0 if owner is allowed, 1 otherwise
validate_owner() {
  local owner="$1"
  
  if [[ -z "$owner" ]]; then
    echo "Error: No owner specified" >&2
    return 1
  fi
  
  for allowed in "${ALLOWED_OWNERS[@]}"; do
    if [[ "$owner" == "$allowed" ]]; then
      return 0
    fi
  done
  
  echo "Error: Owner '$owner' is not in the allowed list" >&2
  echo "Allowed owners: ${ALLOWED_OWNERS[*]}" >&2
  return 1
}

# If script is executed directly (not sourced), print the allowed owners
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Allowed repository owners:"
  for owner in "${ALLOWED_OWNERS[@]}"; do
    echo "  - $owner"
  done
fi
