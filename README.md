![Base](logo.webp)

# Base Web

Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users onchain. It's built on Optimism's open-source [OP Stack](https://stack.optimism.io/).

<!-- Badge row 1 - status -->
[![GitHub contributors](https://img.shields.io/github/contributors/base/web)](https://github.com/base/web/graphs/contributors)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/base/web)](https://github.com/base/web/graphs/contributors)
[![GitHub Stars](https://img.shields.io/github/stars/base/web.svg)](https://github.com/base/web/stargazers)
![GitHub repo size](https://img.shields.io/github/repo-size/base/web)
[![GitHub](https://img.shields.io/github/license/base/web?color=blue)](https://github.com/base/web/blob/master/LICENSE.md)

<!-- Badge row 2 - links and profiles -->
[![Website base.org](https://img.shields.io/website-up-down-green-red/https/base.org.svg)](https://base.org)
[![Blog](https://img.shields.io/badge/blog-up-green)](https://base.mirror.xyz/)
[![Docs](https://img.shields.io/badge/docs-up-green)](https://docs.base.org/)
[![Discord](https://img.shields.io/discord/1067165013397213286?label=discord)](https://base.org/discord)
[![Twitter Base](https://img.shields.io/twitter/follow/Base?style=social)](https://twitter.com/Base)

<!-- Badge row 3 - detailed status -->
[![GitHub pull requests by-label](https://img.shields.io/github/issues-pr-raw/base/web)](https://github.com/base/web/pulls)
[![GitHub Issues](https://img.shields.io/github/issues-raw/base/web.svg)](https://github.com/base/web/issues)

## Setup

1. Ensure that `nvm` is [installed](https://github.com/nvm-sh/nvm#install--update-script).
2. Clone the repository.
3. If `nvm` doesn't auto-load the Node.js environment when changing to the repo directory, run `nvm use`.
4. Enable Yarn by running `corepack enable`.

## Getting started

After cloning the repository begin by installing dependencies at the root.

```shell
yarn
yarn build
```

## Local development

To start a development server on localhost, run `yarn workspace @app/<project> dev`.

For example, to start the `web` app locally, you would run `yarn workspace @app/web dev`.

## Projects

There are three projects which can be run individually.

### Web

```
yarn workspace @app/web dev
```

## Contributing

We welcome contributions to Base! For guidelines on how to contribute please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

### Updating the Base Ecosystem Page

If you're a builder who wants to add or update your project on the [Base Ecosystem](https://base.org/ecosystem) page, follow these steps:

1. Fork this repository.
2. Create a new branch for your changes.
3. Update the `ecosystem.json` file in `apps/web/src/data/` with your project's details.

<!-- Contributor activity for Base -->
