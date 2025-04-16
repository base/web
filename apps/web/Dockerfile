FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current

ARG TARGETARCH
ENV TARGETARCH=${TARGETARCH:-arm64}

# Install dependencies
# python3 is required for utf-8-validate and bufferutil
RUN apt-get update && apt-get install -y gnupg wget python3 build-essential make -y

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

EXPOSE 3000

# Build at runtime so that we get ENV variables from config service and codeflow
# This allows us to use [Automatic Static Optimization](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization)
CMD ["/repo/apps/web/scripts/startup.sh"]
