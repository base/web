import React from 'react';
import { useIdentity } from '@coinbase/onchainkit/identity';

/**
 * LiveOnChainChat provides a live demo of on-chain identity integration.
 * It renders a "Connect Wallet" button for users who haven't connected their wallet.
 * Once the wallet is connected, it displays the user's avatar and display name.
 */
export const LiveOnChainChat = () => {
  const { identity, connect } = useIdentity();

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '2rem auto',
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }}
    >
      <h2>OnChainChat Live Demo</h2>
      {!identity ? (
        <button
          onClick={connect}
          style={{
            backgroundColor: '#4F46E5',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
          <img
            src={identity.avatar || '/default-avatar.png'}
            alt="Avatar"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              marginRight: '1rem'
            }}
          />
          <div>
            <h3 style={{ margin: 0 }}>
              {identity.displayName || identity.address}
            </h3>
            <p style={{ margin: 0, color: '#555' }}>Welcome to OnChainChat!</p>
          </div>
        </div>
      )}
    </div>
  );
};