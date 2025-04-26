![Base](logo.webp)

# Base Web

[Base](https://www.base.org/) is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users onchain. It's built on Optimism's open-source [OP Stack](https://stack.optimism.io/).

<!-- Badge row 1 - status -->

[![GitHub contributors](https://img.shields.io/github/contributors/base/web)](https://github.com/base/web/graphs/contributors)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/base/web)](https://github.com/base/web/graphs/contributors)
[![Github forks](https://img.shields.io/github/forks/base/web.svg)](https://github.com/base/web/network/members)
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

### Docs

```
yarn workspace @app/base-docs dev
```

### Bridge

```
yarn workspace @app/bridge dev
```

## Contributing

We welcome contributions to Base! For guidelines on how to contribute please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

### Updating the Base Ecosystem Page

If you're a builder who wants to add or update your project on the [Base Ecosystem](https://base.org/ecosystem) page, follow these steps:

1. Fork this repository.

2. Create a new branch for your changes.

3. Create a directory for your project under `apps/web/src/data/ecosystem/` using a URL-safe version of your project name:

   ```bash
   mkdir apps/web/src/data/ecosystem/your-project-name
   ```

Project names must be unique. If a project with your name already exists, please reach out to us on Discord.

4. Create a metadata.json file in your project directory:

   ```json
   {
     "name": "Your Project Name",
     "description": "A brief description (less than 200 characters)",
     "url": "https://your-project.com",
     "imageUrl": "/images/partners/your-logo.png",
     "category": "one of: ai, consumer, defi, infra, onramp, wallet",
     "subcategory": "see categories below"
   }
   ```

   - name: Your project's name
   - description: A brief description of your project, must be less than 200 characters
   - url: Your project's website URL
   - imageUrl: Path to your project's logo image
   - category: Your project's category, _one_ of: `ai`, `consumer`, `defi`, `infra`, `onramp`, `wallet`
   - subcategory: Your project's subcategory, with the following options associated with each category
     - `ai`: Simply add `ai` as the subcategory as well
     - `consumer`: _One_ of `creator`, `crypto taxes`, `dao`, `gaming`, `messaging`, `music`, `nft`, `payments`, `real world`, `social`
     - `defi`: _One_ of `dex`, `dex aggregator`, `insurance`, `lending/borrowing`, `liquidity management`, `portfolio`, `stablecoin`, `yield vault`
     - `infra`: _One_ of `bridge`, `data`, `depin`, `developer tool`, `identity`, `node provider`, `raas`, `security`
     - `onramp`: _One_ of `centralized exchange`, `fiat on-ramp`
     - `wallet`: _One_ of `account abstraction`, `multisig`, `self-custody`

If your app supports multiple networks, ensure the URL provided points to a page
with Base already selected as the network, for people who will be visiting from
base.org.

5. Add your project's logo:
   - Place a 192x192 pixel PNG/WebP file in `apps/web/public/images/partners/`
   - Name should match what you specified in imageUrl
   - Use an App/Play Store style icon (not a full wordmark)

By opening a PR to add your project, you authorize and license Coinbase on a non-exclusive, worldwide, irrevocable, sublicensable, and royalty-free basis to reproduce, distribute, transmit, make available, perform, display, or otherwise use the submitted Multimedia Assets for any purpose, including any marketing or promotional activities related to Base or Coinbase. Any goodwill associated with use of trademarks submitted in your Multimedia Assets will inure to your benefit. You further acknowledge and represent that you have all IP rights in the Multimedia Assets, that the Multimedia Assets do not infringe the rights of any third party, and that you have the right to grant this license to Coinbase.

**Note:** Submissions do not guarantee inclusion and all submissions are subject to review. Your project must be live on Base to potentially be included. Ensure all information is accurate and up-to-date.

#### Submission requirements

- App content adheres to the [Base Editorial Style Guide](https://github.com/base/brand-kit/blob/main/guides/editorial-style-guide.md)
- App has been live on Base for at least 30 days
- App has a Terms of Service and Privacy Policy
- App supports HTTPS and 301 redirects HTTP requests
- App is not a TGE (Token Generation Event), ICO (Initial Coin Offering), airdrop, claim, or similar
- Landing page is a Base-specific page for users who will be coming from base.org
- Active development and community engagement can be observed without issue

---

If you have any questions, please reach out to us in #developer-chat in the [Base Discord](https://base.org/discord).
