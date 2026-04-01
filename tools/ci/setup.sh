#!/bin/bash
set -eo pipefail

echo "--- Configuring git"
git config --global user.name "${GIT_AUTHOR_NAME:-Base CI}"
git config --global user.email "${GIT_AUTHOR_EMAIL:-ci@base.org}"

echo "--- Installing yarn dependencies"

# Disable global cache so that we can cache `.yarn/cache` in buildkite
yarn config set enableGlobalCache false

# Immutable is the same as a frozen lockfile
yarn --immutable

# Need to ensure base branch is up-to-date. If not running on a PR, use `BUILDKITE_BRANCH`
BASE_BRANCH=$BUILDKITE_PULL_REQUEST_BASE_BRANCH
if [[ -z "$BASE_BRANCH" ]]; then
    BASE_BRANCH=$BUILDKITE_BRANCH
fi

echo "--- Updating local '$BASE_BRANCH' base branch"

# Required for correct Nx affected project resolution
git fetch -f --no-tags origin $BASE_BRANCH:$BASE_BRANCH

echo "--- Building required packages"

yarn build