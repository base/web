import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === '/docs') {
    url.host = 'docs.base.org';
    url.pathname = '/';
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

  if (
    url.pathname === '/base-camp' ||
    url.pathname === '/base-learn' ||
    url.pathname === '/basecamp' ||
    url.pathname === '/baselearn' ||
    url.pathname === '/base-camp/docs' ||
    url.pathname === '/base-learn/docs' ||
    url.pathname === '/basecamp/docs' ||
    url.pathname === '/baselearn/docs' ||
    url.pathname === '/camp' ||
    url.pathname === '/learn'
  ) {
    url.host = 'docs.base.org';
    url.pathname = '/base-learn/docs/welcome';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/run-a-base-goerli-node') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/run-a-base-node';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/using-base') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/using-base';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/network-information') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/network-information';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/base-contracts') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/base-contracts';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/fees') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/fees';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/differences') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/differences-between-ethereum-and-base';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/node-providers') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/node-providers';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/block-explorers') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/block-explorers';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/network-faucets') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/network-faucets';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/oracles') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/oracles';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/data-indexers') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/data-indexers';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/cross-chain') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/cross-chain';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/account-abstraction') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/account-abstraction';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/nft-checkout') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/onramps') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/onramps';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/onboarding') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/bridges') {
    url.host = 'bridge.base.org';
    url.pathname = '/';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/bridges-testnet') {
    url.host = 'bridge.base.org';
    url.pathname = '/';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/bridge-faq') {
    url.host = 'bridge.base.org';
    url.pathname = '/';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/foundry') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/hardhat') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/thirdweb-cli') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/ethers') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/thirdweb-sdk') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/viem') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tools/web3') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tokens/list') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/tokens/wallet') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/contracts') {
    url.host = 'docs.base.org';
    url.pathname = '/chain/base-contracts';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/security') {
    url.host = 'docs.base.org';
    url.pathname = '/'; // TODO: add pathname
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/terms-of-service') {
    url.host = 'docs.base.org';
    url.pathname = '/terms-of-service';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/privacy-policy') {
    url.host = 'docs.base.org';
    url.pathname = '/privacy-policy';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/cookie-policy') {
    url.host = 'docs.base.org';
    url.pathname = '/cookie-policy';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/discord') {
    url.host = 'discord.gg';
    url.pathname = '/buildonbase';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/blog') {
    url.host = 'base.mirror.xyz';
    url.pathname = '/';
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
