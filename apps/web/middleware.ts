import { NextRequest, NextResponse } from 'next/server';

const redirects: Record<string, string> = {
  '/docs': 'https://docs.base.org/',
  '/base-camp': 'https://docs.base.org/learn/welcome',
  '/base-learn': 'https://docs.base.org/learn/welcome',
  '/basecamp': 'https://docs.base.org/learn/welcome',
  '/baselearn': 'https://docs.base.org/learn/welcome',
  '/base-camp/docs': 'https://docs.base.org/learn/welcome',
  '/base-learn/docs': 'https://docs.base.org/learn/welcome',
  '/basecamp/docs': 'https://docs.base.org/learn/welcome',
  '/baselearn/docs': 'https://docs.base.org/learn/welcome',
  '/camp': 'https://docs.base.org/learn/welcome',
  '/learn': 'https://docs.base.org/learn/welcome',
  '/guides/run-a-base-goerli-node': 'https://docs.base.org/chain/run-a-base-node',
  '/using-base': 'https://docs.base.org/chain/using-base',
  '/network-information': 'https://docs.base.org/chain/network-information',
  '/base-contracts': 'https://docs.base.org/chain/base-contracts',
  '/fees': 'https://docs.base.org/chain/fees',
  '/differences': 'https://docs.base.org/chain/differences-between-ethereum-and-base',
  '/tools/node-providers': 'https://docs.base.org/chain/node-providers',
  '/tools/block-explorers': 'https://docs.base.org/chain/block-explorers',
  '/tools/network-faucets': 'https://docs.base.org/chain/network-faucets',
  '/tools/oracles': 'https://docs.base.org/chain/oracles',
  '/tools/data-indexers': 'https://docs.base.org/chain/data-indexers',
  '/tools/cross-chain': 'https://docs.base.org/chain/cross-chain',
  '/tools/account-abstraction': 'https://docs.base.org/chain/account-abstraction',
  '/tools/nft-checkout': 'https://docs.base.org/', // TODO: add pathname
  '/tools/onramps': 'https://docs.base.org/chain/onramps',
  '/tools/onboarding': 'https://docs.base.org/chain/onboarding',
  '/tools/bridges': 'https://bridge.base.org/',
  '/tools/bridges-testnet': 'https://bridge.base.org/',
  '/tools/bridge-faq': 'https://bridge.base.org/',
  '/tools/foundry': 'https://docs.base.org/', // TODO: add pathname
  '/tools/hardhat': 'https://docs.base.org/', // TODO: add pathname
  '/tools/thirdweb-cli': 'https://docs.base.org/', // TODO: add pathname
  '/tools/ethers': 'https://docs.base.org/', // TODO: add pathname
  '/tools/thirdweb-sdk': 'https://docs.base.org/', // TODO: add pathname
  '/tools/viem': 'https://docs.base.org/', // TODO: add pathname
  '/tools/web3': 'https://docs.base.org/', // TODO: add pathname
  '/tokens/list': 'https://docs.base.org/', // TODO: add pathname
  '/tokens/wallet': 'https://docs.base.org/', // TODO: add pathname
  '/contracts': 'https://docs.base.org/chain/base-contracts',
  '/security': 'https://docs.base.org/', // TODO: add pathname
  '/terms-of-service': 'https://docs.base.org/terms-of-service',
  '/privacy-policy': 'https://docs.base.org/privacy-policy',
  '/cookie-policy': 'https://docs.base.org/cookie-policy',
  '/discord': 'https://discord.gg/buildonbase',
  '/blog': 'https://base.mirror.xyz/',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (redirects[url.pathname]) {
    url.host = new URL(redirects[url.pathname]).host;
    url.pathname = new URL(redirects[url.pathname]).pathname;
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/flashblocks')) {
    const subPath = url.pathname.replace('/flashblocks', '');
    url.host = 'flashblocks.base.org';
    url.pathname = `/${subPath}`;
    url.port = '443';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/jobs') && url.searchParams.has('gh_jid')) {
    const params = url.searchParams;
    const token = params.get('gh_jid');
    const src = params.get('gh_src');
    url.host = 'boards.greenhouse.io';
    url.pathname = '/embed/job_app';

    url.searchParams.set('for', 'basejobs');
    if (token) {
      url.searchParams.set('token', String(token));
    }
    if (src) {
      url.searchParams.set('src', String(src));
    }

    url.port = '443';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/builder-anniversary-nft')) {
    url.host = 'docs.base.org';
    url.pathname = `/chain/builder-anniversary-nft`;
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
