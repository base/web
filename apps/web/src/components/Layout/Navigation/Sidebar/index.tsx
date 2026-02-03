'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  const [hasAnimated, setHasAnimated] = useState(false);

  const isBrand = pathname.includes('/brand');

  // Mark as animated after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 800); // Match the animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate={hasAnimated ? false : 'visible'}
      className="relative"
    >
      {isBrand ? <BrandSidebar /> : <BaseSidebar />}
    </motion.div>
  );
}
