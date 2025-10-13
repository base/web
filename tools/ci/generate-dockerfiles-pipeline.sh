#!/bin/bash
set -eo pipefail

# Bump this to trigger all docker builds
bump=2

echo "--- Updating git branch"

base_branch="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-$BUILDKITE_BRANCH}"

git fetch -f --no-tags origin $base_branch:$base_branch

merge_base=$(git merge-base "$base_branch" HEAD)

echo "Base branch: $base_branch"
echo "Merge base: $merge_base"

# Get a list of changed files
echo "--- Loading changed files"

changed_files=$(git --no-pager diff --name-only --relative "$merge_base" HEAD)

echo "$changed_files"

# Extract Dockerfiles from the codeflow config
echo "--- Extracting builds from Codeflow config"

names=()
files=()

# When parsing with yq, the SteveJobs "None" needs to be filtered out
for name in $(yq '.build.engines.[] | select(has("BaldurECR") or has("BaldurNode")) | to_entries | select(.[].value.autobuild != false) | .[].value.name' .codeflow.yml); do
    names+=("$name")
done

for file in $(yq '.build.engines.[] | select(has("BaldurECR") or has("BaldurNode")) | to_entries | select(.[].value.autobuild != false) | .[].value.path' .codeflow.yml); do
    files+=("$file")
done

echo "Builds: ${#files[@]}"

# Generate a Buildkite pipeline for each Docker build
echo "--- Generating build pipelines"

for i in "${!files[@]}"; do
    build_name="${names[i]}"
    dockerfile_path="${files[i]}"
    project_root=$(dirname "${dockerfile_path:2}")

    echo "$build_name -> $project_root"

    if [[ ! "$project_root" =~ ^apps ]]; then
        echo "    Not an application, skipping"
    elif [[
        # Only run if a file was changed in the project
        "$changed_files" == *"$project_root"* ||
        # Or dependencies have changed
        "$changed_files" == *"yarn.lock"* ||
        # Or these build scripts have changed
        "$changed_files" == *"tools/ci/generate-dockerfiles-pipeline.sh"* ||
        "$changed_files" == *"tools/ci/build-dockerfile.sh"*
    ]]; then
        if [[ -z "$CI" ]]; then
            echo "    Not in CI, skipping"
        else
            export BUILD_NAME="$build_name"
            export DOCKERFILE_PATH="${dockerfile_path}"
            # enable tagging with the github commit SHA while in our build environment
            export CODEFLOW_COMMIT_TAG="commit-$BUILDKITE_COMMIT"

            # Some builds have cpu/memory issues, and k8s is less forgiving
            if [[ $build_name == "app-frontend-docs" || $build_name == "app-two-factor-verify-intl-prod" ]]; then
                # Uses `queue: docker` `resource_class: large` for now
                buildkite-agent pipeline upload .buildkite/docker.template.yml
            else
                buildkite-agent pipeline upload .buildkite/docker-k8s.template.yml
            fi
        fi
    else
        echo "    Project not affected, skipping"
    fi

    echo ""
done
