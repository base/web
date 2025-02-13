#!/bin/bash
set -euo pipefail

echo "--- Installing yarn dependencies"

# Disable global cache so that we can cache `.yarn/cache` in buildkite
yarn config set enableGlobalCache false

# Check for lockfile before running yarn --immutable
if [[ -f yarn.lock ]]; then
    echo "--- Verifying lockfile integrity"
    yarn --immutable || { echo "Lockfile validation failed! Ensure your lockfile is up to date."; exit 1; }
else
    echo "Error: yarn.lock file not found. Aborting."
    exit 1
fi

# Need to ensure base branch is up-to-date
BASE_BRANCH="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-$BUILDKITE_BRANCH}"
if [[ -z "$BASE_BRANCH" ]]; then
    echo "Error: Unable to determine base branch. Ensure BUILDKITE_BRANCH is set."
    exit 1
fi

echo "--- Updating local '$BASE_BRANCH' base branch"

# Required for correct Nx affected project resolution
if git fetch -f --no-tags origin "$BASE_BRANCH:$BASE_BRANCH"; then
    echo "--- Successfully updated '$BASE_BRANCH'"
else
    echo "Error: Failed to fetch base branch '$BASE_BRANCH'. Ensure it exists in the remote repository."
    exit 1
fi

echo "--- Building required packages"
if yarn build; then
    echo "--- Build completed successfully"
else
    echo "Error: Build failed. Check the logs for details."
    exit 1
fi
