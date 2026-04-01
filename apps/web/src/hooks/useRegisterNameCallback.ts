import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import {
  UPGRADEABLE_L2_RESOLVER_ADDRESSES,
  USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import useWriteContractsWithLogs, {
  BatchCallsStatus,
} from 'apps/web/src/hooks/useWriteContractsWithLogs';
import useWriteContractWithReceipt, {
  WriteTransactionWithReceiptStatus,
} from 'apps/web/src/hooks/useWriteContractWithReceipt';
import {
  convertChainIdToCoinTypeUint,
  formatBaseEthDomain,
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
  buildReverseRegistrarSignatureDigest,
} from 'apps/web/src/utils/usernames';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { encodeFunctionData, namehash } from 'viem';
import { useAccount } from 'wagmi';
import { secondsInYears } from 'apps/web/src/utils/secondsInYears';
import L2ReverseRegistrarAbi from 'apps/web/src/abis/L2ReverseRegistrarAbi';
import { type AbiFunction } from 'viem';
import { useSignMessage } from 'wagmi';

type UseRegisterNameCallbackReturnType = {
  callback: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  reverseRecord: boolean;
  setReverseRecord: Dispatch<SetStateAction<boolean>>;
  hasExistingBasename: boolean;
  batchCallsStatus: BatchCallsStatus;
  registerNameStatus: WriteTransactionWithReceiptStatus;
};

export function useRegisterNameCallback(
  name: string,
  value: bigint | undefined,
  years: number,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`,
): UseRegisterNameCallbackReturnType {
  const { address } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { logError } = useErrors();
  const { paymasterService: paymasterServiceEnabled } = useCapabilitiesSafe({
    chainId: basenameChain.id,
  });
  const { signMessageAsync, status: signMessageStatus } = useSignMessage();
  const signMessageIsLoading = signMessageStatus === 'pending';

  // If user has a basename, reverse record is set to false
  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
  });

  const hasExistingBasename = useMemo(
    () => !baseEnsNameIsLoading && !!baseEnsName,
    [baseEnsName, baseEnsNameIsLoading],
  );

  const [reverseRecord, setReverseRecord] = useState<boolean>(!hasExistingBasename);
  const [signatureError, setSignatureError] = useState<Error | null>(null);

  // Transaction with paymaster enabled
  const { initiateBatchCalls, batchCallsStatus, batchCallsIsLoading, batchCallsError } =
    useWriteContractsWithLogs({
      chain: basenameChain,
      eventName: 'register_name',
    });

  // Transaction without paymaster
  const {
    initiateTransaction: initiateRegisterName,
    transactionStatus: registerNameStatus,
    transactionIsLoading: registerNameIsLoading,
    transactionError: registerNameError,
  } = useWriteContractWithReceipt({
    chain: basenameChain,
    eventName: 'register_name',
  });

  // Params
  const normalizedName = normalizeEnsDomainName(name);
  const isDiscounted = Boolean(discountKey && validationData);

  const signMessageForReverseRecord = useCallback(async () => {
    if (!address) throw new Error('No address');
    const reverseRegistrar = USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id];

    const functionAbi = L2ReverseRegistrarAbi.find(
      (f) => f.type === 'function' && f.name === 'setNameForAddrWithSignature',
    ) as unknown as AbiFunction;
    const signatureExpiry = BigInt(Math.floor(Date.now() / 1000) + 5 * 60);
    const { digest, coinTypes } = buildReverseRegistrarSignatureDigest({
      reverseRegistrar,
      functionAbi,
      address,
      chainId: basenameChain.id,
      name,
      signatureExpiry,
    });
    const signature = await signMessageAsync({ message: { raw: digest } });
    return { coinTypes, signatureExpiry, signature } as const;
  }, [address, basenameChain.id, name, signMessageAsync]);

  // Callback
  const registerName = useCallback(async () => {
    if (!address) return;
    setSignatureError(null);

    const addressData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setAddr',
      args: [namehash(formatBaseEthDomain(name, basenameChain.id)), address],
    });

    const baseCointypeData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setAddr',
      args: [
        namehash(formatBaseEthDomain(name, basenameChain.id)),
        BigInt(convertChainIdToCoinTypeUint(basenameChain.id)),
        address,
      ],
    });

    const nameData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setName',
      args: [
        namehash(formatBaseEthDomain(name, basenameChain.id)),
        formatBaseEthDomain(name, basenameChain.id),
      ],
    });

    let coinTypesForRequest: readonly bigint[] = [];
    let signatureExpiryForRequest = 0n;
    let signatureForRequest: `0x${string}` = '0x';

    if (!paymasterServiceEnabled && reverseRecord) {
      try {
        const payload = await signMessageForReverseRecord();
        coinTypesForRequest = payload.coinTypes;
        signatureExpiryForRequest = payload.signatureExpiry;
        signatureForRequest = payload.signature;
      } catch (e) {
        logError(e, 'Reverse record signature step failed');
        const msg = e instanceof Error && e.message ? e.message : 'Unknown error';
        setSignatureError(new Error(`Could not prepare reverse record signature: ${msg}`));
        return;
      }
    }

    const reverseRecordForRequest = paymasterServiceEnabled ? false : reverseRecord;

    const registerContractAddress = REGISTER_CONTRACT_ADDRESSES[basenameChain.id];
    const resolverAddress = UPGRADEABLE_L2_RESOLVER_ADDRESSES[basenameChain.id];

    if (!registerContractAddress || !resolverAddress) {
      const error = new Error(
        `Missing contract addresses for chain ${basenameChain.id}: registerAddress=${registerContractAddress}, resolverAddress=${resolverAddress}`,
      );
      logError(error, 'Register name contract address lookup failed');
      return;
    }

    const registerRequest = {
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: resolverAddress, // The address of the resolver to set for this name.
      data: [addressData, baseCointypeData, nameData], //  Multicallable data bytes for setting records in the associated resolver upon registration.
      reverseRecord: reverseRecordForRequest, // When using paymaster (atomic batch), set via separate call instead of signature flow.
      coinTypes: coinTypesForRequest,
      signatureExpiry: signatureExpiryForRequest,
      signature: signatureForRequest,
    };

    try {
      if (!paymasterServiceEnabled) {
        await initiateRegisterName({
          abi: REGISTER_CONTRACT_ABI,
          address: registerContractAddress,
          functionName: isDiscounted ? 'discountedRegister' : 'register',
          args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
          value,
        });
      } else {
        const reverseRegistrarAddress = USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id];
        if (reverseRecord && !reverseRegistrarAddress) {
          const error = new Error(
            `Missing reverse registrar address for chain ${basenameChain.id}`,
          );
          logError(error, 'Register name reverse registrar address lookup failed');
          return;
        }

        await initiateBatchCalls({
          contracts: [
            {
              abi: REGISTER_CONTRACT_ABI,
              address: registerContractAddress,
              functionName: isDiscounted ? 'discountedRegister' : 'register',
              args: isDiscounted
                ? [registerRequest, discountKey, validationData]
                : [registerRequest],
              value,
            },
            ...(reverseRecord && reverseRegistrarAddress
              ? [
                  {
                    abi: L2ReverseRegistrarAbi,
                    address: reverseRegistrarAddress,
                    functionName: 'setName',
                    args: [formatBaseEthDomain(name, basenameChain.id)],
                  },
                ]
              : []),
          ],
          account: address,
          chain: basenameChain,
        });
      }
    } catch (e) {
      logError(e, 'Register name transaction canceled');
    }
  }, [
    address,
    basenameChain,
    discountKey,
    initiateBatchCalls,
    initiateRegisterName,
    isDiscounted,
    logError,
    name,
    normalizedName,
    paymasterServiceEnabled,
    reverseRecord,
    signMessageForReverseRecord,
    validationData,
    value,
    years,
  ]);

  return {
    callback: registerName,
    isPending: registerNameIsLoading || batchCallsIsLoading || signMessageIsLoading,
    error: signatureError ?? registerNameError ?? batchCallsError,
    reverseRecord,
    setReverseRecord,
    hasExistingBasename,
    batchCallsStatus,
    registerNameStatus,
  };
}
