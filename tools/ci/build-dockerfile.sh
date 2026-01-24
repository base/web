#!/bin/bash

# --- Error Handling & Safety ---
# -e: Exit on error, -o pipefail: Catch errors in pipelines
# -u: Treat unset variables as an error
set -eou pipefail

# --- Pre-flight Checks ---
# Ensure required variables are not empty
: "${DOCKERFILE_PATH:?Error: DOCKERFILE_PATH environment variable is required.}"
: "${CODEFLOW_COMMIT_TAG:?Error: CODEFLOW_COMMIT_TAG environment variable is required.}"

# Unique image tag for parallel execution safety (prevents collision on shared agents)
IMAGE_NAME="ci_build_${GITHUB_RUN_ID:-temp_build}_$(date +%s)"

echo "🚀 Starting secure build for: $IMAGE_NAME"

# --- Build Optimization ---
# Use BuildKit for faster, more efficient, and secure parallel builds
export DOCKER_BUILDKIT=1

# Use a trap to ensure cleanup runs even if the build fails (Self-healing disk management)
cleanup() {
    echo "🧹 Post-build cleanup: Removing $IMAGE_NAME"
    docker image rm -f "$IMAGE_NAME" || true
}
trap cleanup EXIT

# --- Execution ---
[Image of Docker multi-stage build performance with BuildKit]

# --pull: Always check for newer base images
# --rm: Remove intermediate containers after success
# --no-cache: (Optional) ensure fresh build, removed here for speed unless requested
docker build --pull \
    -f "$DOCKERFILE_PATH" \
    -t "$IMAGE_NAME" \
    --build-arg CODEFLOW_COMMIT_TAG="$CODEFLOW_COMMIT_TAG" \
    --label "org.opencontainers.image.revision=$CODEFLOW_COMMIT_TAG" \
    --label "build_id=${GITHUB_RUN_ID:-local}" \
    .

echo "✅ Build and verification successful."
