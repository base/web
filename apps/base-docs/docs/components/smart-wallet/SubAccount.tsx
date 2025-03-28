'use client';

import { useCallback, useEffect, useState } from 'react';
import Button from '../Button/index.tsx';
import {
  createCoinbaseWalletSDK,
  getCryptoKeyAccount,
  ProviderInterface,
} from '@coinbase/wallet-sdk-canary';
import { Address } from '@coinbase/onchainkit/identity';
import { SubAccountIllustration } from '@/components/smart-wallet/Illustration.tsx';

type Signer = Awaited<ReturnType<typeof getCryptoKeyAccount>>;
const BASE_SEPOLIA_CHAIN_ID = 84532;

export default function SubAccount() {
  const [provider, setProvider] = useState<ProviderInterface | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);

  const [universalAccount, setUniversalAccount] = useState<string | null>(null);
  const [subAccount, setSubAccount] = useState<string | null>(null);

  useEffect(() => {
    const walletProvider = createCoinbaseWalletSDK({
      appName: 'Smart Wallet Doc',
      appChainIds: [BASE_SEPOLIA_CHAIN_ID],
      preference: {
        keysUrl: 'https://keys-dev.coinbase.com/connect',
        options: 'smartWalletOnly',
      },
      subaccount: {
        getSigner: getCryptoKeyAccount,
      },
    }).getProvider();

    setProvider(walletProvider);

    const loadKey = async () => {
      const cryptoKeyAccount = await getCryptoKeyAccount();
      setSigner(cryptoKeyAccount);
    };

    void loadKey();
  }, [setSigner]);

  const createSubAccount = useCallback(async () => {
    if (!provider || !signer?.account) return;

    const walletConnectResponse = (await provider.request({
      method: 'wallet_connect',
      params: [
        {
          capabilities: {
            addSubAccount: {
              account: {
                type: 'create',
                keys: [
                  {
                    type: 'webauthn-p256',
                    key: signer.account.publicKey,
                  },
                ],
              },
            },
          },
        },
      ],
    })) as {
      accounts: {
        address: string;
        capabilities: {
          addSubAccount: {
            address: string;
          };
        };
      }[];
    };

    setSubAccount(walletConnectResponse.accounts[0].capabilities.addSubAccount.address);
    setUniversalAccount(walletConnectResponse.accounts[0].address);
  }, [provider, signer?.account]);

  // Universal Account Signing Function
  const universalAccountSigning = useCallback(async () => {
    if (!provider || !signer?.account) return;

    const hash = await provider.request({
      method: 'personal_sign',
      params: ['Hello, world!', universalAccount],
    });

    alert(`Sign was successful: ${hash}`);
  }, [provider, signer?.account, universalAccount]);

  // Sub Account Signing Function
  const subAccountSigning = useCallback(async () => {
    if (!provider || !signer?.account) return;

    const hash = await provider.request({
      method: 'personal_sign',
      params: ['Hello, world!', subAccount],
    });

    alert(`Sign was successful: ${hash}`);
  }, [provider, signer?.account, subAccount]);

  return subAccount ? (
    universalAccount && subAccount && (
      <SubAccountIllustration
        universalAccount={<Address address={universalAccount} />}
        subAccount={<Address address={subAccount} />}
        universalAccountSigning={universalAccountSigning}
        subAccountSigning={subAccountSigning}
      />
    )
  ) : (
    <Button
      className="border-none bg-sky-600"
      onClick={createSubAccount}
      disabled={!(signer && provider)}
    >
      Create Sub Account
    </Button>
  );
}
