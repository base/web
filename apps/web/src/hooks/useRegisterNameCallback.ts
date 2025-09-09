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
} from 'apps/web/src/utils/usernames';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { encodeFunctionData, namehash } from 'viem';
import { useAccount } from 'wagmi';
import { secondsInYears } from 'apps/web/src/utils/secondsInYears';
import L2ReverseRegistrarAbi from 'apps/web/src/abis/L2ReverseRegistrarAbi';
import { encodePacked, getFunctionSelector, keccak256, type AbiFunction } from 'viem';
import { usePublicClient, useSignMessage } from 'wagmi';

type UseRegisterNameCallbackReturnType = {
  callback: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  reverseRecord: boolean;
  setReverseRecord: Dispatch<SetStateAction<boolean>>;
  hasExistingBasename: boolean;
  batchCallsStatus: BatchCallsStatus;
  registerNameStatus: WriteTransactionWithReceiptStatus;
  prepareReverseRecordSignature: () => Promise<{
    coinTypes: readonly bigint[];
    signatureExpiry: bigint;
    signature: `0x${string}`;
  }>;
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
  const publicClient = usePublicClient({ chainId: basenameChain.id });
  const { signMessageAsync } = useSignMessage();

  // If user has a basename, reverse record is set to false
  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
  });

  const hasExistingBasename = useMemo(
    () => !baseEnsNameIsLoading && !!baseEnsName,
    [baseEnsName, baseEnsNameIsLoading],
  );

  const [reverseRecord, setReverseRecord] = useState<boolean>(!hasExistingBasename);
  const [reverseSigPayload, setReverseSigPayload] = useState<{
    coinTypes: readonly bigint[];
    signatureExpiry: bigint;
    signature: `0x${string}`;
  } | null>(null);

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

  const prepareReverseRecordSignature = useCallback(async () => {
    if (!address) throw new Error('No address');
    if (!publicClient) throw new Error('No public client');

    const reverseRegistrar = await publicClient.readContract({
      abi: UpgradeableRegistrarControllerAbi,
      address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
      functionName: 'reverseRegistrar',
    });

    const functionAbi = L2ReverseRegistrarAbi.find(
      (f) => f.type === 'function' && f.name === 'setNameForAddrWithSignature',
    ) as unknown as AbiFunction;
    const selector = getFunctionSelector(functionAbi);

    const signatureExpiry = BigInt(Math.floor(Date.now() / 1000) + 5 * 60);
    const coinTypes = [BigInt(convertChainIdToCoinTypeUint(basenameChain.id))] as const;

    const preimage = encodePacked(
      ['address', 'bytes4', 'address', 'uint256', 'string', 'uint256[]'],
      [reverseRegistrar, selector, address, signatureExpiry, normalizedName, coinTypes],
    );

    const digest = keccak256(preimage);
    const signature = await signMessageAsync({ message: { raw: digest } });

    const payload = { coinTypes, signatureExpiry, signature } as const;
    setReverseSigPayload(payload);
    return payload;
  }, [address, basenameChain.id, normalizedName, publicClient, signMessageAsync]);

  // Callback
  const registerName = useCallback(async () => {
    if (!address) return;

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
    let signatureExpiryForRequest: bigint = 0n;
    let signatureForRequest: `0x${string}` = '0x';

    if (!paymasterServiceEnabled && reverseRecord) {
      const payload =
        reverseSigPayload ??
        (await prepareReverseRecordSignature().catch((e) => {
          logError(e, 'Reverse record signature step failed');
          return null;
        }));
      if (!payload) return;
      coinTypesForRequest = payload.coinTypes;
      signatureExpiryForRequest = payload.signatureExpiry;
      signatureForRequest = payload.signature;
    }

    const registerRequest = {
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: UPGRADEABLE_L2_RESOLVER_ADDRESSES[basenameChain.id], // The address of the resolver to set for this name.
      data: [addressData, baseCointypeData, nameData], //  Multicallable data bytes for setting records in the associated resolver upon registration.
      reverseRecord, // Bool to decide whether to set this name as the "primary" name for the `owner`.
      coinTypes: coinTypesForRequest,
      signatureExpiry: signatureExpiryForRequest,
      signature: signatureForRequest,
    };

    try {
      if (!paymasterServiceEnabled) {
        await initiateRegisterName({
          abi: REGISTER_CONTRACT_ABI,
          address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
          functionName: isDiscounted ? 'discountedRegister' : 'register',
          args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
          value,
        });
      } else {
        await initiateBatchCalls({
          contracts: [
            {
              abi: REGISTER_CONTRACT_ABI,
              address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
              functionName: isDiscounted ? 'discountedRegister' : 'register',
              args: isDiscounted
                ? [registerRequest, discountKey, validationData]
                : [registerRequest],
              value,
            },
            ...(reverseRecord
              ? [
                  {
                    abi: L2ReverseRegistrarAbi,
                    address: USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id],
                    functionName: 'setName',
                    args: [normalizedName],
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
    validationData,
    value,
    years,
  ]);

  return {
    callback: registerName,
    isPending: registerNameIsLoading || batchCallsIsLoading,
    error: registerNameError ?? batchCallsError,
    reverseRecord,
    setReverseRecord,
    hasExistingBasename,
    batchCallsStatus,
    registerNameStatus,
    prepareReverseRecordSignature,
  };
}
