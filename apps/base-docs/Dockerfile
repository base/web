FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current

RUN apt-get update && apt-get install -y zip

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

ENV NODE_ENV=production
RUN yarn workspace @app/base-docs build
RUN yarn workspaces focus --all --production

EXPOSE 3000
CMD ["yarn", "dlx", "serve", "-s", "apps/base-docs/docs/dist", "-p", "3000"]
