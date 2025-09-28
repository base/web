import 'server-only';
import { NextRequest } from 'next/server';
import { Address, createPublicClient, http } from 'viem';
import { base, mainnet } from 'viem/chains';
import { convertChainIdToCoinTypeUint } from 'apps/web/src/utils/usernames';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') as Address | null;
    if (!address) {
      return new Response(JSON.stringify({ error: 'Missing address' }), { status: 400 });
    }

    const mainnetRpcUrl = process.env.MAINNET_RPC_URL || process.env.NEXT_PUBLIC_MAINNET_RPC_URL;
    const client = createPublicClient({
      chain: mainnet,
      transport: http(mainnetRpcUrl),
    });

    const coinType = BigInt(convertChainIdToCoinTypeUint(base.id));
    const name = await client.getEnsName({ address, coinType });

    return new Response(JSON.stringify({ name: name ?? null }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ name: null }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
}
