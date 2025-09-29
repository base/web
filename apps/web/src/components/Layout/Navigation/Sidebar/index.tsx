'use client';

import { usePathname } from 'next/navigation';

import { cubicBezier, motion } from 'motion/react';

import BrandSidebar from 'apps/web/src/components/Layout/Navigation/Sidebar/Brand-Sidebar';
import BaseSidebar from 'apps/web/src/components/Layout/Navigation/Sidebar/Base-Sidebar';

const easeFn = cubicBezier(0.16, 1, 0.3, 1);

const sidebarVariants = {
  hidden: { opacity: 0, x: -128 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeFn } },
};

export default function Sidebar() {
  const pathname = usePathname();

  const isBrand = pathname.includes('/brand');

  return (
    <motion.div variants={sidebarVariants} initial="hidden" animate="visible" className="relative">
      {isBrand ? <BrandSidebar /> : <BaseSidebar />}
    </motion.div>
  );
}
