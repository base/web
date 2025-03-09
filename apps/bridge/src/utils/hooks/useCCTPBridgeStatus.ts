import { useEffect, useState } from 'react';
import { usePublicClient, useWaitForTransaction } from 'wagmi';
import getConfig from 'next/config';
import { CCTPBridgePhase } from 'apps/bridge/src/utils/transactions/phase';
import { useQuery } from 'react-query';
import { keccak256, getEventSelector, decodeAbiParameters, parseAbiParameter } from 'viem';
import MessageTransmitter from 'apps/bridge/src/contract-abis/MessageTransmitter';

const { publicRuntimeConfig } = getConfig();
const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);
const l2ChainID = parseInt(publicRuntimeConfig.l2ChainID);

type BridgeAttestation = {
  attestation: `0x${string}`;
  status: string;
};

async function fetchBridgeAttestation(messageHash: string): Promise<BridgeAttestation | undefined> {
  const response = await fetch(
    `${publicRuntimeConfig.cctpAttestationsAPIURL}/attestations/${messageHash}`,
  );

  return (await response.json()) as BridgeAttestation;
}

type UseCCTPBridgeStatusProps = {
  initiateTxHash: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
};

type CCTPBridgeStatus = {
  status: CCTPBridgePhase;
  message?: `0x${string}`;
  attestation?: `0x${string}`;
  setStatus: (newStatus: CCTPBridgePhase) => void;
};

export function useCCTPBridgeStatus({
  initiateTxHash,
  bridgeDirection,
}: UseCCTPBridgeStatusProps): CCTPBridgeStatus {
  const [status, setStatus] = useState<CCTPBridgePhase>('INITIATE_CCTP_BRIDGE_PENDING');
  const [message, setMessage] = useState<`0x${string}` | undefined>(undefined);
  const [messageHash, setMessageHash] = useState<`0x${string}` | undefined>(undefined);
  const isDeposit = bridgeDirection === 'deposit';

  // The public client we will use to simulate finalizing the bridge
  // on the other chain. Ie if we are depositing this will be an L2 client,
  // and if we are withdrawing this will be an L1 client.
  const publicClient = usePublicClient({
    chainId: isDeposit ? l2ChainID : l1ChainID,
  });

  // Waiting for the bridge initiation on the chain that the user is bridging from.
  // Ie if we are depositing this will be an L1 tx,
  // and if we are withdrawing this will be an L2 tx.
  const { data: initiateTxReceipt } = useWaitForTransaction({
    hash: initiateTxHash,
    chainId: isDeposit ? l1ChainID : l2ChainID,
  });

  const { data: bridgeAttestation } = useQuery(
    ['bridgeAttestation', { initiateTxHash, messageHash }],
    async () => fetchBridgeAttestation(messageHash as string),
    {
      enabled: !!messageHash,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      placeholderData: undefined,
    },
  );

  useEffect(() => {
    if (initiateTxReceipt) {
      if (initiateTxReceipt.status === 'reverted') {
        setStatus('INITIATE_CCTP_BRIDGE_FAILED');
        return;
      }

      const eventTopic = getEventSelector('MessageSent(bytes)');
      const log = initiateTxReceipt.logs.find((l) => l.topics[0] === eventTopic);
      const messageBytes = decodeAbiParameters(
        [parseAbiParameter('bytes message')],
        log?.data as `0x${string}`,
      )[0];
      const hash = keccak256(messageBytes);
      setMessage(messageBytes);
      setMessageHash(hash);
    }
  }, [initiateTxReceipt]);

  useEffect(() => {
    if (bridgeAttestation?.attestation && message) {
      void (async () => {
        if (bridgeAttestation.status === 'pending_confirmations') {
          setStatus('INITIATE_CCTP_BRIDGE_PENDING');
          return;
        }

        // We still need to check whether or not the message was received on the other chain.
        // If it hasn't been received yet, the user needs to call receiveMessage on the MessageTransmitter.
        // If it has been received, the bridge is complete.
        // We can check if the message has been received by simulating a call to receiveMessage.
        // If it fails, assume it's because the message has already been received.
        try {
          await publicClient.simulateContract({
            address: isDeposit
              ? publicRuntimeConfig.l2CCTPMessageTransmitterAddress
              : publicRuntimeConfig.l1CCTPMessageTransmitterAddress,
            abi: MessageTransmitter,
            functionName: 'receiveMessage',
            args: [message, bridgeAttestation.attestation],
          });
          // Success, ie the message still needs to be received.
          setStatus('FINALIZE_CCTP_BRIDGE');
        } catch (e) {
          // Failed, ie the message has already been received.
          setStatus('CCTP_BRIDGE_COMPLETE');
        }
      })();
    }
  }, [bridgeAttestation, bridgeDirection, initiateTxReceipt, isDeposit, message, publicClient]);

  // We need to be able to set the status from the FinalizeCCTPBridgeButton, so we expose a setter.
  return {
    status,
    message,
    attestation: bridgeAttestation?.attestation,
    setStatus: setStatus,
  };
}
