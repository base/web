'use client';

import { motion } from 'framer-motion';

export function AnimatedGrowthChart() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="354"
      height="239"
      viewBox="0 0 354 239"
      fill="none"
    >
      <defs>
        <motion.clipPath id="reveal-clip">
          <motion.rect
            x="0"
            y="0"
            height="239"
            initial={{ width: 0 }}
            whileInView={{ width: 354 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </motion.clipPath>
      </defs>

      {/* Filled area */}
      <path
        d="M78.2093 186.733L0 238.872H354V0.12793L314.209 56.3837L252.465 104.407L190.721 173.012L78.2093 186.733Z"
        fill="#B6F569"
        fillOpacity="0.2"
        clipPath="url(#reveal-clip)"
      />

      {/* Top line stroke */}
      <path
        d="M0 238.872L78.2093 186.733L190.721 173.012L252.465 104.407L314.209 56.3837L354 0.12793"
        fill="none"
        stroke="#B6F569"
        strokeWidth="1"
        clipPath="url(#reveal-clip)"
      />
    </motion.svg>
  );
}
