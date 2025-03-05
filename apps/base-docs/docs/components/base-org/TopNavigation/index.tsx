'use client';

import { Link } from 'react-router-dom';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from '../../ConnectWalletButton/ConnectWalletButton.tsx';
import MenuDesktop from './MenuDesktop.tsx';
import MenuMobile from './MenuMobile.tsx';
import GasPriceDropdown from './GasPriceDropdown.tsx';
import { Suspense } from 'react';

export default function TopNavigation() {
  return (
    <nav className="fixed top-0 z-50 w-full shrink-0 px-4 py-4 md:px-6 lg:px-8">
      <div>Hello TopNav!</div>
    </nav>
  );
}
