'use client';
import ReactBlockies from 'react-blockies';

const styles = {
  container: {
    overflow: 'hidden',
  },
};

export type Props = {
  address: string;
  size: number;
};

export default function Blockies({ address, size }: Props) {
  return (
    <div style={{ ...styles.container, width: size, height: size, borderRadius: size / 2 }}>
      <ReactBlockies size={8} seed={address} scale={size ? size / 7 : 4} />
    </div>
  );
}
