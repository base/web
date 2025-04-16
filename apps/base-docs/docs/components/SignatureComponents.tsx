import { APIError } from '@coinbase/onchainkit/api';
import { LifecycleStatus, Signature } from '@coinbase/onchainkit/signature';
import { encodeAbiParameters } from 'viem';
import App from './App.tsx';

const SCHEMA_UID = '0xf58b8b212ef75ee8cd7e8d803c37c03e0519890502d5e99ee2412aae1456cafe';
const EAS_CONTRACT = '0x4200000000000000000000000000000000000021';

export function EIP712Signature() {
  const domain = {
    name: 'EAS Attestation',
    version: '1.0.0',
    chainId: 8453,
    verifyingContract: EAS_CONTRACT,
  } as const;

  const types = {
    Attest: [
      { name: 'schema', type: 'bytes32' },
      { name: 'recipient', type: 'address' },
      { name: 'time', type: 'uint64' },
      { name: 'revocable', type: 'bool' },
      { name: 'refUID', type: 'bytes32' },
      { name: 'data', type: 'bytes' },
      { name: 'value', type: 'uint256' },
    ],
  } as const;

  const message = {
    schema: SCHEMA_UID,
    recipient: '0x0000000000000000000000000000000000000000',
    time: BigInt(0),
    revocable: false,
    refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
    data: encodeAbiParameters([{ type: 'string' }], ['test attestation']) as `0x${string}`,
    value: BigInt(0),
  } as const;

  const handleOnSuccess = (signature: string) => {
    console.log(signature);
  };

  const handleOnStatus = (status: LifecycleStatus) => {
    console.log(status);
  };

  const handleOnError = (error: APIError) => {
    console.log(error);
  };

  return (
    <App>
      <div className="w-[200px]">
        <Signature
          domain={domain}
          types={types}
          message={message}
          primaryType="Attest"
          label="EIP712"
          onSuccess={handleOnSuccess}
          onStatus={handleOnStatus}
          onError={handleOnError}
          resetAfter={1000}
        />
      </div>
    </App>
  );
}

export function PersonalSignSignature() {
  const handleOnSuccess = (signature: string) => {
    console.log(signature);
  };

  const handleOnStatus = (status: LifecycleStatus) => {
    console.log(status);
  };

  const handleOnError = (error: APIError) => {
    console.log(error);
  };

  return (
    <App>
      <div className="w-[200px]">
        <Signature
          message="test message"
          label="personal_sign"
          onSuccess={handleOnSuccess}
          onStatus={handleOnStatus}
          onError={handleOnError}
          resetAfter={1000}
        />
      </div>
    </App>
  );
}
