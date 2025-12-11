import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface VariableContentProps {
  duration?: number;
  delay?: number;
  blur?: boolean;
  children?: ReactNode;
}

export default function VariableContent({
  duration = 300,
  delay = 0,
  blur = false,
  children,
}: VariableContentProps) {
  // Custom easing function - starts fast and slows down
  // This matches the Svelte customEase: 1 - (1 - t)^3
  const customEase = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  return (
    <motion.div
      className="col-span-full row-span-full"
      initial={{
        scale: 0.8,
        opacity: 0,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      animate={{
        scale: 1,
        opacity: 1,
        filter: blur ? 'blur(0px)' : 'blur(0px)',
      }}
      transition={{
        duration: duration / 1000, // Convert ms to seconds
        delay: delay / 1000, // Convert ms to seconds
        ease: customEase,
      }}
      style={{
        transformOrigin: 'center',
      }}
    >
      {children}
    </motion.div>
  );
}
