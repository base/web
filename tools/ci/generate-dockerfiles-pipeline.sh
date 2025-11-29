#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -eo pipefail

# Variable to manually force all Docker builds to run if changed.
FORCE_BUILD_BUMP=2

echo "--- Updating git branch"

# Determine the base branch for comparison (defaults to the current branch if not a PR).
BASE_BRANCH="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-$BUILDKITE_BRANCH}"

# Fetch the base branch content for accurate diffing.
git fetch -f --no-tags origin "$BASE_BRANCH:$BASE_BRANCH"

# Find the common ancestor commit to determine what has truly changed.
MERGE_BASE=$(git merge-base "$BASE_BRANCH" HEAD)

echo "Base branch: $BASE_BRANCH"
echo "Merge base: $MERGE_BASE"

# Get a list of all files changed between the merge base and HEAD.
echo "--- Loading changed files"

# The --relative flag ensures paths are relative to the repository root.
CHANGED_FILES=$(git --no-pager diff --name-only --relative "$MERGE_BASE" HEAD)

echo "$CHANGED_FILES"

# Extract Dockerfile information from the Codeflow config (.codeflow.yml).
echo "--- Extracting auto-build Docker images from Codeflow config"

# Use a single yq command to extract both name and path separated by a delimiter (e.g., ';').
# Filtering: selects 'engines' that have BaldurECR/BaldurNode and 'autobuild' is not false.
BUILD_DATA=$(yq '.build.engines.[] | select(has("BaldurECR") or has("BaldurNode")) | to_entries | select(.[].value.autobuild != false) | .[].value.name + ";" + .[].value.path' .codeflow.yml)

# Check if any build data was extracted
if [ -z "$BUILD_DATA" ]; then
    echo "No auto-build configurations found. Exiting."
    exit 0
fi

# Initialize arrays for build names and Dockerfile paths.
NAMES=()
FILES=()

# Parse the single combined string into two arrays.
IFS=$'\n' # Set internal field separator to newline
for line in $BUILD_DATA; do
    # Read the line separated by ';' into two variables
    NAME=$(echo "$line" | cut -d ';' -f 1)
    FILE=$(echo "$line" | cut -d ';' -f 2)
    NAMES+=("$NAME")
    FILES+=("$FILE")
done
unset IFS # Restore default IFS

echo "Found ${#FILES[@]} auto-build configurations."

# Generate a Buildkite pipeline for each Docker build
echo "--- Generating dynamic build pipelines"

# Standard file paths that, if changed, trigger a rebuild of all affected projects.
CORE_BUILD_FILES="yarn.lock|tools/ci/generate-dockerfiles-pipeline.sh|tools/ci/build-dockerfile.sh"

for i in "${!FILES[@]}"; do
    BUILD_NAME="${NAMES[i]}"
    DOCKERFILE_PATH="${FILES[i]}"
    # Remove the starting './' prefix often found in YAML paths and get the directory.
    PROJECT_ROOT=$(dirname "${DOCKERFILE_PATH:2}")

    echo "Processing: $BUILD_NAME -> $PROJECT_ROOT"

    # Only process files that are located within the 'apps' directory.
    if [[ ! "$PROJECT_ROOT" =~ ^apps ]]; then
        echo "  [SKIP] Not an application directory."
        continue
    fi
    
    # 1. Check if files within the project directory were changed
    IS_PROJECT_AFFECTED=false
    if grep -q "$PROJECT_ROOT" <<< "$CHANGED_FILES"; then
        IS_PROJECT_AFFECTED=true
    fi

    # 2. Check if core build files (dependencies/scripts) were changed
    IS_CORE_AFFECTED=false
    if grep -qE "$CORE_BUILD_FILES" <<< "$CHANGED_FILES"; then
        IS_CORE_AFFECTED=true
    fi

    # Condition to trigger the build:
    # 1. If project-specific files changed OR
    # 2. If core build files (dependencies/scripts) changed
    if $IS_PROJECT_AFFECTED || $IS_CORE_AFFECTED; then
        
        # Ensure we are running within a CI environment before uploading.
        if [[ -z "$CI" ]]; then
            echo "  [SKIP] Not running in CI environment (CI variable is not set)."
        else
            echo "  [BUILD] Project affected or core dependencies changed."

            # Export variables for use in the YAML template later uploaded.
            export BUILD_NAME="$BUILD_NAME"
            export DOCKERFILE_PATH="${DOCKERFILE_PATH}"
            # Enable tagging the image with the GitHub commit SHA.
            export CODEFLOW_COMMIT_TAG="commit-$BUILDKITE_COMMIT"

            # Conditional pipeline upload based on build name (resource class optimization).
            # Apps requiring more resources use the 'large' queue/resource_class.
            if [[ "$BUILD_NAME" == "app-frontend-docs" || "$BUILD_NAME" == "app-two-factor-verify-intl-prod" ]]; then
                buildkite-agent pipeline upload .buildkite/docker.template.yml
            else
                # Default template for standard builds (likely smaller/faster resource class).
                buildkite-agent pipeline upload .buildkite/docker-k8s.template.yml
            fi
        fi
    else
        echo "  [SKIP] Project not affected by changes."
    fi

    echo ""
done
