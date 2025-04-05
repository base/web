This is a [Vocs](https://vocs.dev) project bootstrapped with the Vocs CLI.

# Creating New Docs

You can create a new doc by adding a `.md` or `.mdx` file in
`apps/base-docs/docs/pages`.

The URL path for your doc will map to the file location. For instance, `bounty.mdx`
is found within `chain/security`. So the URL for this link will be:
`docs.base.org/chain/security/bounty`.


# Running Docs Locally

Follow these steps to run Base-Docs locally:

1. Make sure you have installed all dependencies by running `yarn install` at
the top-level of the monorepo

2. Start the base-docs workspace with the following command: `yarn workspace @app/base-docs dev`


# Building Docs Locally

Follow these steps to build Base-Docs locally:

1. Make sure you have installed all dependencies by running `yarn install` at
the top-level of the monorepo

2. Navigate into the base-docs service and then build the Vocs site:
```
cd apps/base-docs
yarn build
```

3. Start the local build: `yarn preview`


# Troubleshooting

You may encounter the following error:
```
TypeError: Cannot destructure property 'CookieBanner' of 'pkg' as it is undefined.
```

To resolve this:
1. navigate to `apps/base-docs/docs/contexts/CookieBannerWrapper.tsx`

2. comment out the lines:
```
import pkg from '@coinbase/cookie-banner';
const { CookieBanner } = pkg;
```

3. add the following line:
```
import { CookieBanner } from '@coinbase/cookie-banner';
```

NB: Do not commit this change, this is an issue in local dev only.
