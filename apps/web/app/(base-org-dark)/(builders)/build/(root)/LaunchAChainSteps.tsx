'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import { motion } from 'framer-motion';

const steps = [
    'L3 Testnet',
    'Settled on Base L2 with S3',
    'Automated transaction ordering to ensure optimal performance',
    'Managed nodes',
    'Out-of-the-box block explorer',
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { 
        opacity: 0, 
        x: -80,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
            mass: 0.8,
        },
    },
};

export function LaunchAChainSteps() {
    return (
        <motion.ul 
            className="flex flex-col gap-2 mx-auto bg-gray-80 rounded-md px-4 py-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {steps.map((step) => (
                <motion.li 
                    key={step}
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-2">
                        <div className="text-green-60">
                            <Icon name="checkmark" width={12} height={12} color="currentColor" />
                        </div>
                        <div className="text-sm">{step}</div>
                    </div>
                </motion.li>
            ))}
        </motion.ul>
    );
}