import { NextRequest, NextResponse } from 'next/server';

const redirects: Record<string, string> = {
  '/base-camp': '/base-learn/docs/welcome',
  '/base-learn': '/base-learn/docs/welcome',
  '/basecamp': '/base-learn/docs/welcome',
  '/baselearn': '/base-learn/docs/welcome',
  '/base-camp/docs': '/base-learn/docs/welcome',
  '/base-learn/docs': '/base-learn/docs/welcome',
  '/basecamp/docs': '/base-learn/docs/welcome',
  '/baselearn/docs': '/base-learn/docs/welcome',
  '/camp': '/base-learn/docs/welcome',
  '/learn': '/base-learn/docs/welcome',
  '/guides/run-a-base-goerli-node': '/tutorials/run-a-base-node',
  '/using-base': '/docs/using-base',
  '/network-information': '/docs/network-information',
  '/base-contracts': '/docs/base-contracts',
  '/fees': '/docs/fees',
  '/differences': '/docs/differences',
  '/tools/node-providers': '/docs/tools/node-providers',
  '/tools/block-explorers': '/docs/tools/block-explorers',
  '/tools/network-faucets': '/docs/tools/network-faucets',
  '/tools/oracles': '/docs/tools/oracles',
  '/tools/data-indexers': '/docs/tools/data-indexers',
  '/tools/cross-chain': '/docs/tools/cross-chain',
  '/tools/account-abstraction': '/docs/tools/account-abstraction',
  '/tools/nft-checkout': '/docs/tools/nft-checkout',
  '/tools/onramps': '/docs/tools/onramps',
  '/tools/onboarding': '/docs/tools/onboarding',
  '/tools/bridges': '/docs/tools/bridges',
  '/tools/bridges-testnet': '/docs/tools/bridges-testnet',
  '/tools/bridge-faq': '/docs/tools/bridge-faq',
  '/tools/foundry': '/docs/tools/foundry',
  '/tools/hardhat': '/docs/tools/hardhat',
  '/tools/thirdweb-cli': '/docs/tools/thirdweb-cli',
  '/tools/ethers': '/docs/tools/ethers',
  '/tools/thirdweb-sdk': '/docs/tools/thirdweb-sdk',
  '/tools/viem': '/docs/tools/viem',
  '/tools/web3': '/docs/tools/web3',
  '/tokens/list': '/docs/tokens/list',
  '/tokens/wallet': '/docs/tokens/wallet',
  '/contracts': '/docs/contracts',
  '/security': '/docs/security',
  '/terms-of-service': '/docs/terms-of-service',
  '/privacy-policy': '/docs/privacy-policy',
  '/cookie-policy': '/docs/cookie-policy',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === '/discord') {
    return NextResponse.redirect('https://discord.gg/buildonbase');
  }

  if (url.pathname === '/blog') {
    return NextResponse.redirect('https://base.mirror.xyz/');
  }

  if (redirects[url.pathname]) {
    url.host = 'docs.base.org';
    url.pathname = redirects[url.pathname];
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (
    process.env.APP_STAGE !== 'production' ||
    process.env.AUTH_ENABLED === 'false' ||
    url.pathname === '/api/_health'
  ) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    const users: Record<string, string> = (process.env?.BASIC_AUTH_CREDENTIALS ?? ' ')
      .split(' ')
      .reduce((o, e) => {
        const s = e.split(':');
        const updated = { ...o, [s[0]]: s[1] };
        return updated;
      }, {});
    if (users[user] === pwd) {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth';
  return NextResponse.rewrite(url);
}
